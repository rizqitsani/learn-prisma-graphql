import { Field, InputType } from 'type-graphql';

import { Role, User } from '@/models/user.model';

@InputType()
export class UserRegisterDto implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role, { nullable: true })
  role?: keyof typeof Role;
}

@InputType()
export class UserLoginDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
