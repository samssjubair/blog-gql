import { checkUserAccess } from "../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(userInfo);
    if (!userInfo) {
      return {
        userError: "Not authenticated",
        post: null,
      };
    }
    if (!args.title || !args.content) {
      return {
        userError: "Title and content is required",
        post: null,
      };
    }
    const post = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.userId,
      },
    });
    return {
      userError: "null",
      post,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userInfo: "Not authenticated",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    console.log(args);

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: "null",
      post: updatedPost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userInfo: "Not authenticated",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    console.log(args);

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      }
    });

    return {
      userError: "null",
      post: deletedPost,
    };
  },
};
