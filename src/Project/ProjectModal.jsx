import Modal from "../Modal/Modal.jsx";
import { ProjectContent } from "./ProjectContent.jsx";

export function ProjectModal({ onClose }) {
  return (
    <Modal onClose={onClose} maxWidth="w-full">
      <ProjectContent />
    </Modal>
  );
}

export default ProjectModal;