import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";

const Login = () => {

  const userContextData = useContext(userContext)

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    setLoginDetail({
      ...loginDetail,
      [field]: event.target.value,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    // validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or Password is required !!");
      return;
    }

    // submit data to server
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);
        //save the sata to local storage
        doLogin(data, ()=>{
            console.log("login details is save to localstorage");
            userContextData.setUser({
              data:data.user,
              login:true
            })
            navigate("/user/dashboard")
        })

        toast.success("Login Success !!");
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status == 400 || error.response.status == 404){
          toast.error(error.response.data.message);
        }else{
          toast.error("Something went wrong on server !!");
        }
       
      });
  };

  return (
    <Base>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>
              <h3>Login here</h3>
            </CardHeader>

            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email"> Enter E-Mail</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={loginDetail.username}
                    onChange={(e) => handleChange(e, "username")}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password"> Enter Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={loginDetail.password}
                    onChange={(e) => handleChange(e, "password")}
                  />
                </FormGroup>

                <Container className="text-center">
                  <Button color="light" outline>
                    Login
                  </Button>
                  <Button
                    onClick={handleReset}
                    color="secondary"
                    outline
                    className="ms-2"
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Base>
  );
};

export default Login;
