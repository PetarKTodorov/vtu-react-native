import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';

import Application from './src/components/application';


ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    .then(
        // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
        // It also ensures that whether you load the app in Expo Go or in a native build,
        // the environment is set up appropriately
        registerRootComponent(Application)
    );

