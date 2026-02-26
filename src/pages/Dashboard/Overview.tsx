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
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    )
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <h1 className="text-3xl font-bold animate-pulse">Loading...</h1>
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
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden space-y-12 p-6 rounded-3xl
      bg-gradient-to-br 
      from-indigo-50 via-white to-emerald-50
      dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0b1120]"
    >

      <MovingClouds />


      <div className="relative z-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>


      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* USERS */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="stat-card backdrop-blur-md bg-white/70 dark:bg-white/5 border border-white/20 shadow-xl rounded-2xl transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-5 w-5 text-indigo-600" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-indigo-600">
                <CountUp end={overview?.totalUsers ?? 0} duration={2} separator="," />
              </div>
              <p className="text-sm mt-2 text-indigo-500">
                {overview?.activeUsers ?? 0} active now
              </p>

              <div className="h-14 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.slice(-7)}>
                    <Area type="monotone" dataKey="views" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* REVENUE */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="stat-card backdrop-blur-md bg-white/70 dark:bg-white/5 border border-white/20 shadow-xl rounded-2xl transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-emerald-600">
                $<CountUp end={overview?.revenue ?? 0} duration={2.2} separator="," />
              </div>
              <p className="text-sm mt-2 text-emerald-500">
                +{overview?.growth ?? 0}% this month
              </p>

              <div className="h-14 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.slice(-7)}>
                    <Area type="monotone" dataKey="clicks" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>


        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="stat-card backdrop-blur-md bg-white/70 dark:bg-white/5 border border-white/20 shadow-xl rounded-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-5 w-5 text-violet-600" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-violet-600">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-sm mt-2 text-violet-500">
                Live users right now
              </p>
            </CardContent>
          </Card>
        </motion.div>


        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="stat-card backdrop-blur-md bg-white/70 dark:bg-white/5 border border-white/20 shadow-xl rounded-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                Top Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">
                {products?.[0]?.name ?? "—"}
              </div>
              <p className="text-sm mt-2 text-amber-500">
                {products?.[0]?.sales ?? 0} sales
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="relative z-10 backdrop-blur-md bg-white/70 dark:bg-white/5 border border-white/20 shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle>Activity Over Time</CardTitle>
          <CardDescription>Last 7 days performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Area type="monotone" dataKey="views" stroke="#6366f1" fill="url(#viewsGrad)" strokeWidth={2}/>
                <Area type="monotone" dataKey="clicks" stroke="#10b981" fill="url(#clicksGrad)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>


      <Card className="relative z-10 backdrop-blur-md bg-white/70 dark:bg-white/5 border border-white/20 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest 5 users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.slice(0, 5).map((user, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-600">
                  {user.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Logged in recently
                  </p>
                </div>
              </div>
              {/* <span className="text-xs text-muted-foreground">
                {new Date(user.updatedAt).toLocaleTimeString() || "—"}
              </span> */}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}