import { changeBoard, deleteToDo, moveCard } from "../../reducers/toDo";
import { AppDispatch } from "../../store/configureStore";
import { findDropTarget } from "./findTarget";
import { isBoardData, isDragCardData, isDropCardData } from "./guards";

interface DropEvent {
  source: { data: unknown };
  location: {
    initial: { dropTargets: Array<{ data: unknown }> };
    current: { dropTargets: Array<{ data: unknown }> };
  };
}

export function handleCardDrop(event: DropEvent, dispatch: AppDispatch) {
  const { source, location } = event;
  const targetCard = findDropTarget(location.current.dropTargets, isDropCardData);
  const targetBoard = findDropTarget(location.current.dropTargets, isBoardData);
  const dragBoard = findDropTarget(location.initial.dropTargets, isBoardData);

  if (!targetBoard || !dragBoard || !isDragCardData(source.data)) return;

  const { dragCardIndex } = source.data;
  const dragBoardId = dragBoard.boardId;
  const targetBoardId = targetBoard.boardId;
  const targetCardIndex = targetCard?.targetCardIndex;

  dispatch(
    moveCard({
      dragBoardId,
      dragCardIndex,
      targetBoardId,
      targetCardIndex,
    })
  );
}

export function handleBoardDrop(event: DropEvent, dispatch: AppDispatch) {
  const { location } = event;
  const targetBoard = findDropTarget(location.current.dropTargets, isBoardData);
  const dragBoard = findDropTarget(location.initial.dropTargets, isBoardData);

  if (!targetBoard || !dragBoard) return;

  const dragBoardId = dragBoard.boardId;
  const targetBoardId = targetBoard.boardId;

  dispatch(changeBoard({ dragBoardId, targetBoardId }));
}

export function handleDeleteZoneDrop(event: DropEvent, dispatch: AppDispatch) {
  const { source, location } = event;
  const dragBoard = findDropTarget(location.initial.dropTargets, isBoardData);

  if (!dragBoard || !isDragCardData(source.data)) return;

  const { dragCardIndex } = source.data;
  const dragBoardId = dragBoard.boardId;

  dispatch(deleteToDo({ dragBoardId, dragCardIndex }));
}
