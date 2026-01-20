import React from "react";

const Skeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "loading 1.5s infinite",
      }}
    ></div>
  );
};

export default Skeleton;
