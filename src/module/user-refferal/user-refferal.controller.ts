import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRefferalService } from './user-refferal.service';
import { CreateUserRefferalDto } from './dto/create-user-refferal.dto';
import { UpdateUserRefferalDto } from './dto/update-user-refferal.dto';

@Controller('user-refferal')
export class UserRefferalController {
  constructor(private readonly userRefferalService: UserRefferalService) {}

  @Post()
  create(@Body() createUserRefferalDto: CreateUserRefferalDto) {
    return this.userRefferalService.create(createUserRefferalDto);
  }

  @Get()
  findAll() {
    return this.userRefferalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRefferalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRefferalDto: UpdateUserRefferalDto) {
    return this.userRefferalService.update(+id, updateUserRefferalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRefferalService.remove(+id);
  }
}
