import { Link } from "react-router-dom"
import { Button } from "antd"
import { ArrowRight, BookOpen, Users, Award, Brain, Zap, Target, Star, Play } from "lucide-react"
import { CourseCard } from "../../../components"
import { coursesData, testimonials } from "../../../components/common/data"
const HomePage = () => {
  const featuredCourses = coursesData.filter((course) => course.isAIRecommended).slice(0, 3)
  const stats = [
    { icon: Users, label: "Active Students", value: "50,000+" },
    { icon: BookOpen, label: "Courses Available", value: "1,200+" },
    { icon: Award, label: "Certified Instructors", value: "500+" },
    { icon: Target, label: "Success Rate", value: "95%" },
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style with advanced AI algorithms.",
    },
    {
      icon: Zap,
      title: "Interactive Quizzes",
      description: "AI-generated quizzes and assessments that adapt to your knowledge level in real-time.",
    },
    {
      icon: Target,
      title: "Smart Recommendations",
      description: "Get course suggestions based on your interests, career goals, and learning history.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-card to-background pb-20 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Learn Smarter with <span className="text-primary">AI-Powered</span> Education
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your career with personalized learning experiences. Join thousands of professionals advancing
                their skills through our innovative AI-driven platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/courses">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-primary hover:bg-primary/90 border-primary h-12 px-8 text-base font-medium"
                    icon={<ArrowRight className="h-5 w-5" />}
                  >
                    Explore Courses
                  </Button>
                </Link>
                <Button
                  size="large"
                  className="h-12 px-8 text-base font-medium border-border !text-foreground !hover:text-primary !hover:border-primary"
                  icon={<Play className="h-5 w-5" />}
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero_img.jpg"
                alt="AI Learning Platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-secondary text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6" />
                  <span className="font-semibold">AI Powered</span>
                </div>
              </div>
            </div>
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

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose Our AI-Powered Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of education with cutting-edge AI technology that adapts to your unique learning
              style and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">AI-Recommended Courses</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover courses handpicked by our AI based on current industry trends and high success rates among
              learners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button
                type="primary"
                size="large"
                className="bg-primary hover:bg-primary/90 border-primary h-12 px-8"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful learners who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-black/90 mb-8">
            Join our community of learners and unlock your potential with AI-powered education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="large"
                className="bg-white text-primary hover:bg-white/90 border-white h-12 px-8 font-medium"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="large" className="border-white text-white hover:bg-white/10 h-12 px-8 font-medium">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
