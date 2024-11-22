import { Box } from "@mantine/core";
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
    hubConnection.on("RecieveTime", (res: EventReturn) => {
      if (res.notification) {
        console.log(res);
        notifications.show({
          title: `Index at ${res.index}`,
          message: `Sent on ${dayjs(res.time).format("MMM DD, YYYY")}`,
          position: "top-center",
          withCloseButton: false,
          loading: false,
          autoClose: 1000,
        });
      }
      setTimes(dayjs(res.time).format("HH:mm:ss DD-MM-YYYY"));
    });
  }, []);

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Current time is</h1>
        <h3>{times}</h3>
      </Box>
    </>
  );
};
export default App;
