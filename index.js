/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { notification } from './src/notificationManager';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
notification.configure();

notification.createChannel();
AppRegistry.registerComponent(appName, () => App);
