import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Progress,
  Avatar,
  List,
  Badge,
  Typography,
  Space,
} from "antd"
import {
  DollarOutlined,
  UserOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  EditOutlined,
  TrophyOutlined,
  RiseOutlined,
  AlertOutlined,
  BulbOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography

const  TeacherDashboard =() =>{
  const teacherName = "Prof. John"

  const earningsData = {
    totalBalance: 12450.75,
    monthlyIncome: 3250.0,
    pendingPayments: 850.5,
    totalEarnings: 45230.25,
  }

  const activeCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      students: 234,
      progress: 85,
      revenue: 4680.0,
      status: "Published",
      thumbnail: "/web-development-course.png",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      students: 189,
      progress: 92,
      revenue: 3780.0,
      status: "Published",
      thumbnail: "/machine-learning-course.png",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      students: 156,
      progress: 67,
      revenue: 3120.0,
      status: "Under Review",
      thumbnail: "/ui-ux-design-course-figma.jpg",
    },
  ]

  const aiInsights = [
    {
      type: "warning",
      icon: <AlertOutlined style={{ color: "#f59e0b" }} />,
      message:
        "30% of students are struggling in Module 2 of React Development course",
      suggestion: "Consider adding a recap video or additional practice exercises",
      priority: "high",
    },
    {
      type: "success",
      icon: <TrophyOutlined style={{ color: "#10b981" }} />,
      message: "Your ML course has 95% completion rate - excellent engagement!",
      suggestion: "Students love your teaching style in this course",
      priority: "low",
    },
    {
      type: "info",
      icon: <BulbOutlined style={{ color: "#6366f1" }} />,
      message: "Peak learning time for your students is 7-9 PM",
      suggestion: "Schedule live sessions during this time for better attendance",
      priority: "medium",
    },
    {
      type: "growth",
      icon: <RiseOutlined style={{ color: "#ec4899" }} />,
      message: "Course enrollment increased by 45% this month",
      suggestion: "Consider creating advanced follow-up courses",
      priority: "medium",
    },
  ]

  const recentActivities = [
    {
      type: "enrollment",
      message: "Sarah Johnson enrolled in React Development",
      time: "2 hours ago",
    },
    {
      type: "completion",
      message: "Mike Chen completed ML Fundamentals",
      time: "4 hours ago",
    },
    {
      type: "question",
      message: "New question posted in UI/UX course",
      time: "6 hours ago",
    },
    { type: "payment", message: "Payment of $125.50 received", time: "1 day ago" },
  ]

  return (
    <div
      className="teacher-dashboard"
      style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}
    >
      {/* Welcome Header */}
      <div style={{ marginBottom: "32px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Welcome back, {teacherName} 👋
        </Title>
        <Text style={{ color: "#a1a1aa", fontSize: "16px" }}>
          Here's what's happening with your courses today
        </Text>
      </div>

      {/* Earnings Summary */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="stats-card"
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Wallet Balance</span>}
              value={earningsData.totalBalance}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#10b981" }} />}
              valueStyle={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="stats-card"
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Monthly Income</span>}
              value={earningsData.monthlyIncome}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#6366f1" }} />}
              valueStyle={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="stats-card"
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Pending Payments</span>}
              value={earningsData.pendingPayments}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#f59e0b" }} />}
              valueStyle={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="stats-card"
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Total Earnings</span>}
              value={earningsData.totalEarnings}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#ec4899" }} />}
              valueStyle={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card
        title={<span style={{ color: "#ffffff" }}>Quick Actions</span>}
        style={{
          background: "#1a1a2e",
          border: "1px solid #2d2d3a",
          marginBottom: "32px",
        }}
      >
        <Space size="large" wrap>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{ background: "#6366f1", borderColor: "#6366f1" }}
          >
            Create Course
          </Button>
          <Button
            size="large"
            icon={<EditOutlined />}
            style={{
              background: "#f59e0b",
              borderColor: "#f59e0b",
              color: "#ffffff",
            }}
          >
            Create Quiz
          </Button>
          <Button
            size="large"
            icon={<PlayCircleOutlined />}
            style={{
              background: "#ec4899",
              borderColor: "#ec4899",
              color: "#ffffff",
            }}
          >
            Start Live Class
          </Button>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Active Courses */}
        <Col xs={24} lg={14}>
          <Card
            title={<span style={{ color: "#ffffff" }}>Active Courses</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <List
              dataSource={activeCourses}
              renderItem={(course) => (
                <List.Item
                  key={course.id}
                  style={{ borderBottom: "1px solid #2d2d3a", padding: "16px 0" }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={64}
                        src={course.thumbnail}
                        style={{ borderRadius: "8px" }}
                      />
                    }
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {course.title}
                        </Text>
                        <Badge
                          status={
                            course.status === "Published"
                              ? "success"
                              : "processing"
                          }
                          text={
                            <span style={{ color: "#a1a1aa" }}>
                              {course.status}
                            </span>
                          }
                        />
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: "8px" }}>
                          <Text style={{ color: "#a1a1aa" }}>
                            <UserOutlined /> {course.students} students enrolled
                          </Text>
                          <Text style={{ color: "#10b981", marginLeft: "16px" }}>
                            <DollarOutlined /> $
                            {course.revenue.toFixed(2)} revenue
                          </Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Text
                            style={{ color: "#a1a1aa", fontSize: "12px" }}
                          >
                            Course Progress:
                          </Text>
                          <Progress
                            percent={course.progress}
                            size="small"
                            strokeColor="#6366f1"
                            style={{ flex: 1, maxWidth: "200px" }}
                          />
                          <Text
                            style={{ color: "#ffffff", fontSize: "12px" }}
                          >
                            {course.progress}%
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* AI Insights */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <BulbOutlined style={{ color: "#6366f1" }} />
                <span style={{ color: "#ffffff" }}>AI Insights</span>
              </div>
            }
            style={{
              background: "#1a1a2e",
              border: "1px solid #2d2d3a",
              marginBottom: "24px",
            }}
          >
            <List
              dataSource={aiInsights}
              renderItem={(insight, index) => (
                <List.Item
                  key={index}
                  style={{ borderBottom: "1px solid #2d2d3a", padding: "12px 0" }}
                >
                  <List.Item.Meta
                    avatar={insight.icon}
                    title={
                      <Text style={{ color: "#ffffff", fontSize: "14px" }}>
                        {insight.message}
                      </Text>
                    }
                    description={
                      <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                        {insight.suggestion}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Recent Activities */}
          <Card
            title={<span style={{ color: "#ffffff" }}>Recent Activities</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <List
              dataSource={recentActivities}
              renderItem={(activity, index) => (
                <List.Item
                  key={index}
                  style={{ borderBottom: "1px solid #2d2d3a", padding: "8px 0" }}
                >
                  <List.Item.Meta
                    title={
                      <Text style={{ color: "#ffffff", fontSize: "14px" }}>
                        {activity.message}
                      </Text>
                    }
                    description={
                      <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                        {activity.time}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default TeacherDashboard
