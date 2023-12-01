import { Profile } from './Query/profile';
import { User } from './Query/user';
import { Post } from './Query/post';

import { Mutation } from "./mutation/Mutation";
import { Query } from "./Query/Query"; 


export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
