import { HomeContent } from "./HomeContent.jsx";
import Modal from "../Modal/Modal.jsx";

export function ProfileModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <HomeContent />
    </Modal>
  );
}

export default ProfileModal;