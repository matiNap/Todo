import { PixelRatio } from 'react-native';

const scaleFont = size => size * PixelRatio.getFontScale();

export default {
  fonts: {
    primary: 'rubik',
  },
  fontWeight: {
    bold: 'bold',
    regular: '400',
  },
  fontSize: {
    verySmall: scaleFont(13),
    small: scaleFont(15),
    normal: scaleFont(18),
    medium: scaleFont(22),
    big: scaleFont(28),
  },
};
