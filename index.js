/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// Add this line to your `index.js`
import 'react-native-get-random-values'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
