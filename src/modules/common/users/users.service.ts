import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<User>;
  constructor(
    @Inject('COMMON_CONNECTION')
    connection,
  ) {
    this.usersRepository = connection.getRepository(User);
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(createdUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.softDelete(id);
  }
}
