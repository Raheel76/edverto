
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Input, Form, Checkbox, Divider, message } from "antd"
import { Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react"
import { Icon } from "@iconify/react"
import { useEffect } from "react"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    try {
      const userData = localStorage.getItem("edverto-user")
      if (userData) {
        setStoredUser(JSON.parse(userData))
      }
    } catch (error) {
      message.error('error parsing stored user data:', error)
      message.error("Invalid stored user data . Please sign up again. ")
    }
  }, [])

  const onFinish = async (values) => {
    localStorage.getItem("edverto-user")

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        console.log("Login successful for user:", values.email)
        message.success("Login successfull!")
        setLoading(false)
        navigate("/")
        form.resetFields()
      } else {
        console.log("Login failed: Invalid credentials")
        message.error("Invalid email or password. Please check your credentials.")
        setLoading(false)
        form.resetFields()
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex h-[calc(100vh_-_10px)] auth-scroll  overflow-y-auto flex-col items-center justify- px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full  pt-20 space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Edverto</span>
            </Link>
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to your account to continue learning</p>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              size="large"
              className="w-full border-border !text-foreground hover:!text-primary hover:!border-primary h-12"
              icon={<Icon icon="logos:google-icon" className="w-5 h-5" />}
            >
              Continue with Google
            </Button>
          </div>

          <Divider className="!text-white">Or continue with email</Divider>

          {/* Login Form */}
          <Form name="login" form={form} onFinish={onFinish} layout="vertical" size="large" className="space-y-4">
            <Form.Item
              name="email"
              label={<span className="text-foreground font-medium">Email Address</span>}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                placeholder="Enter your email"
                className="h-12"
                style={{
                  backgroundColor: "var(--input)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-foreground font-medium">Password</span>}
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />)}
                className="h-12"
                style={{
                  backgroundColor: "var(--input)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" className="mb-0">
                <Checkbox className="text-muted-foreground">Remember me</Checkbox>
              </Form.Item>
              <Link to="/auth/forgot" className="text-primary hover:text-primary/80 text-sm font-medium">
                Forgot password?
              </Link>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-primary hover:bg-primary/90 border-primary h-12 text-base font-medium"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/auth/signup" className="text-primary hover:text-primary/80 font-medium">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/images/portrait-young-boy-student-attending-school_23-2150911615.jpg"
          alt="AI Learning Platform"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br  from-black/60 to-black/50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h3 className="text-3xl font-bold mb-4">Continue Your Learning Journey</h3>
            <p className="text-xl opacity-90">Access your personalized dashboard and pick up where you left off</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
