import React from "react";

const ArrowMarkerDefs = () => (
  <defs>
    <marker
      id="arrowhead"
      markerWidth="10"
      markerHeight="10"
      refX="5"
      refY="5"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M 2 2 L 5 5 L 2 8" fill="none" stroke="#898290" strokeWidth="1" strokeLinecap="round" />
    </marker>
  </defs>
);

export default ArrowMarkerDefs;