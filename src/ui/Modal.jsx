import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        openName,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  //return (Button)
  // return children;
  //cloneElement allow us to send props to the return React element

  // <Button onClick={() => open(opensWindowName)}></Button>
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    //where you want to render your jsx
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;

// we use createPortal method to avoid issues in css(display:hidden) and generaly used for all element that we want to stay on top of other element such as [overlay,menu,tabs,...]

//that allow us to render an element outside the parent component dom structure while still component at the same position in component tree

// function Modal({ children, onClick }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClick}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     //where you want to render your jsx
//     document.body
//   );
// }
