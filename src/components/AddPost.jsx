import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";

const AddPost = () => {

  const editor = useRef(null);
  const [content, setContent] = useState(''); 
  const [categories, setCategories] = useState([]);

  const config = {
    placeholder:"Start typing..."
  }

  useEffect(()=>{
    loadAllCategories().then((data)=>{
      console.log(data);
      setCategories(data)
    }).catch(error =>{
      console.log(error)
    })

  }, [])


  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          <h3>what going in your mind ?</h3>
          <Form>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title"
                className="rounded-0"
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
                value={content}
                onChange={newContent=>setContent(newContent)}
                config={config}
              />

            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="select category"
                className="rounded-0"
              >
                {
                  categories.map((category)=>(
                      <option value={category.categoryId} key={category.categoryId}>
                        {category.categoryName}
                      </option>
                  ))
                }
              </Input>
            </div>

            <Container className="text-center">
              <Button color="primary" className="rounded-0">Create Post</Button>
              <Button color="danger" className="rounded-0 ms-2">Reset Content</Button>
            </Container>

            {content}

          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
