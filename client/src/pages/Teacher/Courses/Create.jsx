"use client"
import { useState } from "react"
import {
  Card,
  Steps,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  List,
  Modal,
  Progress,
} from "antd"
import {
  PlusOutlined,
  UploadOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  DragOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { Step } = Steps

 const CreateCourse =() =>{
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [modules, setModules] = useState([])
  const [moduleModalVisible, setModuleModalVisible] = useState(false)
  const [lessonModalVisible, setLessonModalVisible] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState("")

  const steps = [
    {
      title: "Basic Info",
      description: "Course details and description",
    },
    {
      title: "Content Structure",
      description: "Organize modules and lessons",
    },
    {
      title: "Upload Content",
      description: "Add videos, documents, and materials",
    },
    {
      title: "Preview & Publish",
      description: "Review and submit for approval",
    },
  ]

  const addModule = (values) => {
    const newModule = {
      id: Date.now().toString(),
      title: values.title,
      lessons: [],
    }
    setModules([...modules, newModule])
    setModuleModalVisible(false)
  }

  const addLesson = (values) => {
    setModules(
      modules.map((module) =>
        module.id === selectedModuleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now().toString(),
                  title: values.title,
                  type: values.type,
                  duration: values.duration,
                },
              ],
            }
          : module
      )
    )
    setLessonModalVisible(false)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <Form form={form} layout="vertical">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="title"
                    label={<span style={{ color: "#ffffff" }}>Course Title</span>}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter course title"
                      style={{
                        background: "#0f0f23",
                        borderColor: "#2d2d3a",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label={<span style={{ color: "#ffffff" }}>Category</span>}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select category">
                      <Option value="Web Development">Web Development</Option>
                      <Option value="Data Science">Data Science</Option>
                      <Option value="Design">Design</Option>
                      <Option value="Programming">Programming</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="level"
                    label={<span style={{ color: "#ffffff" }}>Difficulty Level</span>}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select level">
                      <Option value="Beginner">Beginner</Option>
                      <Option value="Intermediate">Intermediate</Option>
                      <Option value="Advanced">Advanced</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="price"
                    label={<span style={{ color: "#ffffff" }}>Price ($)</span>}
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="number"
                      placeholder="0.00"
                      style={{
                        background: "#0f0f23",
                        borderColor: "#2d2d3a",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="description"
                    label={<span style={{ color: "#ffffff" }}>Description</span>}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      rows={6}
                      placeholder="Enter course description"
                      style={{
                        background: "#0f0f23",
                        borderColor: "#2d2d3a",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="thumbnail"
                    label={<span style={{ color: "#ffffff" }}>Course Thumbnail</span>}
                  >
                    <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8, color: "#a1a1aa" }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        )

      case 1:
        return (
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <div style={{ marginBottom: "24px" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setModuleModalVisible(true)}
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Add Module
              </Button>
            </div>

            <List
              dataSource={modules}
              renderItem={(module, index) => (
                <Card
                  key={module.id}
                  style={{
                    background: "#0f0f23",
                    border: "1px solid #2d2d3a",
                    marginBottom: "16px",
                  }}
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#ffffff" }}>
                        <DragOutlined style={{ marginRight: "8px", color: "#a1a1aa" }} />
                        Module {index + 1}: {module.title}
                      </span>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setSelectedModuleId(module.id)
                          setLessonModalVisible(true)
                        }}
                        style={{ color: "#6366f1" }}
                      >
                        Add Lesson
                      </Button>
                    </div>
                  }
                >
                  <List
                    dataSource={module.lessons}
                    renderItem={(lesson, lessonIndex) => (
                      <List.Item
                        style={{ borderBottom: "1px solid #2d2d3a" }}
                        actions={[
                          <Button
                            key="edit"
                            type="text"
                            icon={<EditOutlined />}
                            style={{ color: "#a1a1aa" }}
                          />,
                          <Button
                            key="delete"
                            type="text"
                            icon={<DeleteOutlined />}
                            style={{ color: "#f87171" }}
                          />,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            lesson.type === "video" ? (
                              <PlayCircleOutlined
                                style={{ color: "#6366f1", fontSize: "18px" }}
                              />
                            ) : (
                              <FileTextOutlined
                                style={{ color: "#f59e0b", fontSize: "18px" }}
                              />
                            )
                          }
                          title={
                            <span style={{ color: "#ffffff" }}>
                              Lesson {lessonIndex + 1}: {lesson.title}
                            </span>
                          }
                          description={
                            <span style={{ color: "#a1a1aa" }}>
                              {lesson.type} {lesson.duration && `• ${lesson.duration}`}
                            </span>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              )}
            />
          </Card>
        )

      case 2:
        return (
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <Title level={4} style={{ color: "#ffffff", marginBottom: "24px" }}>
              Upload Course Materials
            </Title>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card
                  title={<span style={{ color: "#ffffff" }}>Video Content</span>}
                  style={{ background: "#0f0f23", border: "1px solid #2d2d3a" }}
                >
                  <Upload.Dragger
                    multiple
                    beforeUpload={() => false}
                    style={{ background: "#1a1a2e", borderColor: "#2d2d3a" }}
                  >
                    <p className="ant-upload-drag-icon">
                      <PlayCircleOutlined style={{ color: "#6366f1", fontSize: "48px" }} />
                    </p>
                    <p style={{ color: "#ffffff" }}>Click or drag video files to upload</p>
                    <p style={{ color: "#a1a1aa" }}>Support: MP4, AVI, MOV</p>
                  </Upload.Dragger>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card
                  title={<span style={{ color: "#ffffff" }}>Documents & Resources</span>}
                  style={{ background: "#0f0f23", border: "1px solid #2d2d3a" }}
                >
                  <Upload.Dragger
                    multiple
                    beforeUpload={() => false}
                    style={{ background: "#1a1a2e", borderColor: "#2d2d3a" }}
                  >
                    <p className="ant-upload-drag-icon">
                      <FileTextOutlined style={{ color: "#f59e0b", fontSize: "48px" }} />
                    </p>
                    <p style={{ color: "#ffffff" }}>Click or drag documents to upload</p>
                    <p style={{ color: "#a1a1aa" }}>Support: PDF, DOC, PPT</p>
                  </Upload.Dragger>
                </Card>
              </Col>
            </Row>

            <div style={{ marginTop: "24px" }}>
              <Progress
                percent={75}
                status="active"
                strokeColor="#6366f1"
                style={{ marginBottom: "16px" }}
              />
              <Text style={{ color: "#a1a1aa" }}>Upload Progress: 3 of 4 files completed</Text>
            </div>
          </Card>
        )

      case 3:
        return (
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
            <Title level={4} style={{ color: "#ffffff", marginBottom: "24px" }}>
              Course Preview & Publish
            </Title>

            <div style={{ marginBottom: "24px" }}>
              <Button
                type="default"
                icon={<PlayCircleOutlined />}
                size="large"
                style={{ marginRight: "16px" }}
              >
                Preview as Student
              </Button>
              <Button
                type="primary"
                size="large"
                style={{ background: "#10b981", borderColor: "#10b981" }}
              >
                Submit for Review
              </Button>
            </div>

            <Divider style={{ borderColor: "#2d2d3a" }} />

            <div>
              <Title level={5} style={{ color: "#ffffff" }}>
                Course Summary
              </Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Text style={{ color: "#a1a1aa", display: "block" }}>Modules</Text>
                  <Text style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}>
                    {modules.length}
                  </Text>
                </Col>
                <Col xs={24} sm={8}>
                  <Text style={{ color: "#a1a1aa", display: "block" }}>Lessons</Text>
                  <Text style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}>
                    {modules.reduce((sum, module) => sum + module.lessons.length, 0)}
                  </Text>
                </Col>
                <Col xs={24} sm={8}>
                  <Text style={{ color: "#a1a1aa", display: "block" }}>Estimated Duration</Text>
                  <Text style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}>
                    8h 30m
                  </Text>
                </Col>
              </Row>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      <Title level={2} style={{ color: "#ffffff", marginBottom: "24px" }}>
        Create New Course
      </Title>

      <Card
        style={{
          background: "#1a1a2e",
          border: "1px solid #2d2d3a",
          marginBottom: "24px",
        }}
      >
        <Steps current={currentStep} style={{ marginBottom: "32px" }}>
          {steps.map((step, index) => (
            <Step
              key={index}
              title={
                <span style={{ color: currentStep >= index ? "#6366f1" : "#a1a1aa" }}>
                  {step.title}
                </span>
              }
              description={<span style={{ color: "#a1a1aa" }}>{step.description}</span>}
            />
          ))}
        </Steps>
      </Card>

      {renderStepContent()}

      <Card
        style={{
          background: "#1a1a2e",
          border: "1px solid #2d2d3a",
          marginTop: "24px",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <Space>
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Next
              </Button>
            )}
          </Space>
        </div>
      </Card>

      {/* Add Module Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Add Module</span>}
        open={moduleModalVisible}
        onCancel={() => setModuleModalVisible(false)}
        footer={null}
      >
        <Form onFinish={addModule} layout="vertical">
          <Form.Item
            name="title"
            label={<span style={{ color: "#ffffff" }}>Module Title</span>}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter module title"
              style={{
                background: "#0f0f23",
                borderColor: "#2d2d3a",
                color: "#ffffff",
              }}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setModuleModalVisible(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Add Module
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Add Lesson</span>}
        open={lessonModalVisible}
        onCancel={() => setLessonModalVisible(false)}
        footer={null}
      >
        <Form onFinish={addLesson} layout="vertical">
          <Form.Item
            name="title"
            label={<span style={{ color: "#ffffff" }}>Lesson Title</span>}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter lesson title"
              style={{
                background: "#0f0f23",
                borderColor: "#2d2d3a",
                color: "#ffffff",
              }}
            />
          </Form.Item>
          <Form.Item
            name="type"
            label={<span style={{ color: "#ffffff" }}>Lesson Type</span>}
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Option value="video">Video</Option>
              <Option value="text">Text/Document</Option>
              <Option value="quiz">Quiz</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="duration"
            label={<span style={{ color: "#ffffff" }}>Duration (optional)</span>}
          >
            <Input
              placeholder="e.g., 15 minutes"
              style={{
                background: "#0f0f23",
                borderColor: "#2d2d3a",
                color: "#ffffff",
              }}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setLessonModalVisible(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Add Lesson
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}


export default CreateCourse
