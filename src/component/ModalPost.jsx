import { createPortal } from "react-dom";

const ModalPost = ({children}) => {
    return createPortal(
        <div style={{
            background: "rgba(0,0,0,0.6)",
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{ background: "white", padding: 20 }}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default ModalPost;