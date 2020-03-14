import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import Axios, {AxiosResponse} from 'axios';

export interface Notification {
    id: string;
    title: string;
    content: string;
}

export interface Notifications {
    notifications: Notification[];
}

export const NotificationListItem: React.FC<Notification> = (props): React.ReactElement => {
    const style = StyleSheet.create({
        notification: {
            width: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
        },
        title: {
            fontSize: 22,
        },
        content: {
            fontSize: 16,
        },
    });

    return (
        <TouchableNativeFeedback>
            <View key={props.id} style={style.notification}>
                <Text style={style.title}>{props.title}</Text>
                <Text style={style.content}>{props.content}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const App: React.FC = (): React.ReactElement => {
  const [offset, setOffset] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
      Axios.get("http://localhost:8080/?offset=" + offset)
          .then((response: AxiosResponse<Notifications>) => {
              setNotifications(response.data.notifications)
          });
  }, [offset]);

  return (
    <>
      <StatusBar />
      <SafeAreaView>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => NotificationListItem(item)}
            />
      </SafeAreaView>
    </>
  );
};

export default App;
