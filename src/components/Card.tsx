import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../store/hooks";
import { moveToDoOnSameBoard } from "../reducers/toDo";
import { BOARDDROPTYPE, CARDDROPTYPE } from "../constants/dnd";
import { findDropTarget, typedData } from "../utils/dnd";

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
      getInitialData: (): { dragCardIndex: number } => ({
        dragCardIndex: index,
      }),
    });
  }, [index]);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => ({ type: CARDDROPTYPE, targetCardIndex: index }),
      onDrop: ({ source, location }) => {
        const targetCard = findDropTarget<{ targetCardIndex: number }>(
          location.current.dropTargets,
          CARDDROPTYPE
        );
        const targetBoard = findDropTarget<{ boardId: string }>(
          location.current.dropTargets,
          BOARDDROPTYPE
        );
        const dragBoard = findDropTarget<{ boardId: string }>(
          location.initial.dropTargets,
          BOARDDROPTYPE
        );

        if (!targetCard || !targetBoard || !dragBoard) return;

        const { targetCardIndex } = targetCard;
        const { dragCardIndex } = typedData<{ dragCardIndex: number }>(
          source.data
        );
        const { boardId: targetBoardId } = targetBoard;
        const { boardId: dragBoardId } = dragBoard;

        if (targetBoardId === dragBoardId) {
          if (targetCardIndex !== dragCardIndex) {
            dispatch(
              moveToDoOnSameBoard({
                dragBoardId,
                targetCardIndex,
                dragCardIndex,
              })
            );
          }
        }
      },
    });
  }, [index, dispatch]);

  return <CardDiv ref={ref}>{content}</CardDiv>;
};

export default React.memo(Card);
