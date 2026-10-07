import Modal from "../Modal/Modal.jsx";
import { KontakContent } from "./KontakContent.jsx";

export function KontakModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <KontakContent />
    </Modal>
  );
}

export default KontakModal;