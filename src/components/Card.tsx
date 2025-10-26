import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../store/hooks";
import { moveToDoOnSameBoard } from "../reducers/toDo";
import { findDropTarget } from "../utils/dnd/findTarget";
import { createDragCardData, createDropCardData } from "../utils/dnd/creator";
import {
  isBoardData,
  isDragCardData,
  isDropCardData,
} from "../utils/dnd/guards";

interface CardProps {
  index: number;
  content: string;
}

const CardDiv = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const Card = ({ index, content }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;

    return draggable({
      element: ref.current,
      getInitialData: () => createDragCardData(index),
    });
  }, [index]);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => createDropCardData(index),
      onDrop: ({ source, location }) => {
        const targetCard = findDropTarget(
          location.current.dropTargets,
          isDropCardData
        );
        const targetBoard = findDropTarget(
          location.current.dropTargets,
          isBoardData
        );
        const dragBoard = findDropTarget(
          location.initial.dropTargets,
          isBoardData
        );

        if (!targetCard || !targetBoard || !dragBoard) return;
        if (!isDragCardData(source.data)) return;

        const { targetCardIndex } = targetCard;
        const { dragCardIndex } = source.data;
        const { boardId: targetBoardId } = targetBoard;
        const { boardId: dragBoardId } = dragBoard;

        if (
          targetBoardId === dragBoardId &&
          targetCardIndex !== dragCardIndex
        ) {
          dispatch(
            moveToDoOnSameBoard({
              dragBoardId,
              targetCardIndex,
              dragCardIndex,
            })
          );
        }
      },
    });
  }, [index, dispatch]);

  return <CardDiv ref={ref}>{content}</CardDiv>;
};

export default React.memo(Card);
