import React, { useState } from "react";
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
  Typography,
  Tabs,
  InputNumber,
  Switch,
  Progress,
  List,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  RobotOutlined,
  BulbOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const Quizzes = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [aiGeneratorVisible, setAiGeneratorVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [form] = Form.useForm();
  const [aiForm] = Form.useForm();

  const quizzes = [
    {
      id: "1",
      title: "React Hooks Assessment",
      course: "Advanced React Development",
      type: "Quiz",
      questions: 15,
      difficulty: "Medium",
      status: "Published",
      submissions: 89,
      avgScore: 78.5,
      createdAt: "2024-01-20",
      aiGenerated: false,
    },
    {
      id: "2",
      title: "Machine Learning Project",
      course: "ML Fundamentals",
      type: "Assignment",
      questions: 5,
      difficulty: "Hard",
      status: "Published",
      submissions: 45,
      avgScore: 82.3,
      createdAt: "2024-01-18",
      aiGenerated: true,
    },
    {
      id: "3",
      title: "JavaScript Fundamentals Quiz",
      course: "Web Development Basics",
      type: "Quiz",
      questions: 20,
      difficulty: "Easy",
      status: "Draft",
      submissions: 0,
      avgScore: 0,
      createdAt: "2024-01-25",
      aiGenerated: true,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
      case "Mixed":
        return "processing";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "success";
      case "Draft":
        return "default";
      case "Archived":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Quiz/Assignment",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{text}</Text>
            {record.aiGenerated && (
              <Tag icon={<RobotOutlined />} color="purple" style={{ fontSize: "10px" }}>
                AI Generated
              </Tag>
            )}
          </div>
          <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.course}</Text>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          color={type === "Quiz" ? "blue" : "orange"}
          icon={type === "Quiz" ? <QuestionCircleOutlined /> : <FileTextOutlined />}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      render: (questions) => <Text style={{ color: "#ffffff" }}>{questions}</Text>,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty) => <Tag color={getDifficultyColor(difficulty)}>{difficulty}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Performance",
      key: "performance",
      render: (_, record) => (
        <div>
          <Text style={{ color: "#ffffff", display: "block" }}>{record.submissions} submissions</Text>
          <Text style={{ color: "#10b981", fontSize: "12px" }}>
            {record.avgScore > 0 ? `${record.avgScore}% avg score` : "No submissions"}
          </Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} style={{ color: "#6366f1" }} />
          <Button type="text" icon={<EyeOutlined />} style={{ color: "#10b981" }} />
          <Button type="text" icon={<DeleteOutlined />} style={{ color: "#f87171" }} />
        </Space>
      ),
    },
  ];

  const addQuestion = (values) => {
    const newQuestion = {
      id: Date.now().toString(),
      type: values.type,
      question: values.question,
      options: values.options?.split("\n").filter((opt) => opt.trim()),
      correctAnswer: values.correctAnswer,
      points: values.points || 1,
      difficulty: values.difficulty,
      explanation: values.explanation,
    };
    setQuestions([...questions, newQuestion]);
    form.resetFields();
  };

  const generateAIQuestions = async (values) => {
    // Simulate AI generation
    const aiQuestions = [
      {
        id: "ai-1",
        type: "multiple-choice",
        question: "What is the primary purpose of React hooks?",
        options: [
          "To replace class components entirely",
          "To add state and lifecycle methods to functional components",
          "To improve performance",
          "To handle routing",
        ],
        correctAnswer: 1,
        points: 2,
        difficulty: "Medium",
        explanation:
          "React hooks allow functional components to use state and other React features without writing a class.",
      },
      {
        id: "ai-2",
        type: "short-answer",
        question: "Explain the difference between useState and useEffect hooks.",
        correctAnswer: "useState manages component state while useEffect handles side effects and lifecycle events",
        points: 3,
        difficulty: "Medium",
        explanation:
          "useState is for state management, useEffect is for side effects like API calls, subscriptions, etc.",
      },
      {
        id: "ai-3",
        type: "coding",
        question: "Write a custom hook that manages a counter with increment and decrement functions.",
        correctAnswer: `function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return { count, increment, decrement };
}`,
        points: 5,
        difficulty: "Hard",
        explanation: "Custom hooks should start with 'use' and can encapsulate stateful logic.",
      },
    ];

    setQuestions([...questions, ...aiQuestions]);
    setAiGeneratorVisible(false);
    aiForm.resetFields();
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchText.toLowerCase()) ||
      quiz.course.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === "all" || quiz.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Quiz & Assignment Builder
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Create and manage quizzes and assignments with AI assistance</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Total Quizzes</Text>
            <Text style={{ color: "#6366f1", fontSize: "24px", fontWeight: "bold" }}>
              {quizzes.filter((q) => q.type === "Quiz").length}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Assignments</Text>
            <Text style={{ color: "#f59e0b", fontSize: "24px", fontWeight: "bold" }}>
              {quizzes.filter((q) => q.type === "Assignment").length}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>AI Generated</Text>
            <Text style={{ color: "#ec4899", fontSize: "24px", fontWeight: "bold" }}>
              {quizzes.filter((q) => q.aiGenerated).length}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Avg Score</Text>
            <Text style={{ color: "#10b981", fontSize: "24px", fontWeight: "bold" }}>
              {(quizzes.reduce((sum, quiz) => sum + quiz.avgScore, 0) / quizzes.length).toFixed(1)}%
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Input
              placeholder="Search quizzes and assignments..."
              prefix={<SearchOutlined style={{ color: "#a1a1aa" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Select value={typeFilter} onChange={setTypeFilter} style={{ width: "100%" }}>
              <Option value="all">All Types</Option>
              <Option value="Quiz">Quizzes</Option>
              <Option value="Assignment">Assignments</Option>
            </Select>
          </Col>
          <Col xs={24} sm={10} style={{ textAlign: "right" }}>
            <Space>
              <Button
                icon={<RobotOutlined />}
                onClick={() => setAiGeneratorVisible(true)}
                style={{ background: "#ec4899", borderColor: "#ec4899", color: "#ffffff" }}
              >
                AI Generator
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateModalVisible(true)}
                style={{ background: "#6366f1", borderColor: "#6366f1" }}
              >
                Create Quiz
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Quizzes Table */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}>
        <Table
          columns={columns}
          dataSource={filteredQuizzes}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          style={{ background: "transparent" }}
        />
      </Card>

      {/* Create Quiz Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Create Quiz/Assignment</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={800}
        style={{ background: "#1a1a2e" }}
      >
        <Tabs defaultActiveKey="1" style={{ marginTop: "24px" }}>
          <TabPane tab="Basic Info" key="1">
            <Form form={form} layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="title"
                    label={<span style={{ color: "#ffffff" }}>Title</span>}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter quiz/assignment title"
                      style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="type"
                    label={<span style={{ color: "#ffffff" }}>Type</span>}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select type">
                      <Option value="Quiz">Quiz</Option>
                      <Option value="Assignment">Assignment</Option>
                    </Select>
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
                      <Option value="Web Development Basics">Web Development Basics</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="difficulty"
                    label={<span style={{ color: "#ffffff" }}>Difficulty</span>}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select difficulty">
                      <Option value="Easy">Easy</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Hard">Hard</Option>
                      <Option value="Mixed">Mixed</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="description" label={<span style={{ color: "#ffffff" }}>Description</span>}>
                <Input.TextArea
                  rows={3}
                  placeholder="Enter description (optional)"
                  style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item name="timeLimit" label={<span style={{ color: "#ffffff" }}>Time Limit (minutes)</span>}>
                    <InputNumber
                      min={1}
                      placeholder="60"
                      style={{ width: "100%", background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="attempts" label={<span style={{ color: "#ffffff" }}>Max Attempts</span>}>
                    <InputNumber
                      min={1}
                      placeholder="3"
                      style={{ width: "100%", background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="passingScore" label={<span style={{ color: "#ffffff" }}>Passing Score (%)</span>}>
                    <InputNumber
                      min={0}
                      max={100}
                      placeholder="70"
                      style={{ width: "100%", background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="aiGrading" valuePropName="checked">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Switch />
                  <span style={{ color: "#ffffff" }}>Enable AI Auto-Grading</span>
                  <RobotOutlined style={{ color: "#ec4899" }} />
                </div>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Questions" key="2">
            <div style={{ marginBottom: "16px" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  /* Add question logic */
                }}
                style={{ background: "#6366f1", borderColor: "#6366f1", marginRight: "8px" }}
              >
                Add Question
              </Button>
              <Button
                icon={<RobotOutlined />}
                onClick={() => setAiGeneratorVisible(true)}
                style={{ background: "#ec4899", borderColor: "#ec4899", color: "#ffffff" }}
              >
                Generate with AI
              </Button>
            </div>

            <List
              dataSource={questions}
              renderItem={(question, index) => (
                <Card
                  key={question.id}
                  style={{ background: "#0f0f23", border: "1px solid #2d2d3a", marginBottom: "16px" }}
                  title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#ffffff" }}>
                        Question {index + 1} - {question.type.replace("-", " ").toUpperCase()}
                      </span>
                      <div>
                        <Tag color={getDifficultyColor(question.difficulty)}>{question.difficulty}</Tag>
                        <Text style={{ color: "#a1a1aa" }}>{question.points} pts</Text>
                      </div>
                    </div>
                  }
                  actions={[
                    <Button key="edit" type="text" icon={<EditOutlined />} style={{ color: "#6366f1" }} />,
                    <Button key="delete" type="text" icon={<DeleteOutlined />} style={{ color: "#f87171" }} />,
                  ]}
                >
                  <Paragraph style={{ color: "#ffffff", marginBottom: "12px" }}>{question.question}</Paragraph>
                  {question.options && (
                    <div style={{ marginBottom: "12px" }}>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} style={{ marginBottom: "4px" }}>
                          <Text
                            style={{
                              color: optIndex === question.correctAnswer ? "#10b981" : "#a1a1aa",
                              fontWeight: optIndex === question.correctAnswer ? "bold" : "normal",
                            }}
                          >
                            {optIndex === question.correctAnswer && (
                              <CheckCircleOutlined style={{ marginRight: "4px" }} />
                            )}
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
                  {question.explanation && (
                    <div style={{ background: "#1a1a2e", padding: "8px", borderRadius: "4px", marginTop: "8px" }}>
                      <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                        <BulbOutlined style={{ marginRight: "4px", color: "#f59e0b" }} />
                        {question.explanation}
                      </Text>
                    </div>
                  )}
                </Card>
              )}
            />
          </TabPane>
        </Tabs>

        <div style={{ textAlign: "right", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #2d2d3a" }}>
          <Space>
            <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
            <Button type="primary" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
              Create Quiz
            </Button>
          </Space>
        </div>
      </Modal>

      {/* AI Generator Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RobotOutlined style={{ color: "#ec4899" }} />
            <span style={{ color: "#ffffff" }}>AI Quiz Generator</span>
          </div>
        }
        open={aiGeneratorVisible}
        onCancel={() => setAiGeneratorVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={aiForm} layout="vertical" onFinish={generateAIQuestions} style={{ marginTop: "24px" }}>
          <Form.Item
            name="content"
            label={<span style={{ color: "#ffffff" }}>Upload Content or Enter Text</span>}
            rules={[{ required: true, message: "Please provide content for AI generation" }]}
          >
            <Input.TextArea
              rows={6}
              placeholder="Paste your lecture notes, documentation, or content here..."
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="questionCount"
                label={<span style={{ color: "#ffffff" }}>Number of Questions</span>}
                initialValue={5}
              >
                <InputNumber
                  min={1}
                  max={50}
                  style={{ width: "100%", background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="difficulty"
                label={<span style={{ color: "#ffffff" }}>Difficulty Distribution</span>}
                initialValue="mixed"
              >
                <Select>
                  <Option value="easy">All Easy</Option>
                  <Option value="medium">All Medium</Option>
                  <Option value="hard">All Hard</Option>
                  <Option value="mixed">Mixed (Balanced)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="questionTypes" label={<span style={{ color: "#ffffff" }}>Question Types</span>}>
            <Select
              mode="multiple"
              placeholder="Select question types"
              defaultValue={["multiple-choice", "short-answer"]}
            >
              <Option value="multiple-choice">Multiple Choice</Option>
              <Option value="short-answer">Short Answer</Option>
              <Option value="coding">Coding</Option>
              <Option value="essay">Essay</Option>
            </Select>
          </Form.Item>

          <Form.Item name="includeExplanations" valuePropName="checked" initialValue={true}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Switch defaultChecked />
              <span style={{ color: "#ffffff" }}>Include explanations for answers</span>
            </div>
          </Form.Item>

          <div style={{ background: "#1a1a2e", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <BulbOutlined style={{ color: "#f59e0b" }} />
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>AI Generation Preview</Text>
            </div>
            <Progress percent={0} status="normal" strokeColor="#ec4899" style={{ marginBottom: "8px" }} />
            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
              AI will analyze your content and generate relevant questions with appropriate difficulty levels and
              explanations.
            </Text>
          </div>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setAiGeneratorVisible(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<RobotOutlined />}
                style={{ background: "#ec4899", borderColor: "#ec4899" }}
              >
                Generate Questions
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Quizzes;