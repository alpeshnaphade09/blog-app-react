import React from "react";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";

const UserDashboard = () => {
  return (
    <Base>
      <Container>
        <AddPost/>
      </Container>
    </Base>
  );
};

export default UserDashboard;
