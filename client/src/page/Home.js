import React from "react";
import PostInput from "../component/PostInput";
import PostList from "../component/PostList";
import { useGlobleContext } from "../context/context";

export default function Home() {
  // const { user } = useGlobleContext();
  // console.log(user);
  return (
    <>
      <PostInput />
      <PostList />
    </>
  );
}
