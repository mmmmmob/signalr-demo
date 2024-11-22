import { Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import * as signalR from "@microsoft/signalr";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

type EventReturn = {
  time: string;
  index: number;
  notification: boolean;
};

const App: FC = () => {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5179/notification-test")
    .configureLogging(signalR.LogLevel.None)
    .build();

  hubConnection.start();

  const [times, setTimes] = useState<string | null>(
    dayjs().format("HH:mm:ss DD-MM-YYYY")
  );

  useEffect(() => {
    hubConnection.on("ReceiveTime", (res: EventReturn) => {
      if (res.notification) {
        console.log(res);
        notifications.show({
          title: `Index at ${res.index}`,
          message: `Sent on ${dayjs(res.time).format("HH:mm:ss")}`,
          position: "bottom-center",
          withCloseButton: false,
          loading: false,
          autoClose: 3000,
          radius: "md",
          m: 20,
          withBorder: true,
          style: { textAlign: "center" },
        });
      }
      setTimes(dayjs(res.time).format("HH:mm:ss DD-MM-YYYY"));
    });
  }, []);

  return (
    <div>
      <Paper
        m={20}
        shadow="sm"
        radius="md"
        withBorder
        p="xl"
        style={{ textAlign: "center" }}
      >
        <Text fw={700} size="xl">
          Current time is:
        </Text>
        <Text>{times}</Text>
      </Paper>
    </div>
  );
};
export default App;
