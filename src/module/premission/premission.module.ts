import { Module } from '@nestjs/common';
import { PremissionService } from './premission.service';
import { PremissionController } from './premission.controller';

@Module({
  controllers: [PremissionController],
  providers: [PremissionService],
})
export class PremissionModule {}
