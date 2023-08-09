import React, { useState } from "react";
import { useEffect } from "react";
import { loadAllPosts } from "../services/post-service";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import { deleteThePost } from "../services/post-service";

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    loadAllPosts(0, 5)
      .then((data) => {
        console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading post");
      });
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {

    if(pageNumber > postContent.pageNumber && postContent.lastPage){
        return;
    }
    if(pageNumber < postContent.pageNumber && postContent.pageNumber == 0){
        return;
    }

    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
        window.scroll(0,0)
      })
      .catch((error) => {
        toast.error("error in loading post");
      });
  };


  // function to delete post 
  function deletePost(post){
    // going to delete post
    deleteThePost(post.id).then(res => {
      console.log(res);
      toast.success("post deleted successfully")

      let newPostContents = postContent.content.filter(p => p.postId != post.postId)
      setPostContent({...postContent, content:newPostContents})
    })
    .catch(error=>{
      console.log(error)
      toast.error("error in deleting post")
    })
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
          }}
        >
          <h1>Blogs Count {postContent?.totalElements}</h1>

          {postContent.content.map((post) => (
            <Post deletePost={deletePost} post={post} key={post.id} />
          ))}

          <Container className="mt-3">
            <Pagination size="lg">

              <PaginationItem onClick={()=> changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber == 0}>
                <PaginationLink previous>Prev</PaginationLink>
              </PaginationItem>

              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                onClick={()=> changePage(index)}
                  active={index == postContent.pageNumber}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem onClick={()=> changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                <PaginationLink next>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
