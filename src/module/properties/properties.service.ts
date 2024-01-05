import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto, UpdateStatusDTO } from './dto/update-property.dto';
import { ContractEventPayload, EventLog, Log, ethers } from 'ethers';
import { erc20 } from 'src/constants/erc20';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertyStatus } from 'src/shared/enum/types';
import { Financial } from './entities/financial.entity';
import { NearLocation } from './entities/near_location.entity';
import { Token } from '../token/entities/token.entity';
import { PropertyFeature } from '../property-feature/entities/property-feature.entity';

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
  async create(createPropertyDto: CreatePropertyDto) {
    const {
      property_name,
      user_id,
      img,
      issuer,
      underlying_asset,
      financial,
      total_raise,
      start_presale,
      total_supply,
      link_doc,
      detail,
      longitude,
      latitude,
      location_name,
      near_location,
      onchain_id,
      note,
      address_property,
      city,
      country,
      token_price,
      property_features,
      token_address,
    } = createPropertyDto;
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

    // console.log(propertyFinancial.id, 'propertyFinancial');
    const token = await this.tokenRepository.findOne({
      where: {
        tokenAddress: token_address,
      },
    });

    if (!token) {
      throw new Error(
        `can not create property whit token Address ${token_address}`,
      );
    }

    const createProperty = this.propertyRepository.create({
      propertyName: property_name,
      userId: user_id,
      img: img,
      issuer: issuer,
      underlyingAsset: underlying_asset,
      financial: propertyFinancial,
      status: PropertyStatus.WAITING,
      totalRaise: total_raise,
      startPresale: start_presale,
      totalSupply: total_supply,
      linkDoc: link_doc,
      detail: detail,
      latitude: latitude,
      longitude: longitude,
      locationName: location_name,
      onchainId: onchain_id,
      note: note,
      addressProperty: address_property,
      city: city,
      country: country,
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
  }

  findAll() {
    return `This action returns all properties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const {
      property_name,
      user_id,
      img,
      issuer,
      underlying_asset,
      financial,
      total_raise,
      start_presale,
      total_supply,
      link_doc,
      detail,
      longitude,
      latitude,
      location_name,
      near_location,
      onchain_id,
      note,
      address_property,
      city,
      country,
      token_price,
      property_features,
      token_address,
    } = updatePropertyDto;

    const property = await this.propertyRepository.find({ where: { id } });
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

    if (token_address) {
      const token = await this.tokenRepository.findOne({
        where: {
          tokenAddress: token_address,
        },
      });
      if (!token) {
        throw new Error(
          `can not update property whit token Address ${token_address}`,
        );
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
          .where('property_id = :id', { id: id })
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
          .where('property_id = :id', { id: id })
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

    await this.propertyRepository
      .createQueryBuilder()
      .update()
      .set({
        propertyName: property_name,
        userId: user_id,
        img: img,
        issuer: issuer,
        underlyingAsset: underlying_asset,
        totalRaise: total_raise,
        startPresale: start_presale,
        totalSupply: total_supply,
        linkDoc: link_doc,
        detail: detail,
        latitude: latitude,
        longitude: longitude,
        locationName: location_name,
        onchainId: onchain_id,
        note: note,
        addressProperty: address_property,
        city: city,
        country: country,
        tokenPrice: token_price,
      })
      .where('id = :id', { id })
      .execute();

    return `This action updates a #${id} property`;
  }

  async updateStatusProperty(id: number, status: UpdateStatusDTO) {
    const data = { status };
    const property = await this.propertyRepository.find({ where: { id } });
    if (!property) {
      throw new Error('property not found');
    }

    if (data.status.status === PropertyStatus.DEPLOYED) {
      await this.propertyRepository
        .createQueryBuilder()
        .update()
        .set({
          status: PropertyStatus.DEPLOYED,
        })
        .where('id = :id', { id })
        .execute();
    } else if (data.status.status === PropertyStatus.REFUND) {
      await this.propertyRepository
        .createQueryBuilder()
        .update()
        .set({
          status: PropertyStatus.REFUND,
        })
        .where('id = :id', { id })
        .execute();
    } else if (data.status.status === PropertyStatus.SUCCESS) {
      await this.propertyRepository
        .createQueryBuilder()
        .update()
        .set({
          status: PropertyStatus.SUCCESS,
        })
        .where('id = :id', { id })
        .execute();
    } else if (data.status.status === PropertyStatus.WAITING) {
      await this.propertyRepository
        .createQueryBuilder()
        .update()
        .set({
          status: PropertyStatus.WAITING,
        })
        .where('id = :id', { id })
        .execute();
    }
    return {
      message: `Property status is ${data.status.status}, update success!`,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  async getEventLog(merchantAddress: string) {
    const provider = new ethers.JsonRpcProvider(process.env.API_RPC_PROVIDER);

    const wallet = new ethers.Wallet(process.env.API_PRIVATE_KEY);
    const signer = wallet.connect(provider);
    const token = new ethers.Contract(
      process.env.API_CONTRACT_ADDRESS,
      erc20,
      signer,
    );

    return new Promise(async (resolve, reject) => {
      //to do filter by ownerAddress
      const filter = await token.filters.CreateProjectSuccess(
        null,
        null,
        null,
        null,
      );

      await token.on(filter, (txEvent: ContractEventPayload) => {
        console.log('into token.on');
        const log: EventLog = txEvent.log;
        console.log('argument', log.args);
        const [_projectId, _ownerAddress, _propertyAddress, _tokenAddress] =
          log.args;
        console.log(
          `id: ${_projectId}`,
          `from: ${_ownerAddress}, propertyAddress: ${_propertyAddress}, tokenAddress: ${_tokenAddress}`,
        );
        if (_ownerAddress == merchantAddress) {
          resolve(txEvent.log);
        }
      });
    });
  }

  async getHistoryEvent(
    merchantAddress: string,
    fromBlock: number,
    toBlock: number,
  ) {
    const provider = new ethers.JsonRpcProvider(process.env.API_RPC_PROVIDER);

    const wallet = new ethers.Wallet(process.env.API_PRIVATE_KEY);
    const signer = wallet.connect(provider);
    const token = new ethers.Contract(
      process.env.API_CONTRACT_ADDRESS,
      erc20,
      signer,
    );
    const filter = token.filters.CreateProjectSuccess(null, null, null, null);
    await token
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        console.log('res ::: ', res);
      });
  }
}
