import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';

import config from '@/config';
import { customAuthChecker } from '@/middlewares/auth.middleware';
import AuthResolver from '@/resolvers/auth.resolver';
import HelloResolver from '@/resolvers/hello.resolver';

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, HelloResolver],
    container: Container,
    authChecker: customAuthChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port} (${config.env})`);
  });
};

startServer();
