import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { UserRegisterDto } from '@/dto/user';
import { User } from '@/models/user.model';
import AuthService from '@/services/auth.service';

@Service()
@Resolver()
export default class AuthResolver {
  constructor(@Inject() private authService: AuthService) {}

  @Mutation(() => User)
  async register(@Arg('data') userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this.authService.register(userRegisterDto);

    return user;
  }
}
