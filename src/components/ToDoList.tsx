import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = (data: IForm) => {
    setValue("toDo", "");
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "This field is required.",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul></ul>
    </div>
  );
}

export default ToDoList;
