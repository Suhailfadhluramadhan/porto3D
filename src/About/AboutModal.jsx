import Modal from "../Modal/Modal.jsx";
import { AboutContent } from "./AboutContent.jsx";

export function AboutModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <AboutContent />
    </Modal>
  );
}

export default AboutModal;