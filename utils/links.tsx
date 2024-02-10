import React from "react";
import { NavLink } from "@/types/links";
import { AreaChart, Layers, AppWindow } from "lucide-react";

export const links: NavLink[] = [
  { href: "/add-job", label: "add job", icon: <Layers /> },
  { href: "/jobs", label: "all jobs", icon: <AppWindow /> },
  { href: "/stats", label: "stats", icon: <AreaChart /> },
];
