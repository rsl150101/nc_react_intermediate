import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface CardProps {
  content: string;
}

const CardDiv = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const Card = ({ content }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    return draggable({
      element: ref.current,
    });
  }, []);
  return <CardDiv ref={ref}>{content}</CardDiv>;
};

export default Card;
