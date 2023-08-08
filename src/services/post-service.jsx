import { myAxios, privateAxios } from "./Helper";

export const createPost = (postData) => {
  return privateAxios
    .post(
      `/post/user/${postData.userId}/category/${postData.categoryId}`,
      postData
    )
    .then((response) => response.data);
};

// load all posts from db
export const loadAllPosts = (pageNumber,pageSize) => {
  return myAxios.get(`/post/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data)
}

// load single post from db
export const loadPost = (postId) => {
  return myAxios.get("/post/" + postId).then(response => response.data);
}

export const createComment = (comment, postId) => {
  return privateAxios.post(`/comment/${postId}`, comment)
}