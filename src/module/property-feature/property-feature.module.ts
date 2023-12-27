import { Module } from '@nestjs/common';
import { PropertyFeatureService } from './property-feature.service';
import { PropertyFeatureController } from './property-feature.controller';

@Module({
  controllers: [PropertyFeatureController],
  providers: [PropertyFeatureService],
})
export class PropertyFeatureModule {}
