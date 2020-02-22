import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import App from './app';
import Auth from './auth';

const switchNavigator = createSwitchNavigator(
  {
    Auth,
    App
  },
  {
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(switchNavigator);
