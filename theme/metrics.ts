import { Dimensions, Platform, NativeModules } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default {
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
  statusBarHeight:
    Platform.OS === 'ios'
      ? 20
      : NativeModules.StatusBarManager.HEIGHT,
  borderRadius: {
    small: 5,
    normal: 10,
    medium: 15,
    big: 25,
  },
  margin: {
    small: 5,
    normal: 10,
    medium: 20,
    big: 30,
  },
  padding: {
    small: 5,
    normal: 10,
    medium: 15,
    big: 20,
  },
  login: {
    svgHeight: 150,

    swipe: 130,
  },
};
