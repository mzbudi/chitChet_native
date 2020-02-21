import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

const navigationOptions = title => {
  return {
    navigationOptions: {
      title: title,
      headerStyle: { height: 50, backgroundColor: '#16e9e6' }
    }
  };
};

export default createStackNavigator(
  {
    Login: {
      screen: Login,
      ...navigationOptions('Login')
    },
    Register: {
      screen: Register,
      ...navigationOptions('Register')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);
