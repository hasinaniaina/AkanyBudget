import { Ionicons } from "@expo/vector-icons";

export interface Budget {
  id?: string;
  label: string;
  icon_background_color: string;
  icon: keyof typeof Ionicons.glyphMap;
  monthly_amount: string;
  unit_amount: string;
  unit: string;
  number: string;
  status: boolean;
  period: string;
  limit_type: "exact" | "automatic";
}
