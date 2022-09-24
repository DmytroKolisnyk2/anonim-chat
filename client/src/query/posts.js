import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getUsers($orderBy: ProductOrderByInput!, $filter: String, $take: Int, $skip: Int) {
    posts(orderBy: $orderBy, filter: $filter, take: $take, skip: $skip) {
      postList {
        id
        text
        like
        dislike
        replyFrom
        replyText
      }
      count
    }
  }
`;
export const NEW_POST = gql`
  subscription {
    newPost {
      id
      text
      like
      dislike
      replyFrom
      replyText
    }
  }
`;

export const NEW_LIKE = gql`
  subscription {
    newLike {
      id
      text
      like
      dislike
      replyFrom
      replyText
    }
  }
`;
export const NEW_DISLIKE = gql`
  subscription {
    newDislike {
      id
      text
      like
      dislike
      replyFrom
      replyText
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($post: PostInput!) {
    createPost(post: $post) {
      id
    }
  }
`;
export const ADD_DISLIKE = gql`
  mutation addDislike($id: Int) {
    addDislike(id: $id) {
      id
    }
  }
`;
export const ADD_LIKE = gql`
  mutation addLike($id: Int) {
    addLike(id: $id) {
      id
    }
  }
`;
