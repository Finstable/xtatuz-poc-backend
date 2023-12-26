import { Module } from '@nestjs/common';
import { UserRefferalService } from './user-refferal.service';
import { UserRefferalController } from './user-refferal.controller';

@Module({
  controllers: [UserRefferalController],
  providers: [UserRefferalService],
})
export class UserRefferalModule {}
