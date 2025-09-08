import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Form, Checkbox, Divider, Select } from "antd";
import { Mail, Lock, Eye, EyeOff, BookOpen, User } from "lucide-react";
import { Icon } from "@iconify/react";

const { Option } = Select;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Signup values:", values);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen auth flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/images/girl-studying-university-library_23-2148844685.jpg"
          alt="AI Learning Platform"
          className="absolute inset-0 w-full h-full object-cover"
        />
         <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h3 className="text-3xl font-bold mb-4">Start Your AI-Powered Learning Journey</h3>
            <p className="text-xl opacity-90">
              Join thousands of learners advancing their careers with personalized education
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex h-[calc(100vh_-_10px)] auth-scroll  overflow-y-auto flex-col items-center justify- px-4 sm:px-6 lg:px-8">
        <div className=" inset-0 bg-gradient-to-br mb-8 from-secondary/80 to-primary/80 flex flex-col pt-20  items-center justify-center">
          <div className="text-center">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="bg-primary p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Edverto</span>
            </Link>
            <h2 className="text-3xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start learning with AI-powered personalization
            </p>
          </div>
        </div>
        <div className="max-w-3xl w-full space-y-8">
          
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label={
                  <span className="text-foreground font-medium">
                    First Name
                  </span>
                }
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input
                  prefix={<User className="h-4 w-4 text-muted-foreground" />}
                  placeholder="First name"
                  className="h-12"
                  style={{
                    backgroundColor: "var(--input)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={
                  <span className="text-foreground font-medium">Last Name</span>
                }
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input
                  placeholder="Last name"
                  className="h-12"
                  style={{
                    backgroundColor: "var(--input)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label={
                <span className="text-foreground font-medium">
                  Email Address
                </span>
              }
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
              name="role"
              label={
                <span className="text-foreground font-medium">I am a</span>
              }
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select placeholder="Select your role" className="h-12">
                <Option value="student">Student - I want to learn</Option>
                <Option value="teacher">Teacher - I want to teach</Option>
                <Option value="professional">
                  Professional - I want to upskill
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-foreground font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
            >
              <Input.Password
                prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                placeholder="Create a password"
                iconRender={(visible) =>
                  visible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )
                }
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
              label={
                <span className="text-foreground font-medium">
                  Confirm Password
                </span>
              }
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                placeholder="Confirm your password"
                iconRender={(visible) =>
                  visible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )
                }
                className="h-12"
                style={{
                  backgroundColor: "var(--input)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please accept the terms and conditions!")
                        ),
                },
              ]}
            >
              <Checkbox className="text-muted-foreground">
                I agree to the{" "}
                <Link to="#" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-primary hover:bg-primary/90 border-primary h-12 text-base font-medium"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
             <Divider className="!text-white ">
            Or sign up with email
          </Divider>
          <div className="space-y-3">
            <Button
              size="large"
              className="w-full !border-border !text-foreground hover:!text-primary hover:!border-primary !h-12"
              icon={<Icon icon="logos:google-icon" className="w-5 h-5" />}
            >
              Sign up with Google
            </Button>
          </div>
          {/* Login Link */}
          <div className="text-center">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="!text-primary hover:!text-primary/80 !font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
