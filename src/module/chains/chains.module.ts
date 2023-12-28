import { Module } from '@nestjs/common';
import { ChainsService } from './chains.service';
import { ChainsController } from './chains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chain } from './entities/chain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chain])],
  controllers: [ChainsController],
  providers: [ChainsService],
})
export class ChainsModule {}
