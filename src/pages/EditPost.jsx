import React from "react";
import PostForm from "../components/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPost, updatePost } from "../api/posts";

const EditPost = () => {
  const queryClient = useQueryClient();
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

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleSubmit = (updatedPost) => {
    updatePostMutation.mutate({ id, ...updatedPost });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>`Error: ${error.message}`</p>;
  return (
    <div>
      <PostForm onSubmit={handleSubmit} initialValue={post} />
    </div>
  );
};

export default EditPost;
