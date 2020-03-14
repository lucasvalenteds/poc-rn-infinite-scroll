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
              setNotifications((previous: Notification[]) => [
                  ...previous,
                  ...response.data.notifications,
              ]);
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
                onEndReached={() => setOffset((previous: number) => previous + 10)}
                onEndReachedThreshold={0.7}
            />
      </SafeAreaView>
    </>
  );
};

export default App;
