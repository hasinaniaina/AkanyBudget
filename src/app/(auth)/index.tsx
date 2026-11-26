import { getUserConnected } from "@/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function index() {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const userConnected = async () => {
      const userIsConnected = await getUserConnected();
      if (userIsConnected) {
        router.push("/(tabs)");
      } else {
        router.push("/(auth)/login");
      }
      setUser(userIsConnected);
    };
    userConnected();
  }, []);
}
