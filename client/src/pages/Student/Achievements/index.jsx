import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Progress,
  Avatar,
  Tag,
  Button,
  Tabs,
  List,
  Badge,
  Select,
  DatePicker,
  Statistic,
  Modal,
} from "antd";
import {
  TrophyOutlined,
  StarOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  CrownOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Award, Flame, TrendingUp, Crown, Star, Gem } from "lucide-react";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ProgressTracking = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [certificateModalVisible, setCertificateModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Sample progress data
  const progressData = {
    overall: {
      totalCourses: 8,
      completedCourses: 3,
      inProgressCourses: 3,
      totalHours: 127,
      currentStreak: 12,
      longestStreak: 28,
      totalPoints: 3450,
      level: 15,
      nextLevelPoints: 500,
      rank: 42,
      totalStudents: 15420,
    },
    courses: [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        progress: 85,
        hoursSpent: 42,
        totalHours: 50,
        status: "in-progress",
        lastActivity: "2 hours ago",
        nextMilestone: "Final Project",
        pointsEarned: 850,
        grade: "A-",
      },
      {
        id: 2,
        title: "JavaScript Fundamentals",
        progress: 100,
        hoursSpent: 25,
        totalHours: 25,
        status: "completed",
        completedDate: "2024-01-15",
        pointsEarned: 500,
        grade: "A+",
        certificate: true,
      },
      {
        id: 3,
        title: "React Advanced Patterns",
        progress: 60,
        hoursSpent: 18,
        totalHours: 30,
        status: "in-progress",
        lastActivity: "1 day ago",
        nextMilestone: "Context API Module",
        pointsEarned: 360,
        grade: "B+",
      },
      {
        id: 4,
        title: "Node.js Backend Development",
        progress: 100,
        hoursSpent: 35,
        totalHours: 35,
        status: "completed",
        completedDate: "2024-01-20",
        pointsEarned: 700,
        grade: "A",
        certificate: true,
      },
      {
        id: 5,
        title: "Database Design & SQL",
        progress: 40,
        hoursSpent: 12,
        totalHours: 28,
        status: "in-progress",
        lastActivity: "3 days ago",
        nextMilestone: "Advanced Queries",
        pointsEarned: 240,
        grade: "B",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "First Course Completed",
        description: "Complete your first course",
        icon: "🎓",
        color: "blue",
        earned: true,
        earnedDate: "2024-01-15",
        rarity: "common",
        points: 100,
      },
      {
        id: 2,
        title: "Speed Learner",
        description: "Complete a course in under 2 weeks",
        icon: "⚡",
        color: "yellow",
        earned: true,
        earnedDate: "2024-01-20",
        rarity: "rare",
        points: 250,
      },
      {
        id: 3,
        title: "Perfect Score",
        description: "Get 100% on a quiz",
        icon: "🎯",
        color: "green",
        earned: true,
        earnedDate: "2024-01-18",
        rarity: "uncommon",
        points: 150,
      },
      {
        id: 4,
        title: "Streak Master",
        description: "Maintain a 30-day learning streak",
        icon: "🔥",
        color: "red",
        earned: false,
        progress: 12,
        target: 30,
        rarity: "epic",
        points: 500,
      },
      {
        id: 5,
        title: "Knowledge Seeker",
        description: "Complete 5 courses",
        icon: "📚",
        color: "purple",
        earned: false,
        progress: 3,
        target: 5,
        rarity: "rare",
        points: 300,
      },
      {
        id: 6,
        title: "Night Owl",
        description: "Complete lessons after 10 PM for 7 days",
        icon: "🦉",
        color: "indigo",
        earned: true,
        earnedDate: "2024-01-22",
        rarity: "uncommon",
        points: 200,
      },
    ],
    streaks: {
      current: 12,
      longest: 28,
      weeklyGoal: 5,
      weeklyProgress: 4,
      monthlyGoal: 20,
      monthlyProgress: 12,
      history: [
        { date: "2024-01-22", completed: true },
        { date: "2024-01-21", completed: true },
        { date: "2024-01-20", completed: true },
        { date: "2024-01-19", completed: false },
        { date: "2024-01-18", completed: true },
        { date: "2024-01-17", completed: true },
        { date: "2024-01-16", completed: true },
      ],
    },
    leaderboard: [
      { rank: 1, name: "Sarah Chen", points: 5240, avatar: "/placeholder.svg?height=40&width=40", streak: 45 },
      { rank: 2, name: "Mike Johnson", points: 4890, avatar: "/placeholder.svg?height=40&width=40", streak: 32 },
      { rank: 3, name: "Emma Wilson", points: 4650, avatar: "/placeholder.svg?height=40&width=40", streak: 28 },
      { rank: 4, name: "David Kim", points: 4320, avatar: "/placeholder.svg?height=40&width=40", streak: 22 },
      { rank: 5, name: "Lisa Wang", points: 4100, avatar: "/placeholder.svg?height=40&width=40", streak: 19 },
      {
        rank: 42,
        name: "You",
        points: 3450,
        avatar: "/placeholder.svg?height=40&width=40",
        streak: 12,
        isCurrentUser: true,
      },
    ],
    certificates: [
      {
        id: 1,
        courseTitle: "JavaScript Fundamentals",
        issuedDate: "2024-01-15",
        certificateId: "JS-FUND-2024-001",
        instructor: "Dr. Sarah Johnson",
        grade: "A+",
        credentialUrl: "https://example.com/certificate/js-fund-001",
      },
      {
        id: 2,
        courseTitle: "Node.js Backend Development",
        issuedDate: "2024-01-20",
        certificateId: "NODE-DEV-2024-002",
        instructor: "Prof. Mike Chen",
        grade: "A",
        credentialUrl: "https://example.com/certificate/node-dev-002",
      },
    ],
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "#6b7280";
      case "uncommon":
        return "#10b981";
      case "rare":
        return "#3b82f6";
      case "epic":
        return "#8b5cf6";
      case "legendary":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case "common":
        return <StarOutlined />;
      case "uncommon":
        return <Gem />;
      case "rare":
        return <CrownOutlined />;
      case "epic":
        return <ThunderboltOutlined />;
      case "legendary":
        return <TrophyOutlined />;
      default:
        return <StarOutlined />;
    }
  };

  const AchievementCard = ({ achievement }) => (
    <Card
      className={`bg-card border-border hover:border-primary/50 transition-all duration-300 ${
        achievement.earned ? "shadow-lg" : "opacity-60"
      }`}
      bodyStyle={{ padding: "16px" }}
    >
      <div className="text-center space-y-3">
        <div className="relative">
          <div
            className={`text-4xl mb-2 ${achievement.earned ? "" : "grayscale"}`}
            style={{ filter: achievement.earned ? "none" : "grayscale(100%)" }}
          >
            {achievement.icon}
          </div>
          {achievement.earned && (
            <div className="absolute -top-1 -right-1">
              <Badge
                count={getRarityIcon(achievement.rarity)}
                style={{ backgroundColor: getRarityColor(achievement.rarity) }}
              />
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

          {achievement.earned ? (
            <div className="space-y-1">
              <Tag color="green" size="small">
                Earned
              </Tag>
              <div className="text-xs text-muted-foreground">{achievement.earnedDate}</div>
            </div>
          ) : achievement.progress !== undefined ? (
            <div className="space-y-2">
              <Progress
                percent={(achievement.progress / achievement.target) * 100}
                size="small"
                strokeColor="#0891b2"
              />
              <div className="text-xs text-muted-foreground">
                {achievement.progress} / {achievement.target}
              </div>
            </div>
          ) : (
            <Tag color="default" size="small">
              Locked
            </Tag>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 text-xs">
          <TrophyOutlined className="text-yellow-500" />
          <span className="text-muted-foreground">{achievement.points} pts</span>
        </div>
      </div>
    </Card>
  );

  const CertificateCard = ({ certificate }) => (
    <Card
      className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
      onClick={() => {
        setSelectedCertificate(certificate);
        setCertificateModalVisible(true);
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="text-yellow-500" size={24} />
            <Tag color="gold">Certificate</Tag>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Grade</div>
            <div className="font-bold text-green-400">{certificate.grade}</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">{certificate.courseTitle}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>Instructor: {certificate.instructor}</div>
            <div>Issued: {certificate.issuedDate}</div>
            <div>ID: {certificate.certificateId}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="primary" size="small" icon={<DownloadOutlined />} className="bg-primary hover:bg-primary/80">
            Download
          </Button>
          <Button size="small" icon={<ShareAltOutlined />} className="border-border hover:border-primary">
            Share
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground text-lg">Track your learning journey, achievements, and milestones</p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
        {/* Overview Tab */}
        <TabPane tab="Overview" key="overview">
          {/* Stats Cards */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={12} sm={6}>
              <Card className="bg-card border-border text-center">
                <Statistic
                  title={<span className="text-muted-foreground">Level</span>}
                  value={progressData.overall.level}
                  prefix={<Crown className="text-yellow-500" />}
                  valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
                />
                <div className="mt-2">
                  <Progress
                    percent={75}
                    size="small"
                    strokeColor="#f59e0b"
                    format={() => `${progressData.overall.nextLevelPoints} to next`}
                  />
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="bg-card border-border text-center">
                <Statistic
                  title={<span className="text-muted-foreground">Current Streak</span>}
                  value={progressData.overall.currentStreak}
                  suffix="days"
                  prefix={<Flame className="text-orange-500" />}
                  valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="bg-card border-border text-center">
                <Statistic
                  title={<span className="text-muted-foreground">Total Points</span>}
                  value={progressData.overall.totalPoints}
                  prefix={<Star className="text-purple-500" />}
                  valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="bg-card border-border text-center">
                <Statistic
                  title={<span className="text-muted-foreground">Global Rank</span>}
                  value={progressData.overall.rank}
                  suffix={`/ ${progressData.overall.totalStudents.toLocaleString()}`}
                  prefix={<TrendingUp className="text-green-500" />}
                  valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Course Progress */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} lg={16}>
              <Card
                title={<span className="text-foreground text-lg font-semibold">Course Progress</span>}
                className="bg-card border-border"
              >
                <div className="space-y-4">
                  {progressData.courses.map((course) => (
                    <div key={course.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{course.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>
                              {course.hoursSpent}h / {course.totalHours}h
                            </span>
                            <Tag color={course.status === "completed" ? "green" : "blue"}>{course.status}</Tag>
                            {course.grade && <Tag color="gold">Grade: {course.grade}</Tag>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-1">{course.progress}%</div>
                          {course.certificate && <Badge count={<Award size={16} className="text-yellow-500" />} />}
                        </div>
                      </div>

                      <Progress
                        percent={course.progress}
                        strokeColor={course.progress === 100 ? "#10b981" : "#0891b2"}
                        trailColor="#4b5563"
                      />

                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span className="text-muted-foreground">
                          {course.status === "completed"
                            ? `Completed on ${course.completedDate}`
                            : `Next: ${course.nextMilestone}`}
                        </span>
                        <span className="text-primary font-medium">{course.pointsEarned} points earned</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <div className="space-y-6">
                {/* Streak Calendar */}
                <Card
                  title={<span className="text-foreground text-lg font-semibold">Learning Streak</span>}
                  className="bg-card border-border"
                >
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-orange-500 mb-1">{progressData.streaks.current}</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Longest: {progressData.streaks.longest} days
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Weekly Goal</span>
                        <span className="text-foreground">
                          {progressData.streaks.weeklyProgress}/{progressData.streaks.weeklyGoal}
                        </span>
                      </div>
                      <Progress
                        percent={(progressData.streaks.weeklyProgress / progressData.streaks.weeklyGoal) * 100}
                        size="small"
                        strokeColor="#10b981"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Monthly Goal</span>
                        <span className="text-foreground">
                          {progressData.streaks.monthlyProgress}/{progressData.streaks.monthlyGoal}
                        </span>
                      </div>
                      <Progress
                        percent={(progressData.streaks.monthlyProgress / progressData.streaks.monthlyGoal) * 100}
                        size="small"
                        strokeColor="#0891b2"
                      />
                    </div>
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card
                  title={<span className="text-foreground text-lg font-semibold">Quick Stats</span>}
                  className="bg-card border-border"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Courses Completed</span>
                      <span className="font-semibold text-foreground">{progressData.overall.completedCourses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Learning Hours</span>
                      <span className="font-semibold text-foreground">{progressData.overall.totalHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificates Earned</span>
                      <span className="font-semibold text-foreground">{progressData.certificates.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Achievements Unlocked</span>
                      <span className="font-semibold text-foreground">
                        {progressData.achievements.filter((a) => a.earned).length}/{progressData.achievements.length}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </TabPane>

        {/* Achievements Tab */}
        <TabPane tab="Achievements" key="achievements">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your Achievements</h2>
                <p className="text-muted-foreground">
                  {progressData.achievements.filter((a) => a.earned).length} of {progressData.achievements.length}{" "}
                  unlocked
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {progressData.achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>

            <Progress
              percent={
                (progressData.achievements.filter((a) => a.earned).length / progressData.achievements.length) * 100
              }
              strokeColor="#10b981"
              className="mb-6"
            />
          </div>

          <Row gutter={[24, 24]}>
            {progressData.achievements.map((achievement) => (
              <Col key={achievement.id} xs={12} sm={8} md={6} lg={4}>
                <AchievementCard achievement={achievement} />
              </Col>
            ))}
          </Row>
        </TabPane>

        {/* Leaderboard Tab */}
        <TabPane tab="Leaderboard" key="leaderboard">
          <Card className="bg-card border-border">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">Global Leaderboard</h2>
              <p className="text-muted-foreground">See how you rank against other learners</p>
            </div>

            <List
              dataSource={progressData.leaderboard}
              renderItem={(user) => (
                <List.Item
                  className={`border-b border-border/50 last:border-b-0 py-4 ${
                    user.isCurrentUser ? "bg-primary/10 rounded-lg px-4" : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold ${
                          user.rank === 1
                            ? "text-yellow-500"
                            : user.rank === 2
                              ? "text-gray-400"
                              : user.rank === 3
                                ? "text-amber-600"
                                : "text-muted-foreground"
                        }`}
                      >
                        #{user.rank}
                      </div>

                      <Avatar src={user.avatar} size={48} />

                      <div>
                        <div className={`font-semibold ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                          {user.name}
                          {user.isCurrentUser && (
                            <Tag color="blue" className="ml-2">
                              You
                            </Tag>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.streak} day streak</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        {/* Certificates Tab */}
        <TabPane tab="Certificates" key="certificates">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Certificates</h2>
            <p className="text-muted-foreground">Download and share your course completion certificates</p>
          </div>

          <Row gutter={[24, 24]}>
            {progressData.certificates.map((certificate) => (
              <Col key={certificate.id} xs={24} sm={12} lg={8}>
                <CertificateCard certificate={certificate} />
              </Col>
            ))}
          </Row>

          {progressData.certificates.length === 0 && (
            <div className="text-center py-12">
              <Award size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No certificates yet</h3>
              <p className="text-muted-foreground">
                Complete courses to earn certificates and showcase your achievements
              </p>
            </div>
          )}
        </TabPane>
      </Tabs>

      {/* Certificate Modal */}
      <Modal
        title="Certificate Details"
        open={certificateModalVisible}
        onCancel={() => setCertificateModalVisible(false)}
        footer={[
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            Download PDF
          </Button>,
          <Button key="share" icon={<ShareAltOutlined />}>
            Share Certificate
          </Button>,
        ]}
        width={600}
      >
        {selectedCertificate && (
          <div className="space-y-4">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-600">
              <Award size={48} className="text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Certificate of Completion</h3>
              <h4 className="text-lg text-primary mb-4">{selectedCertificate.courseTitle}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  Awarded to: <span className="font-semibold text-foreground">Alex Rodriguez</span>
                </div>
                <div>
                  Instructor: <span className="font-semibold text-foreground">{selectedCertificate.instructor}</span>
                </div>
                <div>
                  Grade: <span className="font-semibold text-green-500">{selectedCertificate.grade}</span>
                </div>
                <div>
                  Date: <span className="font-semibold text-foreground">{selectedCertificate.issuedDate}</span>
                </div>
                <div>
                  Certificate ID: <span className="font-mono text-xs">{selectedCertificate.certificateId}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button type="link" href={selectedCertificate.credentialUrl} target="_blank" className="text-primary">
                Verify Certificate Online
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProgressTracking;