import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";

import beachImage from "@/assets/meditation-images/beach.webp";

import "../global.css";

type Props = {};

const App = (props: Props) => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-center text-white font-regular text-2xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>

            <CustomButton
              onPress={() => router.push("/nature-meditate")}
              title="Get Start"
            />

            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
