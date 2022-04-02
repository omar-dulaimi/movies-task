import React from "react";
import { Space } from "antd";
import "./CenteredSpace.css";

const CenteredSpace = (props) => (
  <Space className="centered-space" direction="vertical" align="center">
    {props.children}
  </Space>
);

export default CenteredSpace;
