import { postResolvers } from './post';
import { authResolvers } from './auth';
import bcrypt from "bcrypt";

import { jwtHelper } from "../../utils/jwtHelpers";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  ...authResolvers,
  ...postResolvers
  
};
