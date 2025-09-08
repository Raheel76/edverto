import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Modal,
  Form,
  Radio,
  Statistic,
  Alert,
  List,
  message,
} from "antd";
import {
  PlusOutlined,
  CreditCardOutlined,
  GiftOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Wallet, CreditCard, History, Star, DollarSign, Bitcoin, Smartphone } from "lucide-react";
import dayjs from "dayjs";

const { Option } = Select;

const StduentWallet = () => {
  const [addFundsModal, setAddFundsModal] = useState(false);
  const [redeemPointsModal, setRedeemPointsModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [form] = Form.useForm();

  // Sample wallet data
  const walletData = {
    balance: 156.75,
    currency: "USD",
    rewardPoints: 2450,
    pointsValue: 24.5, // $1 = 100 points

    recentTransactions: [
      {
        id: 1,
        type: "purchase",
        description: "Complete Web Development Bootcamp",
        amount: -89.99,
        date: "2024-01-23T10:30:00Z",
        status: "completed",
        method: "Credit Card",
      },
      {
        id: 2,
        type: "deposit",
        description: "Wallet Top-up",
        amount: 100.0,
        date: "2024-01-22T15:45:00Z",
        status: "completed",
        method: "PayPal",
      },
      {
        id: 3,
        type: "reward",
        description: "Quiz Perfect Score Bonus",
        amount: 5.0,
        date: "2024-01-21T09:15:00Z",
        status: "completed",
        method: "Reward Points",
      },
      {
        id: 4,
        type: "purchase",
        description: "Machine Learning Fundamentals",
        amount: -129.99,
        date: "2024-01-20T14:20:00Z",
        status: "completed",
        method: "Wallet Balance",
      },
      {
        id: 5,
        type: "refund",
        description: "Course Refund - React Basics",
        amount: 79.99,
        date: "2024-01-19T11:30:00Z",
        status: "completed",
        method: "Original Payment Method",
      },
    ],

    paymentMethods: [
      {
        id: 1,
        type: "card",
        name: "Visa ending in 4242",
        isDefault: true,
        expiryDate: "12/26",
      },
      {
        id: 2,
        type: "paypal",
        name: "alex.rodriguez@example.com",
        isDefault: false,
      },
    ],

    rewardHistory: [
      {
        id: 1,
        action: "Quiz Perfect Score",
        points: 150,
        date: "2024-01-23T10:30:00Z",
        course: "JavaScript Fundamentals",
      },
      {
        id: 2,
        action: "7-Day Learning Streak",
        points: 200,
        date: "2024-01-22T00:00:00Z",
        course: null,
      },
      {
        id: 3,
        action: "Course Completion",
        points: 500,
        date: "2024-01-20T16:45:00Z",
        course: "Node.js Backend Development",
      },
      {
        id: 4,
        action: "Assignment Submission",
        points: 100,
        date: "2024-01-19T14:20:00Z",
        course: "Complete Web Development Bootcamp",
      },
    ],

    subscriptionInfo: {
      plan: "Premium",
      nextBilling: "2024-02-15",
      amount: 29.99,
      autoRenew: true,
    },
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "purchase":
        return <ShoppingCartOutlined className="text-red-500" />;
      case "deposit":
        return <PlusOutlined className="text-green-500" />;
      case "reward":
        return <GiftOutlined className="text-purple-500" />;
      case "refund":
        return <ReloadOutlined className="text-blue-500" />;
      default:
        return <DollarOutlined />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "failed":
        return "red";
      default:
        return "default";
    }
  };

  const handleAddFunds = (values) => {
    console.log("Adding funds:", values);
    message.success(`Successfully added $${values.amount} to your wallet!`);
    setAddFundsModal(false);
    form.resetFields();
  };

  const handleRedeemPoints = (values) => {
    const redeemAmount = (values.points / 100).toFixed(2);
    console.log("Redeeming points:", values);
    message.success(`Successfully redeemed ${values.points} points for $${redeemAmount}!`);
    setRedeemPointsModal(false);
  };

  const transactionColumns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <div className="flex items-center gap-2">
          {getTransactionIcon(type)}
          <span className="capitalize">{type}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="text-foreground">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className={`font-semibold ${amount > 0 ? "text-green-500" : "text-red-500"}`}>
          {amount > 0 ? "+" : ""}${Math.abs(amount).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("MMM DD, YYYY HH:mm"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Wallet</h1>
        <p className="text-muted-foreground text-lg">Manage your funds, transactions, and reward points</p>
      </div>

      {/* Wallet Overview */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={8}>
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
            <Statistic
              title={<span className="text-blue-200">Wallet Balance</span>}
              value={walletData.balance}
              precision={2}
              prefix={<Wallet className="text-blue-400" />}
              suffix={walletData.currency}
              valueStyle={{ color: "#60a5fa", fontSize: "28px", fontWeight: "bold" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddFundsModal(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 border-blue-600"
              block
            >
              Add Funds
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 border-purple-500/30">
            <Statistic
              title={<span className="text-purple-200">Reward Points</span>}
              value={walletData.rewardPoints}
              prefix={<Star className="text-purple-400" />}
              valueStyle={{ color: "#a78bfa", fontSize: "28px", fontWeight: "bold" }}
            />
            <div className="text-sm text-purple-300 mt-1">≈ ${walletData.pointsValue} value</div>
            <Button
              type="primary"
              icon={<GiftOutlined />}
              onClick={() => setRedeemPointsModal(true)}
              className="mt-4 bg-purple-600 hover:bg-purple-700 border-purple-600"
              block
            >
              Redeem Points
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="text-green-400" />
                <span className="text-green-200 font-medium">Next Billing</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">${walletData.subscriptionInfo.amount}</div>
                <div className="text-sm text-green-300">
                  {dayjs(walletData.subscriptionInfo.nextBilling).format("MMM DD, YYYY")}
                </div>
              </div>
              <Tag color="green" size="small">
                {walletData.subscriptionInfo.plan} Plan
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Transaction History */}
        <Col xs={24} lg={16}>
          <Card
            className="bg-card border-border"
            title={
              <div className="flex items-center gap-2">
                <History className="text-primary" />
                <span className="text-foreground">Transaction History</span>
              </div>
            }
            extra={
              <Button icon={<DownloadOutlined />} className="border-border hover:border-primary">
                Export
              </Button>
            }
          >
            <Table
              dataSource={walletData.recentTransactions}
              columns={transactionColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              className="transaction-table"
            />
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card
              className="bg-card border-border"
              title={<span className="text-foreground">Payment Methods</span>}
              extra={
                <Button type="link" size="small" className="text-primary hover:text-primary/80">
                  Manage
                </Button>
              }
            >
              <div className="space-y-3">
                {walletData.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 bg-background/50 rounded border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      {method.type === "card" ? (
                        <CreditCard size={20} className="text-blue-500" />
                      ) : (
                        <Smartphone size={20} className="text-blue-600" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-foreground">{method.name}</div>
                        {method.expiryDate && (
                          <div className="text-xs text-muted-foreground">Expires {method.expiryDate}</div>
                        )}
                      </div>
                    </div>
                    {method.isDefault && (
                      <Tag color="blue" size="small">
                        Default
                      </Tag>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Reward Points History */}
            <Card className="bg-card border-border" title={<span className="text-foreground">Recent Rewards</span>}>
              <List
                dataSource={walletData.rewardHistory.slice(0, 5)}
                renderItem={(item) => (
                  <List.Item className="border-b border-border/50 last:border-b-0 py-3">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{item.action}</span>
                        <span className="text-sm font-bold text-purple-500">+{item.points} pts</span>
                      </div>
                      {item.course && <div className="text-xs text-muted-foreground mb-1">{item.course}</div>}
                      <div className="text-xs text-muted-foreground">{dayjs(item.date).format("MMM DD, YYYY")}</div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border" title={<span className="text-foreground">Quick Actions</span>}>
              <div className="space-y-3">
                <Button block icon={<CreditCardOutlined />} className="text-left border-border hover:border-primary">
                  Manage Payment Methods
                </Button>
                <Button block icon={<HistoryOutlined />} className="text-left border-border hover:border-primary">
                  View Full History
                </Button>
                <Button block icon={<GiftOutlined />} className="text-left border-border hover:border-primary">
                  Refer Friends & Earn
                </Button>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Add Funds Modal */}
      <Modal
        title="Add Funds to Wallet"
        open={addFundsModal}
        onCancel={() => setAddFundsModal(false)}
        footer={null}
        width={500}
      >
        <Form form={form} onFinish={handleAddFunds} layout="vertical">
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter an amount" }]}>
            <Input prefix={<DollarSign size={16} />} placeholder="0.00" type="number" min="10" max="1000" step="0.01" />
          </Form.Item>

          <Form.Item label="Payment Method" name="paymentMethod" initialValue="card">
            <Radio.Group onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
              <div className="space-y-3">
                <Radio value="card" className="block p-3 border border-border rounded hover:border-primary/50">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                </Radio>
                <Radio value="paypal" className="block p-3 border border-border rounded hover:border-primary/50">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} />
                    <div>
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
                    </div>
                  </div>
                </Radio>
                <Radio value="crypto" className="block p-3 border border-border rounded hover:border-primary/50">
                  <div className="flex items-center gap-3">
                    <Bitcoin size={20} />
                    <div>
                      <div className="font-medium">Cryptocurrency</div>
                      <div className="text-sm text-muted-foreground">Bitcoin, Ethereum, USDC</div>
                    </div>
                  </div>
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>

          <Alert
            message="Secure Payment"
            description="All transactions are encrypted and secure. Funds will be available immediately after payment confirmation."
            type="info"
            showIcon
            className="mb-4"
          />

          <div className="flex gap-3">
            <Button onClick={() => setAddFundsModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-primary hover:bg-primary/80">
              Add Funds
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Redeem Points Modal */}
      <Modal
        title="Redeem Reward Points"
        open={redeemPointsModal}
        onCancel={() => setRedeemPointsModal(false)}
        footer={null}
        width={400}
      >
        <Form onFinish={handleRedeemPoints} layout="vertical">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-purple-500 mb-2">{walletData.rewardPoints}</div>
            <div className="text-muted-foreground">Available Points</div>
            <div className="text-sm text-muted-foreground">(≈ ${walletData.pointsValue} value)</div>
          </div>

          <Form.Item
            label="Points to Redeem"
            name="points"
            rules={[
              { required: true, message: "Please enter points to redeem" },
              { type: "number", min: 100, message: "Minimum 100 points required" },
            ]}
          >
            <Input type="number" placeholder="100" min="100" max={walletData.rewardPoints} step="100" suffix="points" />
          </Form.Item>

          <Alert
            message="Conversion Rate"
            description="100 points = $1.00 USD. Redeemed amount will be added to your wallet balance."
            type="info"
            showIcon
            className="mb-4"
          />

          <div className="flex gap-3">
            <Button onClick={() => setRedeemPointsModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-purple-600 hover:bg-purple-700">
              Redeem Points
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StduentWallet;

