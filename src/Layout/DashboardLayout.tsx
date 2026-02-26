import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor, LogOut } from "lucide-react"
import { useContext } from "react"
import { ThemeProviderContext } from "@/context/theme.context"
import { useAuthStore } from "@/store/auth-store"

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useContext(ThemeProviderContext)
  const { logout } = useAuthStore()

  const getBreadcrumb = () => {
    const path = location.pathname.split("/").filter(Boolean)
    return path.map((segment, i) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + path.slice(0, i + 1).join("/"),
      isLast: i === path.length - 1,
    }))
  }

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-5 w-5" />
      case "light":
        return <Sun className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-8" />

          <div className="flex-1 flex items-center justify-between">
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

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                title={`Current theme: ${theme}`}
              >
                {getThemeIcon()}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-6 pb-16 md:p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}