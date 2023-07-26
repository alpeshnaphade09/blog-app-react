import { privateAxios } from "./Helper";

export const createPost = (postData) => {
  return privateAxios
    .post(
      `/post/user/${postData.userId}/category/${postData.categoryId}`,
      postData
    )
    .then((response) => response.data);
};
