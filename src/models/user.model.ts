import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: keyof typeof Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
