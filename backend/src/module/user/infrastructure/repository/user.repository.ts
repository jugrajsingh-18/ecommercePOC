import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserEntity } from '../entity/user.entity';
import { ILike, Repository } from 'typeorm';
import { AdminQueryUserDto } from '../../dto/adminPagination.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }
  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async create(username: string, email: string, role: Role, hashPass: string) {
    return await this.userRepository.create({
      username: username,
      email: email,
      password: hashPass,
      role: role,
    });
  }

  async save(user: UserEntity) {
    return await this.userRepository.save(user);
  }

async findAndCount(query: AdminQueryUserDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const search = query.search;
    const sortBy = query.sortBy || 'createdAt';
    const order = query.order || 'DESC';

    const [data, total] = await this.userRepository.findAndCount({
      where: search
        ? [{ username: ILike(`%${search}%`) }, { email: ILike(`%${search}%`) }]
        : {},
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      order: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
