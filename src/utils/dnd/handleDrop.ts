import {
  moveToDoOnAnotherBoard,
  moveToDoOnSameBoard,
  pushToDoToAnotherBoard,
} from "../../reducers/toDo";
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

export function handleDrop(event: DropEvent, dispatch: AppDispatch) {
  const { source, location } = event;
  const targetCard = findDropTarget(
    location.current.dropTargets,
    isDropCardData
  );
  const targetBoard = findDropTarget(location.current.dropTargets, isBoardData);
  const dragBoard = findDropTarget(location.initial.dropTargets, isBoardData);

  if (!targetBoard || !dragBoard || !isDragCardData(source.data)) return;

  const { boardId: targetBoardId } = targetBoard;
  const { boardId: dragBoardId } = dragBoard;
  const { dragCardIndex } = source.data;

  if (targetCard) {
    const { targetCardIndex } = targetCard;

    if (targetBoardId === dragBoardId && targetCardIndex !== dragCardIndex) {
      dispatch(
        moveToDoOnSameBoard({
          dragBoardId,
          targetCardIndex,
          dragCardIndex,
        })
      );
    } else if (targetBoardId !== dragBoardId) {
      dispatch(
        moveToDoOnAnotherBoard({
          dragBoardId,
          targetBoardId,
          targetCardIndex,
          dragCardIndex,
        })
      );
    }
  } else if (targetBoardId !== dragBoardId) {
    dispatch(
      pushToDoToAnotherBoard({
        targetBoardId,
        dragBoardId,
        dragCardIndex,
      })
    );
  }
}
