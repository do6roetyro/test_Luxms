import React from "react";

const ArrowPath = ({ d }) => (
  <path
    d={d}
    stroke="gray"
    strokeWidth="1"
    fill="none"
    markerEnd="url(#arrowhead)"
  />
);

export default ArrowPath;
