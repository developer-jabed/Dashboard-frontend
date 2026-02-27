/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { postFetcher } from '@/utils/api/apiClient'
import { Player } from '@lottiefiles/react-lottie-player'

import unlocked from '@/assets/animations/Unlocked.json'

import Swal from 'sweetalert2'

export default function LoginPage() {
  const [email, setEmail] = useState('user1@example.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useAuthStore()
  const navigate = useNavigate()

  const lottieRef = useRef<Player>(null)

  useEffect(() => {
    gsap.fromTo(
      '.gsap-stagger',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.16,
        ease: 'power3.out',
      }
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await postFetcher<{
        id: number
        email: string
        token: string
      }>('/login', { email, password })

      setSuccess(true)

      if (lottieRef.current) {
        lottieRef.current.play() 
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Login successful!',
        text: 'Welcome back — redirecting...',
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })

      login(data.token, { id: data.id, email: data.email })

      setTimeout(() => {
        navigate('/dashboard')
      }, 2200)

    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.')

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Login failed',
        text: err.message || 'Please check your credentials.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ${
        success
          ? 'bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950'
          : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-4xl"
      >
        <Card
          className={`border shadow-2xl backdrop-blur-sm transition-all duration-700 ${
            success
              ? 'border-green-500/50 bg-gradient-to-b from-white to-green-50/80 dark:from-gray-900 dark:to-green-950/40'
              : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
          } hover:shadow-3xl`}
        >
          <CardHeader className="space-y-2 text-center pb-6 sm:pb-8">
            <motion.div className="gsap-stagger">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {success ? 'Access Granted!' : 'Welcome back'}
              </CardTitle>
            </motion.div>

            <motion.div className="gsap-stagger">
              <CardDescription className="text-base sm:text-lg">
                {success
                  ? 'You’re now logged in. Redirecting...'
                  : 'Sign in to access your dashboard'}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 transition-all duration-500">
 
              <div className="w-full lg:w-1/2 flex justify-center items-center min-h-[220px] lg:min-h-[320px]">
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                  <Player
                    ref={lottieRef}
                    autoplay={true}         
                    loop={true}            
                    src={unlocked}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>

              {/* Form */}
              <div className="w-full lg:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div className="space-y-2 gsap-stagger">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user1@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      required
                      disabled={loading || success}
                      autoComplete="email"
                      className="h-11 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30 transition-all"
                    />
                  </motion.div>

                  <motion.div className="space-y-2 gsap-stagger">
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading || success}
                        autoComplete="current-password"
                        className="h-11 pr-11 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                        disabled={loading || success}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm gsap-stagger"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.div
                    className="gsap-stagger"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      disabled={loading || success}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Signing in...
                        </>
                      ) : success ? (
                        'Success!'
                      ) : (
                        'Sign in'
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </CardContent>

          {!success && (
            <CardFooter className="flex flex-col items-center justify-center text-sm text-gray-600 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800 gsap-stagger">
              <p>Demo credentials:</p>
              <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                user1@example.com • password123
              </p>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  )
}