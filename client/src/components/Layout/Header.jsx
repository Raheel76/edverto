
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, BookOpen, Search } from "lucide-react"
import { Button, Input } from "antd"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Teachers", href: "/teachers" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Edverto</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Input
              placeholder="Search courses..."
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              className="w-64"
              style={{
                backgroundColor: "var(--input)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/login">
              <Button type="text" className="text-foreground hover:text-primary">
                Login
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button type="primary" className="bg-primary hover:bg-primary/90 border-primary">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground hover:text-primary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <Input
                  placeholder="Search courses..."
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                  style={{
                    backgroundColor: "var(--input)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="px-3 py-2 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button type="text" className="w-full text-foreground hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button type="primary" className="w-full bg-primary hover:bg-primary/90 border-primary">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
