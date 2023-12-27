import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { walletAddress } = createUserDto;
    try {
      //profile
      const profile = this.profileRepo.create();
      profile.userName = walletAddress.toLocaleLowerCase();
      profile.email = null;
      const profileCreate = await this.profileRepo.save(profile);

      if (profileCreate) {
        //user
        const user = this.userRepo.create();
        user.walletAddress = walletAddress.toLowerCase();
        user.profile = profileCreate;

        //to do add role
        user.role = [];

        return await this.userRepo.save(user);
      }
    } catch (error) {
      throw new BadRequestException(`Fail to create user error:${error}`);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByAddress(address: string) {
    const user = await this.userRepo.findOne({
      where: { walletAddress: address.toLocaleLowerCase() },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
