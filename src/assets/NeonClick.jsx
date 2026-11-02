export default function NeonClick({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="neon-click"
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        boxShadow: "none",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
      }}
    >
      <span className="neon-text" style={{ fontSize: "36px", letterSpacing: "0.1em" }}>
        Click
      </span>

      <svg
        viewBox="0 0 100 100"
        className="neon-arrow"
        style={{ width: 80, height: 80, overflow: "visible" }}
      >
        <polygon
          points="40,6 60,6 60,48 82,48 50,94 18,48 40,48"
          fill="none"
          stroke="#ffd1f0"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      <style>{`
        .neon-click:hover,
        .neon-click:focus,
        .neon-click:active {
          background: transparent !important;
          outline: none;
        }
        .neon-arrow {
          filter:
            drop-shadow(0 0 2px #fff)
            drop-shadow(0 0 6px #ff4fd8)
            drop-shadow(0 0 14px #ff4fd8)
            drop-shadow(0 0 28px #ff2fb3);
          animation: arrowBounce 1.2s ease-in-out infinite;
        }
        .neon-text {
          color: #ffe6f7;
          font-weight: 300;
          text-shadow:
            0 0 4px #fff,
            0 0 10px #ff4fd8,
            0 0 20px #ff4fd8,
            0 0 40px #ff2fb3;
        }
        .neon-click:hover .neon-arrow { animation-duration: 0.6s; }
        .neon-click:hover .neon-text { filter: brightness(1.3); }
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(14px); }
        }
      `}</style>
    </button>
  );
}