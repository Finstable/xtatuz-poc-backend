import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesModule } from './module/properties/properties.module';
import { ProfileModule } from './module/profile/profile.module';
import { SellerModule } from './module/seller/seller.module';
import { RoleModule } from './module/role/role.module';
import { PremissionModule } from './module/premission/premission.module';
import { TokenModule } from './module/token/token.module';
import { MemberModule } from './module/member/member.module';
import { PropertyFeatureModule } from './module/property-feature/property-feature.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database') || {},
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    UsersModule,
    PropertiesModule,
    ProfileModule,
    SellerModule,
    RoleModule,
    PremissionModule,
    TokenModule,
    MemberModule,
    PropertyFeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
