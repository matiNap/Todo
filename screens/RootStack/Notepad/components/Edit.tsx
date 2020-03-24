import React from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import { Point } from '_types';
import palette from '_palette';
import { connect } from 'react-redux';
import metrics from '_metrics';

import _ from 'lodash';
import { RootState } from '_rootReducer';
import Todo from './Todo';
import { AntDesign } from '@expo/vector-icons';
import { addPoint, saveNote } from '_actions/creators/app';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

interface Props {
  points: Point[];
  noteId: string;
  addPoint: typeof addPoint;
  saveNote: typeof saveNote;
}

class Edit extends React.Component<Props> {
  componentDidMount() {
    const { noteId } = this.props;
    AppState.addEventListener('change', nextState => {
      if (nextState === 'background') {
        this.props.saveNote(noteId);
      }
    });
  }
  render() {
    const { points, noteId } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {points.map(point => {
            return (
              <Todo key={point.id} todo={point} noteId={noteId} />
            );
          })}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.addPoint(noteId);
            }}
          >
            <AntDesign name="plus" style={styles.icon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.secondary,
    paddingHorizontal: metrics.margin.medium,
    paddingVertical: metrics.margin.big,
  },
  icon: {
    fontSize: 40,
    color: palette.secondary,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

const mapStateToProps = (state: RootState, ownProps: Props) => {
  const points = state.app.points[ownProps.noteId];
  return {
    points: points ? _.sortBy(points, ['iid']) : [],
  };
};

export default connect(mapStateToProps, { addPoint, saveNote })(Edit);
