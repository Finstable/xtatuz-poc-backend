import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { QueryFilterTokens } from './dto/query-token.dto';
import {
  IPaginateOptions,
  IPaginationMeta,
  paginate,
} from 'src/shared/utils/pagination';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}
  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  async listTokens(
    options: IPaginateOptions,
    queryFilterToken: QueryFilterTokens,
  ): Promise<IPaginationMeta<Token>> {
    const tokensBuilder = await this.tokenRepository
      .createQueryBuilder('token')
      .leftJoinAndSelect('token.chain', 'chain.id');

    if (queryFilterToken.id) {
      tokensBuilder.andWhere('token.id = :id', {
        id: queryFilterToken.id,
      });
    }

    return paginate<Token>(tokensBuilder, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
