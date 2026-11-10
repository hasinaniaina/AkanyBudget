import { Redirect } from "expo-router";

export default function deconnexion() {
  return <Redirect href="/(auth)/login" />;
}
