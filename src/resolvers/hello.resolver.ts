import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export default class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, world!';
  }
}
