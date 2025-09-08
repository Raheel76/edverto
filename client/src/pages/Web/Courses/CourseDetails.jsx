import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button, Tag, Tabs } from "antd"
import { Star, Clock, Users, Award, Play, Download, Share2, Heart, CheckCircle, ArrowLeft } from "lucide-react"
import { coursesData } from "../../../components/common/data"
const { TabPane } = Tabs

const CourseDetail = () => {
  const { id } = useParams()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const course = coursesData.find((c) => c.id === Number.parseInt(id))

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h2>
          <Link to="/courses">
            <Button type="primary" className="bg-primary hover:bg-primary/90 border-primary">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const {
    title,
    instructor,
    instructorAvatar,
    price,
    originalPrice,
    rating,
    students,
    duration,
    level,
    category,
    thumbnail,
    description,
    features,
    curriculum,
    isAIRecommended,
    tags,
  } = course

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/courses" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag className="border-primary text-primary bg-primary/10">{category}</Tag>
                <Tag className="border-secondary text-secondary bg-secondary/10">{level}</Tag>
                {isAIRecommended && (
                  <Tag className="border-yellow-500 text-yellow-600 bg-yellow-50">🤖 AI Recommended</Tag>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{title}</h1>

              <p className="text-xl text-muted-foreground mb-6">{description}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{rating}</span>
                  <span>({students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-5 w-5" />
                  <span>{level}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-3 mt-6 p-4 bg-card rounded-lg border border-border">
                <img src={instructorAvatar || "/placeholder.svg"} alt={instructor} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold text-foreground">Instructor: {instructor}</div>
                  <div className="text-sm text-muted-foreground">Expert in {category}</div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultActiveKey="overview" className="course-tabs">
              <TabPane tab="Overview" key="overview">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Course Description</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        This comprehensive course is designed to take you from beginner to advanced level in{" "}
                        {category.toLowerCase()}. You'll work on real-world projects, learn industry best practices, and
                        gain hands-on experience with the latest tools and technologies.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Our AI-powered learning system adapts to your pace and provides personalized recommendations to
                        help you succeed. With interactive quizzes, coding challenges, and project-based learning,
                        you'll build a strong foundation and practical skills that employers value.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} className="border-border bg-muted text-muted-foreground">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Curriculum" key="curriculum">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Course Curriculum</h3>
                  {curriculum.map((module, index) => (
                    <div key={index} className="bg-card p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{module.module}</h4>
                            <p className="text-sm text-muted-foreground">{module.duration}</p>
                          </div>
                        </div>
                        <Play className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>

              <TabPane tab="Reviews" key="reviews">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-4xl font-bold text-foreground">{rating}</div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-muted-foreground">Based on {students.toLocaleString()} reviews</div>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="bg-card p-6 rounded-lg border border-border">
                        <div className="flex items-start space-x-4">
                          <img
                            src={`/placeholder.svg?height=40&width=40&query=reviewer-${review}`}
                            alt="Reviewer"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium text-foreground">Student {review}</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              Excellent course! The instructor explains complex concepts in a very understandable way.
                              The hands-on projects really helped me apply what I learned.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Course Preview */}
              <div className="bg-card rounded-lg border border-border overflow-hidden mb-6">
                <div className="relative">
                  <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button
                      type="primary"
                      size="large"
                      icon={<Play className="h-6 w-6" />}
                      className="bg-white/20 border-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      Preview Course
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl font-bold text-primary">${price}</span>
                    {originalPrice && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
                        <Tag color="red" className="border-0">
                          {discount}% OFF
                        </Tag>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button
                      type="primary"
                      size="large"
                      className="w-full bg-primary hover:bg-primary/90 border-primary h-12 text-base font-medium"
                    >
                      Enroll Now
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 border-border text-foreground hover:text-primary hover:border-primary"
                        icon={<Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />}
                        onClick={() => setIsWishlisted(!isWishlisted)}
                      >
                        Wishlist
                      </Button>
                      <Button
                        className="border-border text-foreground hover:text-primary hover:border-primary"
                        icon={<Share2 className="h-4 w-4" />}
                      >
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Course Includes */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">This course includes:</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{duration} on-demand video</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Access to community</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Courses */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h4 className="font-semibold text-foreground mb-4">Related Courses</h4>
                <div className="space-y-4">
                  {coursesData
                    .filter((c) => c.category === category && c.id !== course.id)
                    .slice(0, 2)
                    .map((relatedCourse) => (
                      <Link key={relatedCourse.id} to={`/course/${relatedCourse.id}`}>
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <img
                            src={relatedCourse.thumbnail || "/placeholder.svg"}
                            alt={relatedCourse.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-foreground text-sm line-clamp-2">{relatedCourse.title}</h5>
                            <p className="text-xs text-muted-foreground">{relatedCourse.instructor}</p>
                            <p className="text-sm font-medium text-primary">${relatedCourse.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
