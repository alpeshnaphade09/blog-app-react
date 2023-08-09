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


// upload post banner image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData()
  formData.append("image", image);

  return privateAxios.post(`/post/image/${postId}`, formData, {
    headers:{
        'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data)
}


// get category wise post

export function loadPostCategorWise(categoryId){
  return privateAxios.get(`/post/category/${categoryId}`).then(res => res.data)
}

export function loadPostUserWise(userId) {
  return privateAxios.get(`/post/user/${userId}`).then(res => res.data)
}

// delete post
export function deleteThePost(postId){
  return privateAxios.delete(`/post/${postId}`).then(res => res.data)
}

//update post
export function updatePostService(post, postId){
  console.log(post)
  return privateAxios.put(`/post/${postId}`, post).then(res=> res.data)
}

