import { Field, InputType } from 'type-graphql';

import { User } from '@/models/user.model';

@InputType()
export class UpdateUserDto implements Partial<User> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
