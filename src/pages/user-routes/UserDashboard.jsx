import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import { getCurrentUserDetails } from "../../auth";
import { deleteThePost, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post"

const UserDashboard = () => {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    console.log(getCurrentUserDetails());
    setUser(getCurrentUserDetails())
    loadPostData();    
  }, [])

  function loadPostData(){
    loadPostUserWise(getCurrentUserDetails().id).then(data => {
      console.log(data)
      setPosts([...data].reverse())
    })
    .catch(error => {
      console.log(error)
      toast.error("error in loading user posts");
    })
  }

  // function to delete post 
  function deletePost(post){
    // going to delete post
    deleteThePost(post.id).then(res => {
      console.log(res);
      toast.success("post deleted successfully")
      console.log(posts)
      console.log(post)
      let newPosts = posts.filter(p=> p.id != post.id)
      setPosts([...newPosts])
    })
    .catch(error=>{
      console.log(error)
      toast.error("error in deleting post")
    })
  }

  return (
    <Base>
      <Container>
        <AddPost/>
        <h1 className="my-3">posts count ({posts.length})</h1>
        {
          posts.map((post, index) => {
            return (
              <Post post={post} key={index} deletePost={deletePost}/>
            )
          })
        }
      </Container>
    </Base>
  );
};

export default UserDashboard;
