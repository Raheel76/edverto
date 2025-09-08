import { useState } from "react";
import {
  Button,
  Card,
  Avatar,
  Rate,
  Modal,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import {
  Users,
  BookOpen,
  Award,
  UploadIcon,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";

const { TextArea } = Input;
const { Option } = Select;

const OurTeachers = () => {
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      photo: "/professional-woman-teacher.png",
      expertise: ["Machine Learning", "Data Science", "Python"],
      rating: 4.9,
      students: 15420,
      courses: 12,
      experience: "8 years",
      bio: "Former Google AI researcher with expertise in machine learning and neural networks. Passionate about making complex AI concepts accessible to everyone.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah.johnson@ailms.com",
      },
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      photo: "/professional-asian-teacher.png",
      expertise: ["Web Development", "React", "Node.js"],
      rating: 4.8,
      students: 22100,
      courses: 18,
      experience: "10 years",
      bio: "Full-stack developer and former tech lead at Microsoft. Specializes in modern web technologies and scalable application architecture.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael.chen@ailms.com",
      },
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      photo: "/latina-teacher.png",
      expertise: ["Mobile Development", "Flutter", "iOS"],
      rating: 4.9,
      students: 18750,
      courses: 15,
      experience: "7 years",
      bio: "Mobile app development expert with apps downloaded over 10M times. Former iOS developer at Apple with a passion for user experience.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily.rodriguez@ailms.com",
      },
    },
    {
      id: 4,
      name: "James Wilson",
      photo: "/placeholder-kjibj.png",
      expertise: ["DevOps", "Cloud Computing", "AWS"],
      rating: 4.7,
      students: 12300,
      courses: 10,
      experience: "9 years",
      bio: "Cloud architecture specialist and AWS certified solutions architect. Helps companies scale their infrastructure and optimize performance.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james.wilson@ailms.com",
      },
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      photo: "/placeholder-wivak.png",
      expertise: ["Cybersecurity", "Ethical Hacking", "Network Security"],
      rating: 4.8,
      students: 9800,
      courses: 8,
      experience: "6 years",
      bio: "Cybersecurity expert and ethical hacker with certifications in CISSP and CEH. Helps organizations protect against cyber threats.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "lisa.park@ailms.com",
      },
    },
    {
      id: 6,
      name: "Robert Thompson",
      photo: "/placeholder-eptnq.png",
      expertise: ["Blockchain", "Cryptocurrency", "Smart Contracts"],
      rating: 4.6,
      students: 7500,
      courses: 6,
      experience: "5 years",
      bio: "Blockchain developer and cryptocurrency expert. Former blockchain engineer at Coinbase with deep knowledge of DeFi protocols.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "robert.thompson@ailms.com",
      },
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Teacher application:", values);
      setLoading(false);
      setApplyModalVisible(false);
      // Show success message
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Our Expert Teachers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn from industry professionals and experienced educators who are
            passionate about sharing their knowledge and helping you achieve
            your learning goals.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => setApplyModalVisible(true)}
            className="bg-primary hover:bg-primary/90 border-primary h-12 px-8 text-base font-medium"
          >
            Apply as a Teacher
          </Button>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:border-primary/30"
              bodyStyle={{ padding: 0 }}
            >
              <div className="p-6">
                {/* Teacher Photo and Basic Info */}
                <div className="text-center mb-4">
                  <Avatar
                    size={120}
                    src={teacher.photo}
                    className="mx-auto mb-4 border-4 border-primary/20"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {teacher.experience} experience
                  </p>
                  <Rate
                    disabled
                    defaultValue={teacher.rating}
                    className="text-sm"
                  />
                  <span className="text-sm text-muted-foreground ml-2">
                    ({teacher.rating})
                  </span>
                </div>

                {/* Expertise Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {teacher.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-semibold text-foreground">
                        {teacher.students.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <BookOpen className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-semibold text-foreground">
                        {teacher.courses}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Courses</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {teacher.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <Button
                    type="text"
                    size="small"
                    icon={<Mail className="h-4 w-4" />}
                    className="text-muted-foreground hover:text-primary"
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<Linkedin className="h-4 w-4" />}
                    className="text-muted-foreground hover:text-primary"
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<Twitter className="h-4 w-4" />}
                    className="text-muted-foreground hover:text-primary"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join Our Teaching Community
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share your expertise with thousands of eager learners worldwide.
              Create courses, earn income, and make a lasting impact on the next
              generation of professionals.
            </p>
            <Button
              type="primary"
              size="large"
              onClick={() => setApplyModalVisible(true)}
              className="bg-primary hover:bg-primary/90 border-primary h-12 px-8 text-base font-medium"
            >
              Start Teaching Today
            </Button>
          </div>
        </div>
      </div>

      {/* Apply as Teacher Modal */}
      <Modal
        title="Apply as a Teacher"
        open={applyModalVisible}
        onCancel={() => setApplyModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          name="teacher-application"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="Your first name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="Your last name" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="your.email@example.com" />
          </Form.Item>

          <Form.Item
            name="expertise"
            label="Area of Expertise"
            rules={[
              { required: true, message: "Please select your expertise!" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select your areas of expertise"
            >
              <Option value="web-development">Web Development</Option>
              <Option value="mobile-development">Mobile Development</Option>
              <Option value="data-science">Data Science</Option>
              <Option value="machine-learning">Machine Learning</Option>
              <Option value="cybersecurity">Cybersecurity</Option>
              <Option value="cloud-computing">Cloud Computing</Option>
              <Option value="blockchain">Blockchain</Option>
              <Option value="devops">DevOps</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="experience"
            label="Years of Experience"
            rules={[
              { required: true, message: "Please select your experience!" },
            ]}
          >
            <Select placeholder="Select your experience level">
              <Option value="1-2">1-2 years</Option>
              <Option value="3-5">3-5 years</Option>
              <Option value="6-10">6-10 years</Option>
              <Option value="10+">10+ years</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="bio"
            label="Professional Bio"
            rules={[{ required: true, message: "Please provide your bio!" }]}
          >
            <TextArea
              placeholder="Tell us about your background, experience, and what you'd like to teach..."
              rows={4}
            />
          </Form.Item>

          <Form.Item name="resume" label="Upload Resume/CV">
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <UploadIcon className="h-12 w-12 text-primary mx-auto" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for PDF, DOC, DOCX files up to 10MB
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-primary hover:bg-primary/90 border-primary w-full h-12 text-base font-medium"
            >
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OurTeachers;
