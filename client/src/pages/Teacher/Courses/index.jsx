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
  Input,
  Select,
  Modal,
  Form,
  Upload,
  Avatar,
  Tooltip,
  Dropdown,
  Typography,
} from "antd"
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  UploadOutlined,
  MoreOutlined,
  CopyOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography
const { Option } = Select

const TeacherCourses =() =>{
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [form] = Form.useForm()

  const courses = [
    {
      id: "1",
      title: "Advanced React Development",
      category: "Web Development",
      status: "Published",
      students: 234,
      revenue: 4680.0,
      rating: 4.8,
      thumbnail: "/web-development-course.png",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      modules: 8,
      lessons: 45,
      duration: "12h 30m",
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      category: "Data Science",
      status: "Published",
      students: 189,
      revenue: 3780.0,
      rating: 4.9,
      thumbnail: "/machine-learning-course.png",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      modules: 10,
      lessons: 52,
      duration: "15h 45m",
    },
    {
      id: "3",
      title: "UI/UX Design Masterclass",
      category: "Design",
      status: "Under Review",
      students: 0,
      revenue: 0,
      rating: 0,
      thumbnail: "/ui-ux-design-course-figma.jpg",
      createdAt: "2024-01-25",
      updatedAt: "2024-01-26",
      modules: 6,
      lessons: 28,
      duration: "8h 15m",
    },
    {
      id: "4",
      title: "Python for Beginners",
      category: "Programming",
      status: "Draft",
      students: 0,
      revenue: 0,
      rating: 0,
      thumbnail: "/data-science-python-course.png",
      createdAt: "2024-01-28",
      updatedAt: "2024-01-28",
      modules: 5,
      lessons: 22,
      duration: "6h 30m",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "success"
      case "Under Review":
        return "processing"
      case "Draft":
        return "default"
      case "Rejected":
        return "error"
      default:
        return "default"
    }
  }

  const handleMenuClick = (key, record) => {
    switch (key) {
      case "edit":
        // Navigate to edit course
        break
      case "preview":
        // Open preview modal
        break
      case "duplicate":
        // Duplicate course
        break
      case "share":
        // Share course
        break
      case "delete":
        // Delete course
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: "Course",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar size={48} src={record.thumbnail} style={{ borderRadius: "8px" }} />
          <div>
            <Text style={{ color: "#ffffff", fontWeight: "bold", display: "block" }}>{text}</Text>
            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.category}</Text>
          </div>
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
      title: "Students",
      dataIndex: "students",
      key: "students",
      render: (students) => <Text style={{ color: "#ffffff" }}>{students.toLocaleString()}</Text>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => <Text style={{ color: "#10b981", fontWeight: "bold" }}>${revenue.toFixed(2)}</Text>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Text style={{ color: "#f59e0b" }}>{rating > 0 ? `⭐ ${rating}` : "No ratings"}</Text>
      ),
    },
    {
      title: "Content",
      key: "content",
      render: (_, record) => (
        <div>
          <Text style={{ color: "#a1a1aa", fontSize: "12px", display: "block" }}>
            {record.modules} modules • {record.lessons} lessons
          </Text>
          <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.duration}</Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Course">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: "#6366f1" }}
              onClick={() => handleMenuClick("edit", record)}
            />
          </Tooltip>
          <Tooltip title="Preview Course">
            <Button
              type="text"
              icon={<EyeOutlined />}
              style={{ color: "#10b981" }}
              onClick={() => handleMenuClick("preview", record)}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                { key: "duplicate", icon: <CopyOutlined />, label: "Duplicate" },
                { key: "share", icon: <ShareAltOutlined />, label: "Share" },
                { type: "divider" },
                { key: "delete", icon: <DeleteOutlined />, label: "Delete", danger: true },
              ],
              onClick: ({ key }) => handleMenuClick(key, record),
            }}
          >
            <Button type="text" icon={<MoreOutlined />} style={{ color: "#a1a1aa" }} />
          </Dropdown>
        </Space>
      ),
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.category.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateCourse = (values) => {
    console.log("Creating course:", values)
    setCreateModalVisible(false)
    form.resetFields()
  }

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Course Management
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Create, edit, and manage your courses</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Total Courses</Text>
            <Text style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}>{courses.length}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Published</Text>
            <Text style={{ color: "#10b981", fontSize: "24px", fontWeight: "bold" }}>
              {courses.filter((c) => c.status === "Published").length}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Total Students</Text>
            <Text style={{ color: "#6366f1", fontSize: "24px", fontWeight: "bold" }}>
              {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Total Revenue</Text>
            <Text style={{ color: "#ec4899", fontSize: "24px", fontWeight: "bold" }}>
              ${courses.reduce((sum, course) => sum + course.revenue, 0).toFixed(2)}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Input
              placeholder="Search courses..."
              prefix={<SearchOutlined style={{ color: "#a1a1aa" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: "100%" }}>
              <Option value="all">All Status</Option>
              <Option value="Published">Published</Option>
              <Option value="Under Review">Under Review</Option>
              <Option value="Draft">Draft</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Col>
          <Col xs={24} sm={10} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                // onClick={() => setCreateModalVisible(true)}
                onClick={() =>navigate('/teacher/courses/create')}
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Create Course
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Courses Table */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
        <Table
          columns={columns}
          dataSource={filteredCourses}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
          }}
          style={{ background: "transparent" }}
        />
      </Card>

      {/* Create Course Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Create New Course</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={600}
        style={{ background: "#1a1a2e" }}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateCourse} style={{ marginTop: "24px" }}>
          <Form.Item
            name="title"
            label={<span style={{ color: "#ffffff" }}>Course Title</span>}
            rules={[{ required: true, message: "Please enter course title" }]}
          >
            <Input
              placeholder="Enter course title"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span style={{ color: "#ffffff" }}>Category</span>}
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              <Option value="Web Development">Web Development</Option>
              <Option value="Data Science">Data Science</Option>
              <Option value="Design">Design</Option>
              <Option value="Programming">Programming</Option>
              <Option value="Business">Business</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={<span style={{ color: "#ffffff" }}>Description</span>}
            rules={[{ required: true, message: "Please enter course description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter course description"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Form.Item name="thumbnail" label={<span style={{ color: "#ffffff" }}>Course Thumbnail</span>}>
            <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8, color: "#a1a1aa" }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
                Create Course
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}


export default TeacherCourses
