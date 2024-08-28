import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import Content from "./Content";

type Props = { children: any; colors: string[] };

const AppGradient = ({ children, colors }: Props) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={colors}>
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;
