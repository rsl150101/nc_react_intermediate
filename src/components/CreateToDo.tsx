import { useForm } from "react-hook-form";

import { useAppDispatch } from "../store/hooks";
import { addToDo } from "../reducers/toDo";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const dispatch = useAppDispatch();

  const onValid = (data: IForm) => {
    dispatch(addToDo({ text: data.toDo, category: "TO_DO" }));
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "This field is required.",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
