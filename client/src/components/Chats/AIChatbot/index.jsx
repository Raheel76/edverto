import { useState } from "react"
import { Button, Input, Avatar } from "antd"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI learning assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const predefinedResponses = {
    course:
      "I can help you find the perfect course! We have courses in Web Development, Data Science, AI/ML, Mobile Development, and more. What subject interests you?",
    pricing:
      "Our courses range from $29 to $199. We also offer subscription plans starting at $19/month for unlimited access to all courses.",
    certificate:
      "Yes! You'll receive industry-recognized certificates upon course completion that you can add to your LinkedIn profile.",
    support:
      "We offer 24/7 AI chat support, community forums, and direct instructor access. You're never alone in your learning journey!",
    mobile: "Our platform works seamlessly on all devices - desktop, tablet, and mobile. Learn anywhere, anytime!",
    beginner:
      "Perfect! We have beginner-friendly courses with step-by-step guidance. Our AI will create a personalized learning path just for you.",
    default:
      "That's a great question! For detailed information, I recommend contacting our support team or browsing our comprehensive course catalog.",
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase()
      let response = predefinedResponses.default

      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          response = value
          break
        }
      }

      const aiResponse = {
        id: messages.length + 2,
        text: response,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          onClick={() => setIsOpen(!isOpen)}
          className="!w-[160px] !h-14 bg-primary !rounded-full hover:bg-primary/90 border-primary shadow-lg"
        >
            AI Assistant
            </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border bg-primary/5 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <Avatar icon={<Bot className="h-5 w-5" />} className="bg-primary" />
              <div>
                <h3 className="font-semibold text-foreground">AI Learning Assistant</h3>
                <p className="text-xs text-muted-foreground">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <Avatar
                    size="small"
                    icon={message.sender === "ai" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                    className={message.sender === "ai" ? "bg-primary" : "bg-accent"}
                  />
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <Avatar size="small" icon={<Bot className="h-3 w-3" />} className="bg-primary" />
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  backgroundColor: "var(--input)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
              <Button
                type="primary"
                icon={<Send className="h-4 w-4" />}
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90 border-primary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatbot
