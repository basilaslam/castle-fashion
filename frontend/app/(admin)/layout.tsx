"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import Navbar from "./admin/_components/Navbar";
import Sidebar from "./admin/_components/Sidebar";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Navbar />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
