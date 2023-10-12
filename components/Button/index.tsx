import { Button } from "react-native-paper";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  icon: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ButtonWhite = ({ title, icon, style, onPress }: ButtonProps) => {
  return (
    <Button
      icon={icon}
      mode="contained-tonal"
      onPress={onPress}
      uppercase
      style={style}
    >
      {title}
    </Button>
  );
};
