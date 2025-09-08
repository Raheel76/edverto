
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
  Avatar,
  Space,
  Popconfirm,
  message,
  Tabs,
  Row,
  Col,
  Statistic,
} from "antd"
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { TabPane } = Tabs

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [userModalVisible, setUserModalVisible] = useState(false)
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Sample data
  const studentsData = [
    {
      key: "1",
      id: "STU001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8900",
      enrolledCourses: 3,
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      avatar: "/api/placeholder/40/40",
    },
    {
      key: "2",
      id: "STU002",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1 234 567 8901",
      enrolledCourses: 5,
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      avatar: "/api/placeholder/40/40",
    },
    {
      key: "3",
      id: "STU003",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@email.com",
      phone: "+1 234 567 8902",
      enrolledCourses: 2,
      status: "suspended",
      joinDate: "2024-01-05",
      lastActive: "2024-01-18",
      avatar: "/api/placeholder/40/40",
    },
  ]

  const teachersData = [
    {
      key: "1",
      id: "TEA001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 234 567 9000",
      expertise: "Machine Learning",
      courses: 4,
      students: 156,
      status: "approved",
      joinDate: "2023-12-01",
      rating: 4.8,
      avatar: "/api/placeholder/40/40",
    },
    {
      key: "2",
      id: "TEA002",
      name: "Prof. Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 234 567 9001",
      expertise: "Web Development",
      courses: 6,
      students: 234,
      status: "approved",
      joinDate: "2023-11-15",
      rating: 4.9,
      avatar: "/api/placeholder/40/40",
    },
    {
      key: "3",
      id: "TEA003",
      name: "Dr. Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+1 234 567 9002",
      expertise: "Data Science",
      courses: 0,
      students: 0,
      status: "pending",
      joinDate: "2024-01-20",
      rating: 0,
      avatar: "/api/placeholder/40/40",
    },
  ]

  const studentColumns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="text-foreground font-medium">{text}</div>
            <div className="text-muted-foreground text-sm">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <div>
          <div className="text-foreground">{text}</div>
          <div className="text-muted-foreground text-sm">{record.phone}</div>
        </div>
      ),
    },
    {
      title: "Courses",
      dataIndex: "enrolledCourses",
      key: "enrolledCourses",
      render: (count) => <Tag color="blue">{count} Enrolled</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : status === "suspended" ? "red" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
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
            onClick={() => handleViewUser(record)}
            className="text-primary hover:text-primary/80"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            className="text-cyan-400 hover:text-cyan-300"
          />
          {record.status === "active" ? (
            <Popconfirm
              title="Suspend this student?"
              onConfirm={() => handleSuspendUser(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" icon={<CloseCircleOutlined />} className="text-red-400 hover:text-red-300" />
            </Popconfirm>
          ) : (
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              onClick={() => handleActivateUser(record.key)}
              className="text-emerald-400 hover:text-emerald-300"
            />
          )}
        </Space>
      ),
    },
  ]

  const teacherColumns = [
    {
      title: "Teacher",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="text-foreground font-medium">{text}</div>
            <div className="text-muted-foreground text-sm">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <div>
          <div className="text-foreground">{text}</div>
          <div className="text-muted-foreground text-sm">{record.phone}</div>
        </div>
      ),
    },
    {
      title: "Expertise",
      dataIndex: "expertise",
      key: "expertise",
      render: (expertise) => <Tag color="purple">{expertise}</Tag>,
    },
    {
      title: "Performance",
      key: "performance",
      render: (_, record) => (
        <div>
          <div className="text-foreground">{record.courses} Courses</div>
          <div className="text-muted-foreground text-sm">{record.students} Students</div>
          {record.rating > 0 && <div className="text-yellow-500 text-sm">★ {record.rating}</div>}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "approved" ? "green" : status === "pending" ? "orange" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record)}
            className="text-primary hover:text-primary/80"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            className="text-cyan-400 hover:text-cyan-300"
          />
          {record.status === "pending" ? (
            <Space>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveTeacher(record.key)}
                className="text-emerald-400 hover:text-emerald-300"
              />
              <Button
                type="text"
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectTeacher(record.key)}
                className="text-red-400 hover:text-red-300"
              />
            </Space>
          ) : (
            <Popconfirm
              title="Ban this teacher?"
              onConfirm={() => handleBanTeacher(record.key)}
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

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setViewModalVisible(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    form.setFieldsValue(user)
    setUserModalVisible(true)
  }

  const handleSuspendUser = (key) => {
    message.success("Student suspended successfully")
  }

  const handleActivateUser = (key) => {
    message.success("Student activated successfully")
  }

  const handleApproveTeacher = (key) => {
    message.success("Teacher approved successfully")
  }

  const handleRejectTeacher = (key) => {
    message.success("Teacher application rejected")
  }

  const handleBanTeacher = (key) => {
    message.success("Teacher banned successfully")
  }

  const handleSaveUser = (values) => {
    message.success("User updated successfully")
    setUserModalVisible(false)
    form.resetFields()
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Total Students</span>}
              value={2847}
              prefix={<UserOutlined className="text-primary" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Active Teachers</span>}
              value={156}
              prefix={<TeamOutlined className="text-cyan-400" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Pending Approvals</span>}
              value={12}
              prefix={<UserAddOutlined className="text-yellow-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
      </Row>

      {/* User Management Tabs */}
      <Card className="bg-card border-border">
        <Tabs defaultActiveKey="students" className="custom-tabs">
          <TabPane tab="Students" key="students">
            <Table
              columns={studentColumns}
              dataSource={studentsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} students`,
              }}
              scroll={{ x: 800 }}
              className="custom-table"
            />
          </TabPane>
          <TabPane tab="Teachers" key="teachers">
            <Table
              columns={teacherColumns}
              dataSource={teachersData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} teachers`,
              }}
              scroll={{ x: 800 }}
              className="custom-table"
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Edit User Modal */}
      <Modal
        title={<span className="text-foreground">Edit User</span>}
        open={userModalVisible}
        onCancel={() => {
          setUserModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        className="custom-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSaveUser} className="mt-4">
          <Form.Item
            name="name"
            label={<span className="text-foreground">Name</span>}
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="bg-input border-border text-foreground" />
          </Form.Item>
          <Form.Item
            name="email"
            label={<span className="text-foreground">Email</span>}
            rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
          >
            <Input className="bg-input border-border text-foreground" />
          </Form.Item>
          <Form.Item name="phone" label={<span className="text-foreground">Phone</span>}>
            <Input className="bg-input border-border text-foreground" />
          </Form.Item>
          <Form.Item name="status" label={<span className="text-foreground">Status</span>}>
            <Select className="custom-select">
              <Option value="active">Active</Option>
              <Option value="suspended">Suspended</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setUserModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View User Modal */}
      <Modal
        title={<span className="text-foreground">User Details</span>}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={600}
        className="custom-modal"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Avatar size={64} src={selectedUser.avatar} icon={<UserOutlined />} />
              <div>
                <h3 className="text-foreground text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-muted-foreground">{selectedUser.id}</p>
                <Tag color={selectedUser.status === "active" ? "green" : "red"}>
                  {selectedUser.status?.toUpperCase()}
                </Tag>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-muted-foreground text-sm">Email</label>
                <p className="text-foreground">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-muted-foreground text-sm">Phone</label>
                <p className="text-foreground">{selectedUser.phone}</p>
              </div>
              <div>
                <label className="text-muted-foreground text-sm">Join Date</label>
                <p className="text-foreground">{selectedUser.joinDate}</p>
              </div>
              <div>
                <label className="text-muted-foreground text-sm">Last Active</label>
                <p className="text-foreground">{selectedUser.lastActive}</p>
              </div>
              {selectedUser.enrolledCourses && (
                <div>
                  <label className="text-muted-foreground text-sm">Enrolled Courses</label>
                  <p className="text-foreground">{selectedUser.enrolledCourses}</p>
                </div>
              )}
              {selectedUser.expertise && (
                <div>
                  <label className="text-muted-foreground text-sm">Expertise</label>
                  <p className="text-foreground">{selectedUser.expertise}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default UserManagement
