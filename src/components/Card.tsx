import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { moveToDo, MoveToDoState } from "../reducers/toDo";

interface CardProps {
  index: number;
  content: string;
}

const CARDDROPTYPE = "CardDropTarget";

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
      getInitialData: (): { curIndex: number } => ({ curIndex: index }),
    });
  }, [index]);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => ({ type: CARDDROPTYPE, targetIndex: index }),
      onDrop: ({ source, location }) => {
        const target = location.current.dropTargets.find(
          (t) => t.data.type === CARDDROPTYPE
        );

        if (!target) return;

        const { targetIndex } = target.data;
        const { curIndex } = source.data;

        dispatch(moveToDo({ targetIndex, curIndex } as MoveToDoState));
      },
    });
  }, [index, dispatch]);

  return <CardDiv ref={ref}>{content}</CardDiv>;
};

export default Card;
