import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../store/hooks";
import { createDragCardData, createDropCardData } from "../utils/dnd/creator";
import { handleDrop } from "../utils/dnd/handleDrop";

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
      onDrop: (event) => {
        handleDrop(event, dispatch);
      },
    });
  }, [index, dispatch]);

  return <CardDiv ref={ref}>{content}</CardDiv>;
};

export default React.memo(Card);
