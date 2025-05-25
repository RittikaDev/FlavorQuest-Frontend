import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import WithAuth from "@/role-wrappers/WithAuth";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WithAuth>
        <DashboardLayout role="user">{children}</DashboardLayout>
      </WithAuth>
    </ThemeProvider>
  );
};

export default layout;
