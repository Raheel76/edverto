
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Input, Form } from "antd"
import { Lock, Eye, EyeOff, BookOpen, CheckCircle } from "lucide-react"

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Reset password values:", values)
      setPasswordReset(true)
      setLoading(false)
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    }, 1000)
  }

  if (passwordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Password reset successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your password has been successfully reset. You can now log in with your new password.
            </p>

            <Link to="/login">
              <Button type="primary" size="large" className="w-full bg-primary hover:bg-primary/90 border-primary h-12">
                Continue to Login
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground mt-4">Redirecting to login page in 3 seconds...</p>
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
          <h2 className="text-3xl font-bold text-foreground">Reset your password</h2>
          <p className="mt-2 text-muted-foreground">Enter your new password below. Make sure it's strong and secure.</p>
        </div>

        {/* Reset Password Form */}
        <Form name="resetPassword" onFinish={onFinish} layout="vertical" size="large" className="space-y-6">
          <Form.Item
            name="password"
            label={<span className="text-foreground font-medium">New Password</span>}
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
              placeholder="Enter your new password"
              iconRender={(visible) => (visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />)}
              className="h-12"
              style={{
                backgroundColor: "var(--input)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<span className="text-foreground font-medium">Confirm New Password</span>}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Passwords do not match!"))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
              placeholder="Confirm your new password"
              iconRender={(visible) => (visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />)}
              className="h-12"
              style={{
                backgroundColor: "var(--input)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </Form.Item>

          {/* Password Requirements */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Password requirements:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains at least one uppercase letter</li>
              <li>• Contains at least one lowercase letter</li>
              <li>• Contains at least one number</li>
            </ul>
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-primary hover:bg-primary/90 border-primary h-12 text-base font-medium"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword


