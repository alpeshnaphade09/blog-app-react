import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router'
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostCategorWise, deleteThePost } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {

    const [posts, setPosts] = useState([])
    const {categoryId} = useParams();

    useEffect(()=>{
        loadPostCategorWise(categoryId).then(data=>{
            setPosts([...data])
        }).catch(error => {
            console.log(error)
            toast.error("error in loading posts")
        })
    }, [categoryId])



    function deletePost(post){
      // going to delete post
      deleteThePost(post.id).then(res => {
        console.log(res);
        toast.success("post deleted successfully")
        let newPosts = posts.filter(p=> p.postId != post.postId)
        setPosts([...newPosts])
      })
      .catch(error=>{
        console.log(error)
        toast.error("error in deleting post")
      })
    }



  return (
    <Base>
        <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu></CategorySideMenu>
          </Col>
          <Col md={10}>
            <h1>Blogs count ({posts.length})</h1>
            {
                posts && posts.map((post, index) => {
                    return (
                        <Post deletePost={deletePost} key={index} post={post}/>
                    )
                })
            }
            { posts.length <= 0 ? <h1>No posts in this category </h1> : ''}
          </Col>
        </Row>
      </Container>
    </Base>
  )
}

export default Categories