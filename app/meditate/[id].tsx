import React, { useContext, useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from "expo-av";

import { TimerContext } from "@/context/TimerContext";

import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";

import AntDesign from "@expo/vector-icons/AntDesign";

const Meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { duration: secondRemaining, setDuration } = useContext(TimerContext);

  const [isMeditating, setIsMeditating] = useState<boolean>(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondRemaining, isMeditating]);

  // unload sound when leave page
  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secondRemaining === 0) setDuration(10);
    setIsMeditating(!isMeditating);
    await toggleSound();
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    setAudioSound(sound);
    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push("/(modal)/adjust-meditation-duration");
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const formattedTimeMinutes = String(
    Math.floor(secondRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(
    Math.floor(secondRemaining % 60)
  ).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[+id - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              onPress={() => handleAdjustDuration()}
              title="Adjust duration"
            />
            <CustomButton
              containerStyles="mt-4"
              onPress={() => toggleMeditationSessionStatus()}
              title={isMeditating ? "Stop" : "Start Meditation"}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
