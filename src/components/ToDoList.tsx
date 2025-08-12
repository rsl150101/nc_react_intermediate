import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToDo } from "../reducers/toDo";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const toDos = useAppSelector((state) => state.toDo);
  const dispatch = useAppDispatch();

  const onValid = (data: IForm) => {
    dispatch(addToDo({ text: data.toDo, category: "TO_DO" }));
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
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
