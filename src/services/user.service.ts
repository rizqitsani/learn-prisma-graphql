import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Service } from 'typedi';

import { UserRegisterDto } from '@/dto/user';
@Service()
export default class UserService {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(userRegisterDto: UserRegisterDto) {
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

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
