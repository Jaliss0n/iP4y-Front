import { Dimensions, View } from "react-native";
import { styled } from "styled-components";
import { useTheme } from "../../ThemeContext";

export const ContainerGradient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();

  const ViewBase = styled(View)`
    display: flex;
    flex: 1;
    height: ${Dimensions.get("window").height}px;
    position: relative;
    background-color: ${theme.colors.accent};
  `;

  return <ViewBase>{children}</ViewBase>;
};
