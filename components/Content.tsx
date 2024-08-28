import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: any;
};

const Content = ({ children }: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 3,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Content;
