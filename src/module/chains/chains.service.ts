import { Injectable } from '@nestjs/common';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainDto } from './dto/update-chain.dto';
import { Chain } from './entities/chain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFilterChains } from './dto/query-chain.dto';
import {
  IPaginateOptions,
  IPaginationMeta,
  paginate,
} from 'src/shared/utils/pagination';

@Injectable()
export class ChainsService {
  constructor(
    @InjectRepository(Chain)
    private chainRepo: Repository<Chain>,
  ) {}

  create(createChainDto: CreateChainDto) {
    return 'This action adds a new chain';
  }

  async listChain(
    options: IPaginateOptions,
    queryFilterChain: QueryFilterChains,
  ): Promise<IPaginationMeta<Chain>> {
    const chainsBuilder = await this.chainRepo
      .createQueryBuilder('chains')
      .leftJoinAndSelect('chains.token', 'token.id');

    if (queryFilterChain.id) {
      chainsBuilder.andWhere('chains.id = :id', {
        id: queryFilterChain.id,
      });
    }

    if (queryFilterChain.chain_id) {
      chainsBuilder.andWhere('chains.chainId = :chainId', {
        chainId: queryFilterChain.chain_id,
      });
    }

    return paginate<Chain>(chainsBuilder, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} chain`;
  }

  update(id: number, updateChainDto: UpdateChainDto) {
    return `This action updates a #${id} chain`;
  }

  remove(id: number) {
    return `This action removes a #${id} chain`;
  }

  async findOneByChainId(id: number) {
    const chainRepository = this.chainRepo.manager.getRepository(Chain);
    const chains = await chainRepository.find({
      where: { chainId: `${id}` },
      relations: {
        token: true,
      },
    });
    return chains;
  }
}
