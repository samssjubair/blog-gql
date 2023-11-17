import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      const users = await prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const user = await prisma.user.create({
        data: args,
      });
      return user;
    },
  },
};
