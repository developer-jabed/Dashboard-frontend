// src/components/app-sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, LineChart, Package, Users, LogOut, Info  } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth-store"

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Users", url: "/users", icon: Users },
  { title: "Products", url: "/products", icon: Package },
  { title: "Analytics", url: "/analytics", icon: LineChart },
  { title: "About App", url: "/about", icon: Info },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isOpen = state === "expanded"
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="font-bold text-lg">T</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-6">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex w-full items-center gap-3"
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />

                  <span
                    className={cn(
                      "transition-opacity duration-300",
                      isOpen ? "opacity-100" : "opacity-0 w-0"
                    )}
                  >
                    {item.title}
                  </span>

                  {isActive && isOpen && (
                    <motion.div
                      layoutId="active-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </SidebarContent>


      <SidebarFooter className="border-t p-4">
        {user ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {isOpen && (
                <div className="flex flex-col text-sm">
                  <span className="font-medium text-foreground">
                    {user.email.split('@')[0]}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                    {user.email}
                  </span>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center">
            Not logged in
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />

      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 0.05 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0  from-primary/5 to-transparent pointer-events-none"
      />
    </Sidebar>
  )
}