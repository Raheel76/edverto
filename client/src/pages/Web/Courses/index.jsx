import { useState, useMemo } from "react";
import { Input, Select, Button, Slider } from "antd";
import { Search, Filter, Grid, List } from "lucide-react";
import {
  coursesData,
  categories,
  levels,
} from "../../../components/common/data";
import { CourseCard } from "../../../components";

const { Option } = Select;

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");

  const filteredCourses = useMemo(() => {
    const filtered = coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All Categories" ||
        course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All Levels" || course.level === selectedLevel;
      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Assuming newer courses have higher IDs
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedLevel, priceRange, sortBy]);

  const aiRecommendedCourses = useMemo(() => {
    return coursesData.filter((course) => course.rating >= 4.5).slice(0, 3);
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setPriceRange([0, 200]);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Discover Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our comprehensive collection of AI-powered courses designed
            to advance your career
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <Button
                  type="text"
                  size="small"
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80"
                >
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search Courses
                </label>
                <Input
                  placeholder="Search by title, instructor, or tags..."
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: "var(--input)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  className="w-full"
                  style={{ color: "var(--foreground)" }}
                >
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Difficulty Level
                </label>
                <Select
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  className="w-full"
                >
                  {levels.map((level) => (
                    <Option key={level} value={level}>
                      {level}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  range
                  min={0}
                  max={200}
                  value={priceRange}
                  onChange={setPriceRange}
                  className="mt-4"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                🤖 AI Recommended for You
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Based on your learning patterns and goals, here are personalized
                course suggestions.
              </p>

              <div className="space-y-3 mb-4">
                {aiRecommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-card/50 p-3 rounded-lg border border-border/50"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {course.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {course.instructor}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        ${course.price}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-yellow-500">
                        ★ {course.rating}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {course.students} students
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="primary"
                size="small"
                className="bg-primary hover:bg-primary/90 border-primary w-full"
              >
                View All Recommendations
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-muted-foreground">
                Showing {filteredCourses.length} of {coursesData.length} courses
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <Select value={sortBy} onChange={setSortBy} className="w-40">
                  <Option value="popular">Most Popular</Option>
                  <Option value="rating">Highest Rated</Option>
                  <Option value="price-low">Price: Low to High</Option>
                  <Option value="price-high">Price: High to Low</Option>
                  <Option value="newest">Newest First</Option>
                </Select>

                {/* View Mode */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Courses Grid/List */}
            {filteredCourses.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  type="primary"
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary/90 border-primary"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
