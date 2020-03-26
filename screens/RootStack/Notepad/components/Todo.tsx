import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { Point } from '_types';
import metrics from '_metrics';
import palette from '_palette';
import typography from '_typography';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  editPoint,
  removePoint,
  addImageToPoint,
} from '_actions/creators/app';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import reactotron from 'reactotronConfig';

interface Props {
  todo: Point;
  noteId: string;
  editPoint: typeof editPoint;
  removePoint: typeof removePoint;
  addImageToPoint: typeof addImageToPoint;
}

const getPermissions = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
  );

  if (status !== 'granted') {
    alert(
      'Application need permissions to acces your camera roll, to add a photo',
    );
  }
};

const Todo = (props: Props) => {
  const { todo, noteId } = props;
  const { done, title, id, imageUri } = todo;
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.editPoint(noteId, id, { title, done: !done });
          }}
        >
          {done ? (
            <MaterialCommunityIcons
              style={styles.checkDone}
              name="check-box-outline"
            />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              style={styles.checkBlank}
            />
          )}
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={text => {
            props.editPoint(noteId, id, { title: text, done });
          }}
        />
        <TouchableWithoutFeedback
          onPress={async () => {
            await getPermissions();
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
            });

            if (!result.cancelled) {
              props.addImageToPoint(result.uri, noteId, id);
            }
          }}
        >
          <MaterialIcons
            name="insert-photo"
            style={styles.iconAddPhoto}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.removePoint(noteId, id);
          }}
        >
          <AntDesign name="close" style={styles.iconDelete} />
        </TouchableWithoutFeedback>
      </View>
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
              padding: 5,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize.normal,
    marginVertical: metrics.margin.small,
    marginLeft: 5,
    fontFamily: typography.fonts.primary,
    flex: 1,
  },
  checkBlank: {
    color: palette.grayscale.dark,
    fontSize: 32,
    alignSelf: 'center',
  },
  checkDone: {
    color: palette.actions.succes,
    fontSize: 32,
    alignSelf: 'center',
  },
  iconDelete: {
    fontSize: 27,
    color: palette.actions.error,
    marginLeft: metrics.margin.normal,
  },
  imageContainer: {
    width: '100%',
    height: 170,
    padding: 10,
    alignSelf: 'center',
  },
  iconAddPhoto: {
    color: palette.grayscale.dark,
    fontSize: 27,
  },
});

export default connect(null, {
  editPoint,
  removePoint,
  addImageToPoint,
})(Todo);
