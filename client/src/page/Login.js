import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useGlobleContext } from "../context/context";
import { Alert } from "react-bootstrap";

const LOGIN_USER = gql`
  mutation LoginUser($input: loginInput!) {
    loginUser(input: $input) {
      user_id
      name
      email
      create_at
      token
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({});

  const { login } = useGlobleContext();

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      input: {
        email,
        password,
      },
    },
    update(_, { data }) {
      // console.log(data.loginUser);
      login(data.loginUser);
      window.location = "/";
    },
    onError(error) {
      // console.log(error.graphQLErrors[0].extensions);
      setErrorMsg(error.graphQLErrors[0].extensions.errorMsg);
    },
  });

  return (
    <Form className="bg-light rounded w-50 shadow mt-5 mx-auto py-5 px-4">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <div className="d-grid mt-4">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          Log in
        </Button>
      </div>
      {Object.keys(errorMsg).length > 0 &&
        Object.values(errorMsg).map((err, index) => {
          return (
            <Alert key={index} variant="danger" className="mt-2 mb-0">
              {err} alert—check it out!
            </Alert>
          );
        })}
    </Form>
  );
}
