import { useState } from "react";
import { Card, Row, Col, Button, Tag, Progress, Tabs, Select, Input } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  UploadOutlined,
  RobotOutlined,
  TrophyOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const StudentAssignment = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample assignments and quizzes data
  const assignments = [
    {
      id: 1,
      title: "Build a Responsive Portfolio Website",
      type: "assignment",
      course: "Complete Web Development Bootcamp",
      description:
        "Create a fully responsive portfolio website using HTML5, CSS3, and JavaScript. Include at least 5 sections and implement smooth scrolling navigation.",
      dueDate: "2024-02-15",
      status: "pending",
      points: 100,
      timeLimit: null,
      attempts: 0,
      maxAttempts: 3,
      submissionType: "file",
      requirements: [
        "Responsive design that works on mobile and desktop",
        "Clean, semantic HTML5 structure",
        "Modern CSS3 styling with flexbox or grid",
        "Interactive JavaScript features",
        "Cross-browser compatibility",
      ],
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Quiz",
      type: "quiz",
      course: "Complete Web Development Bootcamp",
      description: "Test your understanding of JavaScript basics including variables, functions, arrays, and objects.",
      dueDate: "2024-02-10",
      status: "completed",
      score: 85,
      points: 50,
      timeLimit: 30,
      attempts: 1,
      maxAttempts: 2,
      questions: 20,
      submittedAt: "2024-02-08T14:30:00Z",
    },
    {
      id: 3,
      title: "React Component Analysis Essay",
      type: "assignment",
      course: "Advanced React Patterns",
      description:
        "Write a 1500-word essay analyzing the evolution of React components from class components to functional components with hooks.",
      dueDate: "2024-02-20",
      status: "submitted",
      points: 75,
      timeLimit: null,
      attempts: 1,
      maxAttempts: 2,
      submissionType: "text",
      submittedAt: "2024-02-18T16:45:00Z",
      aiScore: 78,
      aiAnalysis: {
        grammar: 92,
        structure: 85,
        content: 88,
        plagiarism: 0,
        feedback:
          "Well-structured essay with clear arguments. Consider adding more specific examples and improving transitions between paragraphs.",
      },
    },
    {
      id: 4,
      title: "CSS Grid Layout Challenge",
      type: "quiz",
      course: "Complete Web Development Bootcamp",
      description: "Practical coding challenges focused on CSS Grid layout techniques and responsive design patterns.",
      dueDate: "2024-02-12",
      status: "overdue",
      points: 40,
      timeLimit: 45,
      attempts: 0,
      maxAttempts: 3,
      questions: 15,
    },
    {
      id: 5,
      title: "Machine Learning Algorithm Implementation",
      type: "assignment",
      course: "Machine Learning Fundamentals",
      description:
        "Implement a linear regression algorithm from scratch using Python. Include data preprocessing, model training, and evaluation metrics.",
      dueDate: "2024-02-25",
      status: "pending",
      points: 120,
      timeLimit: null,
      attempts: 0,
      maxAttempts: 2,
      submissionType: "file",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "submitted":
        return "blue";
      case "pending":
        return "orange";
      case "overdue":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "submitted":
        return <ClockCircleOutlined />;
      case "pending":
        return <ExclamationCircleOutlined />;
      case "overdue":
        return <ExclamationCircleOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    const matchesType = activeTab === "all" || assignment.type === activeTab;

    return matchesSearch && matchesStatus && matchesType;
  });

  const AssignmentCard = ({ assignment }) => (
    <Card
      className="bg-card border-border hover:border-primary/50 transition-all duration-300 mb-4"
      actions={[
        assignment.status === "pending" ? (
          <Button
            type="primary"
            icon={assignment.type === "quiz" ? <PlayCircleOutlined /> : <UploadOutlined />}
            className="bg-primary hover:bg-primary/80"
          >
            {assignment.type === "quiz" ? "Start Quiz" : "Submit Assignment"}
          </Button>
        ) : (
          <Button icon={<EyeOutlined />} className="border-border hover:border-primary">
            View Details
          </Button>
        ),
        assignment.submissionType === "file" && assignment.status !== "pending" && (
          <Button icon={<DownloadOutlined />} className="border-border hover:border-primary">
            Download
          </Button>
        ),
      ].filter(Boolean)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Tag color={assignment.type === "quiz" ? "blue" : "purple"}>
                {assignment.type === "quiz" ? "Quiz" : "Assignment"}
              </Tag>
              <Tag color={getStatusColor(assignment.status)} icon={getStatusIcon(assignment.status)}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Tag>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{assignment.course}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{assignment.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-primary" />
            <div>
              <div className="text-muted-foreground">Due Date</div>
              <div className="font-medium text-foreground">{assignment.dueDate}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrophyOutlined className="text-yellow-500" />
            <div>
              <div className="text-muted-foreground">Points</div>
              <div className="font-medium text-foreground">{assignment.points}</div>
            </div>
          </div>

          {assignment.timeLimit && (
            <div className="flex items-center gap-2">
              <ClockCircleOutlined className="text-orange-500" />
              <div>
                <div className="text-muted-foreground">Time Limit</div>
                <div className="font-medium text-foreground">{assignment.timeLimit} min</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FileTextOutlined className="text-blue-500" />
            <div>
              <div className="text-muted-foreground">Attempts</div>
              <div className="font-medium text-foreground">
                {assignment.attempts}/{assignment.maxAttempts}
              </div>
            </div>
          </div>
        </div>

        {assignment.score !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Score</span>
              <span className="font-semibold text-primary">{assignment.score}%</span>
            </div>
            <Progress
              percent={assignment.score}
              strokeColor={assignment.score >= 80 ? "#10b981" : assignment.score >= 60 ? "#f59e0b" : "#ef4444"}
              trailColor="#4b5563"
            />
          </div>
        )}

        {assignment.aiAnalysis && (
          <Card size="small" className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <RobotOutlined className="text-blue-400" />
              <span className="font-medium text-foreground">AI Analysis</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{assignment.aiAnalysis.grammar}%</div>
                <div className="text-xs text-muted-foreground">Grammar</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{assignment.aiAnalysis.structure}%</div>
                <div className="text-xs text-muted-foreground">Structure</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{assignment.aiAnalysis.content}%</div>
                <div className="text-xs text-muted-foreground">Content</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-400">{assignment.aiAnalysis.plagiarism}%</div>
                <div className="text-xs text-muted-foreground">Plagiarism</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">"{assignment.aiAnalysis.feedback}"</p>
          </Card>
        )}
      </div>
    </Card>
  );

  const stats = {
    total: assignments.length,
    completed: assignments.filter((a) => a.status === "completed").length,
    pending: assignments.filter((a) => a.status === "pending").length,
    overdue: assignments.filter((a) => a.status === "overdue").length,
    avgScore: Math.round(
      assignments.filter((a) => a.score).reduce((acc, a) => acc + a.score, 0) /
        assignments.filter((a) => a.score).length
    ),
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Assignments & Quizzes</h1>
        <p className="text-muted-foreground text-lg">
          Complete assignments and quizzes to test your knowledge and skills
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={12} sm={6}>
          <Card className="bg-card border-border text-center">
            <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="bg-card border-border text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="bg-card border-border text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="bg-card border-border text-center">
            <div className="text-2xl font-bold text-primary mb-1">{stats.avgScore}%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="bg-card border-border mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Search
              placeholder="Search assignments and quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </Col>
          <Col xs={12} md={4}>
            <Select value={filterStatus} onChange={setFilterStatus} className="w-full" placeholder="Filter by status">
              <Option value="all">All Status</Option>
              <Option value="pending">Pending</Option>
              <Option value="submitted">Submitted</Option>
              <Option value="completed">Completed</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Col>
          <Col xs={12} md={4}>
            <div className="text-sm text-muted-foreground">
              Showing {filteredAssignments.length} of {assignments.length} items
            </div>
          </Col>
        </Row>
      </Card>

      {/* Tabs and Content */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
        <TabPane tab={`All (${assignments.length})`} key="all">
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabPane>

        <TabPane tab={`Quizzes (${assignments.filter((a) => a.type === "quiz").length})`} key="quiz">
          <div className="space-y-4">
            {filteredAssignments
              .filter((a) => a.type === "quiz")
              .map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
          </div>
        </TabPane>

        <TabPane tab={`Assignments (${assignments.filter((a) => a.type === "assignment").length})`} key="assignment">
          <div className="space-y-4">
            {filteredAssignments
              .filter((a) => a.type === "assignment")
              .map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
          </div>
        </TabPane>
      </Tabs>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <FileTextOutlined className="text-6xl text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No assignments found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default StudentAssignment;
