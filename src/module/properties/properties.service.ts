import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto, UpdateStatusDTO } from './dto/update-property.dto';
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
      type,
      property_construct_status,
      token_price,
      property_features,
      token_id,
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

    const token = await this.tokenRepository.findOne({
      where: {
        id: token_id,
      },
    });

    if (!token) {
      throw new Error(`can not create property whit token id ${token_id}`);
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
      type: type,
      propertyConstructStatus: property_construct_status,
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

    if (queryFilterProperty.property_construct_status) {
      propertyBuilder.andWhere(
        'property.propertyConstructStatus = :propertyConstructStatus',
        {
          propertyConstructStatus:
            queryFilterProperty.property_construct_status,
        },
      );
    }

    if (queryFilterProperty.type) {
      propertyBuilder.andWhere('property.type = :type', {
        type: queryFilterProperty.type,
      });
    }

    if (queryFilterProperty.status) {
      propertyBuilder.andWhere('property.status = :status', {
        status: queryFilterProperty.status,
      });
    }

    return paginate<Property>(propertyBuilder, options);
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
      type,
      property_construct_status,
      token_price,
      property_features,
      token_id,
    } = updatePropertyDto;

    const property = await this.propertyRepository.findOne({
      where: {
        id: id,
      },
    });
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
        type: type,
        propertyConstructStatus: property_construct_status,
        tokenPrice: token_price,
      })
      .where('id = :id', { id })
      .execute();

    return `This action updates a #${id} property`;
  }

  async updateStatusProperty(id: number, status: UpdateStatusDTO) {
    const data = { status };
    const property = await this.propertyRepository.findOne({ where: { id } });
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

  async getTokenContract() {
    const provider = new ethers.JsonRpcProvider(process.env.API_RPC_PROVIDER);

    const wallet = new ethers.Wallet(process.env.API_PRIVATE_KEY);
    const signer = wallet.connect(provider);
    return await new ethers.Contract(
      process.env.API_CONTRACT_ADDRESS,
      abiXtatuz,
      signer,
    );
  }

  async getEventLog(ownerAddress: string) {
    const token = await this.getTokenContract();

    return new Promise(async (resolve, reject) => {
      //to do filter by ownerAddress
      const filter = token.filters.CreateProjectSuccess(null, null, null, null);

      await token.on(filter, (txEvent: ContractEventPayload) => {
        const log: EventLog = txEvent.log;
        const [_projectId, _ownerAddress, _propertyAddress, _tokenAddress] =
          log.args;
        if (_ownerAddress == ownerAddress) {
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
    const token = await this.getTokenContract();
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

  async getEventLogClaim(ownerAddress: string) {
    const token = await this.getTokenContract();

    return new Promise(async (resolve, reject) => {
      const filter = token.filters.Claim(null, null, null);

      await token.on(filter, (txEvent: ContractEventPayload) => {
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
    const token = await this.getTokenContract();
    const filter = token.filters.Claim(null, null, null);
    await token
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        res;
      });
  }

  async getEventLogRefund(ownerAddress: string) {
    const token = await this.getTokenContract();

    return new Promise(async (resolve, reject) => {
      const filter = token.filters.Refund(null, null, null);

      await token.on(filter, (txEvent: ContractEventPayload) => {
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
    const token = await this.getTokenContract();
    const filter = token.filters.Refund(null, null, null);
    await token
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        res;
      });
  }
}
