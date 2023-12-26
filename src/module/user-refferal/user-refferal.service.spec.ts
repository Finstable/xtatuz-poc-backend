import { Test, TestingModule } from '@nestjs/testing';
import { UserRefferalService } from './user-refferal.service';

describe('UserRefferalService', () => {
  let service: UserRefferalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRefferalService],
    }).compile();

    service = module.get<UserRefferalService>(UserRefferalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
