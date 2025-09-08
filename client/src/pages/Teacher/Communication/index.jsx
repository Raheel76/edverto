"use client"
import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Tabs,
  List,
  Avatar,
  Button,
  Input,
  Select,
  Badge,
  Typography,
  Space,
  Tag,
  Modal,
  Form,
  Switch,
} from "antd"
import {
  MessageOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  RobotOutlined,
  SendOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  TrophyOutlined,
} from "@ant-design/icons"
import { Reply } from "lucide-react"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { TextArea } = Input

const Communications =() => {
  const [selectedTab, setSelectedTab] = useState("1")
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [replyModalVisible, setReplyModalVisible] = useState(false)
  const [aiSuggestionsVisible, setAiSuggestionsVisible] = useState(false)
  const [form] = Form.useForm()

  const questions = [
    {
      id: "1",
      student: {
        name: "Sarah Johnson",
        avatar: "/student-avatar-sarah.jpg",
        email: "sarah.j@email.com",
      },
      course: "Advanced React Development",
      subject: "Understanding useEffect dependencies",
      question:
        "I'm having trouble understanding when to include variables in the useEffect dependency array. Could you explain when it's necessary and when it might cause infinite loops?",
      timestamp: "2 hours ago",
      status: "New",
      priority: "High",
      replies: [],
      isStarred: true,
    },
    {
      id: "2",
      student: {
        name: "Mike Chen",
        avatar: "/student-avatar-mike.jpg",
        email: "mike.chen@email.com",
      },
      course: "Machine Learning Fundamentals",
      subject: "Model overfitting issues",
      question:
        "My model is performing well on training data but poorly on validation data. What are some strategies to prevent overfitting?",
      timestamp: "4 hours ago",
      status: "Answered",
      priority: "Medium",
      replies: [
        {
          id: "r1",
          author: "teacher",
          content:
            "Great question! Overfitting is a common issue. Here are some strategies: 1) Use regularization techniques like L1/L2, 2) Implement dropout layers, 3) Use cross-validation, 4) Collect more training data if possible.",
          timestamp: "3 hours ago",
        },
        {
          id: "r2",
          author: "student",
          content: "Thank you! Should I also consider reducing model complexity?",
          timestamp: "2 hours ago",
        },
      ],
      isStarred: false,
    },
    {
      id: "3",
      student: {
        name: "Emily Rodriguez",
        avatar: "/student-avatar-emily.jpg",
        email: "emily.r@email.com",
      },
      course: "UI/UX Design Masterclass",
      subject: "Color theory in dark mode",
      question: "What are the best practices for choosing colors when designing dark mode interfaces?",
      timestamp: "1 day ago",
      status: "Resolved",
      priority: "Low",
      replies: [
        {
          id: "r3",
          author: "teacher",
          content:
            "For dark mode interfaces, avoid pure black backgrounds as they can create harsh contrast with white text, leading to eye strain and the 'halation effect' where text appears to bleed into the background, especially for users with astigmatism. Instead, opt for dark grays (e.g., #121212 as recommended by Material Design) for surfaces to reduce contrast while maintaining readability. Use desaturated, muted accent colors (lighter tones in the 200–50 range) to prevent visual vibration against dark backgrounds, and ensure high contrast ratios (at least 4.5:1 per WCAG AA standards) between text and backgrounds for accessibility. Apply varying opacity to text—87% for high-emphasis, 60% for medium, and 38% for disabled—to optimize legibility. Illuminate elevated surfaces with lighter overlays rather than shadows, and test for motion blur on OLED screens by avoiding pure black with rapid movements. Additionally, provide options to switch to light mode for content-heavy UIs, and consider cultural/brand fit before implementing dark mode universally.",
          timestamp: "1 day ago",
        },
      ],
      isStarred: false,
    },
  ]

  const directMessages = [
    {
      id: "1",
      student: {
        name: "David Kim",
        avatar: "/student-avatar-david.jpg",
        email: "david.kim@email.com",
      },
      lastMessage: "Thank you for the feedback on my assignment!",
      timestamp: "1 hour ago",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      student: {
        name: "Sarah Johnson",
        avatar: "/student-avatar-sarah.jpg",
        email: "sarah.j@email.com",
      },
      lastMessage: "Could we schedule a one-on-one session?",
      timestamp: "3 hours ago",
      unreadCount: 0,
      isOnline: false,
    },
  ]

  const notifications = [
    {
      id: "1",
      type: "enrollment",
      title: "New Student Enrollment",
      description: "Alex Thompson enrolled in Advanced React Development",
      timestamp: "30 minutes ago",
      isRead: false,
      course: "Advanced React Development",
      student: "Alex Thompson",
    },
    {
      id: "2",
      type: "quiz",
      title: "Quiz Submitted",
      description: "Sarah Johnson submitted React Hooks Quiz",
      timestamp: "1 hour ago",
      isRead: false,
      course: "Advanced React Development",
      student: "Sarah Johnson",
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      description: "Course purchase payment of $99.99 received",
      timestamp: "2 hours ago",
      isRead: true,
      course: "Machine Learning Fundamentals",
    },
    {
      id: "4",
      type: "achievement",
      title: "Student Achievement",
      description: "Mike Chen completed all assignments with 95% average",
      timestamp: "4 hours ago",
      isRead: true,
      course: "Machine Learning Fundamentals",
      student: "Mike Chen",
    },
  ]

  const aiSuggestions = [
    "This is a common question about useEffect. You might want to explain the dependency array concept with a simple example.",
    "Consider mentioning the ESLint plugin for React hooks that helps catch dependency issues automatically.",
    "You could provide a code example showing both correct and incorrect usage of dependencies.",
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "red"
      case "Answered":
        return "orange"
      case "Resolved":
        return "green"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red"
      case "Medium":
        return "orange"
      case "Low":
        return "green"
      default:
        return "default"
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "enrollment":
        return <UserOutlined style={{ color: "#6366f1" }} />
      case "quiz":
        return <QuestionCircleOutlined style={{ color: "#f59e0b" }} />
      case "assignment":
        return <BookOutlined style={{ color: "#10b981" }} />
      case "payment":
        return <DollarOutlined style={{ color: "#ec4899" }} />
      case "achievement":
        return <TrophyOutlined style={{ color: "#f59e0b" }} />
      default:
        return <BellOutlined />
    }
  }

  const handleReply = (values) => {
    console.log("Sending reply:", values)
    setReplyModalVisible(false)
    form.resetFields()
  }

  const unreadNotifications = notifications.filter((n) => !n.isRead).length

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Communication Hub
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Manage student questions, messages, and notifications</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>New Questions</Text>
            <Text style={{ color: "#ef4444", fontSize: "24px", fontWeight: "bold" }}>
              {questions.filter((q) => q.status === "New").length}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Unread Messages</Text>
            <Text style={{ color: "#6366f1", fontSize: "24px", fontWeight: "bold" }}>
              {directMessages.reduce((sum, dm) => sum + dm.unreadCount, 0)}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Notifications</Text>
            <Text style={{ color: "#f59e0b", fontSize: "24px", fontWeight: "bold" }}>{unreadNotifications}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Response Rate</Text>
            <Text style={{ color: "#10b981", fontSize: "24px", fontWeight: "bold" }}>94%</Text>
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={selectedTab} onChange={setSelectedTab}>
        <TabPane
          tab={
            <span>
              <QuestionCircleOutlined />
              Q&A ({questions.filter((q) => q.status === "New").length})
            </span>
          }
          key="1"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card
                title={<span style={{ color: "#ffffff" }}>Student Questions</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
                extra={
                  <Space>
                    <Select defaultValue="all" style={{ width: 120 }}>
                      <Option value="all">All Courses</Option>
                      <Option value="react">React Course</Option>
                      <Option value="ml">ML Course</Option>
                    </Select>
                    <Select defaultValue="new" style={{ width: 100 }}>
                      <Option value="all">All Status</Option>
                      <Option value="new">New</Option>
                      <Option value="answered">Answered</Option>
                    </Select>
                  </Space>
                }
              >
                <List
                  dataSource={questions}
                  renderItem={(question) => (
                    <List.Item
                      style={{ borderBottom: "1px solid #2d2d3a", padding: "16px 0" }}
                      actions={[
                        <Button
                          key="reply"
                          type="text"
                          icon={<Reply />}
                          onClick={() => {
                            setSelectedQuestion(question)
                            setReplyModalVisible(true)
                          }}
                          style={{ color: "#6366f1" }}
                        >
                          Reply
                        </Button>,
                        <Button
                          key="ai"
                          type="text"
                          icon={<RobotOutlined />}
                          onClick={() => {
                            setSelectedQuestion(question)
                            setAiSuggestionsVisible(true)
                          }}
                          style={{ color: "#ec4899" }}
                        >
                          AI Help
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar size={40} src={question.student.avatar} />}
                        title={
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{question.subject}</Text>
                              {question.isStarred && <StarOutlined style={{ color: "#f59e0b" }} />}
                            </div>
                            <div>
                              <Tag color={getStatusColor(question.status)}>{question.status}</Tag>
                              <Tag color={getPriorityColor(question.priority)}>{question.priority}</Tag>
                            </div>
                          </div>
                        }
                        description={
                          <div>
                            <Text style={{ color: "#a1a1aa", display: "block", marginBottom: "4px" }}>
                              {question.student.name} • {question.course}
                            </Text>
                            <Paragraph
                              style={{ color: "#ffffff", marginBottom: "8px" }}
                              ellipsis={{ rows: 2, expandable: true }}
                            >
                              {question.question}
                            </Paragraph>
                            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                              <ClockCircleOutlined style={{ marginRight: "4px" }} />
                              {question.timestamp}
                              {question.replies.length > 0 && (
                                <span style={{ marginLeft: "16px" }}>
                                  <MessageOutlined style={{ marginRight: "4px" }} />
                                  {question.replies.length} replies
                                </span>
                              )}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card
                title={<span style={{ color: "#ffffff" }}>Quick Actions</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "16px" }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    block
                    icon={<RobotOutlined />}
                    style={{ background: "#ec4899", borderColor: "#ec4899" }}
                  >
                    Generate AI Responses
                  </Button>
                  <Button block icon={<StarOutlined />} style={{ color: "#f59e0b", borderColor: "#f59e0b" }}>
                    Mark Important Questions
                  </Button>
                  <Button block icon={<CheckCircleOutlined />} style={{ color: "#10b981", borderColor: "#10b981" }}>
                    Bulk Mark as Resolved
                  </Button>
                </Space>
              </Card>

              <Card
                title={<span style={{ color: "#ffffff" }}>FAQ Templates</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
              >
                <List
                  size="small"
                  dataSource={[
                    "How to access course materials?",
                    "Assignment submission guidelines",
                    "Technical requirements",
                    "Refund policy",
                    "Certificate information",
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      style={{ borderBottom: "1px solid #2d2d3a" }}
                      actions={[
                        <Button key="use" type="text" size="small" style={{ color: "#6366f1" }}>
                          Use
                        </Button>,
                      ]}
                    >
                      <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{item}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <MessageOutlined />
              Messages ({directMessages.reduce((sum, dm) => sum + dm.unreadCount, 0)})
            </span>
          }
          key="2"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card
                title={<span style={{ color: "#ffffff" }}>Direct Messages</span>}
                style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
              >
                <List
                  dataSource={directMessages}
                  renderItem={(message) => (
                    <List.Item
                      style={{
                        borderBottom: "1px solid #2d2d3a",
                        cursor: "pointer",
                        background: selectedChat?.id === message.id ? "#2d2d3a" : "transparent",
                      }}
                      onClick={() => setSelectedChat(message)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Badge dot={message.isOnline} color="green">
                            <Avatar src={message.student.avatar} />
                          </Badge>
                        }
                        title={
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: "#ffffff" }}>{message.student.name}</Text>
                            {message.unreadCount > 0 && (
                              <Badge count={message.unreadCount} style={{ backgroundColor: "#ef4444" }} />
                            )}
                          </div>
                        }
                        description={
                          <div>
                            <Text style={{ color: "#a1a1aa", display: "block" }} ellipsis>
                              {message.lastMessage}
                            </Text>
                            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{message.timestamp}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              {selectedChat ? (
                <Card
                  title={
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Avatar src={selectedChat.student.avatar} />
                      <div>
                        <Text style={{ color: "#ffffff" }}>{selectedChat.student.name}</Text>
                        <Text style={{ color: "#a1a1aa", display: "block", fontSize: "12px" }}>
                          {selectedChat.student.email}
                        </Text>
                      </div>
                    </div>
                  }
                  style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
                >
                  <div style={{ height: "400px", overflowY: "auto", marginBottom: "16px" }}>
                    {/* Chat messages would go here */}
                    <div style={{ textAlign: "center", color: "#a1a1aa", marginTop: "150px" }}>
                      Select a conversation to view messages
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                      placeholder="Type your message..."
                      style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                    />
                    <Button type="primary" icon={<SendOutlined />} style={{ background: "#6366f1" }} />
                  </div>
                </Card>
              ) : (
                <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
                  <div style={{ padding: "100px 0", color: "#a1a1aa" }}>
                    <MessageOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
                    <Text style={{ color: "#a1a1aa", display: "block" }}>Select a conversation to start messaging</Text>
                  </div>
                </Card>
              )}
            </Col>
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <BellOutlined />
              Notifications ({unreadNotifications})
            </span>
          }
          key="3"
        >
          <Card
            title={<span style={{ color: "#ffffff" }}>Recent Notifications</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
            extra={
              <Space>
                <Button size="small">Mark All Read</Button>
                <Switch checkedChildren="All" unCheckedChildren="Unread" />
              </Space>
            }
          >
            <List
              dataSource={notifications}
              renderItem={(notification) => (
                <List.Item
                  style={{
                    borderBottom: "1px solid #2d2d3a",
                    background: !notification.isRead ? "rgba(99, 102, 241, 0.1)" : "transparent",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <List.Item.Meta
                    avatar={getNotificationIcon(notification.type)}
                    title={
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "#ffffff", fontWeight: notification.isRead ? "normal" : "bold" }}>
                          {notification.title}
                        </Text>
                        <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{notification.timestamp}</Text>
                      </div>
                    }
                    description={
                      <div>
                        <Text style={{ color: "#a1a1aa", display: "block" }}>{notification.description}</Text>
                        {notification.course && (
                          <Tag style={{ marginTop: "4px" }} color="blue">
                            {notification.course}
                          </Tag>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Reply Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Reply to Question</span>}
        open={replyModalVisible}
        onCancel={() => setReplyModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedQuestion && (
          <div style={{ marginTop: "24px" }}>
            <div style={{ background: "#0f0f23", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold", display: "block" }}>{selectedQuestion.subject}</Text>
              <Text style={{ color: "#a1a1aa", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                {selectedQuestion.student.name} • {selectedQuestion.course}
              </Text>
              <Paragraph style={{ color: "#ffffff" }}>{selectedQuestion.question}</Paragraph>
            </div>

            <Form form={form} layout="vertical" onFinish={handleReply}>
              <Form.Item name="reply" label={<span style={{ color: "#ffffff" }}>Your Reply</span>}>
                <TextArea
                  rows={6}
                  placeholder="Type your reply here..."
                  style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button onClick={() => setReplyModalVisible(false)}>Cancel</Button>
                  <Button
                    icon={<RobotOutlined />}
                    onClick={() => setAiSuggestionsVisible(true)}
                    style={{ background: "#ec4899", borderColor: "#ec4899", color: "#ffffff" }}
                  >
                    Get AI Suggestions
                  </Button>
                  <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
                    Send Reply
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      {/* AI Suggestions Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RobotOutlined style={{ color: "#ec4899" }} />
            <span style={{ color: "#ffffff" }}>AI Reply Suggestions</span>
          </div>
        }
        open={aiSuggestionsVisible}
        onCancel={() => setAiSuggestionsVisible(false)}
        footer={null}
        width={600}
      >
        <div style={{ marginTop: "24px" }}>
          <List
            dataSource={aiSuggestions}
            renderItem={(suggestion, index) => (
              <List.Item
                style={{ borderBottom: "1px solid #2d2d3a" }}
                actions={[
                  <Button key="use" type="text" style={{ color: "#6366f1" }}>
                    Use This
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<RobotOutlined style={{ color: "#ec4899", fontSize: "16px" }} />}
                  description={<Text style={{ color: "#ffffff" }}>{suggestion}</Text>}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Communications
