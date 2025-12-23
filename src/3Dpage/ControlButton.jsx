// ControlButton.jsx
export function ControlButton({ dir, children, toggle }) {
  const sendEvent = (value) => {
    window.dispatchEvent(new CustomEvent("move-" + dir, { detail: value }));
  };

  return (
    <button
      onMouseDown={() => sendEvent(true)}
      onMouseUp={() => sendEvent(false)}
      onTouchStart={() => sendEvent(true)}
      onTouchEnd={() => sendEvent(false)}
      style={{
        width: 50,
        height: 50,
        fontSize: "24px",
        cursor: "pointer",
        background: toggle ?   "#fff" :  "#000",  
        borderRadius: "8px",
        border: toggle ? "1px solid #555" : "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        overflow: "visible",
      }}
    >
      {children}
    </button>
  );
}