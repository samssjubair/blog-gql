export const typeDefs = `#graphql

  type Query {
    me: User
    users: [User]
    posts: [Post]
    profile(userId: ID!): Profile
    
  }

  type Mutation{
    signup(name: String!, email: String!, password: String!, bio: String): AuthPayload
    signin(email: String!, password: String!): AuthPayload
    addPost(title: String!, content: String!, published: Boolean): PostPayload
    updatePost(postId: ID!, post: PostInput!): PostPayload,
    deletePost(postId: ID!): PostPayload,
    publishPost(postId: ID!): PostPayload,
  }

  

 type Post{
    id: ID!
    title: String!
    content: String!
    author: User
    createdAt: String!
    published: Boolean!
 }

 type User{
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
 }

 type Profile{
    id: ID!
    bio: String!
    user: User!
    createdAt: String!
 }

 type PostPayload{
      userError: String
      post: Post
  }


   type AuthPayload{ 
      userError: String
      token: String!
   }

   input PostInput {
        title: String
        content: String
    }

  
`;
