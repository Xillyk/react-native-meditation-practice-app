import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";

import AppGradient from "@/components/AppGradient";
import { GalleryPreviewData } from "@/components/models/AffirmationCategory";

import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {};

const AffirmationPractice = (props: Props) => {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();

  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationsData = AFFIRMATION_GALLERY[idx].data;
      const affirmationToStart = affirmationsData.find(
        (a) => a.id === Number(itemId)
      );

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);
        const affirmationsArray = affirmationToStart.text.split(".");
        if (affirmationsArray[affirmationsArray.length - 1] === "") {
          affirmationsArray.pop();
        }
        setSentences(affirmationsArray);
        return;
      }
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences?.map((sentence, idx) => (
                  <Text className="text-white text-3xl mb-12 font-bold text-center">
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
