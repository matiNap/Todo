import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';
import palette from '_palette';
import { NoteInfo } from '_types';
import dateformat from 'dateformat';
import typography from '_typography';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { saveNote } from '_actions/creators/app';
import metrics from '_metrics';

interface Props {
  info: NoteInfo;
  saveNote: typeof saveNote;
}

const NoteHeader = (props: Props) => {
  const { title, date, noteId } = props.info;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
          props.saveNote(noteId);
        }}
      >
        <Ionicons name="md-arrow-round-back" style={styles.icon} />
      </TouchableWithoutFeedback>
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>
          {dateformat(new Date(parseInt(date)), 'dd.mm.yyyy hh:MM')}
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
          props.saveNote(noteId);
        }}
      >
        <Entypo name="check" style={styles.check} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: metrics.statusBarHeight + 5,
    paddingHorizontal: 10,
    borderBottomColor: palette.grayscale.medium,
    borderBottomWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: metrics.margin.normal,
    alignItems: 'center',
  },
  time: {
    fontSize: typography.fontSize.verySmall,
    color: palette.grayscale.medium,
  },
  title: {
    fontSize: typography.fontSize.normal,
    color: palette.text.primary,
    alignSelf: 'center',
  },
  icon: {
    color: palette.text.primary,
    fontSize: 32,
  },
  check: {
    color: palette.actions.succes,
    fontSize: 32,
  },
});

export default connect(null, { saveNote })(NoteHeader);
