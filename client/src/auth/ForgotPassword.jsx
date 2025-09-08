
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Input, Form } from "antd"
import { Mail, ArrowLeft, BookOpen, CheckCircle } from "lucide-react"

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Forgot password values:", values)
      setEmailSent(true)
      setLoading(false)
    }, 1000)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Check your email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to your email address. Please check your inbox and follow the
              instructions to reset your password.
            </p>

            <div className="space-y-4">
              <Button
                type="primary"
                size="large"
                className="w-full bg-primary hover:bg-primary/90 border-primary h-12"
                onClick={() => window.open("mailto:", "_blank")}
              >
                Open Email App
              </Button>

              <Link to="/login">
                <Button
                  size="large"
                  className="w-full border-border text-foreground hover:text-primary hover:border-primary h-12"
                >
                  Back to Login
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Didn't receive the email? Check your spam folder or{" "}
              <button onClick={() => setEmailSent(false)} className="text-primary hover:text-primary/80 font-medium">
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-primary p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Edverto</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Forgot your password?</h2>
          <p className="mt-2 text-muted-foreground">
            No worries! Enter your email address and we'll send you a reset link.
          </p>
        </div>

        {/* Forgot Password Form */}
        <Form name="forgotPassword" onFinish={onFinish} layout="vertical" size="large" className="space-y-6">
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
              placeholder="Enter your email address"
              className="h-12"
              style={{
                backgroundColor: "var(--input)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-primary hover:bg-primary/90 border-primary h-12 text-base font-medium"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
