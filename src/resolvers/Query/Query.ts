

export const Query = {
  me: async (parent: any, args: any, {prisma, userInfo}: any) => {
    if (!userInfo) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
    // console.log(user);
    return user;
  },
  profile: async (parent: any, args: any, {prisma}: any) => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
    return profile;
  },
  users: async (parent: any, args: any, {prisma}: any) => {
    const users = await prisma.user.findMany();
    return users;
  },
  posts: async (parent: any, args: any, {prisma}: any) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        }
      ]
    });
    return posts;
  },
};