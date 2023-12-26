import { Test, TestingModule } from '@nestjs/testing';
import { UserRefferalController } from './user-refferal.controller';
import { UserRefferalService } from './user-refferal.service';

describe('UserRefferalController', () => {
  let controller: UserRefferalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRefferalController],
      providers: [UserRefferalService],
    }).compile();

    controller = module.get<UserRefferalController>(UserRefferalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
