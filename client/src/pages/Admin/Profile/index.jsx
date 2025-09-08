import { useState } from "react"
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  message,
  Row,
  Col,
  Divider,
  Switch,
  Select,
  TimePicker,
  Tabs,
} from "antd"
import {
  UserOutlined,
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import moment from "moment"

const { Option } = Select
const { TabPane } = Tabs
const { TextArea } = Input

const AdminProfile = () => {
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [settingsForm] = Form.useForm()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  // Sample admin data
  const adminData = {
    name: "Admin User",
    email: "admin@ailearning.com",
    phone: "+1 234 567 8900",
    role: "Super Admin",
    department: "Technology",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20 14:30",
    avatar: "/api/placeholder/120/120",
    bio: "Experienced administrator with 5+ years in educational technology management.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
  }

  const handleProfileUpdate = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Profile updated successfully")
      setEditing(false)
    } catch (error) {
      message.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Password changed successfully")
      passwordForm.resetFields()
    } catch (error) {
      message.error("Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const handleSettingsUpdate = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Settings updated successfully")
    } catch (error) {
      message.error("Failed to update settings")
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      message.success("Avatar updated successfully")
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-foreground text-2xl font-bold mb-6">Admin Profile</h2>

        <Tabs defaultActiveKey="profile" className="custom-tabs">
          <TabPane tab="Profile Information" key="profile">
            <Card className="bg-card border-border">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar size={120} src={adminData.avatar} icon={<UserOutlined />} />
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    onChange={handleAvatarChange}
                    className="absolute bottom-0 right-0"
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      size="small"
                      icon={<UploadOutlined />}
                      className="bg-primary hover:bg-primary/90"
                    />
                  </Upload>
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-xl font-semibold mb-2">{adminData.name}</h3>
                  <p className="text-muted-foreground mb-1">
                    {adminData.role} • {adminData.department}
                  </p>
                  <p className="text-muted-foreground text-sm">Member since {adminData.joinDate}</p>
                  <p className="text-muted-foreground text-sm">Last login: {adminData.lastLogin}</p>
                </div>
                <Button
                  type={editing ? "default" : "primary"}
                  icon={editing ? <SaveOutlined /> : <EditOutlined />}
                  onClick={() => setEditing(!editing)}
                  className={editing ? "" : "bg-primary hover:bg-primary/90"}
                >
                  {editing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <Divider />

              {/* Profile Form */}
              <Form
                form={form}
                layout="vertical"
                initialValues={adminData}
                onFinish={handleProfileUpdate}
                disabled={!editing}
              >
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label={<span className="text-foreground">Full Name</span>}
                      rules={[{ required: true, message: "Please input your name!" }]}
                    >
                      <Input className="bg-input border-border text-foreground" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label={<span className="text-foreground">Email</span>}
                      rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
                    >
                      <Input className="bg-input border-border text-foreground" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item name="phone" label={<span className="text-foreground">Phone Number</span>}>
                      <Input className="bg-input border-border text-foreground" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="location" label={<span className="text-foreground">Location</span>}>
                      <Input className="bg-input border-border text-foreground" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item name="department" label={<span className="text-foreground">Department</span>}>
                      <Select className="custom-select" disabled>
                        <Option value="Technology">Technology</Option>
                        <Option value="Education">Education</Option>
                        <Option value="Operations">Operations</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="timezone" label={<span className="text-foreground">Timezone</span>}>
                      <Select className="custom-select">
                        <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                        <Option value="America/New_York">Eastern Time (ET)</Option>
                        <Option value="America/Chicago">Central Time (CT)</Option>
                        <Option value="Europe/London">Greenwich Mean Time (GMT)</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="bio" label={<span className="text-foreground">Bio</span>}>
                  <TextArea
                    rows={4}
                    className="bg-input border-border text-foreground"
                    placeholder="Tell us about yourself..."
                  />
                </Form.Item>

                {editing && (
                  <Form.Item className="mb-0">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </Card>
          </TabPane>

          <TabPane tab="Security" key="security">
            <Card
              title={
                <span className="text-foreground flex items-center gap-2">
                  <LockOutlined />
                  Change Password
                </span>
              }
              className="bg-card border-border"
            >
              <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
                <Form.Item
                  name="currentPassword"
                  label={<span className="text-foreground">Current Password</span>}
                  rules={[{ required: true, message: "Please input your current password!" }]}
                >
                  <Input.Password className="bg-input border-border text-foreground" />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label={<span className="text-foreground">New Password</span>}
                  rules={[
                    { required: true, message: "Please input your new password!" },
                    { min: 8, message: "Password must be at least 8 characters!" },
                  ]}
                >
                  <Input.Password className="bg-input border-border text-foreground" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={<span className="text-foreground">Confirm New Password</span>}
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Please confirm your new password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error("Passwords do not match!"))
                      },
                    }),
                  ]}
                >
                  <Input.Password className="bg-input border-border text-foreground" />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button type="primary" htmlType="submit" loading={loading} className="bg-primary hover:bg-primary/90">
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          <TabPane tab="Preferences" key="preferences">
            <Card
              title={
                <span className="text-foreground flex items-center gap-2">
                  <SettingOutlined />
                  System Preferences
                </span>
              }
              className="bg-card border-border mb-6"
            >
              <Form
                form={settingsForm}
                layout="vertical"
                onFinish={handleSettingsUpdate}
                initialValues={{
                  emailNotifications: true,
                  pushNotifications: false,
                  weeklyReports: true,
                  maintenanceAlerts: true,
                  workingHours: [moment("09:00", "HH:mm"), moment("17:00", "HH:mm")],
                }}
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-foreground font-medium mb-4">Notification Settings</h4>
                    <div className="space-y-4">
                      <Form.Item name="emailNotifications" valuePropName="checked" className="mb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-foreground">Email Notifications</span>
                            <p className="text-muted-foreground text-sm">Receive important updates via email</p>
                          </div>
                          <Switch />
                        </div>
                      </Form.Item>

                      <Form.Item name="pushNotifications" valuePropName="checked" className="mb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-foreground">Push Notifications</span>
                            <p className="text-muted-foreground text-sm">Receive browser push notifications</p>
                          </div>
                          <Switch />
                        </div>
                      </Form.Item>

                      <Form.Item name="weeklyReports" valuePropName="checked" className="mb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-foreground">Weekly Reports</span>
                            <p className="text-muted-foreground text-sm">Get weekly analytics reports</p>
                          </div>
                          <Switch />
                        </div>
                      </Form.Item>

                      <Form.Item name="maintenanceAlerts" valuePropName="checked" className="mb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-foreground">Maintenance Alerts</span>
                            <p className="text-muted-foreground text-sm">Notifications about system maintenance</p>
                          </div>
                          <Switch />
                        </div>
                      </Form.Item>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="text-foreground font-medium mb-4">Working Hours</h4>
                    <Form.Item
                      name="workingHours"
                      label={<span className="text-foreground">Set your working hours</span>}
                    >
                      <TimePicker.RangePicker format="HH:mm" className="custom-time-picker" />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item className="mb-0 mt-6">
                  <Button type="primary" htmlType="submit" loading={loading} className="bg-primary hover:bg-primary/90">
                    Save Preferences
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminProfile
