import { Injectable } from '@nestjs/common';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainDto } from './dto/update-chain.dto';
import { Chain } from './entities/chain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChainsService {
  constructor(
    @InjectRepository(Chain)
    private chainRepo: Repository<Chain>,
  ) {}

  create(createChainDto: CreateChainDto) {
    return 'This action adds a new chain';
  }

  findAll() {
    const chains = this.chainRepo.findAndCount();
    return chains;
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
    console.log(chains, 'chains');
    return chains;
  }
}
