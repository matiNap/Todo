import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import dateformat from 'dateformat';
import { useNavigation } from '@react-navigation/native';
import { NoteInfo, Note } from '_types';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { removeNote, syncDatabase } from '_actions/creators/app';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import { FontAwesome } from '@expo/vector-icons';
import palette from '_palette';

interface Props {
  notes: Note[];
  navgiation: any;
  removeNote: typeof removeNote;
  syncDatabase: typeof syncDatabase;
}

const renderItem = (item: NoteInfo, navigation) => {
  const { date, title } = item;

  return (
    <ListItem
      containerStyle={{ backgroundColor: palette.secondary }}
      style={{ height: 70 }}
      onPress={() => {
        navigation.navigate('notepad', item);
      }}
      title={title}
      subtitle={dateformat(
        new Date(parseInt(date)),
        'dd.mm.yyyy hh:MM',
      )}
      bottomDivider
    />
  );
};

const renderDelete = (onRemove: () => void) => {
  return (
    <View style={styles.listItem}>
      <TouchableWithoutFeedback onPress={onRemove}>
        <FontAwesome name="trash" style={styles.trashIcon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

class TodoList extends React.Component<Props> {
  componentDidMount() {
    this.props.syncDatabase();
  }
  render() {
    const { notes } = this.props;
    return (
      <View>
        <SwipeableFlatList
          keyExtractor={(item, index) => index.toString()}
          data={notes}
          renderItem={({ item }) => {
            return renderItem(item, this.props.navigation);
          }}
          renderRight={({ item }) =>
            renderDelete(() => {
              this.props.removeNote(item.noteId);
            })
          }
          backgroundColor={palette.secondary}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  trashIcon: {
    fontSize: 30,
    color: palette.secondary,
    alignSelf: 'center',
  },
  listItem: {
    width: 70,
    height: 70,
    backgroundColor: palette.actions.error,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    notes: Object.values(state.app.notes),
  };
};
export default connect(mapStateToProps, {
  removeNote,
  syncDatabase,
})(props => {
  const navigation = useNavigation();
  return <TodoList navigation={navigation} {...props} />;
});
