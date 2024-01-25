import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ContractEventPayload, EventLog, Log, ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertyStatus } from 'src/shared/enum/types';
import { Financial } from './entities/financial.entity';
import { NearLocation } from './entities/near_location.entity';
import { Token } from '../token/entities/token.entity';
import { PropertyFeature } from '../property-feature/entities/property-feature.entity';
import {
  IPaginateOptions,
  IPaginationMeta,
  paginate,
} from 'src/shared/utils/pagination';
import { QueryFilterProperty } from './dto/query-filter.dto';
import { abiXtatuz } from 'src/constants/abiXtatuz';
import * as AWS from 'aws-sdk';
import { amount, dateToTimestamp } from 'src/shared/utils/calculate';
import * as dayjs from 'dayjs';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyFeature)
    private propertyFeatureRepository: Repository<PropertyFeature>,
    @InjectRepository(Financial)
    private financialRepository: Repository<Financial>,
    @InjectRepository(NearLocation)
    private nearLocationRepository: Repository<NearLocation>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  async create(
    createPropertyDto: CreatePropertyDto,
    files: Array<Express.Multer.File>,
  ) {
    const {
      company_name,
      issuer_name,
      mobile_number,
      email_address,
      lot_size,
      interior_size,
      property_name,
      user_id,
      expect_income,
      underlying_asset,
      financial,
      total_raise,
      start_presale,
      end_presale,
      total_supply,
      total_investment,
      link_doc,
      detail,
      location_link,
      near_location,
      onchain_id,
      note,
      address_property,
      city,
      country,
      property_type,
      property_completion_status,
      token_price,
      property_features,
      token_id,
    } = createPropertyDto;
    try {
      const createFinancial = this.financialRepository.create({
        grossRentPerYear: financial.gross_rent_per_year,
        grossRentPerMonth: financial.gross_rent_per_month,
        monthlyCosts: financial.monthly_costs,
        netRentPerYear: financial.net_rent_per_year,
        netRentPerMonth: financial.net_rent_per_month,
        totalPrice: financial.total_price,
        expectedIncome: financial.expected_income,
      });

      const propertyFinancial =
        await this.financialRepository.save(createFinancial);

      const token = await this.tokenRepository.findOne({
        where: {
          id: token_id,
        },
      });

      if (!token) {
        throw new Error(`can not create property whit token id ${token_id}`);
      }

      const filedImg: any = [];

      if (files) {
        for (const file of files) {
          const { originalname } = file;

          const responseFile = await this.uploadS3(
            file.buffer,
            process.env.AWS_S3_BUCKET_NAME,
            originalname,
            file.mimetype,
          );
          await filedImg.push(responseFile.Location);
        }
      }

      // const startDate = dayjs(start_presale).unix();
      const startDate = new Date(Number(start_presale) * 1000);
      const endDate = new Date(Number(end_presale) * 1000);
      // const endDate = dayjs(end_presale).unix();

      const createProperty = this.propertyRepository.create({
        companyName: company_name,
        issuerName: issuer_name,
        mobileNumber: mobile_number,
        emailAddress: email_address,
        lotSize: lot_size,
        interiorSize: interior_size,
        expectIncome: expect_income,
        propertyName: property_name,
        userId: user_id,
        img: filedImg,
        underlyingAsset: underlying_asset,
        financial: propertyFinancial,
        status: PropertyStatus.WAITING,
        totalRaise: total_raise,
        totalInvestment: total_investment,
        startPresale: startDate,
        endPresale: endDate,
        totalSupply: total_supply,
        linkDoc: link_doc,
        detail: detail,
        locationLink: location_link,
        onchainId: onchain_id,
        note: note,
        addressProperty: address_property,
        city: city,
        country: country,
        propertyType: property_type,
        propertyCompletion: property_completion_status,
        tokenPrice: token_price,
        token: token,
      });

      const properties = await this.propertyRepository.save(createProperty);

      if (property_features) {
        for (const feature of property_features) {
          const propertyFeatures = this.propertyFeatureRepository.create({
            key: feature.key,
            value: feature.value,
            unit: feature.unit,
            property: properties,
          });
          await this.propertyFeatureRepository.save(propertyFeatures);
        }
      }

      if (near_location) {
        for (const location of near_location) {
          const propertyNearLocation = this.nearLocationRepository.create({
            locationName: location.location_name,
            description: location.description,
            distance: location.distance,
            property: properties,
          });
          await this.nearLocationRepository.save(propertyNearLocation);
        }
      }

      return properties;
    } catch (error) {
      throw new BadRequestException(`Fail to create property error:${error}`);
    }
  }

  async uploadS3(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: `poc/images/${String(name)}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      throw new BadRequestException(`Fail to uploadS3 error:${error}`);
    }
  }

  async listProperties(
    options: IPaginateOptions,
    queryFilterProperty: QueryFilterProperty,
  ): Promise<IPaginationMeta<Property>> {
    const propertyBuilder =
      await this.propertyRepository.createQueryBuilder('property');

    if (queryFilterProperty.user_id) {
      propertyBuilder.andWhere('property.userId = :userId', {
        userId: queryFilterProperty.user_id,
      });
    }

    if (queryFilterProperty.property_completion_status) {
      propertyBuilder.andWhere(
        'property.propertyConstructStatus = :propertyConstructStatus',
        {
          propertyConstructStatus:
            queryFilterProperty.property_completion_status,
        },
      );
    }

    if (queryFilterProperty.property_type) {
      propertyBuilder.andWhere('property.type = :type', {
        type: queryFilterProperty.property_type,
      });
    }

    if (queryFilterProperty.property_status) {
      propertyBuilder.andWhere('property.status = :status', {
        status: queryFilterProperty.property_status,
      });
    }

    return paginate<Property>(propertyBuilder, options);
  }

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!property) {
      throw new Error('property not found');
    }
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
    files: Array<Express.Multer.File>,
  ) {
    const {
      company_name,
      issuer_name,
      mobile_number,
      email_address,
      lot_size,
      interior_size,
      property_name,
      user_id,
      expect_income,
      underlying_asset,
      financial,
      total_raise,
      start_presale,
      end_presale,
      total_supply,
      total_investment,
      link_doc,
      detail,
      location_link,
      near_location,
      onchain_id,
      note,
      address_property,
      city,
      country,
      property_type,
      property_completion_status,
      token_price,
      property_features,
      token_id,
    } = updatePropertyDto;

    try {
      const property = await this.findOne(id);
      if (!property) {
        throw new Error('property not found');
      }

      if (financial) {
        await this.financialRepository
          .createQueryBuilder()
          .where('id = :id', { id: financial.id })
          .update()
          .set({
            grossRentPerYear: financial.gross_rent_per_year,
            grossRentPerMonth: financial.gross_rent_per_month,
            monthlyCosts: financial.monthly_costs,
            netRentPerYear: financial.net_rent_per_year,
            netRentPerMonth: financial.net_rent_per_month,
            totalPrice: financial.total_price,
            expectedIncome: financial.expected_income,
          })
          .execute();
      }

      if (token_id) {
        const token = await this.tokenRepository.findOne({
          where: {
            id: token_id,
          },
        });
        if (!token) {
          throw new Error(`can not update property whit token id ${token_id}`);
        }
        await this.propertyRepository
          .createQueryBuilder()
          .update()
          .set({ token: token })
          .execute();
      }

      if (property_features) {
        for (const feature of property_features) {
          await this.propertyFeatureRepository
            .createQueryBuilder('property_feature')
            .where('propertyId = :id', { id: id })
            .andWhere('id = :ids', { ids: feature.id })
            .update()
            .set({ key: feature.key, value: feature.value, unit: feature.unit })
            .execute();
        }
      }

      if (near_location) {
        for (const location of near_location) {
          await this.nearLocationRepository
            .createQueryBuilder()
            .where('propertyId = :id', { id: id })
            .andWhere('id = :ids', { ids: location.id })
            .update()
            .set({
              locationName: location.location_name,
              description: location.description,
              distance: location.distance,
            })
            .execute();
        }
      }

      const filedImg: any = [];

      if (files.length) {
        for (const file of files) {
          const { originalname } = file;

          const responseFile = await this.uploadS3(
            file.buffer,
            process.env.AWS_S3_BUCKET_NAME,
            originalname,
            file.mimetype,
          );
          await filedImg.push(responseFile.Location);
        }
      }

      let startDate;
      let endDate;

      if (start_presale) {
        startDate = new Date(Number(start_presale) * 1000);
      }

      if (end_presale) {
        endDate = new Date(Number(end_presale) * 1000);
      }
      await this.propertyRepository
        .createQueryBuilder()
        .update()
        .set({
          companyName: company_name,
          issuerName: issuer_name,
          mobileNumber: mobile_number,
          emailAddress: email_address,
          lotSize: lot_size,
          interiorSize: interior_size,
          expectIncome: expect_income,
          propertyName: property_name,
          userId: user_id,
          img: files.length ? filedImg : property.img,
          underlyingAsset: underlying_asset,
          totalRaise: total_raise,
          totalInvestment: total_investment,
          startPresale: startDate,
          endPresale: endDate,
          totalSupply: total_supply,
          linkDoc: link_doc,
          detail: detail,
          locationLink: location_link,
          onchainId: onchain_id,
          note: note,
          addressProperty: address_property,
          city: city,
          country: country,
          propertyType: property_type,
          propertyCompletion: property_completion_status,
          tokenPrice: token_price,
        })
        .where('id = :id', { id })
        .execute();

      return property;
    } catch (error) {
      throw new BadRequestException(`Fail to update Property error:${error}`);
    }
  }

  async updateStatusProperty(id: number, status: string) {
    try {
      const property = await this.propertyRepository.findOne({ where: { id } });
      if (!property) {
        throw new Error('property not found');
      }

      if (status === PropertyStatus.DEPLOYED) {
        await this.propertyRepository
          .createQueryBuilder()
          .update()
          .set({
            status: PropertyStatus.DEPLOYED,
          })
          .where('id = :id', { id })
          .execute();
      } else if (status === PropertyStatus.REFUND) {
        await this.propertyRepository
          .createQueryBuilder()
          .update()
          .set({
            status: PropertyStatus.REFUND,
          })
          .where('id = :id', { id })
          .execute();
      } else if (status === PropertyStatus.SUCCESS) {
        await this.propertyRepository
          .createQueryBuilder()
          .update()
          .set({
            status: PropertyStatus.SUCCESS,
          })
          .where('id = :id', { id })
          .execute();
      } else if (status === PropertyStatus.WAITING) {
        await this.propertyRepository
          .createQueryBuilder()
          .update()
          .set({
            status: PropertyStatus.WAITING,
          })
          .where('id = :id', { id })
          .execute();
      }
      return property;
    } catch (error) {
      throw new BadRequestException(
        `Fail to update Property status error:${error}`,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  async getContract() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const signer = wallet.connect(provider);
    return new ethers.Contract(
      process.env.CONTRACT_XTATUZ_ADDRESS,
      abiXtatuz,
      signer,
    );
  }

  async getEventLog(ownerAddress: string) {
    const contract = await this.getContract();

    return new Promise(async (resolve, reject) => {
      const filter = contract.filters.CreateProjectSuccess(
        null,
        null,
        null,
        null,
      );

      await contract.on(filter, (txEvent: ContractEventPayload) => {
        const log: EventLog = txEvent.log;
        const [_projectId, _ownerAddress, _propertyAddress, _tokenAddress] =
          log.args;
        if (String(_ownerAddress).toLowerCase() == ownerAddress.toLowerCase()) {
          resolve(txEvent.log);
        }
      });
    });
  }

  async getHistoryEvent(
    ownerAddress: string,
    fromBlock: number,
    toBlock: number,
  ) {
    const token = await this.getContract();
    const filter = token.filters.CreateProjectSuccess(
      null,
      ownerAddress,
      null,
      null,
    );
    await token
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        res;
      });
  }

  async getEventLogBooking(ownerAddress: string) {
    const contract = await this.getContract();

    return new Promise(async (resolve, reject) => {
      const filter = contract.filters.BookingSuccess(null, null, null);
      await contract.on(filter, (txEvent: ContractEventPayload) => {
        const log: EventLog = txEvent.log;
        const [projectId, sender, bookingTotalPrice] = log.args;
        if (sender == ownerAddress) {
          resolve(txEvent.log);
        }
      });
    });
  }

  async getHistoryEventBooking(
    ownerAddress: string,
    fromBlock: number,
    toBlock: number,
  ) {
    const contract = await this.getContract();
    const filter = contract.filters.BookingSuccess(null, null, null);
    await contract
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        res;
      });
  }

  async getEventLogClaim(ownerAddress: string) {
    const contract = await this.getContract();

    return new Promise(async (resolve, reject) => {
      const filter = contract.filters.Claim(null, null, null);

      await contract.on(filter, (txEvent: ContractEventPayload) => {
        const log: EventLog = txEvent.log;
        const [isOwner, sender, tokenAddress, amount] = log.args;
        if (sender == ownerAddress) {
          resolve(txEvent.log);
        }
      });
    });
  }

  async getHistoryEventClaim(
    ownerAddress: string,
    fromBlock: number,
    toBlock: number,
  ) {
    const contract = await this.getContract();
    const filter = contract.filters.Claim(null, null, null);
    await contract
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        res;
      });
  }

  async getEventLogRefund(ownerAddress: string) {
    const contract = await this.getContract();

    return new Promise(async (resolve, reject) => {
      const filter = contract.filters.Refund(null, null, null);

      await contract.on(filter, (txEvent: ContractEventPayload) => {
        const log: EventLog = txEvent.log;
        const [sender, projectId, amount] = log.args;
        if (sender == ownerAddress) {
          resolve(txEvent.log);
        }
      });
    });
  }

  async getHistoryEventRefund(
    ownerAddress: string,
    fromBlock: number,
    toBlock: number,
  ) {
    const contract = await this.getContract();
    const filter = contract.filters.Refund(null, null, null);
    await contract
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        res;
      });
  }

  async deployProperty(id: number, walletAddress: string) {
    try {
      const property = await this.propertyRepository.findOne({
        where: {
          id: id,
        },
        relations: ['token'],
      });
      if (!property) {
        throw new NotFoundException('property not found');
      }
      if (property.status !== PropertyStatus.WAITING) {
        throw new BadRequestException(`This Property Deployed!`);
      }

      const contract = await this.getContract();
      const dateStartPresale = dateToTimestamp(property.startPresale);
      const dateEndPresale = dateToTimestamp(property.endPresale);

      const tokenProperty = await this.tokenRepository.findOne({
        where: {
          id: property.token.id,
        },
      });

      const startDateTime = dayjs(property.startPresale);
      const currentDateTime = dayjs();

      if (startDateTime.isBefore(currentDateTime)) {
        throw new BadRequestException(`Invalid Start Presale!`);
      }

      const [resultCreate, resultEventLog]: any = await Promise.all([
        await contract.createProject(
          [
            property.propertyName,
            dateStartPresale,
            dateEndPresale,
            amount(`${property.tokenPrice}`, property.token.decimal),
            amount(`${property.totalRaise}`, property.token.decimal),
          ],
          [tokenProperty.name, tokenProperty.symbol],
          walletAddress,
        ),
        await this.getEventLog(walletAddress),
      ]);

      await this.propertyRepository
        .createQueryBuilder()
        .update()
        .where('id = :id', { id })
        .set({
          blockNumber: `${resultEventLog.blockNumber}`,
          contractId: `${Number(resultEventLog.args[0])}`,
        })
        .execute();

      const response = await this.updateStatusProperty(
        id,
        PropertyStatus.DEPLOYED,
      );

      return { data: response };
    } catch (error) {
      throw new BadRequestException(`Fail to Deploy Property error:${error}`);
    }
  }
}
