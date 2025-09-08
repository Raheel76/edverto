import { useState } from "react";
import { Card, Row, Col, Progress, Button, List, Badge, Statistic } from "antd";
import {
  BookOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
  StarOutlined,
  RobotOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Brain, Target, Award } from "lucide-react";

const StudentDashboard = () => {
  const [aiSuggestionVisible, setAiSuggestionVisible] = useState(true);

  // Sample data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Sarah Johnson",
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      thumbnail: "/web-development-course.png",
      category: "Web Development",
      nextLesson: "React Hooks Deep Dive",
      estimatedTime: "2h 30m",
      lastAccessed: "2 hours ago",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Prof. Mike Chen",
      progress: 40,
      totalLessons: 32,
      completedLessons: 13,
      thumbnail: "/machine-learning-course.png",
      category: "AI & ML",
      nextLesson: "Linear Regression Models",
      estimatedTime: "1h 45m",
      lastAccessed: "1 day ago",
    },
    {
      id: 3,
      title: "Advanced React Patterns",
      instructor: "Emma Wilson",
      progress: 85,
      totalLessons: 24,
      completedLessons: 20,
      thumbnail: "/react-patterns-course.png",
      category: "Frontend",
      nextLesson: "Custom Hooks Patterns",
      estimatedTime: "45m",
      lastAccessed: "3 hours ago",
    },
  ];

  // AI personalized suggestions
  const aiSuggestions = [
    {
      type: "recommendation",
      title: "Continue Your Learning Streak!",
      message: "You're on a 7-day learning streak. Complete one more lesson today to reach 8 days!",
      action: "Continue Learning",
      icon: <FireOutlined className="text-orange-500" />,
      priority: "high",
    },
    {
      type: "weakness",
      title: "Strengthen Your JavaScript Skills",
      message:
        "Based on your recent quiz results, we recommend reviewing JavaScript fundamentals before moving to advanced React.",
      action: "Review JavaScript",
      icon: <Target className="text-blue-500" />,
      priority: "medium",
    },
    {
      type: "achievement",
      title: "New Course Recommendation",
      message: "Since you're excelling in React, you might enjoy our 'Next.js Mastery' course.",
      action: "Explore Course",
      icon: <Award className="text-green-500" />,
      priority: "low",
    },
  ];

  // Recent achievements
  const recentAchievements = [
    { title: "Quiz Master", description: "Scored 95% on React Fundamentals Quiz", date: "2 days ago", icon: "🏆" },
    { title: "Consistent Learner", description: "7-day learning streak", date: "Today", icon: "🔥" },
    { title: "Fast Learner", description: "Completed 5 lessons this week", date: "3 days ago", icon: "⚡" },
  ];

  // Learning stats
  const learningStats = {
    totalHours: 127,
    coursesCompleted: 3,
    currentStreak: 7,
    totalPoints: 2450,
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground text-lg">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge count={learningStats.currentStreak} showZero color="#f59e0b">
              <FireOutlined className="text-2xl text-orange-500" />
            </Badge>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Learning Streak</div>
              <div className="text-xl font-bold text-foreground">{learningStats.currentStreak} days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={<span className="text-muted-foreground">Total Learning Hours</span>}
              value={learningStats.totalHours}
              prefix={<ClockCircleOutlined className="text-blue-500" />}
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={<span className="text-muted-foreground">Courses Completed</span>}
              value={learningStats.coursesCompleted}
              prefix={<TrophyOutlined className="text-green-500" />}
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={<span className="text-muted-foreground">Current Streak</span>}
              value={learningStats.currentStreak}
              suffix="days"
              prefix={<FireOutlined className="text-orange-500" />}
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <Statistic
              title={<span className="text-muted-foreground">Total Points</span>}
              value={learningStats.totalPoints}
              prefix={<StarOutlined className="text-yellow-500" />}
              valueStyle={{ color: "#f9fafb", fontSize: "24px", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>

      {/* AI Personalized Suggestions */}
      {aiSuggestionVisible && (
        <Card
          className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30"
          title={
            <div className="flex items-center gap-2">
              <RobotOutlined className="text-blue-400" />
              <span className="text-foreground">AI Learning Assistant</span>
            </div>
          }
          extra={
            <Button
              type="text"
              size="small"
              onClick={() => setAiSuggestionVisible(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          }
        >
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="flex-shrink-0 mt-1">{suggestion.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{suggestion.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{suggestion.message}</p>
                  <Button
                    type="primary"
                    size="small"
                    className="bg-primary hover:bg-primary/80"
                    icon={<ArrowRightOutlined />}
                  >
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Row gutter={[24, 24]}>
        {/* Enrolled Courses */}
        <Col xs={24} lg={16}>
          <Card
            title={<span className="text-foreground text-xl font-semibold">Continue Learning</span>}
            className="bg-card border-border"
            extra={
              <Button type="link" className="text-primary hover:text-primary/80">
                View All Courses
              </Button>
            }
          >
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex gap-4 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1 truncate">{course.title}</h3>
                        <p className="text-muted-foreground text-sm">by {course.instructor}</p>
                      </div>
                      <Badge color="blue" text={course.category} />
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons} of {course.totalLessons} lessons completed
                        </span>
                        <span className="text-sm font-medium text-primary">{course.progress}%</span>
                      </div>
                      <Progress percent={course.progress} strokeColor="#0891b2" trailColor="#4b5563" showInfo={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Next:</span> {course.nextLesson}
                        <span className="mx-2">•</span>
                        <span>{course.estimatedTime}</span>
                      </div>
                      <Button type="primary" icon={<PlayCircleOutlined />} className="bg-primary hover:bg-primary/80">
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Recent Achievements & Quick Actions */}
        <Col xs={24} lg={8}>
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card
              title={<span className="text-foreground text-lg font-semibold">Recent Achievements</span>}
              className="bg-card border-border"
            >
              <List
                dataSource={recentAchievements}
                renderItem={(achievement) => (
                  <List.Item className="border-b border-border/50 last:border-b-0 py-3">
                    <List.Item.Meta
                      avatar={<div className="text-2xl">{achievement.icon}</div>}
                      title={<span className="text-foreground font-medium">{achievement.title}</span>}
                      description={
                        <div className="text-muted-foreground text-sm">
                          <div>{achievement.description}</div>
                          <div className="text-xs mt-1">{achievement.date}</div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Quick Actions */}
            <Card
              title={<span className="text-foreground text-lg font-semibold">Quick Actions</span>}
              className="bg-card border-border"
            >
              <div className="space-y-3">
                <Button
                  block
                  size="large"
                  icon={<BookOutlined />}
                  className="text-left bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                >
                  Browse Course Catalog
                </Button>
                <Button
                  block
                  size="large"
                  icon={<Brain />}
                  className="text-left bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                >
                  Ask AI Study Assistant
                </Button>
                <Button
                  block
                  size="large"
                  icon={<TrophyOutlined />}
                  className="text-left bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
                >
                  View Progress & Badges
                </Button>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;