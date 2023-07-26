import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { createPost as doCreatePost } from "../services/post-service";
import { getCurrentUserDetails } from "../auth";
import { toast } from "react-toastify";

const AddPost = () => {
  const editor = useRef(null);
  // const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);

  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  // const config = {
  //   placeholder:"Start typing..."
  // }

  useEffect(() => {
    setUser(getCurrentUserDetails());

    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  const createPost = (event) => {
    event.preventDefault();
    console.log(post);

    if (post.title.trim() === "") {
      alert("post title is required !!");
      return;
    }
    if (post.content.trim() === "") {
      alert("post content is required !!");
      return;
    }
    if (post.categoryId === "") {
      alert("select some category !!");
      return;
    }

    // submit form on server
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        toast.success("post created");
        // console.log(data);
        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        alert("error occured while submiting");
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>what's on your mind ?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
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
                value={post.content}
                onChange={contentFieldChanged}
                // config={config}
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="select category"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select category--
                </option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" color="primary" className="rounded-0">
                Create Post
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

export default AddPost;
