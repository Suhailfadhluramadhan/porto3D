import { HomeContent } from "./HomeContent.jsx";
import Modal from "../Modal/Modal.jsx";

export function ProfileModal({ onClose }) {
  return (
    <Modal onClose={onClose} maxWidth="w-full">
      <HomeContent />
    </Modal>
  );
}

export default ProfileModal;