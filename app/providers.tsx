"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
