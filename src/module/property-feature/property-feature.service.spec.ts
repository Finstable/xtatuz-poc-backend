import { Test, TestingModule } from '@nestjs/testing';
import { PropertyFeatureService } from './property-feature.service';

describe('PropertyFeatureService', () => {
  let service: PropertyFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyFeatureService],
    }).compile();

    service = module.get<PropertyFeatureService>(PropertyFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
