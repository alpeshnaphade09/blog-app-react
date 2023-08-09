import { React, useRef } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react";

import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";
import { useEffect } from "react";
import { useState } from "react";
import { loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";
import { updatePostService } from "../services/post-service";

function UpdateBlog() {
  const editor = useRef(null);

  const [categories, setCategories] = useState([]);

  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // load the blog from database
    loadPost(blogId)
      .then((data) => {
        setPost({ ...data, categoryId : data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading the blog");
      });
  }, []);

  useEffect(() => {
    console.log("first");
    if (post) {
      if (post.user.id != object.user.data.id) {
        toast.error("this is not your post !!");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName)=>{
        setPost({
            ...post,
            [fieldName]:event.target.value
        })
  }

  const updatePost = (event) => {
    event.preventDefault();
    console.log(post)
    updatePostService({...post, category: {categoryId: post.categoryId}}, post.id)
    .then(res=>{
        console.log(res)
        toast.success("post updated successfully")
    })
    .catch(error=>{
        console.log(error)
        toast.error("error in updating post")
    })
  }

  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="shadow-sm border-0 mt-2">
          <CardBody>
            <h3>Update post here !!</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  className="rounded-0"
                  name="title"
                  onChange={event=> handleChange(event, 'title')}
                  value={post.title}
                />
              </div>
              <div className="my-3">
                <Label for="content">Post Content</Label>
                {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter content"
                className="rounded-0"
                style={{height:'100px'}}
              /> */}
                <JoditEditor
                  ref={editor}
                  onChange={newContent=> setPost({...post, content:newContent})}
                  value={post.content}
                  // config={config}
                />
              </div>

              <div className="mt-3">
                <Label for="image">Select post banner</Label>
                <Input id="image" type="file" onChange={""} />
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="select category"
                  className="rounded-0"
                  name="categoryId"
                  value={post.categoryId}
                  onChange={event=> handleChange(event, 'categoryId')}   
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>
                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" color="primary" className="rounded-0">
                  Update Post
                </Button>
                <Button color="danger" className="rounded-0 ms-2">
                  Reset Content
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Base>
        <Container>
            {post && updateHtml()}
        </Container>
    </Base>
  );
}

export default UpdateBlog;
