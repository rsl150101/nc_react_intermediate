import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../store/hooks";
import { createDragCardData, createDropCardData } from "../utils/dnd/creator";
import { handleDrop } from "../utils/dnd/handleDrop";

interface CardProps {
  index: number;
  content: string;
}

const CardDiv = styled.div<{ $isDraggedOver: boolean; $isDraggedFromThis: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.$isDraggedOver ? "yellow" : props.$isDraggedFromThis ? "green" : props.theme.cardColor};
`;

const Card = ({ index, content }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isDraggedFromThis, setIsDraggedFromThis] = useState(false);

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
      onDragStart: () => setIsDraggedFromThis(true),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: (event) => {
        handleDrop(event, dispatch);
      },
    });
  }, [index, dispatch]);

  useEffect(() => {
    return monitorForElements({
      onDrop: () => {
        setIsDraggedOver(false);
        setIsDraggedFromThis(false);
      },
    });
  }, []);

  return (
    <CardDiv ref={ref} $isDraggedOver={isDraggedOver} $isDraggedFromThis={isDraggedFromThis}>
      {content}
    </CardDiv>
  );
};

export default React.memo(Card);
