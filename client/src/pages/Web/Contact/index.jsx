
import { useState } from "react"
import { Button, Input, Form, Select } from "antd"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

const { TextArea } = Input
const { Option } = Select

const ContactUs = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form values:", values)
      setLoading(false)
      // Show success message
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "contact@ailms.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Learning Street, San Francisco, CA 94105",
      description: "Come say hello at our office",
    },
    {
      icon: Clock,
      title: "Support Hours",
      content: "24/7 AI Chat Support",
      description: "Get instant help anytime",
    },
  ]

  const faqs = [
    {
      question: "How does AI-powered learning work?",
      answer:
        "Our AI analyzes your learning patterns, progress, and preferences to create personalized learning paths and recommend content that matches your skill level and goals.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer:
        "Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.",
    },
    {
      question: "Do you offer certificates upon completion?",
      answer:
        "You'll receive industry-recognized certificates for all completed courses that you can add to your LinkedIn profile and resume.",
    },
    {
      question: "What if I need help during a course?",
      answer:
        "We offer 24/7 AI chat support, community forums, and direct access to instructors for any questions or technical issues you might encounter.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Get in Touch with Us</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about our AI-powered learning platform? We're here to help you start your learning journey
              or assist with any concerns.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Send us a message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Form name="contact" onFinish={onFinish} layout="vertical" size="large" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="firstName"
                  label={<span className="text-foreground font-medium">First Name</span>}
                  rules={[{ required: true, message: "Please input your first name!" }]}
                >
                  <Input
                    placeholder="Your first name"
                    className="h-12"
                    style={{
                      backgroundColor: "var(--input)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label={<span className="text-foreground font-medium">Last Name</span>}
                  rules={[{ required: true, message: "Please input your last name!" }]}
                >
                  <Input
                    placeholder="Your last name"
                    className="h-12"
                    style={{
                      backgroundColor: "var(--input)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label={<span className="text-foreground font-medium">Email Address</span>}
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                  placeholder="your.email@example.com"
                  className="h-12"
                  style={{
                    backgroundColor: "var(--input)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label={<span className="text-foreground font-medium">Subject</span>}
                rules={[{ required: true, message: "Please select a subject!" }]}
              >
                <Select placeholder="What can we help you with?" className="h-12">
                  <Option value="general">General Inquiry</Option>
                  <Option value="courses">Course Information</Option>
                  <Option value="technical">Technical Support</Option>
                  <Option value="billing">Billing & Payments</Option>
                  <Option value="partnership">Partnership Opportunities</Option>
                  <Option value="feedback">Feedback & Suggestions</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="message"
                label={<span className="text-foreground font-medium">Message</span>}
                rules={[{ required: true, message: "Please input your message!" }]}
              >
                <TextArea
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  style={{
                    backgroundColor: "var(--input)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<Send className="h-4 w-4" />}
                  className="bg-primary hover:bg-primary/90 border-primary h-12 px-8 text-base font-medium"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                Reach out to us through any of these channels. We're always happy to help!
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-foreground font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-card rounded-lg border border-border">
                    <h4 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h4>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Still have questions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our AI-powered support is available 24/7 to help you with any questions about courses, technical issues,
              or learning paths.
            </p>
            <Button
              type="primary"
              size="large"
              className="bg-primary hover:bg-primary/90 border-primary h-12 px-8 text-base font-medium"
            >
              Start AI Chat Support
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ContactUs


