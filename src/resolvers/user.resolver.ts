import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { UpdateUserDto } from '@/dto/user.dto';
import { Context } from '@/interfaces/context';
import { Role, User } from '@/models/user.model';
import UserService from '@/services/user.service';

@Service()
@Resolver()
export default class UserResolver {
  constructor(@Inject() private userService: UserService) {}

  @Query(() => [User])
  @Authorized<keyof typeof Role>('ADMIN')
  async getUsers(): Promise<User[]> {
    const users = await this.userService.getAll();

    return users;
  }

  @Query(() => User)
  @Authorized<keyof typeof Role>('ADMIN')
  async getUser(@Arg('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  @Authorized()
  async updateUser(
    @Arg('data') updateUserDto: UpdateUserDto,
    @Ctx() { req }: Context,
  ): Promise<User> {
    const user = await this.userService.update(req.user.id, updateUserDto);

    return user;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteUser(): Promise<boolean> {
    await this.userService.delete('tes');

    return true;
  }
}
