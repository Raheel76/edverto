"use client"
import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Typography,
  Avatar,
  List,
  Tabs,
  Switch,
  Progress,
  Tooltip,
} from "antd"
import {
  PlusOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SoundOutlined,
  EditOutlined,
  CopyOutlined,
  NotificationOutlined,
  RobotOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"
import { Disc3 } from "lucide-react"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { TextArea } = Input

const LiveClasses =() =>{
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [attendeesModalVisible, setAttendeesModalVisible] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [form] = Form.useForm()

  const liveClasses = [
    {
      id: "1",
      title: "Advanced React Patterns Deep Dive",
      course: "Advanced React Development",
      date: "2024-02-15",
      time: "14:00",
      duration: 90,
      platform: "Zoom",
      status: "Scheduled",
      attendees: 45,
      maxAttendees: 50,
      meetingLink: "https://zoom.us/j/123456789",
      description: "Deep dive into advanced React patterns including render props, HOCs, and compound components",
      isRecurring: false,
    },
    {
      id: "2",
      title: "Machine Learning Q&A Session",
      course: "ML Fundamentals",
      date: "2024-02-12",
      time: "16:00",
      duration: 60,
      platform: "Google Meet",
      status: "Completed",
      attendees: 32,
      maxAttendees: 40,
      meetingLink: "https://meet.google.com/abc-defg-hij",
      recordingUrl: "https://drive.google.com/file/d/recording123",
      transcriptUrl: "https://drive.google.com/file/d/transcript123",
      description: "Q&A session covering machine learning fundamentals and practical applications",
      isRecurring: true,
    },
    {
      id: "3",
      title: "UI/UX Design Workshop",
      course: "UI/UX Design Masterclass",
      date: "2024-02-18",
      time: "10:00",
      duration: 120,
      platform: "WebRTC",
      status: "Scheduled",
      attendees: 28,
      maxAttendees: 35,
      meetingLink: "https://meet.example.com/room/workshop123",
      description: "Hands-on workshop for creating user-centered design solutions",
      isRecurring: false,
    },
    {
      id: "4",
      title: "Live Coding: React Hooks",
      course: "Advanced React Development",
      date: "2024-02-10",
      time: "15:00",
      duration: 75,
      platform: "Zoom",
      status: "Live",
      attendees: 38,
      maxAttendees: 50,
      meetingLink: "https://zoom.us/j/987654321",
      description: "Live coding session demonstrating custom React hooks implementation",
      isRecurring: false,
    },
  ]

  const attendees = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "/student-avatar-sarah.jpg",
      joinTime: "14:02",
      leaveTime: "15:28",
      duration: "1h 26m",
      status: "Attended",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      avatar: "/student-avatar-mike.jpg",
      status: "Registered",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      avatar: "/student-avatar-emily.jpg",
      joinTime: "14:00",
      leaveTime: "15:30",
      duration: "1h 30m",
      status: "Attended",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "/student-avatar-david.jpg",
      status: "Missed",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "blue"
      case "Live":
        return "red"
      case "Completed":
        return "green"
      case "Cancelled":
        return "default"
      default:
        return "default"
    }
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Zoom":
        return <VideoCameraOutlined style={{ color: "#2196F3" }} />
      case "Google Meet":
        return <VideoCameraOutlined style={{ color: "#4CAF50" }} />
      case "WebRTC":
        return <VideoCameraOutlined style={{ color: "#FF9800" }} />
      default:
        return <VideoCameraOutlined />
    }
  }

  const columns = [
    {
      title: "Class Details",
      key: "details",
      render: (_, record) => (
        <div>
          <Text style={{ color: "#ffffff", fontWeight: "bold", display: "block" }}>{record.title}</Text>
          <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.course}</Text>
        </div>
      ),
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (_, record) => (
        <div>
          <Text style={{ color: "#ffffff", display: "block" }}>
            <CalendarOutlined style={{ marginRight: "4px" }} />
            {record.date}
          </Text>
          <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
            <ClockCircleOutlined style={{ marginRight: "4px" }} />
            {record.time} ({record.duration}min)
          </Text>
        </div>
      ),
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      render: (platform) => (
        <Tag icon={getPlatformIcon(platform)} color="blue">
          {platform}
        </Tag>
      ),
    },
    {
      title: "Attendees",
      key: "attendees",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Text style={{ color: "#ffffff", display: "block" }}>
            {record.attendees}/{record.maxAttendees}
          </Text>
          <Progress
            percent={(record.attendees / record.maxAttendees) * 100}
            size="small"
            strokeColor="#6366f1"
            showInfo={false}
          />
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.status === "Live" && (
            <Button
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
              style={{ background: "#ef4444", borderColor: "#ef4444" }}
            >
              Join
            </Button>
          )}
          {record.status === "Scheduled" && (
            <Button type="text" icon={<EditOutlined />} size="small" style={{ color: "#6366f1" }} />
          )}
          <Button
            type="text"
            icon={<UserOutlined />}
            size="small"
            style={{ color: "#10b981" }}
            onClick={() => {
              setSelectedClass(record)
              setAttendeesModalVisible(true)
            }}
          />
          {record.recordingUrl && (
            <Tooltip title="View Recording">
              <Button type="text" icon={<Disc3 />} size="small" style={{ color: "#f59e0b" }} />
            </Tooltip>
          )}
          {record.transcriptUrl && (
            <Tooltip title="View Transcript">
              <Button type="text" icon={<SoundOutlined />} size="small" style={{ color: "#ec4899" }} />
            </Tooltip>
          )}
          <Button type="text" icon={<CopyOutlined />} size="small" style={{ color: "#a1a1aa" }} />
        </Space>
      ),
    },
  ]

  const attendeeColumns = [
    {
      title: "Student",
      key: "student",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar size={32} src={record.avatar} />
          <div>
            <Text style={{ color: "#ffffff", display: "block" }}>{record.name}</Text>
            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Join Time",
      dataIndex: "joinTime",
      key: "joinTime",
      render: (time) => <Text style={{ color: "#a1a1aa" }}>{time || "-"}</Text>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => <Text style={{ color: "#a1a1aa" }}>{duration || "-"}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Attended" ? "success" : status === "Registered" ? "processing" : "error"}>{status}</Tag>
      ),
    },
  ]

  const handleCreateClass = (values) => {
    console.log("Creating live class:", values)
    setCreateModalVisible(false)
    form.resetFields()
  }

  const upcomingClasses = liveClasses.filter((c) => c.status === "Scheduled" || c.status === "Live")
  const pastClasses = liveClasses.filter((c) => c.status === "Completed")

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Live Classes
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Schedule and manage live classes with your students</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Total Classes</Text>
            <Text style={{ color: "#6366f1", fontSize: "24px", fontWeight: "bold" }}>{liveClasses.length}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Upcoming</Text>
            <Text style={{ color: "#f59e0b", fontSize: "24px", fontWeight: "bold" }}>{upcomingClasses.length}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Live Now</Text>
            <Text style={{ color: "#ef4444", fontSize: "24px", fontWeight: "bold" }}>
              {liveClasses.filter((c) => c.status === "Live").length}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Completed</Text>
            <Text style={{ color: "#10b981", fontSize: "24px", fontWeight: "bold" }}>{pastClasses.length}</Text>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
            style={{ background: "#6366f1", borderColor: "#6366f1" }}
          >
            Schedule Class
          </Button>
          <Button
            size="large"
            icon={<PlayCircleOutlined />}
            style={{ background: "#ef4444", borderColor: "#ef4444", color: "#ffffff" }}
          >
            Start Instant Class
          </Button>
          <Button
            size="large"
            icon={<NotificationOutlined />}
            style={{ background: "#10b981", borderColor: "#10b981", color: "#ffffff" }}
          >
            Send Reminders
          </Button>
        </Space>
      </Card>

      {/* Classes Tabs */}
      <Tabs defaultActiveKey="1">
        <TabPane tab={`Upcoming (${upcomingClasses.length})`} key="1">
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <Table
              columns={columns}
              dataSource={upcomingClasses}
              rowKey="id"
              pagination={false}
              style={{ background: "transparent" }}
            />
          </Card>
        </TabPane>

        <TabPane tab={`Past Classes (${pastClasses.length})`} key="2">
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <Table
              columns={columns}
              dataSource={pastClasses}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
              }}
              style={{ background: "transparent" }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Recordings & Transcripts" key="3">
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <List
              dataSource={liveClasses.filter((c) => c.recordingUrl || c.transcriptUrl)}
              renderItem={(item) => (
                <List.Item
                  style={{ borderBottom: "1px solid #2d2d3a", padding: "16px 0" }}
                  actions={[
                    item.recordingUrl && (
                      <Button key="recording" type="text" icon={<Disc3 />} style={{ color: "#f59e0b" }}>
                        Recording
                      </Button>
                    ),
                    item.transcriptUrl && (
                      <Button key="transcript" type="text" icon={<SoundOutlined />} style={{ color: "#ec4899" }}>
                        Transcript
                      </Button>
                    ),
                    <Button key="ai" type="text" icon={<RobotOutlined />} style={{ color: "#6366f1" }}>
                      AI Summary
                    </Button>,
                  ].filter(Boolean)}
                >
                  <List.Item.Meta
                    title={<Text style={{ color: "#ffffff" }}>{item.title}</Text>}
                    description={
                      <div>
                        <Text style={{ color: "#a1a1aa", display: "block" }}>{item.course}</Text>
                        <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                          {item.date} • {item.duration} minutes • {item.attendees} attendees
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Create Class Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Schedule Live Class</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateClass} style={{ marginTop: "24px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label={<span style={{ color: "#ffffff" }}>Class Title</span>}
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter class title"
                  style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="course"
                label={<span style={{ color: "#ffffff" }}>Course</span>}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select course">
                  <Option value="Advanced React Development">Advanced React Development</Option>
                  <Option value="ML Fundamentals">ML Fundamentals</Option>
                  <Option value="UI/UX Design Masterclass">UI/UX Design Masterclass</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name="date"
                label={<span style={{ color: "#ffffff" }}>Date</span>}
                rules={[{ required: true }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) => current && current < dayjs().startOf("day")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="time"
                label={<span style={{ color: "#ffffff" }}>Time</span>}
                rules={[{ required: true }]}
              >
                <TimePicker style={{ width: "100%" }} format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="duration"
                label={<span style={{ color: "#ffffff" }}>Duration (minutes)</span>}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select duration">
                  <Option value={30}>30 minutes</Option>
                  <Option value={45}>45 minutes</Option>
                  <Option value={60}>1 hour</Option>
                  <Option value={90}>1.5 hours</Option>
                  <Option value={120}>2 hours</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="platform"
                label={<span style={{ color: "#ffffff" }}>Platform</span>}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select platform">
                  <Option value="Zoom">Zoom</Option>
                  <Option value="Google Meet">Google Meet</Option>
                  <Option value="WebRTC">WebRTC (Built-in)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="maxAttendees"
                label={<span style={{ color: "#ffffff" }}>Max Attendees</span>}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select max attendees">
                  <Option value={25}>25 students</Option>
                  <Option value={50}>50 students</Option>
                  <Option value={100}>100 students</Option>
                  <Option value={200}>200 students</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label={<span style={{ color: "#ffffff" }}>Description</span>}>
            <TextArea
              rows={3}
              placeholder="Enter class description"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="recordClass" valuePropName="checked">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Switch />
                  <span style={{ color: "#ffffff" }}>Record Class</span>
                  <Disc3 style={{ color: "#f59e0b" }} />
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="generateTranscript" valuePropName="checked">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Switch />
                  <span style={{ color: "#ffffff" }}>Generate AI Transcript</span>
                  <RobotOutlined style={{ color: "#ec4899" }} />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="sendNotifications" valuePropName="checked" initialValue={true}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Switch defaultChecked />
              <span style={{ color: "#ffffff" }}>Send notifications to students</span>
              <NotificationOutlined style={{ color: "#10b981" }} />
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
                Schedule Class
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Attendees Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Class Attendees - {selectedClass?.title}</span>}
        open={attendeesModalVisible}
        onCancel={() => setAttendeesModalVisible(false)}
        footer={null}
        width={800}
      >
        <div style={{ marginTop: "24px" }}>
          <Table
            columns={attendeeColumns}
            dataSource={attendees}
            rowKey="id"
            pagination={false}
            style={{ background: "transparent" }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default LiveClasses
