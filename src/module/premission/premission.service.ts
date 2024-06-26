import { Injectable } from '@nestjs/common';
import { CreatePremissionDto } from './dto/create-premission.dto';
import { UpdatePremissionDto } from './dto/update-premission.dto';

@Injectable()
export class PremissionService {
  create(createPremissionDto: CreatePremissionDto) {
    return 'This action adds a new premission';
  }

  findAll() {
    return `This action returns all premission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} premission`;
  }

  update(id: number, updatePremissionDto: UpdatePremissionDto) {
    return `This action updates a #${id} premission`;
  }

  remove(id: number) {
    return `This action removes a #${id} premission`;
  }
}
