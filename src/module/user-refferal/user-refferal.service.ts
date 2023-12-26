import { Injectable } from '@nestjs/common';
import { CreateUserRefferalDto } from './dto/create-user-refferal.dto';
import { UpdateUserRefferalDto } from './dto/update-user-refferal.dto';

@Injectable()
export class UserRefferalService {
  create(createUserRefferalDto: CreateUserRefferalDto) {
    return 'This action adds a new userRefferal';
  }

  findAll() {
    return `This action returns all userRefferal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRefferal`;
  }

  update(id: number, updateUserRefferalDto: UpdateUserRefferalDto) {
    return `This action updates a #${id} userRefferal`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRefferal`;
  }
}
