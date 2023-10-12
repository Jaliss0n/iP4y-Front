import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/Auth/Welcome";
import Dashboard from "../pages/Dashboard";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator>
      <Screen
        name="Welcolme"
        component={Welcome}
        options={{
          headerShown: false,
          title: "Inicio",
          headerTitleAlign: "center",
        }}
      />
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
