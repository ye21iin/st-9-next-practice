"use client";
import { useQuery } from "@tanstack/react-query";
import { TodoType } from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("http://localhost:4002/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      return res.json();
    },
  });

  if (isPending) return <>Loading...</>;
  if (isError) return <>Error...</>;

  return (
    <>
      <ul style={{ listStyle: "none", width: 250 }}>
        {todos.map((todo: TodoType) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </>
  );
};

export default TodoList;
