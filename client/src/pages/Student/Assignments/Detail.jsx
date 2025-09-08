import { useState, useEffect } from "react";
import { Card, Button, Radio, Checkbox, Input, Progress, Modal, message, Tag, Alert, Steps } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  SendOutlined,
  RobotOutlined,
  TrophyOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Step } = Steps;

const AssignmentDetail = ({ params }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [essayContent, setEssayContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Sample quiz data
  const quizData = {
    id: 1,
    title: "JavaScript Fundamentals Quiz",
    type: "quiz",
    timeLimit: 30,
    totalQuestions: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the correct way to declare a variable in JavaScript ES6?",
        options: [
          "var myVariable = 'hello';",
          "let myVariable = 'hello';",
          "const myVariable = 'hello';",
          "Both let and const are correct",
        ],
        correctAnswer: 3,
        explanation:
          "Both 'let' and 'const' are ES6 ways to declare variables. 'let' for variables that can be reassigned, 'const' for constants.",
        points: 10,
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which method is used to add an element to the end of an array?",
        options: ["array.add()", "array.push()", "array.append()", "array.insert()"],
        correctAnswer: 1,
        explanation:
          "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
        points: 10,
      },
      {
        id: 3,
        type: "code",
        question: "Write a function that returns the sum of two numbers:",
        placeholder: "function sum(a, b) {\n  // Your code here\n}",
        correctAnswer: "return a + b;",
        explanation: "The function should return the sum of parameters a and b using the + operator.",
        points: 15,
      },
      {
        id: 4,
        type: "multiple-select",
        question: "Which of the following are JavaScript data types? (Select all that apply)",
        options: ["String", "Number", "Boolean", "Integer", "Object", "Undefined"],
        correctAnswers: [0, 1, 2, 4, 5],
        explanation:
          "JavaScript has primitive types: String, Number, Boolean, Undefined, Null, Symbol, and BigInt. Object is also a type. Integer is not a separate type in JavaScript.",
        points: 15,
      },
      {
        id: 5,
        type: "essay",
        question: "Explain the difference between '==' and '===' operators in JavaScript. Provide examples.",
        minWords: 50,
        maxWords: 200,
        points: 20,
      },
    ],
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    Modal.confirm({
      title: "Submit Quiz",
      content: "Are you sure you want to submit your answers? You cannot change them after submission.",
      onOk: () => {
        setIsSubmitted(true);
        // Simulate AI grading
        setTimeout(() => {
          const score = calculateScore();
          setAiAnalysis({
            score,
            feedback: generateAIFeedback(score),
            breakdown: generateScoreBreakdown(),
          });
          setShowResults(true);
        }, 2000);
        message.success("Quiz submitted successfully!");
      },
    });
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quizData.questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];

      if (question.type === "multiple-choice") {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      } else if (question.type === "multiple-select") {
        const correct = question.correctAnswers.sort().join(",");
        const user = (userAnswer || []).sort().join(",");
        if (correct === user) {
          earnedPoints += question.points;
        }
      } else if (question.type === "code" || question.type === "essay") {
        // Simulate AI grading for code/essay
        earnedPoints += Math.floor(question.points * 0.8); // 80% for demo
      }
    });

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const generateAIFeedback = (score) => {
    if (score >= 90) return "Excellent work! You have a strong understanding of JavaScript fundamentals.";
    if (score >= 80) return "Good job! You understand most concepts well, with room for minor improvements.";
    if (score >= 70) return "You're on the right track. Review the areas where you lost points and practice more.";
    return "You need more practice with JavaScript fundamentals. Consider reviewing the course materials.";
  };

  const generateScoreBreakdown = () => {
    return quizData.questions.map((question, index) => ({
      question: question.question,
      earned:
        question.type === "code" || question.type === "essay"
          ? Math.floor(question.points * 0.8)
          : answers[question.id] === question.correctAnswer
            ? question.points
            : 0,
      total: question.points,
      correct: question.type === "multiple-choice" ? answers[question.id] === question.correctAnswer : true,
    }));
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <Radio.Group
            value={answers[question.id]}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full"
          >
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <Radio
                  key={optionIndex}
                  value={optionIndex}
                  className="block p-3 border border-border rounded hover:border-primary/50 transition-colors"
                >
                  <span className="text-foreground">{option}</span>
                </Radio>
              ))}
            </div>
          </Radio.Group>
        );

      case "multiple-select":
        return (
          <Checkbox.Group
            value={answers[question.id] || []}
            onChange={(values) => handleAnswerChange(question.id, values)}
            className="w-full"
          >
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <Checkbox
                  key={optionIndex}
                  value={optionIndex}
                  className="block p-3 border border-border rounded hover:border-primary/50 transition-colors"
                >
                  <span className="text-foreground">{option}</span>
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        );

      case "code":
        return (
          <div className="space-y-3">
            <TextArea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              rows={8}
              className="font-mono"
            />
            <div className="text-sm text-muted-foreground">
              Write your code in the text area above. Make sure to follow proper JavaScript syntax.
            </div>
          </div>
        );

      case "essay":
        return (
          <div className="space-y-3">
            <TextArea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Write your answer here..."
              rows={10}
              showCount
              maxLength={question.maxWords * 6} // Approximate character limit
            />
            <div className="text-sm text-muted-foreground">
              Word limit: {question.minWords} - {question.maxWords} words
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <Result
            icon={<TrophyOutlined className="text-primary" />}
            title="Quiz Completed!"
            subTitle={`You scored ${aiAnalysis.score}% on this quiz`}
            extra={[
              <Button type="primary" key="review" className="bg-primary hover:bg-primary/80">
                Review Answers
              </Button>,
              <Button key="retake">Retake Quiz</Button>,
            ]}
          />

          <Card className="bg-card border-border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <RobotOutlined className="text-blue-400" />
              <h3 className="text-lg font-semibold text-foreground">AI Analysis</h3>
            </div>
            <Alert
              message="AI Feedback"
              description={aiAnalysis.feedback}
              type={aiAnalysis.score >= 70 ? "success" : "warning"}
              showIcon
              className="mb-4"
            />

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Score Breakdown:</h4>
              {aiAnalysis.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{item.question}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {item.earned}/{item.total} pts
                    </span>
                    {item.correct ? (
                      <CheckCircleOutlined className="text-green-500" />
                    ) : (
                      <WarningOutlined className="text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted && !showResults) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="bg-card border-border text-center p-8">
          <div className="flex items-center justify-center mb-4">
            <RobotOutlined className="text-4xl text-blue-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">AI is grading your quiz...</h3>
          <p className="text-muted-foreground mb-4">
            Our AI is analyzing your answers and providing personalized feedback.
          </p>
          <Progress percent={75} strokeColor="#0891b2" />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="bg-card border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{quizData.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{quizData.totalQuestions} questions</span>
                <span>Passing score: {quizData.passingScore}%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
                <ClockCircleOutlined />
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-muted-foreground">Time remaining</div>
            </div>
          </div>

          <Progress
            percent={((currentQuestion + 1) / quizData.totalQuestions) * 100}
            strokeColor="#0891b2"
            className="mb-4"
          />

          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizData.totalQuestions}
          </div>
        </Card>

        {/* Question */}
        <Card className="bg-card border-border mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag color="blue">Question {currentQuestion + 1}</Tag>
              <Tag color="orange">{quizData.questions[currentQuestion].points} points</Tag>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {quizData.questions[currentQuestion].question}
            </h2>
          </div>

          {renderQuestion(quizData.questions[currentQuestion], currentQuestion)}
        </Card>

        {/* Navigation */}
        <Card className="bg-card border-border">
          <div className="flex items-center justify-between">
            <Button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="border-border hover:border-primary"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button icon={<SaveOutlined />} className="border-border hover:border-primary">
                Save Progress
              </Button>

              {currentQuestion === quizData.totalQuestions - 1 ? (
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/80"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="bg-primary hover:bg-primary/80"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Question Navigator */}
        <Card className="bg-card border-border mt-6">
          <h4 className="font-semibold text-foreground mb-3">Question Navigator</h4>
          <div className="grid grid-cols-5 gap-2">
            {quizData.questions.map((_, index) => (
              <Button
                key={index}
                size="small"
                type={currentQuestion === index ? "primary" : "default"}
                className={`
                  ${currentQuestion === index ? "bg-primary" : "border-border hover:border-primary"}
                  ${answers[quizData.questions[index].id] ? "bg-green-500/20 border-green-500" : ""}
                `}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary rounded" />
              <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-muted-foreground">Answered</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-muted rounded" />
              <span className="text-muted-foreground">Not answered</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssignmentDetail;