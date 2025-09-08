import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Modal,
  Tag,
  Avatar,
  List,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartNoAxesCombined } from "lucide-react";

const AdminDashboard = () => {
  const [recentActivityModal, setRecentActivityModal] = useState(false);

  // Sample data
  const monthlyData = [
    { month: "Jan", students: 120, revenue: 15000, courses: 25 },
    { month: "Feb", students: 150, revenue: 18000, courses: 28 },
    { month: "Mar", students: 180, revenue: 22000, courses: 32 },
    { month: "Apr", students: 220, revenue: 28000, courses: 35 },
    { month: "May", students: 280, revenue: 35000, courses: 40 },
    { month: "Jun", students: 320, revenue: 42000, courses: 45 },
  ];

  const coursePopularityData = [
    { name: "AI & ML", value: 35, color: "#8b5cf6" },
    { name: "Web Dev", value: 25, color: "#22d3ee" },
    { name: "Data Science", value: 20, color: "#10b981" },
    { name: "Mobile Dev", value: 12, color: "#f59e0b" },
    { name: "Others", value: 8, color: "#ef4444" },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New teacher registration",
      user: "Dr. Sarah Johnson",
      time: "2 minutes ago",
      type: "teacher",
    },
    {
      id: 2,
      action: "Course submitted for approval",
      user: "Prof. Mike Chen",
      time: "15 minutes ago",
      type: "course",
    },
    {
      id: 3,
      action: "Student enrollment",
      user: "Alex Rodriguez",
      time: "1 hour ago",
      type: "student",
    },
    {
      id: 4,
      action: "Payment received",
      user: "Emma Wilson",
      time: "2 hours ago",
      type: "payment",
    },
    {
      id: 5,
      action: "Course completed",
      user: "John Smith",
      time: "3 hours ago",
      type: "completion",
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "Teacher",
      name: "Dr. Lisa Wang",
      subject: "Machine Learning Expert",
      status: "pending",
    },
    {
      id: 2,
      type: "Course",
      name: "Advanced React Patterns",
      teacher: "Prof. David Kim",
      status: "pending",
    },
    {
      id: 3,
      type: "Teacher",
      name: "Mark Thompson",
      subject: "Data Science Specialist",
      status: "pending",
    },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={
                <span className="text-muted-foreground">Total Students</span>
              }
              value={2847}
              prefix={<UserOutlined className="text-primary" />}
              suffix={
                <div className="flex items-center mt-2">
                  <ChartNoAxesCombined className="text-emerald-500 mr-1" />
                  <span className="text-emerald-500 text-sm">+12.5%</span>
                </div>
              }
              valueStyle={{
                color: "#f9fafb",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={
                <span className="text-muted-foreground">Active Teachers</span>
              }
              value={156}
              prefix={<TeamOutlined className="text-cyan-400" />}
              suffix={
                <div className="flex items-center mt-2">
                  <ChartNoAxesCombined className="text-emerald-500 mr-1" />
                  <span className="text-emerald-500 text-sm">+8.3%</span>
                </div>
              }
              valueStyle={{
                color: "#f9fafb",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={
                <span className="text-muted-foreground">Total Courses</span>
              }
              value={89}
              prefix={<BookOutlined className="text-emerald-500" />}
              suffix={
                <div className="flex items-center mt-2">
                  <ChartNoAxesCombined className="text-emerald-500 mr-1" />
                  <span className="text-emerald-500 text-sm">+15.2%</span>
                </div>
              }
              valueStyle={{
                color: "#f9fafb",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={
                <span className="text-muted-foreground">Monthly Revenue</span>
              }
              value={42000}
              prefix={<DollarOutlined className="text-yellow-500" />}
              suffix={
                <div className="flex items-center mt-2">
                  <ChartNoAxesCombined className="text-emerald-500 mr-1" />
                  <span className="text-emerald-500 text-sm">+22.1%</span>
                </div>
              }
              valueStyle={{
                color: "#f9fafb",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card
            title={
              <span className="text-foreground text-lg font-semibold">
                Growth Analytics
              </span>
            }
            className="bg-card border-border"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Bar dataKey="students" fill="#8b5cf6" name="Students" />
                <Bar dataKey="courses" fill="#22d3ee" name="Courses" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={
              <span className="text-foreground text-lg font-semibold">
                Course Popularity
              </span>
            }
            className="bg-card border-border"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={coursePopularityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {coursePopularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity and Pending Approvals */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <span className="text-foreground text-lg font-semibold">
                Recent Activity
              </span>
            }
            extra={
              <Button
                type="link"
                onClick={() => setRecentActivityModal(true)}
                className="text-primary hover:text-primary/80"
              >
                View All
              </Button>
            }
            className="bg-card border-border"
          >
            <List
              dataSource={recentActivities.slice(0, 5)}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="border-b border-border last:border-b-0 py-3"
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className={`
                          ${item.type === "teacher" ? "bg-purple-500" : ""}
                          ${item.type === "course" ? "bg-cyan-500" : ""}
                          ${item.type === "student" ? "bg-emerald-500" : ""}
                          ${item.type === "payment" ? "bg-yellow-500" : ""}
                          ${item.type === "completion" ? "bg-blue-500" : ""}
                        `}
                        icon={<UserOutlined />}
                      />
                    }
                    title={
                      <span className="text-foreground">{item.action}</span>
                    }
                    description={
                      <div className="text-muted-foreground">
                        <span className="font-medium">{item.user}</span> •{" "}
                        {item.time}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={
              <span className="text-foreground text-lg font-semibold">
                Pending Approvals
              </span>
            }
            className="bg-card border-border"
          >
            <List
              dataSource={pendingApprovals}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="border-b border-border last:border-b-0 py-3"
                  actions={[
                    <Button
                      key="approve"
                      type="primary"
                      size="small"
                      icon={<CheckCircleOutlined />}
                      className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                    >
                      Approve
                    </Button>,
                    <Button
                      key="reject"
                      danger
                      size="small"
                      icon={<CloseCircleOutlined />}
                    >
                      Reject
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div className="flex items-center gap-2">
                        <Tag
                          color={item.type === "Teacher" ? "purple" : "cyan"}
                        >
                          {item.type}
                        </Tag>
                        <span className="text-foreground">{item.name}</span>
                      </div>
                    }
                    description={
                      <span className="text-muted-foreground">
                        {item.subject || item.teacher}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Modal */}
      <Modal
        title={<span className="text-foreground">All Recent Activities</span>}
        open={recentActivityModal}
        onCancel={() => setRecentActivityModal(false)}
        footer={null}
        width={800}
        className="custom-modal"
      >
        <List
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className="border-b border-border last:border-b-0 py-3"
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    className={`
                      ${item.type === "teacher" ? "bg-purple-500" : ""}
                      ${item.type === "course" ? "bg-cyan-500" : ""}
                      ${item.type === "student" ? "bg-emerald-500" : ""}
                      ${item.type === "payment" ? "bg-yellow-500" : ""}
                      ${item.type === "completion" ? "bg-blue-500" : ""}
                    `}
                    icon={<UserOutlined />}
                  />
                }
                title={<span className="text-foreground">{item.action}</span>}
                description={
                  <div className="text-muted-foreground">
                    <span className="font-medium">{item.user}</span> •{" "}
                    {item.time}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
