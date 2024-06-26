import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Financial } from './entities/financial.entity';
import { NearLocation } from './entities/near_location.entity';
import { Token } from '../token/entities/token.entity';
import { PropertyFeature } from '../property-feature/entities/property-feature.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      PropertyFeature,
      Financial,
      NearLocation,
      Token,
    ]),
    JwtModule.register({}),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, JwtService],
})
export class PropertiesModule {}
