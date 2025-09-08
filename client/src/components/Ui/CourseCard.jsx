import { Link } from "react-router-dom"
import { Star, Clock, Award } from "lucide-react"
import { Button, Tag } from "antd"

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    instructor,
    instructorAvatar,
    price,
    originalPrice,
    rating,
    students,
    duration,
    level,
    thumbnail,
    description,
    isAIRecommended,
    tags,
  } = course

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isAIRecommended && (
          <div className="absolute top-3 left-3">
            <Tag color="gold" className="border-0 font-medium">
              🤖 AI Recommended
            </Tag>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3">
            <Tag color="red" className="border-0 font-medium">
              {discount}% OFF
            </Tag>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Course Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-4">
          <img src={instructorAvatar || "/placeholder.svg"} alt={instructor} className="w-8 h-8 rounded-full" />
          <span className="text-sm text-muted-foreground">{instructor}</span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span>({students.toLocaleString()})</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>{level}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Tag key={tag} className="text-xs border-border bg-muted text-muted-foreground">
              {tag}
            </Tag>
          ))}
          {tags.length > 3 && (
            <Tag className="text-xs border-border bg-muted text-muted-foreground">+{tags.length - 3} more</Tag>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">${price}</span>
            {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
          </div>
          <Link to={`/courses/${id}`}>
            <Button type="primary" className="bg-primary hover:bg-primary/90 border-primary">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
