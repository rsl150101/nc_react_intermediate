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
    props.$isDraggedOver
      ? "#d7e3fc"
      : props.$isDraggedFromThis
      ? "#c7f9cc"
      : props.theme.cardColor};

  box-shadow: ${(props) => (props.$isDraggedFromThis ? "0 4px 100px rgba(0, 0, 0, 0.15)" : "none")};
  transition: all 0.5s ease;
  transform: ${(props) => (props.$isDraggedOver ? "translateY(5px)" : "translateY(0)")};
  z-index: ${(props) => (props.$isDraggedFromThis ? 10 : 1)};
`;

const Card = ({ index, content }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isDraggedFromThis, setIsDraggedFromThis] = useState(false);

  const THRESHOLD_RATIO = 0.1;

  const isMouseWithinThreshold = (mouseY: number) => {
    if (!ref.current) return false;
    const rect = ref.current.getBoundingClientRect();
    const threshold = rect.height * THRESHOLD_RATIO;
    return mouseY > rect.top + threshold && mouseY < rect.bottom - threshold;
  };

  useEffect(() => {
    if (!ref.current) return;

    return draggable({
      element: ref.current,
      getInitialData: () => createDragCardData(index),
      onDragStart: () => setIsDraggedFromThis(true),
    });
  }, [index]);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => createDropCardData(index),
      onDrag: (event) => {
        const mouseY = event.location.current.input.clientY;

        if (isMouseWithinThreshold(mouseY)) {
          setIsDraggedOver(true);
        }
      },
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
