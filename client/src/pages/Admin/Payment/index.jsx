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
  message,
  Row,
  Col,
  Statistic,
  DatePicker,
  Tabs,
  Descriptions,
  Popconfirm,
} from "antd"
import {
  DollarOutlined,
  CreditCardOutlined,
  EyeOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { BanknoteArrowDown } from "lucide-react"

const { Option } = Select
const { TabPane } = Tabs
const { RangePicker } = DatePicker

const PaymentManagement = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [transactionModalVisible, setTransactionModalVisible] = useState(false)
  const [refundModalVisible, setRefundModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Sample data
  const transactionsData = [
    {
      key: "1",
      id: "TXN001",
      student: "John Smith",
      course: "Advanced Machine Learning",
      amount: 299,
      method: "Credit Card",
      status: "completed",
      date: "2024-01-20",
      transactionId: "ch_1234567890",
      email: "john.smith@email.com",
    },
    {
      key: "2",
      id: "TXN002",
      student: "Emma Wilson",
      course: "React Development",
      amount: 199,
      method: "PayPal",
      status: "completed",
      date: "2024-01-19",
      transactionId: "pp_9876543210",
      email: "emma.wilson@email.com",
    },
    {
      key: "3",
      id: "TXN003",
      student: "Alex Rodriguez",
      course: "Data Science Fundamentals",
      amount: 249,
      method: "Credit Card",
      status: "pending",
      date: "2024-01-18",
      transactionId: "ch_1122334455",
      email: "alex.rodriguez@email.com",
    },
    {
      key: "4",
      id: "TXN004",
      student: "Sarah Johnson",
      course: "Mobile Development",
      amount: 279,
      method: "Bank Transfer",
      status: "failed",
      date: "2024-01-17",
      transactionId: "bt_5566778899",
      email: "sarah.johnson@email.com",
    },
  ]

  const subscriptionsData = [
    {
      key: "1",
      id: "SUB001",
      student: "Michael Chen",
      plan: "Premium Monthly",
      amount: 29,
      status: "active",
      nextBilling: "2024-02-20",
      startDate: "2024-01-20",
      email: "michael.chen@email.com",
    },
    {
      key: "2",
      id: "SUB002",
      student: "Lisa Wang",
      plan: "Premium Annual",
      amount: 299,
      status: "active",
      nextBilling: "2025-01-15",
      startDate: "2024-01-15",
      email: "lisa.wang@email.com",
    },
    {
      key: "3",
      id: "SUB003",
      student: "David Kim",
      plan: "Basic Monthly",
      amount: 19,
      status: "cancelled",
      nextBilling: null,
      startDate: "2023-12-01",
      email: "david.kim@email.com",
    },
  ]

  const refundsData = [
    {
      key: "1",
      id: "REF001",
      originalTransaction: "TXN001",
      student: "John Smith",
      course: "Advanced Machine Learning",
      amount: 299,
      reason: "Course not as expected",
      status: "approved",
      requestDate: "2024-01-18",
      processedDate: "2024-01-19",
    },
    {
      key: "2",
      id: "REF002",
      originalTransaction: "TXN002",
      student: "Emma Wilson",
      course: "React Development",
      amount: 199,
      reason: "Technical issues",
      status: "pending",
      requestDate: "2024-01-20",
      processedDate: null,
    },
  ]

  const transactionColumns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <div>
          <div className="text-foreground font-medium">{id}</div>
          <div className="text-muted-foreground text-sm">{record.transactionId}</div>
        </div>
      ),
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (student, record) => (
        <div>
          <div className="text-foreground">{student}</div>
          <div className="text-muted-foreground text-sm">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course) => <span className="text-foreground">{course}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span className="text-foreground font-semibold">${amount}</span>,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (method) => (
        <Tag color={method === "Credit Card" ? "blue" : method === "PayPal" ? "orange" : "green"}>{method}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "completed" ? "green" : status === "pending" ? "orange" : status === "failed" ? "red" : "default"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
            onClick={() => handleViewTransaction(record)}
            className="text-primary hover:text-primary/80"
          />
          {record.status === "completed" && (
            <Button
              type="text"
              icon={<BanknoteArrowDown />}
              onClick={() => handleInitiateRefund(record)}
              className="text-yellow-500 hover:text-yellow-400"
            />
          )}
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadReceipt(record)}
            className="text-cyan-400 hover:text-cyan-300"
          />
        </Space>
      ),
    },
  ]

  const subscriptionColumns = [
    {
      title: "Subscription ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <span className="text-foreground font-medium">{id}</span>,
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (student, record) => (
        <div>
          <div className="text-foreground">{student}</div>
          <div className="text-muted-foreground text-sm">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (plan) => <Tag color="purple">{plan}</Tag>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span className="text-foreground font-semibold">
          ${amount}/{record.plan.includes("Monthly") ? "mo" : "yr"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : status === "cancelled" ? "red" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Next Billing",
      dataIndex: "nextBilling",
      key: "nextBilling",
      render: (date) => <span className="text-muted-foreground">{date || "N/A"}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewSubscription(record)}
            className="text-primary hover:text-primary/80"
          />
          {record.status === "active" && (
            <Popconfirm
              title="Cancel this subscription?"
              onConfirm={() => handleCancelSubscription(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" icon={<CloseCircleOutlined />} className="text-red-400 hover:text-red-300" />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  const refundColumns = [
    {
      title: "Refund ID",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <div>
          <div className="text-foreground font-medium">{id}</div>
          <div className="text-muted-foreground text-sm">{record.originalTransaction}</div>
        </div>
      ),
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (student) => <span className="text-foreground">{student}</span>,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course) => <span className="text-foreground">{course}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span className="text-foreground font-semibold">${amount}</span>,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (reason) => <span className="text-muted-foreground">{reason}</span>,
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveRefund(record.key)}
                className="text-emerald-400 hover:text-emerald-300"
              />
              <Button
                type="text"
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectRefund(record.key)}
                className="text-red-400 hover:text-red-300"
              />
            </>
          )}
        </Space>
      ),
    },
  ]

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setTransactionModalVisible(true)
  }

  const handleViewSubscription = (subscription) => {
    // Handle view subscription
    message.info("Subscription details opened")
  }

  const handleInitiateRefund = (transaction) => {
    setSelectedTransaction(transaction)
    setRefundModalVisible(true)
  }

  const handleDownloadReceipt = (transaction) => {
    message.success("Receipt downloaded successfully")
  }

  const handleCancelSubscription = (key) => {
    message.success("Subscription cancelled successfully")
  }

  const handleApproveRefund = (key) => {
    message.success("Refund approved and processed")
  }

  const handleRejectRefund = (key) => {
    message.success("Refund request rejected")
  }

  const handleProcessRefund = (values) => {
    message.success("Refund processed successfully")
    setRefundModalVisible(false)
    form.resetFields()
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Total Revenue</span>}
              value={125000}
              prefix={<DollarOutlined className="text-emerald-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Monthly Revenue</span>}
              value={42000}
              prefix={<CreditCardOutlined className="text-primary" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Active Subscriptions</span>}
              value={156}
              prefix={<CheckCircleOutlined className="text-cyan-400" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="bg-card border-border">
            <Statistic
              title={<span className="text-muted-foreground">Pending Refunds</span>}
              value={8}
              prefix={<ExclamationCircleOutlined className="text-yellow-500" />}
              valueStyle={{ color: "#f9fafb" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Payment Management Tabs */}
      <Card className="bg-card border-border">
        <Tabs defaultActiveKey="transactions" className="custom-tabs">
          <TabPane tab="Transactions" key="transactions">
            <div className="mb-4 flex justify-between items-center">
              <RangePicker className="custom-date-picker" />
              <Button type="primary" icon={<DownloadOutlined />} className="bg-primary hover:bg-primary/90">
                Export Transactions
              </Button>
            </div>
            <Table
              columns={transactionColumns}
              dataSource={transactionsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
              }}
              scroll={{ x: 1000 }}
              className="custom-table"
            />
          </TabPane>
          <TabPane tab="Subscriptions" key="subscriptions">
            <Table
              columns={subscriptionColumns}
              dataSource={subscriptionsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} subscriptions`,
              }}
              scroll={{ x: 800 }}
              className="custom-table"
            />
          </TabPane>
          <TabPane tab="Refunds" key="refunds">
            <Table
              columns={refundColumns}
              dataSource={refundsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} refunds`,
              }}
              scroll={{ x: 800 }}
              className="custom-table"
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Transaction Details Modal */}
      <Modal
        title={<span className="text-foreground">Transaction Details</span>}
        open={transactionModalVisible}
        onCancel={() => setTransactionModalVisible(false)}
        footer={null}
        width={600}
        className="custom-modal"
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <Descriptions bordered column={1} className="custom-descriptions">
              <Descriptions.Item label="Transaction ID">{selectedTransaction.id}</Descriptions.Item>
              <Descriptions.Item label="External ID">{selectedTransaction.transactionId}</Descriptions.Item>
              <Descriptions.Item label="Student">{selectedTransaction.student}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedTransaction.email}</Descriptions.Item>
              <Descriptions.Item label="Course">{selectedTransaction.course}</Descriptions.Item>
              <Descriptions.Item label="Amount">${selectedTransaction.amount}</Descriptions.Item>
              <Descriptions.Item label="Payment Method">{selectedTransaction.method}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    selectedTransaction.status === "completed"
                      ? "green"
                      : selectedTransaction.status === "pending"
                        ? "orange"
                        : "red"
                  }
                >
                  {selectedTransaction.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date">{selectedTransaction.date}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Refund Modal */}
      <Modal
        title={<span className="text-foreground">Process Refund</span>}
        open={refundModalVisible}
        onCancel={() => {
          setRefundModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        className="custom-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleProcessRefund} className="mt-4">
          <Form.Item
            name="amount"
            label={<span className="text-foreground">Refund Amount</span>}
            rules={[{ required: true, message: "Please input the refund amount!" }]}
          >
            <Input
              type="number"
              prefix="$"
              className="bg-input border-border text-foreground"
              placeholder={selectedTransaction?.amount.toString()}
            />
          </Form.Item>
          <Form.Item
            name="reason"
            label={<span className="text-foreground">Refund Reason</span>}
            rules={[{ required: true, message: "Please select a reason!" }]}
          >
            <Select className="custom-select">
              <Option value="course_not_as_expected">Course not as expected</Option>
              <Option value="technical_issues">Technical issues</Option>
              <Option value="duplicate_payment">Duplicate payment</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label={<span className="text-foreground">Additional Notes</span>}>
            <Input.TextArea
              rows={3}
              className="bg-input border-border text-foreground"
              placeholder="Optional notes about the refund..."
            />
          </Form.Item>
          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setRefundModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-primary hover:bg-primary/90">
                Process Refund
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PaymentManagement
