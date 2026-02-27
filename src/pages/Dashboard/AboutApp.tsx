import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, Link2, QrCode, BarChart3, Zap, Code } from 'lucide-react'

const keyBenefits = [
  {
    icon: Link2,
    title: "Short links in seconds",
    points: [
      "Instant short link from any URL",
      "Custom slugs & branded domains",
      "Unlimited on free plan",
    ],
  },
  {
    icon: QrCode,
    title: "Smart dynamic QR codes",
    points: [
      "Update destination without new QR",
      "Add logo, colors & frame",
      "Separate scan vs click tracking",
    ],
  },
  {
    icon: BarChart3,
    title: "Powerful analytics",
    points: [
      "Real-time clicks & location map",
      "Device, browser & referrer stats",
      "Hourly/daily/monthly trends",
      "One-click CSV export",
    ],
  },
  {
    icon: Zap,
    title: "Fast & reliable",
    points: [
      "99.99% uptime (last 12 months)",
      "Global CDN — low latency",
      "No ads, no popups",
    ],
  },
]

const techStack = [
  "Next.js 14 (App Router)",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui components",
  "React Hook Form + Zod",
  "TanStack Query",
  "Recharts",
  "Framer Motion",
  "Lucide Icons",
  "PostgreSQL + Prisma",
]

const quickStartSteps = [
  {
    number: "1",
    title: "Create free account",
    description: "Sign up in <20 seconds — no card needed.",
  },
  {
    number: "2",
    title: "Shorten your first link",
    description: "Paste URL, set custom slug (optional), click Shorten.",
  },
  {
    number: "3",
    title: "Copy & share",
    description: "Get short link + QR instantly — copy or download.",
  },
  {
    number: "4",
    title: "Track performance",
    description: "View real-time clicks, locations & devices.",
  },
]

export default function AboutApp() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Short links. Real analytics.<br className="hidden sm:block" />
              <span className="text-primary">Made simple.</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Create short links, beautiful QR codes and powerful dashboards —  
              everything you need to share, track and grow your online presence.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline">
                See Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you can do with this app
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical features that save time and give you control
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {keyBenefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-100 dark:bg-gray-900/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How to use this app
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start in under 2 minutes — follow these steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <div className="relative h-full">
                  <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-md">
                    {step.number}
                  </div>

                  <Card className="h-full pt-8 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="h-12 px-10 text-base">
              Create my first short link →
            </Button>
          </div>
        </div>
      </section>

      {/* How this app was built */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How this app was created
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Modern, full-stack application built with best current practices
            </p>
          </div>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">Tech stack & architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {techStack.map((tech, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                <p>• Next.js App Router + Server Components for fast performance</p>
                <p>• TypeScript everywhere for better maintainability</p>
                <p>• Prisma + PostgreSQL for type-safe database access</p>
                <p>• Authentication with NextAuth.js / Auth.js</p>
                <p>• Real-time analytics tracking with server actions</p>
                <p>• Deployed on Vercel with automatic scaling</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Ready to shorten, track and grow?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            No credit card. No time limit. No complicated setup.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline">
              See all features
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}