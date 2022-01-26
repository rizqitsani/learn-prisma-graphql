import { Query, Resolver } from 'type-graphql';

@Resolver()
export default class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, world!';
  }
}
