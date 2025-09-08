
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "antd"
import { BookOpen, ArrowLeft } from "lucide-react"

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = async () => {
    const otpValue = otp.join("")
    if (otpValue.length === 6) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        console.log("OTP submitted:", otpValue)
        setLoading(false)
        navigate("/reset-password")
      }, 1000)
    }
  }

  const handleResend = () => {
    setTimeLeft(60)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    // Simulate resend API call
    console.log("Resending OTP...")
  }

  const isOtpComplete = otp.every((digit) => digit !== "")

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
          <h2 className="text-3xl font-bold text-foreground">Enter verification code</h2>
          <p className="mt-2 text-muted-foreground">
            We've sent a 6-digit code to your email address. Please enter it below to verify your identity.
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                maxLength={1}
                style={{
                  backgroundColor: "var(--input)",
                  borderColor: digit ? "var(--primary)" : "var(--border)",
                  color: "var(--foreground)",
                }}
              />
            ))}
          </div>

          <Button
            type="primary"
            size="large"
            loading={loading}
            disabled={!isOtpComplete}
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 border-primary h-12 text-base font-medium disabled:opacity-50"
          >
            Verify Code
          </Button>
        </div>

        {/* Resend Code */}
        <div className="text-center">
          {canResend ? (
            <button onClick={handleResend} className="text-primary hover:text-primary/80 font-medium">
              Resend verification code
            </button>
          ) : (
            <p className="text-muted-foreground">Resend code in {timeLeft} seconds</p>
          )}
        </div>

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

export default VerifyOtp

