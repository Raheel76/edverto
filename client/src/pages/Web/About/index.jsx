import { Button } from "antd"
import { Link } from "react-router-dom"
import { Target, Eye, Users, Award, BookOpen, Brain, ArrowRight, CheckCircle } from "lucide-react"

const About = () => {
  const stats = [
    { icon: Users, label: "Active Students", value: "50,000+" },
    { icon: BookOpen, label: "Courses Available", value: "1,200+" },
    { icon: Award, label: "Expert Instructors", value: "500+" },
    { icon: Brain, label: "AI-Powered Features", value: "25+" },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former VP of Engineering at Google, passionate about democratizing education through AI.",
    },
    {
      name: "Dr. Michael Chen",
      role: "CTO & Co-Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "PhD in Machine Learning from Stanford, leading our AI-powered learning innovations.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Education",
      image: "/placeholder.svg?height=300&width=300",
      bio: "15+ years in educational technology, ensuring our courses meet the highest standards.",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former Product Manager at Microsoft, focused on creating intuitive learning experiences.",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description:
        "We leverage cutting-edge AI technology to create personalized learning experiences that adapt to each student's unique needs and pace.",
    },
    {
      icon: Users,
      title: "Accessibility for All",
      description:
        "Quality education should be accessible to everyone, regardless of background, location, or financial situation.",
    },
    {
      icon: Brain,
      title: "Continuous Learning",
      description:
        "We believe in lifelong learning and provide tools that help professionals stay ahead in their rapidly evolving fields.",
    },
    {
      icon: Award,
      title: "Excellence in Education",
      description:
        "Our courses are designed by industry experts and continuously updated to reflect the latest trends and best practices.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Revolutionizing Education with <span className="text-primary">Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're on a mission to make high-quality education accessible to everyone through the power of AI-driven
              personalization and adaptive learning technologies.
            </p>
            <Link to="/courses">
              <Button
                type="primary"
                size="large"
                className="bg-primary hover:bg-primary/90 border-primary h-12 px-8"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Explore Our Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To democratize access to high-quality education by leveraging artificial intelligence to create
                personalized, adaptive learning experiences that help individuals achieve their career goals and unlock
                their full potential.
              </p>
              <ul className="space-y-3">
                {[
                  "Personalized learning paths for every student",
                  "AI-powered content recommendations",
                  "Real-time progress tracking and analytics",
                  "Industry-relevant curriculum updates",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Our Mission"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-20">
            <div className="order-2 lg:order-1">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Our Vision"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To become the world's leading AI-powered learning platform, where millions of learners can access
                personalized education that adapts to their unique needs, learning styles, and career aspirations.
              </p>
              <ul className="space-y-3">
                {[
                  "Global accessibility across all devices",
                  "Multi-language AI tutoring support",
                  "Integration with major employers",
                  "Continuous skill validation and certification",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and shape our approach to education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-background p-8 rounded-xl border border-border">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced professionals from top tech companies and educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of learners who are already advancing their careers with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="large"
                className="bg-white text-primary hover:bg-white/90 border-white h-12 px-8 font-medium"
              >
                Start Learning Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="large" className="border-white text-white hover:bg-white/10 h-12 px-8 font-medium">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
