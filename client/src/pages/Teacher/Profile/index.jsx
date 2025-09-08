"use client"
import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Switch,
  Rate,
  Typography,
  Divider,
  List,
  Tag,
  Space,
  Modal,
  Select,
} from "antd"
import {
  EditOutlined,
  UploadOutlined,
  TrophyOutlined,
  BookOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  CameraOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

const TeacherProfile=()=> {
  const [editMode, setEditMode] = useState(false)
  const [certificateModalVisible, setCertificateModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [certForm] = Form.useForm()

  const teacherData = {
    name: "Prof. John Smith",
    title: "Senior Software Engineer & Educator",
    bio: "Passionate educator with 10+ years of experience in software development and teaching. Specialized in React, Node.js, and Machine Learning. I believe in making complex concepts simple and accessible to everyone.",
    avatar: "/teacher-avatar.jpg",
    email: "john.smith@email.com",
    location: "San Francisco, CA",
    website: "https://johnsmith.dev",
    linkedin: "https://linkedin.com/in/johnsmith",
    twitter: "https://twitter.com/johnsmith",
    experience: "10+ years",
    totalStudents: 2847,
    totalCourses: 12,
    averageRating: 4.8,
    totalReviews: 1234,
    profileVisibility: true,
    languages: ["English", "Spanish", "French"],
    expertise: ["React", "Node.js", "Machine Learning", "Python", "JavaScript", "UI/UX Design"],
  }

  const certificates = [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-06-15",
      credentialId: "AWS-CSA-2023-001234",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "2",
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023-03-20",
      credentialId: "GCP-PD-2023-005678",
      url: "https://cloud.google.com/certification/",
    },
    {
      id: "3",
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2022-11-10",
      credentialId: "CKA-2022-009876",
      url: "https://www.cncf.io/certification/cka/",
    },
  ]

  const courses = [
    {
      id: "1",
      title: "Advanced React Development",
      students: 1234,
      rating: 4.9,
      revenue: 24680.0,
      status: "Published",
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      students: 987,
      rating: 4.8,
      revenue: 19740.0,
      status: "Published",
    },
    {
      id: "3",
      title: "Full-Stack JavaScript",
      students: 626,
      rating: 4.7,
      revenue: 12520.0,
      status: "Published",
    },
  ]

  const handleSaveProfile = (values) => {
    console.log("Saving profile:", values)
    setEditMode(false)
  }

  const handleAddCertificate = (values) => {
    console.log("Adding certificate:", values)
    setCertificateModalVisible(false)
    certForm.resetFields()
  }

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Teacher Profile
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Manage your public profile and credentials</Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Overview */}
        <Col xs={24} lg={8}>
          <Card
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => setEditMode(true)}
                style={{ color: "#6366f1" }}
              >
                Edit Profile
              </Button>,
              <Button key="preview" type="text" icon={<EyeOutlined />} style={{ color: "#10b981" }}>
                Preview Public
              </Button>,
            ]}
          >
            <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
              <Avatar size={120} src={teacherData.avatar} />
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                size="small"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "#6366f1",
                  borderColor: "#6366f1",
                }}
              />
            </div>

            <Title level={4} style={{ color: "#ffffff", margin: "8px 0" }}>
              {teacherData.name}
            </Title>
            <Text style={{ color: "#a1a1aa", display: "block", marginBottom: "16px" }}>{teacherData.title}</Text>

            <div style={{ marginBottom: "16px" }}>
              <Rate disabled value={teacherData.averageRating} style={{ fontSize: "16px" }} />
              <Text style={{ color: "#f59e0b", marginLeft: "8px" }}>
                {teacherData.averageRating} ({teacherData.totalReviews} reviews)
              </Text>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
              <Col span={8}>
                <Text style={{ color: "#a1a1aa", display: "block", fontSize: "12px" }}>Students</Text>
                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px" }}>
                  {teacherData.totalStudents.toLocaleString()}
                </Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#a1a1aa", display: "block", fontSize: "12px" }}>Courses</Text>
                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px" }}>
                  {teacherData.totalCourses}
                </Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#a1a1aa", display: "block", fontSize: "12px" }}>Experience</Text>
                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px" }}>{teacherData.experience}</Text>
              </Col>
            </Row>

            <div style={{ marginBottom: "16px" }}>
              <Text style={{ color: "#a1a1aa", display: "block", marginBottom: "8px" }}>Profile Visibility</Text>
              <Switch checked={teacherData.profileVisibility} checkedChildren="Public" unCheckedChildren="Private" />
            </div>

            <Divider style={{ borderColor: "#2d2d3a" }} />

            <div style={{ textAlign: "left" }}>
              <Text style={{ color: "#a1a1aa", display: "block", marginBottom: "8px" }}>Expertise</Text>
              <Space wrap>
                {teacherData.expertise.map((skill) => (
                  <Tag key={skill} color="blue">
                    {skill}
                  </Tag>
                ))}
              </Space>
            </div>
          </Card>
        </Col>

        {/* Profile Details */}
        <Col xs={24} lg={16}>
          <Card
            title={<span style={{ color: "#ffffff" }}>Profile Information</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}
          >
            {editMode ? (
              <Form form={form} layout="vertical" onFinish={handleSaveProfile} initialValues={teacherData}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item name="name" label={<span style={{ color: "#ffffff" }}>Full Name</span>}>
                      <Input style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="title" label={<span style={{ color: "#ffffff" }}>Professional Title</span>}>
                      <Input style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="bio" label={<span style={{ color: "#ffffff" }}>Bio</span>}>
                  <TextArea rows={4} style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                </Form.Item>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item name="email" label={<span style={{ color: "#ffffff" }}>Email</span>}>
                      <Input style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="location" label={<span style={{ color: "#ffffff" }}>Location</span>}>
                      <Input style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item name="website" label={<span style={{ color: "#ffffff" }}>Website</span>}>
                      <Input style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="linkedin" label={<span style={{ color: "#ffffff" }}>LinkedIn</span>}>
                      <Input style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Space>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
                      Save Changes
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <Paragraph style={{ color: "#ffffff", fontSize: "16px", lineHeight: "1.6" }}>
                  {teacherData.bio}
                </Paragraph>

                <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
                  <Col xs={24} md={12}>
                    <Text style={{ color: "#a1a1aa", display: "block" }}>Email</Text>
                    <Text style={{ color: "#ffffff" }}>{teacherData.email}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text style={{ color: "#a1a1aa", display: "block" }}>Location</Text>
                    <Text style={{ color: "#ffffff" }}>{teacherData.location}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text style={{ color: "#a1a1aa", display: "block" }}>Website</Text>
                    <Text style={{ color: "#6366f1" }}>{teacherData.website}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text style={{ color: "#a1a1aa", display: "block" }}>LinkedIn</Text>
                    <Text style={{ color: "#6366f1" }}>{teacherData.linkedin}</Text>
                  </Col>
                </Row>
              </div>
            )}
          </Card>

          {/* Certificates */}
          <Card
            title={<span style={{ color: "#ffffff" }}>Certificates & Credentials</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCertificateModalVisible(true)}
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Add Certificate
              </Button>
            }
          >
            <List
              dataSource={certificates}
              renderItem={(cert) => (
                <List.Item
                  style={{ borderBottom: "1px solid #2d2d3a" }}
                  actions={[
                    <Button key="view" type="text" icon={<EyeOutlined />} style={{ color: "#10b981" }} />,
                    <Button key="delete" type="text" icon={<DeleteOutlined />} style={{ color: "#ef4444" }} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<TrophyOutlined style={{ color: "#f59e0b", fontSize: "24px" }} />}
                    title={<Text style={{ color: "#ffffff", fontWeight: "bold" }}>{cert.title}</Text>}
                    description={
                      <div>
                        <Text style={{ color: "#a1a1aa", display: "block" }}>{cert.issuer}</Text>
                        <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                          Issued: {cert.date} • ID: {cert.credentialId}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Course Performance */}
          <Card
            title={<span style={{ color: "#ffffff" }}>Course Performance</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <List
              dataSource={courses}
              renderItem={(course) => (
                <List.Item style={{ borderBottom: "1px solid #2d2d3a" }}>
                  <List.Item.Meta
                    avatar={<BookOutlined style={{ color: "#6366f1", fontSize: "24px" }} />}
                    title={<Text style={{ color: "#ffffff", fontWeight: "bold" }}>{course.title}</Text>}
                    description={
                      <div>
                        <Row gutter={[16, 8]}>
                          <Col xs={24} sm={8}>
                            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>Students</Text>
                            <Text style={{ color: "#ffffff", display: "block", fontWeight: "bold" }}>
                              {course.students.toLocaleString()}
                            </Text>
                          </Col>
                          <Col xs={24} sm={8}>
                            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>Rating</Text>
                            <div>
                              <Rate disabled value={course.rating} style={{ fontSize: "12px" }} />
                              <Text style={{ color: "#f59e0b", marginLeft: "4px", fontSize: "12px" }}>
                                {course.rating}
                              </Text>
                            </div>
                          </Col>
                          <Col xs={24} sm={8}>
                            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>Revenue</Text>
                            <Text style={{ color: "#10b981", display: "block", fontWeight: "bold" }}>
                              ${course.revenue.toLocaleString()}
                            </Text>
                          </Col>
                        </Row>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Add Certificate Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Add Certificate</span>}
        open={certificateModalVisible}
        onCancel={() => setCertificateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={certForm} layout="vertical" onFinish={handleAddCertificate} style={{ marginTop: "24px" }}>
          <Form.Item
            name="title"
            label={<span style={{ color: "#ffffff" }}>Certificate Title</span>}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="e.g., AWS Certified Solutions Architect"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="issuer"
                label={<span style={{ color: "#ffffff" }}>Issuing Organization</span>}
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="e.g., Amazon Web Services"
                  style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="date"
                label={<span style={{ color: "#ffffff" }}>Issue Date</span>}
                rules={[{ required: true }]}
              >
                <Input type="date" style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="credentialId" label={<span style={{ color: "#ffffff" }}>Credential ID</span>}>
            <Input
              placeholder="Certificate ID or credential number"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Form.Item name="url" label={<span style={{ color: "#ffffff" }}>Verification URL</span>}>
            <Input
              placeholder="Link to verify certificate"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Form.Item name="certificate" label={<span style={{ color: "#ffffff" }}>Upload Certificate</span>}>
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload PDF/Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setCertificateModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
                Add Certificate
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TeacherProfile
