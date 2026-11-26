import { handleLogout } from "@/utils";
import { useEffect } from "react";

export default function deconnexion() {
  useEffect(() => {
    handleLogout();
  }, []);

  return <></>;
}
