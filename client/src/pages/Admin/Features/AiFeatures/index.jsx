import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Modal,
  Tag,
  Progress,
  Alert,
  Tabs,
  Space,
  Select,
} from "antd";
import {
  RobotOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TriangleAlert, ShieldCheck } from "lucide-react";

const { TabPane } = Tabs;
const { Option } = Select;

const AIFeatures = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  // AI Analytics Data
  const trendPredictions = [
    {
      course: "Advanced AI Ethics",
      currentEnrollments: 45,
      predictedGrowth: 85,
      confidence: 92,
    },
    {
      course: "Quantum Computing Basics",
      currentEnrollments: 23,
      predictedGrowth: 78,
      confidence: 88,
    },
    {
      course: "Blockchain Development",
      currentEnrollments: 67,
      predictedGrowth: 72,
      confidence: 85,
    },
    {
      course: "IoT Security",
      currentEnrollments: 34,
      predictedGrowth: 68,
      confidence: 79,
    },
    {
      course: "AR/VR Development",
      currentEnrollments: 56,
      predictedGrowth: 65,
      confidence: 82,
    },
  ];

  const engagementData = [
    { week: "Week 1", engagement: 78, prediction: 82 },
    { week: "Week 2", engagement: 82, prediction: 85 },
    { week: "Week 3", engagement: 85, prediction: 88 },
    { week: "Week 4", engagement: 79, prediction: 83 },
    { week: "Week 5", engagement: 88, prediction: 91 },
    { week: "Week 6", engagement: 91, prediction: 94 },
  ];

  // Auto-Grading Monitor Data
  const suspiciousActivities = [
    {
      key: "1",
      student: "John Doe",
      course: "Machine Learning Basics",
      quiz: "Quiz 3: Neural Networks",
      suspicionLevel: "High",
      reasons: [
        "Rapid completion",
        "Perfect score pattern",
        "Similar answers to peer",
      ],
      timestamp: "2024-01-20 14:30",
      status: "pending",
    },
    {
      key: "2",
      student: "Sarah Wilson",
      course: "Data Science Fundamentals",
      quiz: "Quiz 2: Statistics",
      suspicionLevel: "Medium",
      reasons: ["Unusual timing pattern", "Score inconsistency"],
      timestamp: "2024-01-20 13:15",
      status: "reviewed",
    },
    {
      key: "3",
      student: "Mike Chen",
      course: "Web Development",
      quiz: "Quiz 4: React Hooks",
      suspicionLevel: "Low",
      reasons: ["Minor timing anomaly"],
      timestamp: "2024-01-20 12:00",
      status: "cleared",
    },
  ];

  // Fraud Detection Data
  const fraudAlerts = [
    {
      key: "1",
      type: "Fake Account",
      user: "alex.teacher@suspicious.com",
      riskScore: 95,
      indicators: [
        "Fake credentials",
        "Suspicious email pattern",
        "No social media presence",
      ],
      detectedAt: "2024-01-20 15:45",
      status: "blocked",
    },
    {
      key: "2",
      type: "Payment Fraud",
      user: "student123@email.com",
      riskScore: 78,
      indicators: ["Multiple failed payments", "VPN usage", "Unusual location"],
      detectedAt: "2024-01-20 14:20",
      status: "investigating",
    },
    {
      key: "3",
      type: "Content Theft",
      user: "fake.instructor@domain.com",
      riskScore: 88,
      indicators: ["Plagiarized course content", "Stolen profile images"],
      detectedAt: "2024-01-20 13:10",
      status: "confirmed",
    },
  ];

  const trendColumns = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course) => (
        <span className="text-foreground font-medium">{course}</span>
      ),
    },
    {
      title: "Current Enrollments",
      dataIndex: "currentEnrollments",
      key: "currentEnrollments",
      render: (count) => <span className="text-foreground">{count}</span>,
    },
    {
      title: "Predicted Growth",
      dataIndex: "predictedGrowth",
      key: "predictedGrowth",
      render: (growth, record) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-500 font-semibold">+{growth}%</span>
            <Tag color="green">Trending Up</Tag>
          </div>
          <Progress
            percent={record.confidence}
            size="small"
            showInfo={false}
            strokeColor="#10b981"
          />
          <span className="text-muted-foreground text-xs">
            {record.confidence}% confidence
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          className="bg-primary hover:bg-primary/90"
        >
          Promote Course
        </Button>
      ),
    },
  ];

  const suspiciousColumns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (student, record) => (
        <div>
          <div className="text-foreground font-medium">{student}</div>
          <div className="text-muted-foreground text-sm">{record.course}</div>
        </div>
      ),
    },
    {
      title: "Quiz",
      dataIndex: "quiz",
      key: "quiz",
      render: (quiz) => <span className="text-foreground">{quiz}</span>,
    },
    {
      title: "Suspicion Level",
      dataIndex: "suspicionLevel",
      key: "suspicionLevel",
      render: (level) => (
        <Tag
          color={
            level === "High" ? "red" : level === "Medium" ? "orange" : "yellow"
          }
        >
          {level}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "reviewed"
              ? "blue"
              : "green"
          }
        >
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
            onClick={() => handleViewSuspiciousActivity(record)}
            className="text-primary hover:text-primary/80"
          />
          {record.status === "pending" && (
            <>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                className="text-emerald-400 hover:text-emerald-300"
              />
              <Button
                type="text"
                icon={<CloseCircleOutlined />}
                className="text-red-400 hover:text-red-300"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const fraudColumns = [
    {
      title: "Alert Type",
      dataIndex: "type",
      key: "type",
      render: (type, record) => (
        <div>
          <div className="text-foreground font-medium">{type}</div>
          <div className="text-muted-foreground text-sm">{record.user}</div>
        </div>
      ),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      render: (score) => (
        <div>
          <div
            className={`font-semibold ${
              score >= 90
                ? "text-red-500"
                : score >= 70
                ? "text-yellow-500"
                : "text-emerald-500"
            }`}
          >
            {score}/100
          </div>
          <Progress
            percent={score}
            size="small"
            showInfo={false}
            strokeColor={
              score >= 90 ? "#ef4444" : score >= 70 ? "#f59e0b" : "#10b981"
            }
          />
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
            status === "blocked"
              ? "red"
              : status === "investigating"
              ? "orange"
              : status === "confirmed"
              ? "red"
              : "green"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Detected",
      dataIndex: "detectedAt",
      key: "detectedAt",
      render: (time) => (
        <span className="text-muted-foreground text-sm">{time}</span>
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
            onClick={() => handleViewFraudAlert(record)}
            className="text-primary hover:text-primary/80"
          />
          {record.status === "investigating" && (
            <>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                className="text-emerald-400 hover:text-emerald-300"
              />
              <Button
                type="text"
                icon={<CloseCircleOutlined />}
                className="text-red-400 hover:text-red-300"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleViewSuspiciousActivity = (record) => {
    setSelectedAlert(record);
    setAlertModalVisible(true);
  };

  const handleViewFraudAlert = (record) => {
    setSelectedAlert(record);
    setAlertModalVisible(true);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-foreground text-2xl font-bold flex items-center gap-2">
          <RobotOutlined className="text-primary" />
          AI-Powered Features
        </h2>
      </div>

      {/* AI Stats Overview */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={8}>
          <Card className="bg-card border-border">
            <Statistic
              title={
                <span className="text-muted-foreground">
                  AI Predictions Accuracy
                </span>
              }
              value={87.5}
              suffix="%"
              prefix={<BulbOutlined className="text-yellow-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-card border-border">
            <Statistic
              title={
                <span className="text-muted-foreground">
                  Fraud Alerts Today
                </span>
              }
              value={12}
              prefix={<ShieldCheck className="text-red-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="bg-card border-border">
            <Statistic
              title={
                <span className="text-muted-foreground">Cheating Detected</span>
              }
              value={5}
              prefix={<TriangleAlert className="text-orange-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="analytics" className="custom-tabs">
        <TabPane tab="AI Analytics" key="analytics">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card
                title={
                  <span className="text-foreground text-lg font-semibold">
                    Course Trend Predictions
                  </span>
                }
                className="bg-card border-border mb-6"
              >
                <Table
                  columns={trendColumns}
                  dataSource={trendPredictions}
                  pagination={false}
                  className=" overflow-x-auto w-full"
                             scroll={{ x: 'max-content' }}

                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card
                title={
                  <span className="text-foreground text-lg font-semibold">
                    Engagement Forecast
                  </span>
                }
                className="bg-card border-border mb-6"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="week" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f9fafb",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#22d3ee"
                      strokeWidth={2}
                      name="Current"
                    />
                    <Line
                      type="monotone"
                      dataKey="prediction"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Auto-Grading Monitor" key="grading">
          <Card className="bg-card border-border">
            <div className="mb-4">
              <Alert
                message="AI Cheating Detection Active"
                description="Our AI system continuously monitors quiz patterns and flags suspicious activities for review."
                type="info"
                icon={<RobotOutlined />}
                showIcon
                className="mb-4"
              />
            </div>
            <Table
              columns={suspiciousColumns}
              dataSource={suspiciousActivities}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} alerts`,
              }}
              className="custom-table"
            />
          </Card>
        </TabPane>

        <TabPane tab="Fraud Detection" key="fraud">
          <Card className="bg-card border-border">
            <div className="mb-4">
              <Alert
                message="Advanced Fraud Protection"
                description="AI-powered system detects fake accounts, payment fraud, and content theft in real-time."
                type="warning"
                icon={<ShieldCheck />}
                showIcon
                className="mb-4"
              />
            </div>
            <Table
              columns={fraudColumns}
              dataSource={fraudAlerts}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} alerts`,
              }}
              className="custom-table"
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Alert Details Modal */}
      <Modal
        title={<span className="text-foreground">Alert Details</span>}
        open={alertModalVisible}
        onCancel={() => setAlertModalVisible(false)}
        footer={null}
        width={600}
        className="custom-modal"
      >
        {selectedAlert && (
          <div className="space-y-4">
            {selectedAlert.student ? (
              // Suspicious Activity Details
              <div>
                <h4 className="text-foreground font-semibold mb-3">
                  Suspicious Quiz Activity
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Student
                    </label>
                    <p className="text-foreground">{selectedAlert.student}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Course
                    </label>
                    <p className="text-foreground">{selectedAlert.course}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Quiz
                    </label>
                    <p className="text-foreground">{selectedAlert.quiz}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Timestamp
                    </label>
                    <p className="text-foreground">{selectedAlert.timestamp}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-muted-foreground text-sm">
                    Suspicious Indicators
                  </label>
                  <div className="mt-2 space-y-1">
                    {selectedAlert.reasons?.map((reason, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <WarningOutlined className="text-yellow-500" />
                        <span className="text-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Fraud Alert Details
              <div>
                <h4 className="text-foreground font-semibold mb-3">
                  Fraud Detection Alert
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Alert Type
                    </label>
                    <p className="text-foreground">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      User
                    </label>
                    <p className="text-foreground">{selectedAlert.user}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Risk Score
                    </label>
                    <p className="text-foreground font-semibold">
                      {selectedAlert.riskScore}/100
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">
                      Detected At
                    </label>
                    <p className="text-foreground">
                      {selectedAlert.detectedAt}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-muted-foreground text-sm">
                    Risk Indicators
                  </label>
                  <div className="mt-2 space-y-1">
                    {selectedAlert.indicators?.map((indicator, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <TriangleAlert className="text-red-500" />
                        <span className="text-foreground">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button onClick={() => setAlertModalVisible(false)}>Close</Button>
              <Button type="primary" className="bg-primary hover:bg-primary/90">
                Take Action
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AIFeatures;
