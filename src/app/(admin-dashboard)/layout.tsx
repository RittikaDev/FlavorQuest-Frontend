import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import WithAdmin from "@/role-wrappers/WithAdmin";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WithAdmin>
        <DashboardLayout role="admin">{children}</DashboardLayout>
      </WithAdmin>
    </ThemeProvider>
  );
};

export default layout;
