import { useEffect, useRef } from "react";
import { Animated, Easing, Image, Modal, View } from "react-native";

const Loader = ({ visible }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [visible]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/40">
        {/* Spinning border */}
        <Animated.View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            borderWidth: 12,
            borderColor: "#22C55E",
            borderTopColor: "white",
            borderRightColor: "white",
            transform: [{ rotate: spin }],
            position: "absolute",
          }}
        />

        {/* Center image */}
        <Image
          source={require("../../assets/a1.png")}
          className="w-24 h-24 rounded-full"
          resizeMode="cover"
        />
      </View>
    </Modal>
  );
};

export default Loader;
