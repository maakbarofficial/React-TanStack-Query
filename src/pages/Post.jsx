import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../api/posts";
import { useQuery } from "@tanstack/react-query";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>`Error: ${error.message}`</p>;

  return (
    <div>
      <button onClick={() => navigate(`/`)}>Go Back</button>
      <div>
        <h1>{post.title}</h1>
        <h2>{post.body}</h2>
      </div>
    </div>
  );
};

export default Post;
