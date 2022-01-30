import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobleContext } from "../context/context";
import { useRef } from "react";

export default function SearchForm() {
  const navigate = useNavigate();
  const { setSearchInput } = useGlobleContext();
  const inputRef = useRef("");
  // console.log(inputRef.current.value);
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        ref={inputRef}
      />
      <Button
        variant="outline-success"
        onClick={() => {
          setSearchInput(inputRef.current.value);
          navigate("/search");
        }}
      >
        Search
      </Button>
    </Form>
  );
}
