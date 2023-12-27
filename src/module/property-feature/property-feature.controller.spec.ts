import { Test, TestingModule } from '@nestjs/testing';
import { PropertyFeatureController } from './property-feature.controller';
import { PropertyFeatureService } from './property-feature.service';

describe('PropertyFeatureController', () => {
  let controller: PropertyFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyFeatureController],
      providers: [PropertyFeatureService],
    }).compile();

    controller = module.get<PropertyFeatureController>(PropertyFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
