import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnlineUserEntity } from './onlineuser.entity';
import { OnlineUserI } from './onlineuser.interface';
import { UserI } from '../user/user.interface';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

//.where('user.id = :userId', {userId})
@Injectable()
export class OnlineUserService {

  constructor(
    @InjectRepository(OnlineUserEntity)
    private readonly OnlineUserRepository: Repository<OnlineUserEntity>
  ) {}

  async create(onlineUser: OnlineUserI): Promise<OnlineUserI> {
    return this.OnlineUserRepository.save(onlineUser);
  }

  async findByUser(user: User): Promise<OnlineUserI[]> {
    // return this.OnlineUserRepository.find(where: { user });
    // return this.OnlineUserRepository.find(where: { user });
    return this.OnlineUserRepository.find({
      where: {
        user: user
      }
    });
  }

  async updateSocketIdByUser(user: User, socketId: string): Promise<void> {
    const onlineUser = await this.OnlineUserRepository.findOne({ where: { user } });
    if (onlineUser) {
      onlineUser.socketId = socketId;
      await this.OnlineUserRepository.save(onlineUser);
    }
  }

  async deleteBySocketId(socketId: string) {
    return this.OnlineUserRepository.delete({socketId});
  }

  async deleteAll() {
    await this.OnlineUserRepository
      .createQueryBuilder()
      .delete()
      .execute();
  }

}