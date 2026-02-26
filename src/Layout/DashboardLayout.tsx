
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout() {
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname.split("/").filter(Boolean);
    return path.map((segment, i) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + path.slice(0, i + 1).join("/"),
      isLast: i === path.length - 1,
    }));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-8" />
          <Breadcrumb>
            <BreadcrumbList>
              {getBreadcrumb().map((crumb, i) => (
                <div key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <BreadcrumbSeparator />}
                  {crumb.isLast ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 space-y-4 p-6 pb-16 md:p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}