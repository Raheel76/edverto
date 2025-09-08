
import { useState } from "react"
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Popconfirm,
  message,
  Tabs,
  Row,
  Col,
  Statistic,
  Rate,
  Image,
  Descriptions,
} from "antd"
import {
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { TabPane } = Tabs
const { TextArea } = Input

const CourseManagement = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseModalVisible, setCourseModalVisible] = useState(false)
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Sample data
  const coursesData = [
    {
      key: "1",
      id: "CRS001",
      title: "Advanced Machine Learning",
      instructor: "Dr. Sarah Johnson",
      category: "AI & ML",
      price: 299,
      duration: "12 weeks",
      lessons: 48,
      students: 156,
      rating: 4.8,
      status: "approved",
      createdDate: "2024-01-15",
      thumbnail: "/api/placeholder/300/200",
      description: "Comprehensive course covering advanced machine learning concepts and practical applications.",
    },
    {
      key: "2",
      id: "CRS002",
      title: "React Advanced Patterns",
      instructor: "Prof. Mike Chen",
      category: "Web Development",
      price: 199,
      duration: "8 weeks",
      lessons: 32,
      students: 234,
      rating: 4.9,
      status: "approved",
      createdDate: "2024-01-10",
      thumbnail: "/api/placeholder/300/200",
      description: "Master advanced React patterns and best practices for building scalable applications.",
    },
    {
      key: "3",
      id: "CRS003",
      title: "Data Science Fundamentals",
      instructor: "Dr. Lisa Wang",
      category: "Data Science",
      price: 249,
      duration: "10 weeks",
      lessons: 40,
      students: 0,
      rating: 0,
      status: "pending",
      createdDate: "2024-01-20",
      thumbnail: "/api/placeholder/300/200",
      description: "Introduction to data science concepts, tools, and methodologies.",
    },
    {
      key: "4",
      id: "CRS004",
      title: "Mobile App Development",
      instructor: "John Smith",
      category: "Mobile Development",
      price: 279,
      duration: "14 weeks",
      lessons: 56,
      students: 89,
      rating: 4.6,
      status: "rejected",
      createdDate: "2024-01-08",
      thumbnail: "/api/placeholder/300/200",
      description: "Complete guide to building mobile applications for iOS and Android.",
    },
  ]

  const columns = [
    {
      title: "Course",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Image
            width={60}
            height={40}
            src={record.thumbnail || "/placeholder.svg"}
            className="rounded object-cover"
            preview={false}
          />
          <div>
            <div className="text-foreground font-medium">{text}</div>
            <div className="text-muted-foreground text-sm">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      render: (instructor, record) => (
        <div>
          <div className="text-foreground">{instructor}</div>
          <Tag color="purple" className="mt-1">
            {record.category}
          </Tag>
        </div>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <div>
          <div className="text-foreground">${record.price}</div>
          <div className="text-muted-foreground text-sm">
            {record.duration} • {record.lessons} lessons
          </div>
          <div className="text-muted-foreground text-sm">{record.students} students</div>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div>
          {rating > 0 ? (
            <>
              <Rate disabled defaultValue={rating} className="text-sm" />
              <div className="text-muted-foreground text-sm">{rating}/5</div>
            </>
          ) : (
            <span className="text-muted-foreground">No ratings yet</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "pending"
                ? "orange"
                : status === "rejected"
                  ? "red"
                  : "default"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => <span className="text-muted-foreground">{date}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewCourse(record)}
            className="text-primary hover:text-primary/80"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditCourse(record)}
            className="text-cyan-400 hover:text-cyan-300"
          />
          {record.status === "pending" ? (
            <Space>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveCourse(record.key)}
                className="text-emerald-400 hover:text-emerald-300"
              />
              <Button
                type="text"
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectCourse(record.key)}
                className="text-red-400 hover:text-red-300"
              />
            </Space>
          ) : (
            <Popconfirm
              title="Delete this course?"
              onConfirm={() => handleDeleteCourse(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" icon={<DeleteOutlined />} className="text-red-400 hover:text-red-300" />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  const handleViewCourse = (course) => {
    setSelectedCourse(course)
    setViewModalVisible(true)
  }

  const handleEditCourse = (course) => {
    setSelectedCourse(course)
    form.setFieldsValue(course)
    setCourseModalVisible(true)
  }

  const handleApproveCourse = (key) => {
    message.success("Course approved successfully")
  }

  const handleRejectCourse = (key) => {
    message.success("Course rejected")
  }

  const handleDeleteCourse = (key) => {
    message.success("Course deleted successfully")
  }

  const handleSaveCourse = (values) => {
    message.success("Course updated successfully")
    setCourseModalVisible(false)
    form.resetFields()
  }

  const getStatusCounts = () => {
    const approved = coursesData.filter((course) => course.status === "approved").length
    const pending = coursesData.filter((course) => course.status === "pending").length
    const rejected = coursesData.filter((course) => course.status === "rejected").length
    return { approved, pending, rejected }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Total Courses</span>}
              value={coursesData.length}
              prefix={<BookOutlined className="text-primary" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Approved</span>}
              value={statusCounts.approved}
              prefix={<CheckCircleOutlined className="text-emerald-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Pending</span>}
              value={statusCounts.pending}
              prefix={<ClockCircleOutlined className="text-yellow-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Rejected</span>}
              value={statusCounts.rejected}
              prefix={<CloseCircleOutlined className="text-red-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Course Management Table */}
      <Card className="bg-card border-border">
        <Table
          columns={columns}
          dataSource={coursesData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
          }}
          scroll={{ x: 1000 }}
          className="custom-table"
        />
      </Card>

      {/* Edit Course Modal */}
      <Modal
        title={<span className="text-foreground">Edit Course</span>}
        open={courseModalVisible}
        onCancel={() => {
          setCourseModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={800}
        className="custom-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveCourse} className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label={<span className="text-foreground">Course Title</span>}
                rules={[{ required: true, message: "Please input the course title!" }]}
              >
                <Input className="bg-input border-border text-foreground" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label={<span className="text-foreground">Instructor</span>}
                rules={[{ required: true, message: "Please input the instructor name!" }]}
              >
                <Input className="bg-input border-border text-foreground" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="category" label={<span className="text-foreground">Category</span>}>
                <Select className="custom-select">
                  <Option value="AI & ML">AI & ML</Option>
                  <Option value="Web Development">Web Development</Option>
                  <Option value="Data Science">Data Science</Option>
                  <Option value="Mobile Development">Mobile Development</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="price" label={<span className="text-foreground">Price ($)</span>}>
                <Input type="number" className="bg-input border-border text-foreground" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label={<span className="text-foreground">Status</span>}>
                <Select className="custom-select">
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label={<span className="text-foreground">Description</span>}>
            <TextArea rows={4} className="bg-input border-border text-foreground" />
          </Form.Item>
          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setCourseModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Course Modal */}
      <Modal
        title={<span className="text-foreground">Course Details</span>}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
        className="custom-modal"
      >
        {selectedCourse && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Image
                width={200}
                height={120}
                src={selectedCourse.thumbnail || "/placeholder.svg"}
                className="rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-foreground text-xl font-semibold mb-2">{selectedCourse.title}</h3>
                <p className="text-muted-foreground mb-3">{selectedCourse.description}</p>
                <div className="flex items-center gap-4">
                  <Tag color="purple">{selectedCourse.category}</Tag>
                  <Tag
                    color={
                      selectedCourse.status === "approved"
                        ? "green"
                        : selectedCourse.status === "pending"
                          ? "orange"
                          : "red"
                    }
                  >
                    {selectedCourse.status.toUpperCase()}
                  </Tag>
                </div>
              </div>
            </div>

            <Descriptions bordered column={2} className="custom-descriptions">
              <Descriptions.Item label="Instructor" span={2}>
                <div className="flex items-center gap-2">
                  <UserOutlined />
                  {selectedCourse.instructor}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Price">${selectedCourse.price}</Descriptions.Item>
              <Descriptions.Item label="Duration">{selectedCourse.duration}</Descriptions.Item>
              <Descriptions.Item label="Lessons">{selectedCourse.lessons}</Descriptions.Item>
              <Descriptions.Item label="Students">{selectedCourse.students}</Descriptions.Item>
              <Descriptions.Item label="Rating" span={2}>
                {selectedCourse.rating > 0 ? (
                  <div className="flex items-center gap-2">
                    <Rate disabled defaultValue={selectedCourse.rating} />
                    <span>{selectedCourse.rating}/5</span>
                  </div>
                ) : (
                  "No ratings yet"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Created Date" span={2}>
                {selectedCourse.createdDate}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CourseManagement
