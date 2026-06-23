import { React, useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";

function Register() {
  const [exists, setExist] = useState(true);
  const [registered, isRegistered] = useState(false);
  const [users, setUsers] = useState("");
  useEffect(() => {
    axios
      .get("https:localhost:9999/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card className="text-center">
      <Form>
        Email: <input type="text" id="txtEmail" name="txtEmail" /> <br />
        Full Name: <input type="text" id="txtName" name="txtName" /> <br />
        Phone: <input type="text" id="txtPhone" name="txtPhone" />
        <br />
        Username: <input type="text" id="txtUser" name="txtUser" /> <br />
        Password: <input type="password" id="txtPass" name="txtPass" /> <br />
        Confirm Password: <input type="password"/><br/>
        <Button variant="primary"> LOGIN </Button>
      </Form>
    </Card>
  );
}

export default Register;
