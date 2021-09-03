import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);
const AnimatedInputText = Animated.createAnimatedComponent(TextInput);

const ColorPicker = () => {
  const [bgColor, setBgColor] = useState("#000");
  const input = useRef();
  // const animation = useRef(new Animated.Value(0)).current;
  const [animation, _] = useState(new Animated.Value(0));
  const [buttonAnimation, __] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const handleToggle = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const translateYInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });

  const scaleXInter = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const openInputHandler = () => {
    const toValue = inputOpen ? 0 : 1;
    Animated.timing(buttonAnimation, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
    setInputOpen(!inputOpen);
  };

  useEffect(() => {
    if (inputOpen) {
      input.current.focus();
    } else {
      input.current.blur();
    }
  }, [inputOpen]);

  const okButtonInterpolation = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-130, 0],
  });
  const okScaleButtonInterpolation = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const showButtonsInterpolation = buttonAnimation.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0],
  });

  const iconStyle = {
    opacity: showButtonsInterpolation,
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity: animation,
            transform: [
              { scaleX: scaleXInter },
              { scaleY: animation },
              { translateY: translateYInterpolation },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={openInputHandler}>
          <Animated.View
            style={[styles.circleColor, { backgroundColor: bgColor }]}
          />
        </TouchableOpacity>
        <Animated.View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.icon}>
            <AnimatedIcon
              style={iconStyle}
              name="bold"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <AnimatedIcon
              style={iconStyle}
              name="italic"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <AnimatedIcon
              style={iconStyle}
              name="align-center"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <AnimatedIcon
              style={iconStyle}
              name="link"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.changing]}
            pointerEvents={inputOpen ? "auto" : "none"}
          >
            <AnimatedInputText
              style={[
                styles.animatedInput,
                {
                  opacity: buttonAnimation,
                },
              ]}
              onChangeText={(color) => setBgColor(color)}
              value={bgColor}
              ref={input}
            />
            <TouchableOpacity onPress={openInputHandler}>
              <Animated.View
                style={[
                  styles.animatedButton,
                  {
                    opacity: buttonAnimation,
                    transform: [
                      { translateX: okButtonInterpolation },
                      { scale: okScaleButtonInterpolation },
                    ],
                  },
                ]}
              >
                <Text style={styles.animatedButtonText}>Ok</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <TouchableWithoutFeedback onPress={handleToggle}>
        <Text style={styles.hide}> Hide Or Show</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hide: {
    marginTop: 20,
  },
  box: {
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2,
    elevation: 3,
    borderRadius: 20,
    minWidth: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  circleColor: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    marginRight: 10,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  changing: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  animatedButton: {
    width: 35,
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#3DB2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedButtonText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  animatedInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
});
