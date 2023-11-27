import { PrismaClient } from "@prisma/client";
import { Mutation } from "./mutation/Mutation";
import { Query } from "./Query/Query"; 

const prisma = new PrismaClient();

export const resolvers = {
  Query,
  Mutation
};
