import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState("");

  const { session } = useAuth();
  const user_id = session?.user.id;

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  //save push token should be called not after token is received/created, but after user has received profile or session data
  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken ?? "");
    if (!newToken) {
      return;
    }
    console.log("new token", newToken);

    //update token in db
    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("user_id", user_id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        savePushToken(token);
      })
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [session]);

  return <>{children}</>;
};

export default NotificationProvider;
