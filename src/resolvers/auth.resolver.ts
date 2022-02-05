import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import config from '@/config';
import { UserLoginDto, UserRegisterDto } from '@/dto/user';
import { Context } from '@/interfaces/context';
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

  @Mutation(() => Boolean)
  async login(
    @Arg('data') userLoginDto: UserLoginDto,
    @Ctx() { res }: Context,
  ): Promise<boolean> {
    const token = await this.authService.login(userLoginDto);

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: parseInt(config.jwtExpire + '', 10) * 1000,
    });

    return true;
  }

  @Query(() => User)
  @Authorized()
  async me(@Ctx() { req }: Context): Promise<User> {
    return req.user;
  }
}
