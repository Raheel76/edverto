import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Progress,
  Tag,
  Tabs,
  Badge,
  Switch,
  Divider,
  Modal,
  message,
  Statistic,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined,
  CrownOutlined,
  SecurityScanOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { User, Mail, Phone, MapPin, Award, Shield } from "lucide-react";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  // Sample user data
  const userData = {
    id: 1,
    firstName: "Alex",
    lastName: "Rodriguez",
    email: "alex.rodriguez@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-03-15",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with a love for learning new technologies. Currently focusing on React, Node.js, and cloud architecture.",
    avatar: "/placeholder.svg?height=120&width=120",
    joinDate: "2023-08-15",
    lastActive: "2024-01-23T14:30:00Z",
    timezone: "America/Los_Angeles",
    language: "English",

    subscription: {
      plan: "Premium",
      status: "active",
      nextBilling: "2024-02-15",
      price: 29.99,
      features: [
        "Unlimited course access",
        "AI study assistant",
        "Priority support",
        "Downloadable resources",
        "Certificate of completion",
      ],
    },

    stats: {
      coursesEnrolled: 8,
      coursesCompleted: 3,
      totalHours: 127,
      certificates: 3,
      currentStreak: 12,
      totalPoints: 3450,
      level: 15,
    },

    enrolledCourses: [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        progress: 85,
        status: "in-progress",
        enrolledDate: "2023-12-01",
        lastAccessed: "2024-01-23",
        instructor: "Dr. Sarah Johnson",
        thumbnail: "/web-development-course.png",
      },
      {
        id: 2,
        title: "JavaScript Fundamentals",
        progress: 100,
        status: "completed",
        enrolledDate: "2023-11-15",
        completedDate: "2024-01-15",
        instructor: "Prof. Mike Chen",
        thumbnail: "/placeholder.svg?key=js-course",
        certificate: true,
      },
      {
        id: 3,
        title: "React Advanced Patterns",
        progress: 60,
        status: "in-progress",
        enrolledDate: "2024-01-10",
        lastAccessed: "2024-01-22",
        instructor: "Emma Wilson",
        thumbnail: "/react-patterns-course.png",
      },
    ],

    certificates: [
      {
        id: 1,
        courseTitle: "JavaScript Fundamentals",
        issuedDate: "2024-01-15",
        certificateId: "JS-FUND-2024-001",
        credentialUrl: "https://example.com/certificate/js-fund-001",
      },
      {
        id: 2,
        courseTitle: "Node.js Backend Development",
        issuedDate: "2024-01-20",
        certificateId: "NODE-DEV-2024-002",
        credentialUrl: "https://example.com/certificate/node-dev-002",
      },
    ],

    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      courseReminders: true,
      marketingEmails: false,
      theme: "dark",
      autoplay: true,
      subtitles: true,
    },
  };

  const handleSaveProfile = (values) => {
    console.log("Saving profile:", values);
    message.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    message.success("Account deletion request submitted. You will receive a confirmation email.");
    setDeleteAccountModal(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground text-lg">Manage your account settings and preferences</p>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Summary Sidebar */}
        <Col xs={24} lg={8}>
          <Card className="bg-card border-border mb-6">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar size={120} src={userData.avatar} icon={<UserOutlined />} />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CameraOutlined />}
                  size="small"
                  className="absolute bottom-0 right-0 bg-primary hover:bg-primary/80"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">{userData.email}</p>
                <div className="flex items-center justify-center gap-2">
                  <Tag color="blue" icon={<CrownOutlined />}>
                    {userData.subscription.plan}
                  </Tag>
                  <Tag color="green">Level {userData.stats.level}</Tag>
                </div>
              </div>

              <Divider />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="text-foreground font-medium">{dayjs(userData.joinDate).format("MMM YYYY")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courses completed</span>
                  <span className="text-foreground font-medium">{userData.stats.coursesCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning hours</span>
                  <span className="text-foreground font-medium">{userData.stats.totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current streak</span>
                  <span className="text-foreground font-medium">{userData.stats.currentStreak} days</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Card className="bg-card border-border text-center">
                <Statistic
                  title={<span className="text-muted-foreground text-xs">Points</span>}
                  value={userData.stats.totalPoints}
                  valueStyle={{ fontSize: "18px", color: "#f9fafb" }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="bg-card border-border text-center">
                <Statistic
                  title={<span className="text-muted-foreground text-xs">Certificates</span>}
                  value={userData.stats.certificates}
                  valueStyle={{ fontSize: "18px", color: "#f9fafb" }}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Main Content */}
        <Col xs={24} lg={16}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
            {/* Profile Information */}
            <TabPane tab="Profile Info" key="profile">
              <Card
                className="bg-card border-border"
                title={<span className="text-foreground">Personal Information</span>}
                extra={
                  <Button
                    type={isEditing ? "primary" : "default"}
                    icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                    onClick={() => {
                      if (isEditing) {
                        form.submit();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className={isEditing ? "bg-primary hover:bg-primary/80" : "border-border hover:border-primary"}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSaveProfile}
                  initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    dateOfBirth: dayjs(userData.dateOfBirth),
                    location: userData.location,
                    bio: userData.bio,
                    timezone: userData.timezone,
                    language: userData.language,
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item label="First Name" name="firstName">
                        <Input disabled={!isEditing} prefix={<User size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Last Name" name="lastName">
                        <Input disabled={!isEditing} prefix={<User size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Email" name="email">
                        <Input disabled={!isEditing} prefix={<Mail size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Phone" name="phone">
                        <Input disabled={!isEditing} prefix={<Phone size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Date of Birth" name="dateOfBirth">
                        <DatePicker disabled={!isEditing} className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Location" name="location">
                        <Input disabled={!isEditing} prefix={<MapPin size={16} />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Timezone" name="timezone">
                        <Select disabled={!isEditing}>
                          <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                          <Option value="America/New_York">Eastern Time (ET)</Option>
                          <Option value="America/Chicago">Central Time (CT)</Option>
                          <Option value="America/Denver">Mountain Time (MT)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Language" name="language">
                        <Select disabled={!isEditing}>
                          <Option value="English">English</Option>
                          <Option value="Spanish">Spanish</Option>
                          <Option value="French">French</Option>
                          <Option value="German">German</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Bio" name="bio">
                        <TextArea disabled={!isEditing} rows={4} placeholder="Tell us about yourself..." />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </TabPane>

            {/* Enrolled Courses */}
            <TabPane tab="My Courses" key="courses">
              <Card className="bg-card border-border" title={<span className="text-foreground">Enrolled Courses</span>}>
                <div className="space-y-4">
                  {userData.enrolledCourses.map((course) => (
                    <div key={course.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex gap-4">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          className="w-20 h-14 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag color={course.status === "completed" ? "green" : "blue"}>{course.status}</Tag>
                              {course.certificate && <Badge count={<Award size={16} className="text-yellow-500" />} />}
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium text-primary">{course.progress}%</span>
                            </div>
                            <Progress
                              percent={course.progress}
                              strokeColor={course.progress === 100 ? "#10b981" : "#0891b2"}
                              trailColor="#4b5563"
                              size="small"
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Enrolled: {dayjs(course.enrolledDate).format("MMM DD, YYYY")}
                            </span>
                            {course.status === "completed" ? (
                              <span className="text-green-500">
                                Completed: {dayjs(course.completedDate).format("MMM DD, YYYY")}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">
                                Last accessed: {dayjs(course.lastAccessed).format("MMM DD, YYYY")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabPane>

            {/* Subscription */}
            <TabPane tab="Subscription" key="subscription">
              <Card
                className="bg-card border-border"
                title={<span className="text-foreground">Subscription Plan</span>}
              >
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{userData.subscription.plan} Plan</h3>
                        <p className="text-muted-foreground">
                          Next billing: {dayjs(userData.subscription.nextBilling).format("MMM DD, YYYY")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${userData.subscription.price}</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground mb-3">Plan Features:</h4>
                      {userData.subscription.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="primary" className="bg-primary hover:bg-primary/80">
                      Upgrade Plan
                    </Button>
                    <Button className="border-border hover:border-primary">Manage Billing</Button>
                    <Button danger>Cancel Subscription</Button>
                  </div>
                </div>
              </Card>
            </TabPane>

            {/* Settings */}
            <TabPane tab="Settings" key="settings">
              <div className="space-y-6">
                {/* Notifications */}
                <Card
                  className="bg-card border-border"
                  title={<span className="text-foreground">Notification Preferences</span>}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive course updates and announcements</div>
                      </div>
                      <Switch defaultChecked={userData.preferences.emailNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about new lessons and deadlines
                        </div>
                      </div>
                      <Switch defaultChecked={userData.preferences.pushNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Weekly Digest</div>
                        <div className="text-sm text-muted-foreground">Summary of your learning progress</div>
                      </div>
                      <Switch defaultChecked={userData.preferences.weeklyDigest} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Course Reminders</div>
                        <div className="text-sm text-muted-foreground">Reminders to continue your courses</div>
                      </div>
                      <Switch defaultChecked={userData.preferences.courseReminders} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">
                          Promotional content and new course announcements
                        </div>
                      </div>
                      <Switch defaultChecked={userData.preferences.marketingEmails} />
                    </div>
                  </div>
                </Card>

                {/* Privacy & Security */}
                <Card
                  className="bg-card border-border"
                  title={<span className="text-foreground">Privacy & Security</span>}
                >
                  <div className="space-y-4">
                    <Button icon={<SecurityScanOutlined />} className="border-border hover:border-primary" block>
                      Change Password
                    </Button>

                    <Button icon={<Shield />} className="border-border hover:border-primary" block>
                      Two-Factor Authentication
                    </Button>

                    <Button icon={<DeleteOutlined />} className="border-border hover:border-primary" block>
                      Download My Data
                    </Button>

                    <Divider />

                    <Button danger icon={<DeleteOutlined />} onClick={() => setDeleteAccountModal(true)} block>
                      Delete Account
                    </Button>
                  </div>
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      {/* Delete Account Modal */}
      <Modal
        title="Delete Account"
        open={deleteAccountModal}
        onCancel={() => setDeleteAccountModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteAccountModal(false)}>
            Cancel
          </Button>,
          <Button key="delete" danger onClick={handleDeleteAccount}>
            Delete My Account
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p className="text-foreground">Are you sure you want to delete your account? This action cannot be undone.</p>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">This will permanently delete:</h4>
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
              <li>• Your profile and personal information</li>
              <li>• All course progress and certificates</li>
              <li>• Learning history and achievements</li>
              <li>• Wallet balance and transaction history</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentProfile;