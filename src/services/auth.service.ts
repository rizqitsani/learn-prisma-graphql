import { Inject, Service } from 'typedi';

import { UserRegisterDto } from '@/dto/user';
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

    const user = await this.userService.createUser(userRegisterDto);

    return user;
  }
}
