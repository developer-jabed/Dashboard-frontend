import { useEffect } from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  useOverview,
  useAnalytics,
  useProductsList,
  useUsersList,
} from "@/hooks/api/useDashboardApi"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

function MovingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ x: ["-30%", "130%"] }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        className="absolute top-20 w-80 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: ["-40%", "140%"] }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        className="absolute top-60 w-[28rem] h-52 bg-indigo-300/10 dark:bg-indigo-400/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: ["-20%", "120%"] }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        className="absolute bottom-20 w-96 h-44 bg-emerald-300/10 dark:bg-emerald-400/5 rounded-full blur-3xl"
      />
    </div>
  )
}

export default function OverviewPage() {
  const { data: overview, isPending: overviewLoading } = useOverview()
  const { data: analytics = [], isPending: analyticsLoading } = useAnalytics()
  const { data: products = [], isPending: productsLoading } = useProductsList()
  const { data: users = [], isPending: usersLoading } = useUsersList()

  const isLoading =
    overviewLoading || analyticsLoading || productsLoading || usersLoading

  useEffect(() => {
    if (isLoading) return

    gsap.fromTo(
      ".stat-card",
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
      }
    )
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <h1 className="text-3xl font-bold animate-pulse">Loading dashboard...</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-40 bg-muted/40 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="space-y-12 pb-12 p-6 rounded-3xl
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-900"
    >
      <MovingClouds />

      <div className="relative z-10 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Get a quick snapshot of your platform's performance. Track total users, revenue, active sessions, and your top-performing product. 
          The mini-charts show recent trends, helping you spot growth patterns or areas needing attention at a glance.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Today is {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>


      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ scale: 1.03, translateY: -4 }}>
          <Card className="stat-card border-l-4 border-indigo-500/80 shadow-lg hover:shadow-xl hover:border-indigo-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
            <CardHeader className="pb-2 flex items-center gap-3">
              <Users className="h-6 w-6 text-indigo-600" />
              <div>
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                  Total Users
                </CardTitle>
                <CardDescription className="text-xs">
                  All registered accounts on the platform
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
                <CountUp end={overview?.totalUsers ?? 0} separator="," duration={1.8} />
              </div>
              <p className="text-sm mt-1 text-indigo-600/90">
                {overview?.activeUsers ?? 0} currently active
              </p>

              <div className="h-16 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.slice(-7)}>
                    <defs>
                      <linearGradient id="usersSpark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#usersSpark)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                {(overview?.totalUsers ?? 0) > 0
                  ? `Your community has grown to ${(overview?.totalUsers ?? 0).toLocaleString()} members.`
                  : "No user data available yet."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03, translateY: -4 }}>
          <Card className="stat-card border-l-4 border-emerald-500/80 shadow-lg hover:shadow-xl hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
            <CardHeader className="pb-2 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              <div>
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                  Revenue
                </CardTitle>
                <CardDescription className="text-xs">
                  Total income generated this period
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-300 tracking-tight">
                ${" "}<CountUp end={overview?.revenue ?? 0} separator="," duration={1.8} />
              </div>
              <p className="text-sm mt-1 text-emerald-600/90">
                +{overview?.growth ?? 0}% compared to last month
              </p>

              <div className="h-16 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.slice(-7)}>
                    <defs>
                      <linearGradient id="revenueSpark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#revenueSpark)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                {(overview?.revenue ?? 0) > 0
                  ? `You've earned $${(overview?.revenue ?? 0).toLocaleString()} this period.`
                  : "No revenue recorded yet."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03, translateY: -4 }}>
          <Card className="stat-card border-l-4 border-violet-500/80 shadow-lg hover:shadow-xl hover:border-violet-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
            <CardHeader className="pb-2 flex items-center gap-3">
              <Activity className="h-6 w-6 text-violet-600" />
              <div>
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                  Active Sessions
                </CardTitle>
                <CardDescription className="text-xs">
                  Users currently browsing your platform
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-violet-700 dark:text-violet-300 tracking-tight">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-sm mt-1 text-violet-600/90">
                Live users right now
              </p>

              <div className="h-16 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.slice(-7)}>
                    <defs>
                      <linearGradient id="sessionsSpark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#sessionsSpark)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Real-time snapshot of concurrent user activity.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03, translateY: -4 }}>
          <Card className="stat-card border-l-4 border-amber-500/80 shadow-lg hover:shadow-xl hover:border-amber-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
            <CardHeader className="pb-2 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-amber-600" />
              <div>
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                  Top Product
                </CardTitle>
                <CardDescription className="text-xs">
                  Best-selling item by sales count
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-300 truncate">
                {products?.[0]?.name ?? "No products yet"}
              </div>
              <p className="text-sm mt-2 text-amber-600/90">
                {products?.[0]?.sales ?? 0} sales
              </p>

              <div className="h-16 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.slice(-7)}>
                    <defs>
                      <linearGradient id="topProductSpark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fill="url(#topProductSpark)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Your current bestseller — consider promoting similar items.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>


      <Card className="relative z-10 shadow-xl border border-gray-200/40 dark:border-gray-800/40 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            Activity Over Time
          </CardTitle>
          <CardDescription>
            Daily views and clicks over the last period. Use this to identify growth trends, seasonal patterns, or sudden changes that might need investigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 12,
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
                    padding: '12px 16px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#viewsGradient)"
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Clicks"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#clicksGradient)"
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>


      <Card className="relative z-10 shadow-xl border border-gray-200/40 dark:border-gray-800/40 bg-white/70 dark:bg-black/70 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            The 5 most recent users who joined or were active. Monitor new signups and engagement to understand who's joining your platform right now.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.slice(0, 5).map((user, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                  {user.name?.charAt(0) || "?"}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name || "Unknown User"}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.status === "active" ? "Currently active" : "Recently joined"}
                  </p>
                </div>
              </div>
              
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              No recent user activity to display yet.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground pt-6">
        Dashboard • Data refreshed {new Date().toLocaleTimeString()} • Dhaka, BD
      </div>
    </motion.div>
  )
}