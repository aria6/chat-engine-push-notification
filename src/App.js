import React from 'react';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ChatEngineCore from 'chat-engine';
import AuthorizeUserScreen from './user-auth';
import ChatsListScreen from './chats-list';
import CreateChatScreen from './create-chat';
import InviteUserScreen from './invite-user';
import ChatScreen from './chat';
import {plugin} from 'chat-engine-notifications';

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-0b66e28f-78aa-4ff8-97ea-af68a7a48fc5',
  subscribeKey: 'sub-c-37433568-d05f-11e8-8f2a-6ea01b4be699',
});

ChatEngine.proto(
  'Me',
  plugin({
    events: ['$.invite', 'message'],
    platforms: {ios: true, android: true},
  }),
);

// console log ChatEngine on user-auth.js

export default class ChatApplication extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dbdbdb'}}>
        <Navigator screenProps={{chatEngine: ChatEngine}} />
      </View>
    );
  }
}

/**
 * Navigation controller configuration.
 */
const Navigator = StackNavigator({
  Authorize: {screen: AuthorizeUserScreen},
  ChatsList: {screen: ChatsListScreen},
  CreateChat: {screen: CreateChatScreen},
  InviteUser: {screen: InviteUserScreen},
  Chat: {screen: ChatScreen},
});
