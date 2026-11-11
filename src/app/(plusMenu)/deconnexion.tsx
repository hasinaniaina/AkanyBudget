import { handleLogout } from "@/utils";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function deconnexion() {
  useEffect(() => {
    handleLogout();
  }, []);

  return <Redirect href="/(auth)/login" />;
}
