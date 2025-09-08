
import { useState } from "react"
import { Button, Card, Switch } from "antd"
import { Check, Star, Zap, Crown } from "lucide-react"

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started with basic courses",
      features: [
        "Access to 5 free courses",
        "Basic AI recommendations",
        "Community forum access",
        "Mobile app access",
        "Basic progress tracking",
      ],
      limitations: ["No certificates", "Limited course selection", "No offline access"],
      popular: false,
      icon: Star,
      color: "text-muted-foreground",
    },
    {
      name: "Pro",
      price: { monthly: 29, annual: 290 },
      description: "Ideal for serious learners and professionals",
      features: [
        "Access to 100+ premium courses",
        "AI-powered personalized learning paths",
        "Industry-recognized certificates",
        "Offline course downloads",
        "Priority support",
        "Advanced progress analytics",
        "1-on-1 mentor sessions (2/month)",
        "Project-based learning",
      ],
      limitations: [],
      popular: true,
      icon: Zap,
      color: "text-primary",
    },
    {
      name: "Enterprise",
      price: { monthly: 99, annual: 990 },
      description: "Perfect for teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited course access",
        "Team management dashboard",
        "Custom learning paths",
        "Advanced analytics & reporting",
        "Dedicated account manager",
        "Custom integrations",
        "Bulk user management",
        "White-label options",
        "24/7 priority support",
      ],
      limitations: [],
      popular: false,
      icon: Crown,
      color: "text-accent",
    },
  ]

  const getPrice = (plan) => {
    return isAnnual ? plan.price.annual : plan.price.monthly
  }

  const getSavings = (plan) => {
    if (plan.price.monthly === 0) return 0
    const annualMonthly = plan.price.annual / 12
    const savings = ((plan.price.monthly - annualMonthly) / plan.price.monthly) * 100
    return Math.round(savings)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Choose Your Learning Plan</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock your potential with our flexible pricing options. Start free and upgrade as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-base ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch checked={isAnnual} onChange={setIsAnnual} className="bg-muted" />
            <span className={`text-base ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annual
            </span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Save up to 17%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const price = getPrice(plan)
            const savings = getSavings(plan)

            return (
              <Card
                key={index}
                className={`relative bg-card border-border hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? "border-primary shadow-lg scale-105" : "hover:border-primary/30"
                }`}
                bodyStyle={{ padding: 0 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <Icon className={`h-12 w-12 ${plan.color} mx-auto mb-4`} />
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">${price}</span>
                        {price > 0 && (
                          <span className="text-muted-foreground ml-2">/{isAnnual ? "year" : "month"}</span>
                        )}
                      </div>
                      {isAnnual && savings > 0 && (
                        <p className="text-sm text-primary font-medium mt-1">Save {savings}% with annual billing</p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    type={plan.popular ? "primary" : "default"}
                    size="large"
                    className={`w-full h-12 text-base font-medium ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 border-primary"
                        : "border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {plan.name === "Free" ? "Get Started Free" : `Choose ${plan.name}`}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Can I switch plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">
                  Our Free plan gives you access to basic courses. Pro and Enterprise plans offer 7-day free trials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  You can cancel your subscription at any time. You'll retain access until the end of your billing
                  period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Do you offer student discounts?</h3>
                <p className="text-muted-foreground">
                  Yes! Students get 50% off Pro plans with valid student ID verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are advancing their careers with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="primary"
                size="large"
                className="bg-primary hover:bg-primary/90 border-primary h-12 px-8 text-base font-medium"
              >
                Start Free Trial
              </Button>
              <Button
                type="default"
                size="large"
                className="border-border hover:border-primary hover:text-primary h-12 px-8 text-base font-medium"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
