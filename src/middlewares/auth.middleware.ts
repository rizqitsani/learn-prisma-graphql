import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import Container from 'typedi';

import config from '@/config';
import { Context } from '@/interfaces/context';
import { Role } from '@/models/user.model';
import UserService from '@/services/user.service';

export const customAuthChecker: AuthChecker<
  Context,
  keyof typeof Role
> = async ({ context }, roles) => {
  const userServiceInstance = Container.get(UserService);

  const token = context.req.cookies['access_token'];

  if (!token) {
    return false;
  }

  const decoded = <{ id: string }>verify(token, config.jwtSecret as string);
  const user = await userServiceInstance.findById(decoded.id);

  if (!user) {
    return false;
  }

  if (roles.length !== 0 && !roles.includes(user.role)) {
    return false;
  }

  context.req.user = user;

  return true;
};
