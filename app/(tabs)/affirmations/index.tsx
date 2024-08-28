import React from "react";
import { View, Text, ScrollView } from "react-native";

import AppGradient from "@/components/AppGradient";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";

import AFFIRMATION_GALLERY, {
  AffirmationGalleryType,
} from "@/constants/affirmation-gallery";

type Props = {};

const Affirmations = (props: Props) => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your belief with affirmations
          </Text>

          <View>
            {AFFIRMATION_GALLERY.map((g: AffirmationGalleryType) => (
              <GuidedAffirmationsGallery
                key={g.title}
                title={g.title}
                previews={g.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Affirmations;
