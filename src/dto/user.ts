import { Field, InputType } from 'type-graphql';

import { User } from '@/models/user.model';

@InputType()
export class UserRegisterDto implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
