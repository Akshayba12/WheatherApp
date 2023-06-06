import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashApp from '../screens/Flash';
import Wheather from '../screens/Wheather';

const Stack = createNativeStackNavigator();

function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Flash"
          component={FlashApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Wheather}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
