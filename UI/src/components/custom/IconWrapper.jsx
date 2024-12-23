import React from "react";

const IconWrapper = ({ icon = null, color = null }) => {
  return <div style={{ color: color != null ? color : 'gray' }}>{icon}</div>;
};

export default IconWrapper;
