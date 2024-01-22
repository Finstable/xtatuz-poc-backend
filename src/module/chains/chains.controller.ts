import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ChainsService } from './chains.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainDto } from './dto/update-chain.dto';
import { QueryFilterChains } from './dto/query-chain.dto';
import { IPaginateOptions } from 'src/shared/utils/pagination';

@Controller('chains')
export class ChainsController {
  constructor(private readonly chainsService: ChainsService) {}

  @Post()
  create(@Body() createChainDto: CreateChainDto) {
    return this.chainsService.create(createChainDto);
  }

  @Get('/listChain')
  listChain(@Query() queryChains: QueryFilterChains) {
    const options: IPaginateOptions = {
      page: queryChains.page,
      limit: queryChains.limit,
    };
    return this.chainsService.listChain(options, queryChains);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chainsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChainDto: UpdateChainDto) {
    return this.chainsService.update(+id, updateChainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chainsService.remove(+id);
  }

  //findOneByChainId
  @Get(':id/tokens')
  findOneByChainId(@Param('id') id: string) {
    return this.chainsService.findOneByChainId(+id);
  }
}
