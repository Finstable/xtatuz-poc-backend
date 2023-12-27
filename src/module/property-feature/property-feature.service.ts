import { Injectable } from '@nestjs/common';
import { CreatePropertyFeatureDto } from './dto/create-property-feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property-feature.dto';

@Injectable()
export class PropertyFeatureService {
  create(createPropertyFeatureDto: CreatePropertyFeatureDto) {
    return 'This action adds a new propertyFeature';
  }

  findAll() {
    return `This action returns all propertyFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyFeature`;
  }

  update(id: number, updatePropertyFeatureDto: UpdatePropertyFeatureDto) {
    return `This action updates a #${id} propertyFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyFeature`;
  }
}
