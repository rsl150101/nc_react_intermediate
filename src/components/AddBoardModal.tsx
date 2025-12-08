import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { addBoard } from "../reducers/toDo";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalDiv = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  max-width: 400px;
  min-height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const AddBoardForm = styled.form`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const AddBoardFormTitle = styled.h2`
  font-weight: 600;
  margin-bottom: 10px;
`;

const AddBoardFormInput = styled.input`
  width: 80%;
  border-radius: 3px;
  min-height: 30px;
  padding-left: 10px;
  border: 1px solid;
`;

const SubmitBtn = styled.button`
  background-color: #3f8cf2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3f8cf2;
    opacity: 0.8;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

interface AddBoardModalProps {
  onClose: () => void;
}

interface AddBoardModalForm {
  boardName: string;
}

const AddBoardModal = ({ onClose }: AddBoardModalProps) => {
  const { register, setValue, handleSubmit } = useForm<AddBoardModalForm>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("boardName", { required: true });
  const dispatch = useAppDispatch();

  const onValid = ({ boardName }: AddBoardModalForm) => {
    dispatch(addBoard(boardName));
    setValue("boardName", "");
    onClose();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Wrapper>
      <Backdrop />
      <ModalDiv>
        <AddBoardForm onSubmit={handleSubmit(onValid)}>
          <AddBoardFormTitle>Add Board</AddBoardFormTitle>
          <AddBoardFormInput
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type="text"
            placeholder="Board Name"
          />
          <SubmitBtn type="submit">Add</SubmitBtn>
        </AddBoardForm>
        <CloseBtn onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseBtn>
      </ModalDiv>
    </Wrapper>
  );
};

export default AddBoardModal;
