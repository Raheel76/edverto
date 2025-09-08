import { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Button,
  Tag,
  Rate,
  Badge,
  Pagination,
  Slider,
  Checkbox,
  Drawer,
} from "antd";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { studentCoursesData } from "../../../../components/common/data";



const { Option } = Select;
const { Search } = Input;

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const pageSize = 12;

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Web Development", label: "Web Development" },
    { value: "AI & ML", label: "AI & Machine Learning" },
    { value: "Frontend", label: "Frontend Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Design", label: "UI/UX Design" },
    { value: "Backend", label: "Backend Development" },
    { value: "DevOps", label: "DevOps & Cloud" },
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const filtered = studentCoursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "all" || course.level === selectedLevel;
      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];
      const matchesEnrolled = !showEnrolledOnly || course.isEnrolled;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesPrice &&
        matchesEnrolled
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
        default:
          return b.students - a.students;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    priceRange,
    sortBy,
    showEnrolledOnly,
  ]);

  // Paginate courses
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCourses.slice(startIndex, startIndex + pageSize);
  }, [filteredCourses, currentPage]);

  const CourseCard = ({ course }) => (
    <Card
      className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
      cover={
        <div className="relative">
          <img
            alt={course.title}
            src={course.thumbnail || "/placeholder.svg"}
            className="h-48 w-full object-cover"
          />
          {course.isBestseller && (
            <Badge.Ribbon
              text="Bestseller"
              color="orange"
              className="absolute top-2 right-2"
            />
          )}
          {course.isEnrolled && (
            <div className="absolute top-2 left-2">
              <Tag color="green" icon={<CheckCircleOutlined />}>
                Enrolled
              </Tag>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <Link to={`/student/courses-catalog/${course.id}`}>
              <Button
                type="primary"
                size="large"
                icon={<EyeOutlined />}
                className="bg-primary hover:bg-primary/80"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {course.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={course.instructorAvatar || "/placeholder.svg"}
              alt={course.instructor}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-muted-foreground text-sm">
              {course.instructor}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Rate
              disabled
              defaultValue={course.rating}
              allowHalf
              className="text-xs"
            />
            <span className="text-yellow-500 font-medium">{course.rating}</span>
            <span>({course.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ClockCircleOutlined />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOutlined />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <UserOutlined />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} className="text-xs">
              {tag}
            </Tag>
          ))}
          {course.tags.length > 3 && (
            <Tag className="text-xs">+{course.tags.length - 3} more</Tag>
          )}
        </div>

        {course.isEnrolled && course.progress && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary font-medium">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {course.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ${course.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-primary">
              ${course.price}
            </span>
          </div>
          <Button
            type="primary"
            className="bg-primary hover:bg-primary/80"
            icon={course.isEnrolled ? <PlayCircleOutlined /> : <BookOutlined />}
          >
            {course.isEnrolled ? "Continue" : "Enroll Now"}
          </Button>
        </div>
      </div>
    </Card>
  );

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-foreground mb-3">Category</h4>
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="w-full"
          size="large"
        >
          {categories.map((cat) => (
            <Option key={cat.value} value={cat.value}>
              {cat.label}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Level</h4>
        <Select
          value={selectedLevel}
          onChange={setSelectedLevel}
          className="w-full"
          size="large"
        >
          {levels.map((level) => (
            <Option key={level.value} value={level.value}>
              {level.label}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Price Range</h4>
        <Slider
          range
          min={0}
          max={500}
          value={priceRange}
          onChange={setPriceRange}
          tooltip={{ formatter: (value) => `$${value}` }}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <Checkbox
          checked={showEnrolledOnly}
          onChange={(e) => setShowEnrolledOnly(e.target.checked)}
          className="text-foreground"
        >
          Show only enrolled courses
        </Checkbox>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Course Catalog
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover and enroll in courses to advance your skills
        </p>
      </div>

      <div className="mb-8">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12} lg={8}>
            <Search
              placeholder="Search courses, instructors, or topics..."
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={setSearchTerm}
              className="w-full"
            />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Select
              value={sortBy}
              onChange={setSortBy}
              size="large"
              className="w-full"
            >
              {sortOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className="flex gap-2">
              <Button
                size="large"
                icon={<Filter />}
                onClick={() => setFilterDrawerVisible(true)}
                className="lg:hidden"
              >
                Filters
              </Button>
              <Button.Group size="large" className="hidden sm:flex">
                <Button
                  type={viewMode === "grid" ? "primary" : "default"}
                  icon={<Grid />}
                  onClick={() => setViewMode("grid")}
                />
                <Button
                  type={viewMode === "list" ? "primary" : "default"}
                  icon={<List />}
                  onClick={() => setViewMode("list")}
                />
              </Button.Group>
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={0} lg={6}>
          <Card className="bg-card border-border sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="text-primary" />
              <h3 className="font-semibold text-foreground">Filters</h3>
            </div>
            <FilterPanel />
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-muted-foreground">
              Showing {paginatedCourses.length} of {filteredCourses.length}{" "}
              courses
            </span>
          </div>

          <Row gutter={[24, 24]}>
            {paginatedCourses.map((course) => (
              <Col key={course.id} xs={24} sm={12} lg={8} xl={6}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOutlined className="text-6xl text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}

          {filteredCourses.length > pageSize && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={filteredCourses.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} courses`
                }
              />
            </div>
          )}
        </Col>
      </Row>

      <Drawer
        title="Filter Courses"
        placement="right"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        width={320}
        className="lg:hidden"
      >
        <FilterPanel />
      </Drawer>
    </div>
  );
};

export default CourseCatalog;