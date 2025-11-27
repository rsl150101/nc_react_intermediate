import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { handleDeleteZoneDrop } from "../utils/dnd/handleDrop";

const DeleteZoneDiv = styled.div<{ $isDraggedOver: boolean }>`
  margin-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.$isDraggedOver ? "#ff8fa3" : props.theme.boardColor)};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  width: 100%;
  font-size: 50px;
`;

const DeleteZone = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;
    return dropTargetForElements({
      element: ref.current,
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
      },
      onDrop: (event) => {
        setIsDraggedOver(false);
        handleDeleteZoneDrop(event, dispatch);
      },
    });
  }, [dispatch]);

  return (
    <DeleteZoneDiv ref={ref} $isDraggedOver={isDraggedOver}>
      <FontAwesomeIcon icon={faTrashCan} />
    </DeleteZoneDiv>
  );
};

export default memo(DeleteZone);
