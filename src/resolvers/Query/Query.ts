

export const Query = {
  users: async (parent: any, args: any, {prisma}: any) => {
    const users = await prisma.user.findMany();
    return users;
  },
};