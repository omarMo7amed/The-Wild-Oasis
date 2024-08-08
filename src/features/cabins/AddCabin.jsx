import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  //   const [isShowModal, setIsShowModal] = useState(false);

  //   return (
  //     <div>
  //       <Button onClick={() => setIsShowModal((show) => !show)}>
  //         Add new Cabin
  //       </Button>
  //       {isShowModal && (
  //         <Modal onClick={() => setIsShowModal((show) => !show)}>
  //           <CreateCabinForm onClose={() => setIsShowModal((show) => !show)} />
  //         </Modal>
  //       )}
  //     </div>
  //   );
}

export default AddCabin;
