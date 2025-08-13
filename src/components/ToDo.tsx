import { ToDoState } from "../reducers/toDo";

function ToDo(toDo: ToDoState) {
  return (
    <li>
      <span>{toDo.text}</span>
      <button>Doing</button>
      <button>To Do</button>
      <button>Done</button>
    </li>
  );
}

export default ToDo;
