"use client";
import Image from "next/image";
import { TodoType } from "./TodoForm";
import Link from "next/link";

interface TodoItemProps {
  todo: TodoType;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li
      key={todo.id}
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{todo.title}</h3>
      <Image
        src={`${todo.imgPath}?random=${Math.random()}`}
        alt="투두 이미지"
        width={50}
        height={50}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/todolist/${todo.id}`}>
          <button>내용보기</button>
        </Link>
      </div>
    </li>
  );
};

export default TodoItem;
