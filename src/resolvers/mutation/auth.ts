import bcrypt from "bcrypt";

import { jwtHelper } from "../../utils/jwtHelpers";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const authResolvers = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (isExist) {
      return {
        userError: "User already exists",
        token: "null",
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const user = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: user.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secret as string
    );
    return {
      token,
      userError: "null",
    };
  },
  signin: async (parent: any, args: userInfo, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      return {
        userError: "No user found",
        token: "null",
      };
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return {
        userError: "Invalid password",
        token: "null",
      };
    }
    const token = jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secret as string
    );
    return {
      userError: "null",
      token,
    };
  },
};
