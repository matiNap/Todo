import { CSSProperties } from 'react';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';

const theme: {
  Text: {
    style: CSSProperties;
  };
  Input: {
    inputContainerStyle: CSSProperties;
    inputStyle: CSSProperties;
    containerStyle: CSSProperties;
  };
  Button: {
    buttonStyle: CSSProperties;
  };
} = {
  Text: {
    style: {
      fontFamily: 'prompt',
      fontSize: typography.fontSize.normal,
      color: palette.text.primary,
    },
  },
  Button: {
    buttonStyle: {
      backgroundColor: palette.primary,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4.65,

      elevation: 7,
    },
  },
  Input: {
    containerStyle: { marginVertical: metrics.margin.medium },
    inputContainerStyle: {
      borderBottomColor: palette.grayscale.medium,
    },
    inputStyle: {
      marginLeft: 10,
      fontSize: typography.fontSize.normal,
      color: palette.text.primary,
    },
  },
};

export default theme;
