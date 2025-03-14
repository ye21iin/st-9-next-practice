"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";
import { useState } from "react";

type TodoType = {
  id: string;
  title: string;
  contents: string;
  isCompleted: boolean;
  imgPath: string;
  createdAt: number;
};

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addTodo } = useMutation<void, Error, TodoType>({
    mutationFn: async (newTodo) => {
      const response = await fetch("http://localhost:4002/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error({
          message: "Failed to post todo",
          statusCode: response.status,
        });
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    addTodo({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      imgPath: "https://picsum.photos/250/250",
      createdAt: Date.now(),
    });
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <div className="form-group">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="contents">내용:</label>
        <input
          id="contents"
          name="contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        추가하기
      </button>
    </form>
  );
};

export default TodoForm;
