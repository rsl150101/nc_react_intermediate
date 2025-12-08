import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddBoardModal from "./AddBoardModal";

const AddBoardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  cursor: pointer;
  &:hover {
    background-color: #ced4da;
  }
  &:active {
    background-color: #adb5bd;
  }
`;

const WrapperIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  color: #3f8cf2;
  min-width: 20px;
`;

const AddBoardBtn = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddBoardButton = () => {
    setShowModal(true);
  };

  return (
    <>
      <AddBoardButton onClick={handleAddBoardButton}>
        <WrapperIcon>
          <FontAwesomeIcon icon={faPlus} />
        </WrapperIcon>
      </AddBoardButton>
      {showModal &&
        createPortal(
          <AddBoardModal
            onClose={() => {
              setShowModal(false);
            }}
          />,
          document.body
        )}
    </>
  );
};

export default AddBoardBtn;
