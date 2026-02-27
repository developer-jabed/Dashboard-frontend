import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useAnalytics } from '@/hooks/api/useDashboardApi'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { TrendingUp,  Eye, MousePointer } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function AnalyticsPage() {
  const { data: analytics = [], isPending, isError } = useAnalytics()
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const filteredAnalytics = useMemo(() => {
    return analytics.filter((item) => {
      const date = new Date(item.date)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null
      if (start && date < start) return false
      if (end && date > end) return false
      return true
    })
  }, [analytics, startDate, endDate])

  const totalViews = filteredAnalytics.reduce((acc, item) => acc + item.views, 0)
  const totalClicks = filteredAnalytics.reduce((acc, item) => acc + item.clicks, 0)
  const totalConversions = filteredAnalytics.reduce(
    (acc, item) => acc + item.conversions,
    0
  )

  const previousAnalytics = useMemo(() => {
    if (!startDate || !endDate) return []
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end.getTime() - start.getTime()
    const prevStart = new Date(start.getTime() - diff - 86400000) // one day buffer
    const prevEnd = new Date(end.getTime() - diff - 86400000)
    return analytics.filter((item) => {
      const date = new Date(item.date)
      return date >= prevStart && date <= prevEnd
    })
  }, [analytics, startDate, endDate])

  const prevViews = previousAnalytics.reduce((acc, item) => acc + item.views, 0)
  const prevClicks = previousAnalytics.reduce((acc, item) => acc + item.clicks, 0)
  const prevConversions = previousAnalytics.reduce(
    (acc, item) => acc + item.conversions,
    0
  )

  const viewsChange = prevViews
    ? ((totalViews - prevViews) / prevViews) * 100
    : null
  const clicksChange = prevClicks
    ? ((totalClicks - prevClicks) / prevClicks) * 100
    : null
  const conversionsChange = prevConversions
    ? ((totalConversions - prevConversions) / prevConversions) * 100
    : null

  if (isPending) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Loading your performance data...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            Failed to load analytics data. Please try again later or check your
            connection.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="space-y-8 pb-12"
    >

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground max-w-3xl">
          Monitor how users discover, interact with, and convert on your content.
          Track total views, clicks, and meaningful conversions over your
          selected time period. Use the date filters below to compare performance
          against previous periods and spot trends or opportunities.
        </p>
      </div>


      <div className="flex justify-end gap-4 flex-wrap items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Showing data from:
        </div>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-[160px]"
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-[160px]"
        />
        {!startDate && !endDate && (
          <span className="text-xs text-muted-foreground italic">
            (Showing all available data)
          </span>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {/* Views Card */}
        <Card className="stat-card border-l-4 border-indigo-500/80 shadow-lg hover:shadow-xl hover:border-indigo-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
          <CardHeader className="pb-2 flex items-center gap-3">
            <Eye className="h-6 w-6 text-indigo-600" />
            <div>
              <CardTitle className="text-lg font-semibold text-muted-foreground">
                Total Views
              </CardTitle>
              <CardDescription className="text-xs">
                Number of times your content was displayed (page loads / impressions)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
                <CountUp end={totalViews} separator="," duration={1.5} />
              </div>
              {viewsChange !== null && (
                <div
                  className={`text-sm font-medium ${
                    viewsChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {viewsChange >= 0 ? '+' : ''}
                  {viewsChange.toFixed(1)}% vs previous period
                </div>
              )}
            </div>

            <div className="h-16 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredAnalytics}>
                  <defs>
                    <linearGradient id="viewsSpark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#viewsSpark)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              {totalViews > 0
                ? `Your content reached ${totalViews.toLocaleString()} times in the selected period.`
                : 'No view data available for this range.'}
            </p>
          </CardContent>
        </Card>


        <Card className="stat-card border-l-4 border-emerald-500/80 shadow-lg hover:shadow-xl hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
          <CardHeader className="pb-2 flex items-center gap-3">
            <MousePointer className="h-6 w-6 text-emerald-600" />
            <div>
              <CardTitle className="text-lg font-semibold text-muted-foreground">
                Total Clicks
              </CardTitle>
              <CardDescription className="text-xs">
                User interactions (link clicks, buttons, CTAs)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-300 tracking-tight">
                <CountUp end={totalClicks} separator="," duration={1.5} />
              </div>
              {clicksChange !== null && (
                <div
                  className={`text-sm font-medium ${
                    clicksChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {clicksChange >= 0 ? '+' : ''}
                  {clicksChange.toFixed(1)}% vs previous
                </div>
              )}
            </div>

            <div className="h-16 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredAnalytics}>
                  <defs>
                    <linearGradient id="clicksSpark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#clicksSpark)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              {totalClicks > 0
                ? `${totalClicks.toLocaleString()} clicks show strong interest — CTR ≈ ${
                    totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '—'
                  }%`
                : 'No click activity detected in this period.'}
            </p>
          </CardContent>
        </Card>


        <Card className="stat-card border-l-4 border-amber-500/80 shadow-lg hover:shadow-xl hover:border-amber-600 transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-black/70 backdrop-blur-md">
          <CardHeader className="pb-2 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-amber-600" />
            <div>
              <CardTitle className="text-lg font-semibold text-muted-foreground">
                Total Conversions
              </CardTitle>
              <CardDescription className="text-xs">
                Completed goals (signups, purchases, form submits, etc.)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-extrabold text-amber-700 dark:text-amber-300 tracking-tight">
                <CountUp end={totalConversions} separator="," duration={1.5} />
              </div>
              {conversionsChange !== null && (
                <div
                  className={`text-sm font-medium ${
                    conversionsChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {conversionsChange >= 0 ? '+' : ''}
                  {conversionsChange.toFixed(1)}% vs previous
                </div>
              )}
            </div>

            <div className="h-16 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredAnalytics}>
                  <defs>
                    <linearGradient
                      id="conversionsSpark"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#conversionsSpark)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              {totalConversions > 0
                ? `You achieved ${totalConversions.toLocaleString()} valuable actions — conversion rate ≈ ${
                    totalClicks > 0
                      ? ((totalConversions / totalClicks) * 100).toFixed(1)
                      : '—'
                  }%`
                : 'No conversions recorded in the selected date range.'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border border-gray-200/40 dark:border-gray-800/40 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            Activity Over Time
          </CardTitle>
          <CardDescription>
            Daily trends of views, clicks, and conversions. Use this chart to
            identify patterns, peaks (campaign success?), or drops (issues to
            investigate?).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[420px] w-full">
          {filteredAnalytics.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No data available for the selected date range. Try adjusting the
              filters or check if analytics are being tracked.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredAnalytics}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="clicksGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="conversionsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 12,
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
                    padding: '12px 16px',
                  }}
                  labelStyle={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#viewsGradient)"
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: '#fff', strokeOpacity: 0.8 }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Clicks"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#clicksGradient)"
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: '#fff', strokeOpacity: 0.8 }}
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  name="Conversions"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="url(#conversionsGradient)"
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: '#fff', strokeOpacity: 0.8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground pt-4">
        Data is updated in real-time • Last refreshed {new Date().toLocaleTimeString()}
      </div>
    </motion.div>
  )
}