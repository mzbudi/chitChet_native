import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import Home from '../../App/Home';
import Profile from '../../App/Profile';
import Chat from '../../App/Home/Chats/';
import FriendList from '../../App/FriendList';
import FriendLocation from '../../App/FriendList/FriendLocation';
import AddFriend from '../../App/AddFriend/';
import FriendInfo from '../../App/FriendList/FriendInfo';
import ChangeName from '../../App/Profile/ChangeName';
import ChangePassword from '../../App/Profile/ChangePassword';
import ChangeStatus from '../../App/Profile/ChangeStatus';

const navigationOptions = title => {
  return {
    navigationOptions: {
      title: title,
      headerStyle: { elevation: 0, backgroundColor: '#1d949a' }
    }
  };
};

const HomeScreen = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Chats',
        headerStyle: { elevation: 0, backgroundColor: '#1d949a' }
      }
    },
    Chat: {
      screen: Chat,
      ...navigationOptions('Chat')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

const ProfileScreen = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      ...navigationOptions('My Profile')
    },
    ChangeName: {
      screen: ChangeName,
      ...navigationOptions('Change Name')
    },
    ChangePassword: {
      screen: ChangePassword,
      ...navigationOptions('Change Password')
    },
    ChangeStatus: {
      screen: ChangeStatus,
      ...navigationOptions('Change Status')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

const AddFriendScreen = createStackNavigator(
  {
    AddFriend: {
      screen: AddFriend,
      ...navigationOptions('Add Friend')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

const FriendListScreen = createStackNavigator(
  {
    FriendList: {
      screen: FriendList,
      ...navigationOptions('Friend List')
    },
    FriendInfo: {
      screen: FriendInfo,
      ...navigationOptions('Friend Info')
    },
    FriendLocation: {
      screen: FriendLocation,
      ...navigationOptions('Friend Location')
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center'
    }
  }
);

// const FriendList = createStackNavigator({});

HomeScreen.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Chat') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible
  };
};

export default createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: () => (
        <Icon type="entypo" name="home" size={25} color={'#517fa4'} />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'My Profile',
      tabBarIcon: () => (
        <Icon type="entypo" name="user" size={25} color={'#517fa4'} />
      )
    }
  },
  FriendList: {
    screen: FriendListScreen,
    navigationOptions: {
      title: 'Friends',
      tabBarIcon: () => (
        <Icon type="entypo" name="users" size={25} color={'#517fa4'} />
      )
    }
  },
  AddFriend: {
    screen: AddFriendScreen,
    navigationOptions: {
      title: 'Add Friend',
      tabBarIcon: () => (
        <Icon type="entypo" name="add-user" size={25} color={'#517fa4'} />
      )
    }
  }
});
