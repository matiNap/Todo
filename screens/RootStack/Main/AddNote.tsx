import React from 'react';
import { View, StyleSheet } from 'react-native';
import palette from '_palette';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addNote } from '_actions/creators/app';
import { Overlay, Text, Input, Button } from 'react-native-elements';
import metrics from '_metrics';

interface Props {
  addNote: typeof addNote;
}

const ICON_SIZE = 60;

class AddNote extends React.Component<Props> {
  state = {
    overlayVisible: false,
    title: '',
  };
  render() {
    const { overlayVisible, title } = this.state;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ overlayVisible: true });
          }}
        >
          <Ionicons name="ios-add" style={styles.icon} />
        </TouchableWithoutFeedback>
        {overlayVisible && (
          <Overlay
            isVisible={overlayVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={() =>
              this.setState({ overlayVisible: false, title: '' })
            }
          >
            <Text
              style={{
                alignSelf: 'center',
                margin: metrics.margin.small,
              }}
              h4
            >
              Add note:
            </Text>
            <Input
              placeholder="Title"
              value={title}
              onChangeText={text => {
                this.setState({ title: text });
              }}
            />
            <Button
              title="Add"
              onPress={() => {
                this.props.addNote(title);
                this.setState({ overlayVisible: false, title: '' });
              }}
            />
          </Overlay>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    backgroundColor: palette.grayscale.light,
    borderWidth: 3,
    borderColor: palette.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    transform: [
      {
        translateY: -ICON_SIZE / 1.5,
      },
    ],
  },
  icon: {
    fontSize: ICON_SIZE,
    color: palette.text.primary,
    alignSelf: 'center',
  },
  overlay: {
    height: 200,
  },
});

export default connect(null, { addNote })(AddNote);
