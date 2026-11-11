import { getUserConnected } from "@/utils";
import { Redirect } from "expo-router";

export default function index() {
  const user = getUserConnected();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  } else {
    return <Redirect href={"/(tabs)"} />;
  }
}
