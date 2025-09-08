
import { useState } from "react"
import { Card, Row, Col, Statistic, Table, Select, DatePicker, Button, Progress, Tag, Avatar } from "antd"
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { ChartNoAxesCombined } from "lucide-react"

const { Option } = Select
const { RangePicker } = DatePicker

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month")

  // Sample data
  const revenueData = [
    { month: "Jan", revenue: 15000, students: 120, courses: 25 },
    { month: "Feb", revenue: 18000, students: 150, courses: 28 },
    { month: "Mar", revenue: 22000, students: 180, courses: 32 },
    { month: "Apr", revenue: 28000, students: 220, courses: 35 },
    { month: "May", revenue: 35000, students: 280, courses: 40 },
    { month: "Jun", revenue: 42000, students: 320, courses: 45 },
  ]

  const coursePerformanceData = [
    { name: "Machine Learning", completionRate: 85, enrollments: 156, revenue: 46800 },
    { name: "React Development", completionRate: 92, enrollments: 234, revenue: 46566 },
    { name: "Data Science", completionRate: 78, enrollments: 189, revenue: 47061 },
    { name: "Mobile Development", completionRate: 88, enrollments: 145, revenue: 40455 },
    { name: "Python Programming", completionRate: 90, enrollments: 198, revenue: 39600 },
  ]

  const studentEngagementData = [
    { day: "Mon", activeUsers: 1200, completedLessons: 450, timeSpent: 3.2 },
    { day: "Tue", activeUsers: 1350, completedLessons: 520, timeSpent: 3.8 },
    { day: "Wed", activeUsers: 1180, completedLessons: 480, timeSpent: 3.5 },
    { day: "Thu", activeUsers: 1420, completedLessons: 580, timeSpent: 4.1 },
    { day: "Fri", activeUsers: 1600, completedLessons: 650, timeSpent: 4.5 },
    { day: "Sat", activeUsers: 980, completedLessons: 320, timeSpent: 2.8 },
    { day: "Sun", activeUsers: 850, completedLessons: 280, timeSpent: 2.5 },
  ]

  const topPerformersData = [
    {
      key: "1",
      rank: 1,
      name: "Dr. Sarah Johnson",
      type: "Teacher",
      courses: 4,
      students: 156,
      rating: 4.9,
      revenue: 46800,
      avatar: "/api/placeholder/40/40",
    },
    {
      key: "2",
      rank: 2,
      name: "Prof. Mike Chen",
      type: "Teacher",
      courses: 6,
      students: 234,
      rating: 4.8,
      revenue: 46566,
      avatar: "/api/placeholder/40/40",
    },
    {
      key: "3",
      rank: 3,
      name: "Emma Wilson",
      type: "Student",
      coursesCompleted: 8,
      averageScore: 95,
      timeSpent: "120 hours",
      avatar: "/api/placeholder/40/40",
    },
  ]

  const performerColumns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank) => (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
            rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-gray-400" : "bg-orange-500"
          }`}
        >
          {rank}
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="text-foreground font-medium">{text}</div>
            <Tag color={record.type === "Teacher" ? "purple" : "blue"}>{record.type}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Performance",
      key: "performance",
      render: (_, record) => (
        <div>
          {record.type === "Teacher" ? (
            <>
              <div className="text-foreground">{record.courses} Courses</div>
              <div className="text-muted-foreground text-sm">{record.students} Students</div>
              <div className="text-yellow-500">★ {record.rating}</div>
            </>
          ) : (
            <>
              <div className="text-foreground">{record.coursesCompleted} Completed</div>
              <div className="text-muted-foreground text-sm">Avg: {record.averageScore}%</div>
              <div className="text-cyan-400">{record.timeSpent}</div>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Revenue/Impact",
      key: "revenue",
      render: (_, record) => (
        <div className="text-foreground font-semibold">
          {record.revenue ? `$${record.revenue.toLocaleString()}` : "High Engagement"}
        </div>
      ),
    },
  ]

  const categoryData = [
    { name: "AI & ML", value: 35, color: "#8b5cf6" },
    { name: "Web Dev", value: 25, color: "#22d3ee" },
    { name: "Data Science", value: 20, color: "#10b981" },
    { name: "Mobile Dev", value: 12, color: "#f59e0b" },
    { name: "Others", value: 8, color: "#ef4444" },
  ]

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-foreground text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-4">
          <Select value={timeRange} onChange={setTimeRange} className="custom-select w-32">
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="quarter">This Quarter</Option>
            <Option value="year">This Year</Option>
          </Select>
          <RangePicker className="custom-date-picker" />
          <Button type="primary" icon={<DownloadOutlined />} className="bg-primary hover:bg-primary/90">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Total Revenue</span>}
              value={42000}
              prefix={<DollarOutlined className="text-emerald-500" />}
              suffix={
                <div className="flex items-center mt-2">
                  <ChartNoAxesCombined className="text-emerald-500 mr-1" />
                  <span className="text-emerald-500 text-sm">+22.1%</span>
                </div>
              }
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Course Completion Rate</span>}
              value={87.5}
              suffix="%"
              prefix={<BookOutlined className="text-primary" />}
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
            <Progress percent={87.5} showInfo={false} strokeColor="#8b5cf6" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Active Students</span>}
              value={2847}
              prefix={<UserOutlined className="text-cyan-400" />}
              suffix={
                <div className="flex items-center mt-2">
                  <ChartNoAxesCombined className="text-emerald-500 mr-1" />
                  <span className="text-emerald-500 text-sm">+12.5%</span>
                </div>
              }
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Avg. Session Time</span>}
              value={3.4}
              suffix="hrs"
              prefix={<EyeOutlined className="text-yellow-500" />}
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue and Growth Charts */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card
            title={<span className="text-foreground text-lg font-semibold">Revenue & Growth Trends</span>}
            className="bg-card border-border"
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
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
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="students" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={<span className="text-foreground text-lg font-semibold">Course Categories</span>}
            className="bg-card border-border"
          >
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
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

      {/* Student Engagement and Course Performance */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card
            title={<span className="text-foreground text-lg font-semibold">Weekly Student Engagement</span>}
            className="bg-card border-border"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Line type="monotone" dataKey="activeUsers" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="completedLessons" stroke="#22d3ee" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<span className="text-foreground text-lg font-semibold">Course Performance</span>}
            className="bg-card border-border"
          >
            <div className="space-y-4">
              {coursePerformanceData.map((course, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-foreground font-medium">{course.name}</span>
                    <span className="text-emerald-500">${course.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>{course.enrollments} students</span>
                    <span>{course.completionRate}% completion</span>
                  </div>
                  <Progress percent={course.completionRate} showInfo={false} strokeColor="#10b981" size="small" />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Top Performers */}
      <Card
        title={<span className="text-foreground text-lg font-semibold">Top Performers</span>}
        className="bg-card border-border"
      >
        <Table columns={performerColumns} dataSource={topPerformersData} pagination={false} className="custom-table" />
      </Card>
    </div>
  )
}

export default AdminAnalytics
