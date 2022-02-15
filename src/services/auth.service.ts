import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import config from '@/config';
import { UserLoginDto, UserRegisterDto } from '@/dto/auth.dto';
import UserService from '@/services/user.service';

@Service()
export default class AuthService {
  constructor(@Inject() private userService: UserService) {}

  async register(userRegisterDto: UserRegisterDto) {
    const isEmailExist = await this.userService.findByEmail(
      userRegisterDto.email,
    );

    if (isEmailExist) {
      throw new Error('Email has been used!');
    }

    const user = await this.userService.create(userRegisterDto);

    return user;
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.findByEmail(userLoginDto.email);

    if (!user) {
      throw new Error('User not found!');
    }

    const isPasswordValid = await compare(userLoginDto.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Wrong credentials!');
    }

    const token = this.createToken(user.id);

    return { token, user };
  }

  createToken(id: string) {
    return sign({ id }, config.jwtSecret as string, {
      expiresIn: parseInt(config.jwtExpire as string, 10),
    });
  }
}
