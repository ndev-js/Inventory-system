import { ReactElement } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Shirt,
  ClipboardPenLine,
  Package,
} from "lucide-react";
import { SidebarItem } from "./types/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard strokeWidth={1.5} />,
    path: "/dashboard",
  },
  {
    name: "Store",
    icon: <Package strokeWidth={1.5} />,
    path: "/store",
  },
  {
    name: "Inventory",
    icon: <ClipboardPenLine strokeWidth={1.5} />,
    path: "/inventory",
  },
  {
    name: "Products",
    icon: <Shirt strokeWidth={1.5} />,
    path: "/products",
  },
  {
    name: "Orders",
    icon: <ShoppingCart strokeWidth={1.5} />,
    path: "/orders",
  },
];
