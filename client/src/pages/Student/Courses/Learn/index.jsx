import { useState, useRef } from "react";
import { Card, Row, Col, Button, Progress, Collapse, List, Input, Drawer, Select, message, Modal } from "antd";
import {
  PlayCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Settings,
  FileText,
  PenTool,
  Bookmark,
} from "lucide-react";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

const CoursePlayer = ({ params }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [selectedTranscriptTime, setSelectedTranscriptTime] = useState(0);

  // Sample course data
  const courseData = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    currentLesson: {
      id: 1,
      title: "Introduction to HTML5",
      duration: "15:30",
      videoUrl: "/placeholder-video.mp4",
      description: "Learn the basics of HTML5 and semantic markup",
      transcript: [
        {
          time: 0,
          text: "Welcome to this comprehensive introduction to HTML5. In this lesson, we'll cover the fundamental concepts that make HTML5 the backbone of modern web development.",
        },
        {
          time: 15,
          text: "HTML5 introduced many new semantic elements that help us create more meaningful and accessible web pages. Let's start by understanding what semantic markup means.",
        },
        {
          time: 45,
          text: "The document structure in HTML5 follows a specific hierarchy. We always start with the DOCTYPE declaration, followed by the html element.",
        },
        {
          time: 75,
          text: "Inside the html element, we have two main sections: the head and the body. The head contains metadata about our document.",
        },
        {
          time: 105,
          text: "The body element contains all the visible content that users will see and interact with on our web page.",
        },
        {
          time: 135,
          text: "Let's look at some of the new semantic elements introduced in HTML5, such as header, nav, main, section, article, and footer.",
        },
        {
          time: 180,
          text: "These semantic elements not only make our code more readable but also improve accessibility for screen readers and other assistive technologies.",
        },
        { time: 220, text: "Now let's create our first HTML5 document and see these concepts in action." },
      ],
    },
    modules: [
      {
        id: 1,
        title: "Getting Started with Web Development",
        progress: 100,
        lessons: [
          { id: 1, title: "Course Introduction", duration: "15:30", completed: true, current: false },
          { id: 2, title: "What is Web Development?", duration: "20:15", completed: true, current: false },
          { id: 3, title: "Setting Up Development Environment", duration: "25:45", completed: true, current: false },
        ],
      },
      {
        id: 2,
        title: "HTML5 Fundamentals",
        progress: 25,
        lessons: [
          { id: 4, title: "Introduction to HTML5", duration: "15:30", completed: false, current: true },
          { id: 5, title: "HTML Document Structure", duration: "18:20", completed: false, current: false },
          { id: 6, title: "Text Elements and Formatting", duration: "22:10", completed: false, current: false },
          { id: 7, title: "Links and Navigation", duration: "16:45", completed: false, current: false },
        ],
      },
      {
        id: 3,
        title: "CSS3 Styling and Layout",
        progress: 0,
        lessons: [
          { id: 8, title: "CSS Basics and Selectors", duration: "20:30", completed: false, current: false },
          { id: 9, title: "Box Model and Layout", duration: "25:15", completed: false, current: false },
          { id: 10, title: "Flexbox Layout", duration: "30:20", completed: false, current: false },
        ],
      },
    ],
    notes: [
      {
        id: 1,
        timestamp: 45,
        content: "Remember: DOCTYPE declaration is crucial for HTML5",
        created: "2024-01-15T10:30:00Z",
        color: "yellow",
      },
      {
        id: 2,
        timestamp: 135,
        content: "Semantic elements: header, nav, main, section, article, footer",
        created: "2024-01-15T10:32:00Z",
        color: "blue",
      },
    ],
  };

  const [notes, setNotes] = useState(courseData.notes);

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (value) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      timestamp: currentTime,
      content: currentNote,
      created: new Date().toISOString(),
      color: "yellow",
    };
    setNotes([...notes, newNote]);
    setCurrentNote("");
    setNoteModalVisible(false);
    message.success("Note added successfully!");
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    message.success("Note deleted successfully!");
  };

  const jumpToTranscriptTime = (time) => {
    handleSeek(time);
  };

  const getCurrentTranscriptIndex = () => {
    return courseData.currentLesson.transcript.findIndex((item, index) => {
      const nextItem = courseData.currentLesson.transcript[index + 1];
      return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
    });
  };

  const CourseSidebar = () => (
    <div className="h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground mb-2">{courseData.title}</h3>
        <div className="text-sm text-muted-foreground">Progress: 42% Complete</div>
        <Progress percent={42} strokeColor="#0891b2" className="mt-2" />
      </div>

      <div className="overflow-y-auto" style={{ height: "calc(100% - 100px)" }}>
        <Collapse ghost defaultActiveKey={["2"]}>
          {courseData.modules.map((module) => (
            <Panel
              key={module.id}
              header={
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-medium text-foreground">{module.title}</span>
                  <span className="text-sm text-muted-foreground">{module.progress}%</span>
                </div>
              }
            >
              <List
                dataSource={module.lessons}
                renderItem={(lesson) => (
                  <List.Item
                    className={`cursor-pointer hover:bg-background/50 px-3 py-2 rounded ${
                      lesson.current ? "bg-primary/10 border-l-2 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircleOutlined className="text-green-500" />
                        ) : lesson.current ? (
                          <PlayCircleOutlined className="text-primary" />
                        ) : (
                          <ClockCircleOutlined className="text-muted-foreground" />
                        )}
                        <span className={`text-sm ${lesson.current ? "text-primary font-medium" : "text-foreground"}`}>
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Row className="h-screen">
        {/* Course Sidebar - Desktop */}
        <Col xs={0} lg={6} className="h-full">
          <CourseSidebar />
        </Col>

        {/* Main Content */}
        <Col xs={24} lg={18} className="h-full flex flex-col">
          {/* Video Player */}
          <div className="flex-1 bg-black relative">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              poster="/placeholder.svg?height=400&width=800"
            >
              <source src="/placeholder-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  className="w-full h-1 bg-white/30 rounded cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    handleSeek(percent * duration);
                  }}
                >
                  <div className="h-full bg-primary rounded" style={{ width: `${(currentTime / duration) * 100}%` }} />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    type="text"
                    icon={isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    onClick={togglePlay}
                    className="text-white hover:text-primary"
                  />
                  <Button
                    type="text"
                    icon={<SkipBack size={16} />}
                    onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                    className="text-white hover:text-primary"
                  />
                  <Button
                    type="text"
                    icon={<SkipForward size={16} />}
                    onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                    className="text-white hover:text-primary"
                  />

                  <div className="flex items-center gap-2">
                    <Button
                      type="text"
                      icon={isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      onClick={toggleMute}
                      className="text-white hover:text-primary"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={playbackRate} onChange={changePlaybackRate} size="small" className="w-20">
                    <Option value={0.5}>0.5x</Option>
                    <Option value={0.75}>0.75x</Option>
                    <Option value={1}>1x</Option>
                    <Option value={1.25}>1.25x</Option>
                    <Option value={1.5}>1.5x</Option>
                    <Option value={2}>2x</Option>
                  </Select>

                  <Button type="text" icon={<Settings size={16} />} className="text-white hover:text-primary" />

                  <Button
                    type="text"
                    icon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    onClick={toggleFullscreen}
                    className="text-white hover:text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Toggle */}
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => setSidebarVisible(true)}
              className="absolute top-4 left-4 lg:hidden"
            />
          </div>

          {/* Bottom Panel - Transcript and Notes */}
          <div className="h-80 border-t border-border">
            <div className="flex h-full">
              {/* Transcript Panel */}
              {showTranscript && (
                <div className="flex-1 border-r border-border">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <h4 className="font-semibold text-foreground">Transcript</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="text"
                        size="small"
                        icon={<DownloadOutlined />}
                        className="text-muted-foreground hover:text-primary"
                      >
                        Download
                      </Button>
                      <Button
                        type="text"
                        size="small"
                        onClick={() => setShowTranscript(false)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        ×
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 overflow-y-auto h-full">
                    <div className="space-y-3">
                      {courseData.currentLesson.transcript.map((item, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded cursor-pointer transition-colors ${
                            getCurrentTranscriptIndex() === index
                              ? "bg-primary/10 border-l-2 border-primary"
                              : "hover:bg-background/50"
                          }`}
                          onClick={() => jumpToTranscriptTime(item.time)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                              {formatTime(item.time)}
                            </span>
                            <p className="text-sm text-foreground leading-relaxed flex-1">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Panel */}
              {showNotes && (
                <div className="flex-1">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PenTool size={16} className="text-primary" />
                      <h4 className="font-semibold text-foreground">My Notes</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => setNoteModalVisible(true)}
                        className="bg-primary hover:bg-primary/80"
                      >
                        Add Note
                      </Button>
                      <Button
                        type="text"
                        size="small"
                        onClick={() => setShowNotes(false)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        ×
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 overflow-y-auto h-full">
                    <div className="space-y-3">
                      {notes.map((note) => (
                        <Card key={note.id} size="small" className="bg-card border-border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Button
                                  type="link"
                                  size="small"
                                  onClick={() => handleSeek(note.timestamp)}
                                  className="text-primary p-0 h-auto font-mono text-xs"
                                >
                                  {formatTime(note.timestamp)}
                                </Button>
                                <div className={`w-3 h-3 rounded-full bg-${note.color}-400`} />
                              </div>
                              <p className="text-sm text-foreground">{note.content}</p>
                            </div>
                            <Button
                              type="text"
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => deleteNote(note.id)}
                              className="text-red-500 hover:text-red-400"
                            />
                          </div>
                        </Card>
                      ))}

                      {notes.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Bookmark size={32} className="mx-auto mb-2 opacity-50" />
                          <p>No notes yet. Click "Add Note" to get started.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Panel Toggle Buttons */}
              {!showTranscript && !showNotes && (
                <div className="flex-1 flex items-center justify-center gap-4">
                  <Button
                    type="primary"
                    icon={<FileText size={16} />}
                    onClick={() => setShowTranscript(true)}
                    className="bg-primary hover:bg-primary/80"
                  >
                    Show Transcript
                  </Button>
                  <Button
                    type="primary"
                    icon={<PenTool size={16} />}
                    onClick={() => setShowNotes(true)}
                    className="bg-secondary hover:bg-secondary/80"
                  >
                    Show Notes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Mobile Course Sidebar */}
      <Drawer
        title="Course Content"
        placement="left"
        onClose={() => setSidebarVisible(false)}
        open={sidebarVisible}
        width={320}
        className="lg:hidden"
        bodyStyle={{ padding: 0 }}
      >
        <CourseSidebar />
      </Drawer>

      {/* Add Note Modal */}
      <Modal
        title="Add Note"
        open={noteModalVisible}
        onOk={addNote}
        onCancel={() => setNoteModalVisible(false)}
        okText="Save Note"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Timestamp: {formatTime(currentTime)}</div>
          <TextArea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Enter your note here..."
            rows={4}
            className="resize-none"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CoursePlayer;