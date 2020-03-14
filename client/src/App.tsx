import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  ListRenderItemInfo,
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
            fontSize: 16,
            fontWeight: "bold",
        },
        content: {
            fontSize: 16,
            fontStyle: "normal",
        },
    });

    return (
        <TouchableNativeFeedback>
            <View key={props.id} style={style.notification}>
                <Text style={style.title}>{props.title}</Text>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={style.content}
                >{props.content}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const App: React.FC = (): React.ReactElement => {
  const [offset, setOffset] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
      if (offset >= 50) {
          return;
      }

      console.debug('Offset changed', offset);

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
              renderItem={(props) => NotificationListItem(props.item)}
              onEndReached={() => setOffset((previous: number) => previous + 10)}
              onEndReachedThreshold={0.2}
          />
      </SafeAreaView>
    </>
  );
};

export default App;
