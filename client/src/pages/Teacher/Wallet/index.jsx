"use client"
import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Typography,
  Statistic,
  Select,
  DatePicker,
  Modal,
  Form,
  Input,
  Radio,
  Space,
  List,
  Tag,
} from "antd"
import {
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
  DownloadOutlined,
  RiseOutlined,
  FallOutlined,
  RobotOutlined,
} from "@ant-design/icons"
import { Line, Column } from "@ant-design/plots"
import { TrendingUp } from "lucide-react"

const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const TeacherWallet =() =>{
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false)
  const [form] = Form.useForm()

  const walletData = {
    balance: 12450.75,
    pendingEarnings: 850.5,
    totalEarnings: 45230.25,
    monthlyEarnings: 3250.0,
    withdrawnThisMonth: 2000.0,
    nextPayoutDate: "2024-02-15",
  }

  const transactions = [
    {
      id: "1",
      type: "earning",
      description: "Course enrollment - Advanced React Development",
      amount: 99.99,
      date: "2024-02-10",
      status: "Completed",
      course: "Advanced React Development",
    },
    {
      id: "2",
      type: "withdrawal",
      description: "Withdrawal to PayPal",
      amount: -500.0,
      date: "2024-02-08",
      status: "Completed",
      method: "PayPal",
    },
    {
      id: "3",
      type: "earning",
      description: "Course enrollment - Machine Learning Fundamentals",
      amount: 149.99,
      date: "2024-02-07",
      status: "Completed",
      course: "Machine Learning Fundamentals",
    },
    {
      id: "4",
      type: "refund",
      description: "Course refund - UI/UX Design Masterclass",
      amount: -79.99,
      date: "2024-02-05",
      status: "Completed",
      course: "UI/UX Design Masterclass",
    },
    {
      id: "5",
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: -1000.0,
      date: "2024-02-01",
      status: "Pending",
      method: "Bank Transfer",
    },
  ]

  const courseEarnings = [
    {
      course: "Advanced React Development",
      students: 234,
      revenue: 4680.0,
      growth: 15.2,
      lastMonth: 4065.0,
    },
    {
      course: "Machine Learning Fundamentals",
      students: 189,
      revenue: 3780.0,
      growth: 8.7,
      lastMonth: 3475.0,
    },
    {
      course: "UI/UX Design Masterclass",
      students: 156,
      revenue: 3120.0,
      growth: -5.3,
      lastMonth: 3295.0,
    },
    {
      course: "Full-Stack JavaScript",
      students: 98,
      revenue: 1960.0,
      growth: 22.1,
      lastMonth: 1605.0,
    },
  ]

  const getTransactionIcon = (type) => {
    switch (type) {
      case "earning":
        return <RiseOutlined style={{ color: "#10b981" }} />
      case "withdrawal":
        return <FallOutlined style={{ color: "#6366f1" }} />
      case "refund":
        return <FallOutlined style={{ color: "#ef4444" }} />
      default:
        return <DollarOutlined />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success"
      case "Pending":
        return "processing"
      case "Failed":
        return "error"
      default:
        return "default"
    }
  }

  const columns = [
    {
      title: "Transaction",
      key: "transaction",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {getTransactionIcon(record.type)}
          <div>
            <Text style={{ color: "#ffffff", display: "block" }}>{record.description}</Text>
            {record.course && <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>{record.course}</Text>}
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text
          style={{
            color: amount > 0 ? "#10b981" : "#ef4444",
            fontWeight: "bold",
          }}
        >
          {amount > 0 ? "+" : ""}${Math.abs(amount).toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <Text style={{ color: "#a1a1aa" }}>{date}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
  ]

  const handleWithdraw = (values) => {
    console.log("Processing withdrawal:", values)
    setWithdrawModalVisible(false)
    form.resetFields()
  }

  // Chart data
  const earningsData = [
    { month: "Oct", earnings: 2800 },
    { month: "Nov", earnings: 3100 },
    { month: "Dec", earnings: 2950 },
    { month: "Jan", earnings: 3250 },
    { month: "Feb", earnings: 3450 },
  ]

  const courseRevenueData = courseEarnings.map((course) => ({
    course: course.course.split(" ")[0] + "...",
    revenue: course.revenue,
  }))

  return (
    <div style={{ padding: "24px", background: "#0f0f23", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          Wallet & Earnings
        </Title>
        <Text style={{ color: "#a1a1aa" }}>Manage your earnings and withdraw funds</Text>
      </div>

      {/* Balance Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Available Balance</span>}
              value={walletData.balance}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#10b981" }} />}
              valueStyle={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Pending Earnings</span>}
              value={walletData.pendingEarnings}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#f59e0b" }} />}
              valueStyle={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>This Month</span>}
              value={walletData.monthlyEarnings}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#6366f1" }} />}
              valueStyle={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", textAlign: "center" }}>
            <Statistic
              title={<span style={{ color: "#a1a1aa" }}>Total Earnings</span>}
              value={walletData.totalEarnings}
              precision={2}
              prefix={<DollarOutlined style={{ color: "#ec4899" }} />}
              valueStyle={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            icon={<BankOutlined />}
            onClick={() => setWithdrawModalVisible(true)}
            style={{ background: "#6366f1", borderColor: "#6366f1" }}
          >
            Withdraw Funds
          </Button>
          <Button
            size="large"
            icon={<DownloadOutlined />}
            style={{ background: "#10b981", borderColor: "#10b981", color: "#ffffff" }}
          >
            Download Statement
          </Button>
          <Button
            size="large"
            icon={<RobotOutlined />}
            style={{ background: "#ec4899", borderColor: "#ec4899", color: "#ffffff" }}
          >
            AI Forecast
          </Button>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Charts */}
        <Col xs={24} lg={16}>
          <Card
            title={<span style={{ color: "#ffffff" }}>Earnings Trend</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}
          >
            <Line
              data={earningsData}
              xField="month"
              yField="earnings"
              point={{
                size: 5,
                shape: "diamond",
                style: { fill: "#6366f1", stroke: "#6366f1", lineWidth: 2 },
              }}
              color="#6366f1"
              theme="dark"
            />
          </Card>

          <Card
            title={<span style={{ color: "#ffffff" }}>Revenue by Course</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <Column
              data={courseRevenueData}
              xField="course"
              yField="revenue"
              color="#10b981"
              theme="dark"
              label={{
                position: "middle",
                style: { fill: "#ffffff", opacity: 0.6 },
              }}
            />
          </Card>
        </Col>

        {/* AI Forecast & Course Breakdown */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <RobotOutlined style={{ color: "#ec4899" }} />
                <span style={{ color: "#ffffff" }}>AI Earnings Forecast</span>
              </div>
            }
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginBottom: "24px" }}
          >
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <Text style={{ color: "#a1a1aa", display: "block" }}>Projected Next Month</Text>
              <Text style={{ color: "#10b981", fontSize: "32px", fontWeight: "bold" }}>$3,680</Text>
              <Text style={{ color: "#10b981", fontSize: "14px" }}>
                <TrendingUp /> +13.2% growth
              </Text>
            </div>

            <div style={{ background: "#0f0f23", padding: "16px", borderRadius: "8px" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                AI Insights:
              </Text>
              <List
                size="small"
                dataSource={[
                  "Your React course is trending upward (+15.2%)",
                  "Consider creating advanced ML content",
                  "Peak enrollment season starts next month",
                  "Students prefer weekend live sessions",
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: "4px 0", border: "none" }}>
                    <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </div>
          </Card>

          <Card
            title={<span style={{ color: "#ffffff" }}>Course Performance</span>}
            style={{ background: "#1a1a2e", border: "1px solid #2d2d3a" }}
          >
            <List
              dataSource={courseEarnings}
              renderItem={(course) => (
                <List.Item style={{ borderBottom: "1px solid #2d2d3a", padding: "12px 0" }}>
                  <List.Item.Meta
                    title={<Text style={{ color: "#ffffff", fontSize: "14px" }}>{course.course}</Text>}
                    description={
                      <div>
                        <Text style={{ color: "#a1a1aa", fontSize: "12px", display: "block" }}>
                          {course.students} students • ${course.revenue.toFixed(2)}
                        </Text>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                          {course.growth > 0 ? (
                            <RiseOutlined style={{ color: "#10b981", fontSize: "10px" }} />
                          ) : (
                            <FallOutlined style={{ color: "#ef4444", fontSize: "10px" }} />
                          )}
                          <Text
                            style={{
                              color: course.growth > 0 ? "#10b981" : "#ef4444",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {course.growth > 0 ? "+" : ""}
                            {course.growth.toFixed(1)}%
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Transaction History */}
      <Card
        title={<span style={{ color: "#ffffff" }}>Transaction History</span>}
        style={{ background: "#1a1a2e", border: "1px solid #2d2d3a", marginTop: "24px" }}
        extra={
          <Space>
            <Select defaultValue="all" style={{ width: 120 }}>
              <Option value="all">All Types</Option>
              <Option value="earning">Earnings</Option>
              <Option value="withdrawal">Withdrawals</Option>
              <Option value="refund">Refunds</Option>
            </Select>
            <RangePicker />
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
          }}
          style={{ background: "transparent" }}
        />
      </Card>

      {/* Withdraw Modal */}
      <Modal
        title={<span style={{ color: "#ffffff" }}>Withdraw Funds</span>}
        open={withdrawModalVisible}
        onCancel={() => setWithdrawModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleWithdraw} style={{ marginTop: "24px" }}>
          <div style={{ background: "#0f0f23", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
            <Text style={{ color: "#a1a1aa", display: "block" }}>Available Balance</Text>
            <Text style={{ color: "#10b981", fontSize: "24px", fontWeight: "bold" }}>
              ${walletData.balance.toFixed(2)}
            </Text>
          </div>

          <Form.Item
            name="amount"
            label={<span style={{ color: "#ffffff" }}>Withdrawal Amount</span>}
            rules={[
              { required: true, message: "Please enter amount" },
              {
                validator: (_, value) =>
                  value <= walletData.balance
                    ? Promise.resolve()
                    : Promise.reject("Amount cannot exceed available balance"),
              },
            ]}
          >
            <Input
              type="number"
              prefix="$"
              placeholder="0.00"
              style={{ background: "#0f0f23", borderColor: "#2d2d3a", color: "#ffffff" }}
            />
          </Form.Item>

          <Form.Item
            name="method"
            label={<span style={{ color: "#ffffff" }}>Withdrawal Method</span>}
            rules={[{ required: true, message: "Please select withdrawal method" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="paypal" style={{ color: "#ffffff" }}>
                  <PayCircleOutlined style={{ marginRight: "8px", color: "#0070ba" }} />
                  PayPal (2-3 business days)
                </Radio>
                <Radio value="stripe" style={{ color: "#ffffff" }}>
                  <CreditCardOutlined style={{ marginRight: "8px", color: "#635bff" }} />
                  Stripe (1-2 business days)
                </Radio>
                <Radio value="bank" style={{ color: "#ffffff" }}>
                  <BankOutlined style={{ marginRight: "8px", color: "#10b981" }} />
                  Bank Transfer (3-5 business days)
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <div style={{ background: "#1a1a2e", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>
            <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
              • Minimum withdrawal: $50.00
              <br />• Processing fee: 2.9% + $0.30
              <br />• Next payout date: {walletData.nextPayoutDate}
            </Text>
          </div>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setWithdrawModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderColor: "#6366f1" }}>
                Process Withdrawal
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TeacherWallet
