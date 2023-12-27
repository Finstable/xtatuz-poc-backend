import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyFeatureService } from './property-feature.service';
import { CreatePropertyFeatureDto } from './dto/create-property-feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property-feature.dto';

@Controller('property-feature')
export class PropertyFeatureController {
  constructor(private readonly propertyFeatureService: PropertyFeatureService) {}

  @Post()
  create(@Body() createPropertyFeatureDto: CreatePropertyFeatureDto) {
    return this.propertyFeatureService.create(createPropertyFeatureDto);
  }

  @Get()
  findAll() {
    return this.propertyFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyFeatureDto: UpdatePropertyFeatureDto) {
    return this.propertyFeatureService.update(+id, updatePropertyFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyFeatureService.remove(+id);
  }
}
