import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Service } from 'typedi';

import { UserRegisterDto } from '@/dto/auth.dto';
import { UpdateUserDto } from '@/dto/user.dto';
@Service()
export default class UserService {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userRegisterDto: UserRegisterDto) {
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: userRegisterDto.email,
        name: userRegisterDto.name,
        password: hashedPassword,
        role: userRegisterDto?.role,
      },
    });

    return user;
  }

  async delete(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async getAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      data: { ...updateUserDto },
      where: {
        id,
      },
    });

    return user;
  }
}
