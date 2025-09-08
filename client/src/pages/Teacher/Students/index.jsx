"use client"
import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Table,
  Select,
  Button,
  Progress,
  Typography,
  Space,
  Tag,
  Avatar,
  Statistic,
  List,
  Tabs,
  DatePicker,
} from "antd"
import {
  UserOutlined,
  TrophyOutlined,
  AlertOutlined,
  BulbOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons"
import { Line, Bar, Pie } from "@ant-design/plots"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { RangePicker } = DatePicker

const  StudentAnalytics =() => {
  const [selectedCourse, setSelectedCourse] = useState("Advanced React Development")
  const [dateRange, setDateRange] = useState(null)

  const students = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "/student-avatar-sarah.jpg",
      enrollmentDate: "2024-01-15",
      progress: 85,
      lessonsCompleted: 38,
      totalLessons: 45,
      quizScore: 92,
      assignmentScore: 88,
      lastActive: "2 hours ago",
      timeSpent: "24h 30m",
      status: "Active",
      engagementScore: 95,
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      avatar: "/student-avatar-mike.jpg",
      enrollmentDate: "2024-01-12",
      progress: 45,
      lessonsCompleted: 20,
      totalLessons: 45,
      quizScore: 76,
      assignmentScore: 82,
      lastActive: "3 days ago",
      timeSpent: "12h 15m",
      status: "At Risk",
      engagementScore: 65,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      avatar: "/student-avatar-emily.jpg",
      enrollmentDate: "2024-01-20",
      progress: 92,
      lessonsCompleted: 41,
      totalLessons: 45,
      quizScore: 96,
      assignmentScore: 94,
      lastActive: "1 hour ago",
      timeSpent: "28h 45m",
      status: "Active",
      engagementScore: 98,
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "/student-avatar-david.jpg",
      enrollmentDate: "2024-01-08",
      progress: 25,
      lessonsCompleted: 11,
      totalLessons: 45,
      quizScore: 58,
      assignmentScore: 62,
      lastActive: "1 week ago",
      timeSpent: "8h 20m",
      status: "Inactive",
      engagementScore: 35,
    },
  ]

  const aiInsights = [
    {
      type: "warning",
      title: "High Drop-off Rate at Lesson 15",
      description: "65% of students are dropping off at 'Advanced Hooks Patterns' lesson",
      suggestion: "Consider adding a recap video or breaking this lesson into smaller parts",
      affectedStudents: 28,
      priority: "high",
    },
    {
      type: "success",
      title: "Excellent Engagement in Module 3",
      description: "Students show 95% completion rate and high satisfaction in 'State Management'",
      suggestion: "Use similar teaching approach for other complex topics",
      affectedStudents: 42,
      priority: "low",
    },
    {
      type: "info",
      title: "Quiz Performance Declining",
      description: "Average quiz scores dropped by 12% in the last two weeks",
      suggestion: "Review recent quiz difficulty or provide additional practice materials",
      affectedStudents: 35,
      priority: "medium",
    },
    {
      type: "danger",
      title: "Students Struggling with Assignments",
      description: "Assignment submission rate is only 68% with low average scores",
      suggestion: "Provide clearer instructions and examples for assignments",
      affectedStudents: 18,
      priority: "high",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "At Risk":
        return "warning"
      case "Inactive":
        return "error"
      default:
        return "default"
    }
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertOutlined style={{ color: "#f59e0b" }} />
      case "success":
        return <TrophyOutlined style={{ color: "#10b981" }} />
      case "info":
        return <BulbOutlined style={{ color: "#6366f1" }} />
      case "danger":
        return <AlertOutlined style={{ color: "#ef4444" }} />
      default:
        return <BulbOutlined />
    }
  }

  const columns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar size={40} src={record.avatar} />
          <div>
            <Text style={{ color: "#ffffff", fontWeight: "bold", display: "block" }}>{text}</Text>
            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Enrollment",
      dataIndex: "enrollmentDate",
      key: "enrollmentDate",
      render: (date) => <Text style={{ color: "#a1a1aa" }}>{date}</Text>,
    },
    {
      title: "Progress",
      key: "progress",
      render: (_, record) => (
        <div style={{ minWidth: "120px" }}>
          <Progress
            percent={record.progress}
            size="small"
            strokeColor={record.progress > 70 ? "#10b981" : record.progress > 40 ? "#f59e0b" : "#ef4444"}
          />
          <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
            {record.lessonsCompleted}/{record.totalLessons} lessons
          </Text>
        </div>
      ),
    },
    {
      title: "Performance",
      key: "performance",
      render: (_, record) => (
        <div>
          <Text style={{ color: "#ffffff", display: "block", fontSize: "12px" }}>Quiz: {record.quizScore}%</Text>
          <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>Assignment: {record.assignmentScore}%</Text>
        </div>
      ),
    },
    {
      title: "Engagement",
      dataIndex: "engagementScore",
      key: "engagementScore",
      render: (score) => (
        <div style={{ textAlign: "center" }}>
          <Text
            style={{
              color: score > 80 ? "#10b981" : score > 60 ? "#f59e0b" : "#ef4444",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {score}
          </Text>
          <Text style={{ color: "#a1a1aa", display: "block", fontSize: "10px" }}>
            {score > 80 ? "High" : score > 60 ? "Medium" : "Low"}
          </Text>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (time) => <Text style={{ color: "#a1a1aa" }}>{time}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="text" icon={<EyeOutlined />} style={{ color: "#6366f1" }}>
          View Details
        </Button>
      ),
    },
  ]

  // Chart data
  const progressData = [
    { week: "Week 1", completed: 12, enrolled: 45 },
    { week: "Week 2", completed: 28, enrolled: 45 },
    { week: "Week 3", completed: 35, enrolled: 45 },
    { week: "Week 4", completed: 38, enrolled: 45 },
  ]

  const engagementData = [
    { lesson: "Lesson 1", dropoff: 5 },
    { lesson: "Lesson 5", dropoff: 8 },
    { lesson: "Lesson 10", dropoff: 12 },
    { lesson: "Lesson 15", dropoff: 28 },
    { lesson: "Lesson 20", dropoff: 15 },
    { lesson: "Lesson 25", dropoff: 10 },
  ]

  const performanceData = [
    { type: "Excellent (90-100%)", value: 25, color: "#10b981" },
    { type: "Good (80-89%)", value: 35, color: "#6366f1" },
    { type: "Average (70-79%)", value: 25, color: "#f59e0b" },
    { type: "Below Average (<70%)", value: 15, color: "#ef4444" },
  ]

  const exportData = (format) => {
    console.log(`Exporting data as ${format.toUpperCase()}`)
    // Implementation for export functionality
  }

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Student Progress Analytics
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Track student performance and get AI-powered insights</Text>
      </div>

      {/* Filters */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Select
              value={selectedCourse}
              onChange={setSelectedCourse}
              style={{ width: "100%" }}
              placeholder="Select Course"
            >
              <Option value="Advanced React Development">Advanced React Development</Option>
              <Option value="Machine Learning Fundamentals">Machine Learning Fundamentals</Option>
              <Option value="UI/UX Design Masterclass">UI/UX Design Masterclass</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: "100%" }}
              placeholder={["Start Date", "End Date"]}
            />
          </Col>
          <Col xs={24} sm={8} style={{ textAlign: "right" }}>
            <Space>
              <Button
                icon={<FileExcelOutlined />}
                onClick={() => exportData("csv")}
                style={{ background: "#10b981", borderColor: "#10b981", color: "#ffffff" }}
              >
                Export CSV
              </Button>
              <Button
                icon={<FilePdfOutlined />}
                onClick={() => exportData("pdf")}
                style={{ background: "#ef4444", borderColor: "#ef4444", color: "#ffffff" }}
              >
                Export PDF
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Overview Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Total Students</span>}
              value={students.length}
              prefix={<UserOutlined style={{ color: "#6366f1" }} />}
              valueStyle={{ color: "#ffffff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Avg Progress</span>}
              value={Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}
              suffix="%"
              prefix={<RiseOutlined style={{ color: "#10b981" }} />}
              valueStyle={{ color: "#ffffff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>At Risk</span>}
              value={students.filter((s) => s.status === "At Risk").length}
              prefix={<AlertOutlined style={{ color: "#f59e0b" }} />}
              valueStyle={{ color: "#ffffff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Inactive</span>}
              value={students.filter((s) => s.status === "Inactive").length}
              prefix={<FallOutlined style={{ color: "#ef4444" }} />}
              valueStyle={{ color: "#ffffff" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Student List" key="1">
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <Table
              columns={columns}
              dataSource={students}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} students`,
              }}
              style={{ background: "transparent" }}
            />
          </Card>
        </TabPane>

        <TabPane tab="AI Insights" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <BulbOutlined style={{ color: "#6366f1" }} />
                    <span style={{ color: "#ffffff" }}>AI Engagement Insights</span>
                  </div>
                }
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "16px" }}
              >
                <List
                  dataSource={aiInsights}
                  renderItem={(insight) => (
                    <List.Item style={{ borderBottom: "1px solid #2d2d3a", padding: "16px 0" }}>
                      <List.Item.Meta
                        avatar={getInsightIcon(insight.type)}
                        title={
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{insight.title}</Text>
                            <div>
                              <Tag
                                color={
                                  insight.priority === "high"
                                    ? "red"
                                    : insight.priority === "medium"
                                      ? "orange"
                                      : "green"
                                }
                              >
                                {insight.priority.toUpperCase()}
                              </Tag>
                              <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                                {insight.affectedStudents} students
                              </Text>
                            </div>
                          </div>
                        }
                        description={
                          <div>
                            <Text style={{ color: "#a1a1aa", display: "block", marginBottom: "8px" }}>
                              {insight.description}
                            </Text>
                            <Text style={{ color: "#6366f1", fontSize: "12px" }}>
                              💡 Suggestion: {insight.suggestion}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title={<span style={{ color: "#ffffff" }}>Performance Distribution</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
              >
                <Pie
                  data={performanceData}
                  angleField="value"
                  colorField="type"
                  radius={0.8}
                  label={{
                    type: "spider",
                    labelHeight: 28,
                    content: "{name}\n{percentage}",
                    style: { fill: "#ffffff", fontSize: 12 },
                  }}
                  interactions={[{ type: "element-active" }]}
                  theme="dark"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Analytics Charts" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card
                title={<span style={{ color: "#ffffff" }}>Progress Over Time</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
              >
                <Line
                  data={progressData}
                  xField="week"
                  yField="completed"
                  point={{
                    size: 5,
                    shape: "diamond",
                    style: { fill: "#6366f1", stroke: "#6366f1", lineWidth: 2 },
                  }}
                  color="#6366f1"
                  theme="dark"
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={<span style={{ color: "#ffffff" }}>Lesson Drop-off Analysis</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
              >
                <Bar
                  data={engagementData}
                  xField="lesson"
                  yField="dropoff"
                  color="#ef4444"
                  theme="dark"
                  label={{
                    position: "middle",
                    style: { fill: "#ffffff", opacity: 0.6 },
                  }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default StudentAnalytics
