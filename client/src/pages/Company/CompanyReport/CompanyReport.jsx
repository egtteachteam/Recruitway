import React, { useState } from 'react';

const CompanyReport = () => {

  const summaries = [
    {
      id: "01",
      interview: {
        candidate: { name: "Aarav Mehta", email: "aarav.mehta@example.com" },
        position: { title: "Frontend Developer" },
        date: "2025-04-01T06:04:21.835073"
      },
      overallScore: "8.6/10",
      questionsAnswered: 14,
      totalQuestions: 15,
      duration: 45,
      skillAssessmentsParsed: [
        { name: "JavaScript", score: "8.8/10", percentage: 88 },
        { name: "React", score: "7.8/10", percentage: 78 },
        { name: "Node.js", score: "7.3/10", percentage: 73 },
        { name: "MongoDB", score: "8.7/10", percentage: 87 },
        { name: "System Design", score: "8.5/10", percentage: 85 },
        { name: "Communication", score: "9.6/10", percentage: 96 }
      ],
      codeAssessmentParsed: {
        task: "Create a dashboard using Chart.js and REST APIs",
        code: "// sample code omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Clear structure", "Good coding practices"] },
          { type: "warning", points: ["Could improve error handling"] }
        ]
      },
      aiSummary: "Aarav Mehta showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Frontend Developer role."
    },
    {
      id: "02",
      interview: {
        candidate: { name: "Nisha Kapoor", email: "nisha.kapoor@example.com" },
        position: { title: "Backend Developer" },
        date: "2025-03-20T06:04:21.835084"
      },
      overallScore: "9.2/10",
      questionsAnswered: 12,
      totalQuestions: 15,
      duration: 45,
      skillAssessmentsParsed: [
        { name: "JavaScript", score: "9.5/10", percentage: 95 },
        { name: "React", score: "9.4/10", percentage: 94 },
        { name: "Node.js", score: "9.3/10", percentage: 93 },
        { name: "MongoDB", score: "9.8/10", percentage: 98 },
        { name: "System Design", score: "9.5/10", percentage: 95 },
        { name: "Communication", score: "9.3/10", percentage: 93 }
      ],
      codeAssessmentParsed: {
        task: "Create a dashboard using Chart.js and REST APIs",
        code: "// sample code omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Clear structure", "Good coding practices"] },
          { type: "warning", points: ["Could improve error handling"] }
        ]
      },
      aiSummary: "Nisha Kapoor showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Backend Developer role."
    },
    {
      id: "03",
      interview: {
        candidate: { name: "Ravi Joshi", email: "ravi.joshi@example.com" },
        position: { title: "Full Stack Developer" },
        date: "2025-04-03T06:04:21.835088"
      },
      overallScore: "9.0/10",
      questionsAnswered: 14,
      totalQuestions: 15,
      duration: 60,
      skillAssessmentsParsed: [
        { name: "JavaScript", score: "8.7/10", percentage: 87 },
        { name: "React", score: "8.1/10", percentage: 81 },
        { name: "Node.js", score: "9.3/10", percentage: 93 },
        { name: "MongoDB", score: "9.6/10", percentage: 96 },
        { name: "System Design", score: "9.3/10", percentage: 93 },
        { name: "Communication", score: "8.9/10", percentage: 89 }
      ],
      codeAssessmentParsed: {
        task: "Create a dashboard using Chart.js and REST APIs",
        code: "// sample code omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Clear structure", "Good coding practices"] },
          { type: "warning", points: ["Could improve error handling"] }
        ]
      },
      aiSummary: "Ravi Joshi showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Full Stack Developer role."
    },
    {
      id: "04",
      interview: {
        candidate: { name: "Simran Verma", email: "simran.verma@example.com" },
        position: { title: "DevOps Engineer" },
        date: "2025-03-28T09:15:00Z"
      },
      overallScore: "8.3/10",
      questionsAnswered: 12,
      totalQuestions: 15,
      duration: 55,
      skillAssessmentsParsed: [
        { name: "CI/CD", score: "8.5/10", percentage: 85 },
        { name: "Docker", score: "8/10", percentage: 80 },
        { name: "Kubernetes", score: "7.5/10", percentage: 75 },
        { name: "AWS", score: "9/10", percentage: 90 },
        { name: "System Design", score: "8/10", percentage: 80 },
        { name: "Communication", score: "9/10", percentage: 90 }
      ],
      codeAssessmentParsed: {
        task: "Write a deployment script using Docker Compose for a Node.js app",
        code: "// docker-compose.yml example omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Well-documented and structured"] },
          { type: "warning", points: ["Missing resource constraints"] }
        ]
      },
      aiSummary: "Simran has a strong grasp of DevOps concepts and communicated effectively. Her Docker deployment script was functional but can be improved by including memory and CPU constraints."
    },
    {
      id: "05",
      interview: {
        candidate: { name: "Aditya Nair", email: "aditya.nair@example.com" },
        position: { title: "Mobile App Developer" },
        date: "2025-04-06T14:45:00Z"
      },
      overallScore: "9.4/10",
      questionsAnswered: 15,
      totalQuestions: 15,
      duration: 65,
      skillAssessmentsParsed: [
        { name: "Flutter", score: "9.6/10", percentage: 96 },
        { name: "Dart", score: "9.2/10", percentage: 92 },
        { name: "Firebase", score: "8.8/10", percentage: 88 },
        { name: "UX Design", score: "9.1/10", percentage: 91 },
        { name: "System Design", score: "9/10", percentage: 90 },
        { name: "Communication", score: "9.5/10", percentage: 95 }
      ],
      codeAssessmentParsed: {
        task: "Build a note-taking app using Flutter and Firebase",
        code: "// Flutter UI and Firebase setup omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Excellent UI and code structure"] },
          { type: "positive", points: ["Secure and scalable Firebase usage"] }
        ]
      },
      aiSummary: "Aditya delivered a clean, responsive Flutter app with excellent Firebase integration. Strong communicator with attention to UX and data handling. Ideal for mobile app development roles."
    },
    {
      id: "06",
      interview: {
        candidate: { name: "Megha Sinha", email: "megha.sinha@example.com" },
        position: { title: "Frontend Engineer" },
        date: "2025-04-08T11:00:00Z"
      },
      overallScore: "7.9/10",
      questionsAnswered: 13,
      totalQuestions: 15,
      duration: 50,
      skillAssessmentsParsed: [
        { name: "HTML/CSS", score: "9/10", percentage: 90 },
        { name: "JavaScript", score: "8.2/10", percentage: 82 },
        { name: "React", score: "7.5/10", percentage: 75 },
        { name: "Accessibility", score: "6.5/10", percentage: 65 },
        { name: "System Design", score: "7/10", percentage: 70 },
        { name: "Communication", score: "9/10", percentage: 90 }
      ],
      codeAssessmentParsed: {
        task: "Build a responsive portfolio site using React",
        code: "// Portfolio project code omitted",
        evaluation: [
          { type: "positive", points: ["Responsive design and layout"] },
          { type: "warning", points: ["Accessibility improvements needed"] }
        ]
      },
      aiSummary: "Megha created a sleek frontend project showing strong CSS and JavaScript skills. Improving accessibility practices would enhance her value for frontend-focused roles."
    },
    {
      id: "07",
      interview: {
        candidate: { name: "Rahul Dubey", email: "rahul.dubey@example.com" },
        position: { title: "Data Engineer" },
        date: "2025-03-30T13:30:00Z"
      },
      overallScore: "8.7/10",
      questionsAnswered: 14,
      totalQuestions: 15,
      duration: 60,
      skillAssessmentsParsed: [
        { name: "SQL", score: "9.5/10", percentage: 95 },
        { name: "Python", score: "8.7/10", percentage: 87 },
        { name: "Spark", score: "8/10", percentage: 80 },
        { name: "ETL Design", score: "8.8/10", percentage: 88 },
        { name: "System Design", score: "8.5/10", percentage: 85 },
        { name: "Communication", score: "9/10", percentage: 90 }
      ],
      codeAssessmentParsed: {
        task: "Build an ETL pipeline to clean and load CSV data into PostgreSQL",
        code: "// ETL script sample omitted",
        evaluation: [
          { type: "positive", points: ["Efficient pipeline structure"] },
          { type: "warning", points: ["Missing retry logic"] }
        ]
      },
      aiSummary: "Rahul delivered a clean and efficient ETL solution and showed deep knowledge of SQL and pipeline design. With a few robustness tweaks, he’s ready for data engineering challenges."
    },
    {
      id: "08",
      interview: {
        candidate: { name: "Neha Rathi", email: "neha.rathi@example.com" },
        position: { title: "QA Engineer" },
        date: "2025-04-02T10:00:00Z"
      },
      overallScore: "8.2/10",
      questionsAnswered: 13,
      totalQuestions: 15,
      duration: 50,
      skillAssessmentsParsed: [
        { name: "Test Automation", score: "8.5/10", percentage: 85 },
        { name: "Selenium", score: "8.2/10", percentage: 82 },
        { name: "Java", score: "8.3/10", percentage: 83 },
        { name: "API Testing", score: "7.9/10", percentage: 79 },
        { name: "System Design", score: "7.8/10", percentage: 78 },
        { name: "Communication", score: "8.7/10", percentage: 87 }
      ],
      codeAssessmentParsed: {
        task: "Write Selenium tests for a login and registration flow",
        code: "// Selenium test sample omitted",
        evaluation: [
          { type: "positive", points: ["Clear test cases and reusable methods"] },
          { type: "warning", points: ["Missing negative case coverage"] }
        ]
      },
      aiSummary: "Neha performed well in automation testing and showed strong command of Selenium. Her approach to reusable test logic is commendable. Adding more edge cases would improve test coverage."
    },
    {
      id: "09",
      interview: {
        candidate: { name: "Karan Bedi", email: "karan.bedi@example.com" },
        position: { title: "Software Engineer Intern" },
        date: "2025-04-07T15:45:00Z"
      },
      overallScore: "7.5/10",
      questionsAnswered: 12,
      totalQuestions: 15,
      duration: 40,
      skillAssessmentsParsed: [
        { name: "Python", score: "7.5/10", percentage: 75 },
        { name: "Algorithms", score: "7.2/10", percentage: 72 },
        { name: "OOP", score: "6.8/10", percentage: 68 },
        { name: "Version Control", score: "8.3/10", percentage: 83 },
        { name: "System Design", score: "6.5/10", percentage: 65 },
        { name: "Communication", score: "8/10", percentage: 80 }
      ],
      codeAssessmentParsed: {
        task: "Implement a basic CLI tool using Python argparse",
        code: "// Python CLI tool sample omitted",
        evaluation: [
          { type: "positive", points: ["Effective use of argparse and functions"] },
          { type: "warning", points: ["Error messages can be improved"] }
        ]
      },
      aiSummary: "Karan showed enthusiasm and promise for a junior developer role. His Python fundamentals are sound, and he can grow quickly with mentorship and exposure to real-world projects."
    },
    {
      id: "10",
      interview: {
        candidate: { name: "Aarav Mehta", email: "aarav.mehta@example.com" },
        position: { title: "Frontend Developer" },
        date: "2025-04-01T06:04:21.835073"
      },
      overallScore: "8.6/10",
      questionsAnswered: 14,
      totalQuestions: 15,
      duration: 45,
      skillAssessmentsParsed: [
        { name: "JavaScript", score: "8.8/10", percentage: 88 },
        { name: "React", score: "7.8/10", percentage: 78 },
        { name: "Node.js", score: "7.3/10", percentage: 73 },
        { name: "MongoDB", score: "8.7/10", percentage: 87 },
        { name: "System Design", score: "8.5/10", percentage: 85 },
        { name: "Communication", score: "9.6/10", percentage: 96 }
      ],
      codeAssessmentParsed: {
        task: "Create a dashboard using Chart.js and REST APIs",
        code: "// sample code omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Clear structure", "Good coding practices"] },
          { type: "warning", points: ["Could improve error handling"] }
        ]
      },
      aiSummary: "Aarav Mehta showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Frontend Developer role."
    },
    {
      id: "11",
      interview: {
        candidate: { name: "Nisha Kapoor", email: "nisha.kapoor@example.com" },
        position: { title: "Backend Developer" },
        date: "2025-03-20T06:04:21.835084"
      },
      overallScore: "9.2/10",
      questionsAnswered: 12,
      totalQuestions: 15,
      duration: 45,
      skillAssessmentsParsed: [
        { name: "JavaScript", score: "9.5/10", percentage: 95 },
        { name: "React", score: "9.4/10", percentage: 94 },
        { name: "Node.js", score: "9.3/10", percentage: 93 },
        { name: "MongoDB", score: "9.8/10", percentage: 98 },
        { name: "System Design", score: "9.5/10", percentage: 95 },
        { name: "Communication", score: "9.3/10", percentage: 93 }
      ],
      codeAssessmentParsed: {
        task: "Create a dashboard using Chart.js and REST APIs",
        code: "// sample code omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Clear structure", "Good coding practices"] },
          { type: "warning", points: ["Could improve error handling"] }
        ]
      },
      aiSummary: "Nisha Kapoor showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Backend Developer role."
    },
    {
      id: "12",
      interview: {
        candidate: { name: "Ravi Joshi", email: "ravi.joshi@example.com" },
        position: { title: "Full Stack Developer" },
        date: "2025-04-03T06:04:21.835088"
      },
      overallScore: "9.0/10",
      questionsAnswered: 14,
      totalQuestions: 15,
      duration: 60,
      skillAssessmentsParsed: [
        { name: "JavaScript", score: "8.7/10", percentage: 87 },
        { name: "React", score: "8.1/10", percentage: 81 },
        { name: "Node.js", score: "9.3/10", percentage: 93 },
        { name: "MongoDB", score: "9.6/10", percentage: 96 },
        { name: "System Design", score: "9.3/10", percentage: 93 },
        { name: "Communication", score: "8.9/10", percentage: 89 }
      ],
      codeAssessmentParsed: {
        task: "Create a dashboard using Chart.js and REST APIs",
        code: "// sample code omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Clear structure", "Good coding practices"] },
          { type: "warning", points: ["Could improve error handling"] }
        ]
      },
      aiSummary: "Ravi Joshi showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Full Stack Developer role."
    },
    {
      id: "13",
      interview: {
        candidate: { name: "Simran Verma", email: "simran.verma@example.com" },
        position: { title: "DevOps Engineer" },
        date: "2025-03-28T09:15:00Z"
      },
      overallScore: "8.3/10",
      questionsAnswered: 12,
      totalQuestions: 15,
      duration: 55,
      skillAssessmentsParsed: [
        { name: "CI/CD", score: "8.5/10", percentage: 85 },
        { name: "Docker", score: "8/10", percentage: 80 },
        { name: "Kubernetes", score: "7.5/10", percentage: 75 },
        { name: "AWS", score: "9/10", percentage: 90 },
        { name: "System Design", score: "8/10", percentage: 80 },
        { name: "Communication", score: "9/10", percentage: 90 }
      ],
      codeAssessmentParsed: {
        task: "Write a deployment script using Docker Compose for a Node.js app",
        code: "// docker-compose.yml example omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Well-documented and structured"] },
          { type: "warning", points: ["Missing resource constraints"] }
        ]
      },
      aiSummary: "Simran has a strong grasp of DevOps concepts and communicated effectively. Her Docker deployment script was functional but can be improved by including memory and CPU constraints."
    },
    {
      id: "14",
      interview: {
        candidate: { name: "Aditya Nair", email: "aditya.nair@example.com" },
        position: { title: "Mobile App Developer" },
        date: "2025-04-06T14:45:00Z"
      },
      overallScore: "9.4/10",
      questionsAnswered: 15,
      totalQuestions: 15,
      duration: 65,
      skillAssessmentsParsed: [
        { name: "Flutter", score: "9.6/10", percentage: 96 },
        { name: "Dart", score: "9.2/10", percentage: 92 },
        { name: "Firebase", score: "8.8/10", percentage: 88 },
        { name: "UX Design", score: "9.1/10", percentage: 91 },
        { name: "System Design", score: "9/10", percentage: 90 },
        { name: "Communication", score: "9.5/10", percentage: 95 }
      ],
      codeAssessmentParsed: {
        task: "Build a note-taking app using Flutter and Firebase",
        code: "// Flutter UI and Firebase setup omitted for brevity",
        evaluation: [
          { type: "positive", points: ["Excellent UI and code structure"] },
          { type: "positive", points: ["Secure and scalable Firebase usage"] }
        ]
      },
      aiSummary: "Aditya delivered a clean, responsive Flutter app with excellent Firebase integration. Strong communicator with attention to UX and data handling. Ideal for mobile app development roles."
    },
    {
      id: "15",
      interview: {
        candidate: { name: "Megha Sinha", email: "megha.sinha@example.com" },
        position: { title: "Frontend Engineer" },
        date: "2025-04-08T11:00:00Z"
      },
      overallScore: "7.9/10",
      questionsAnswered: 13,
      totalQuestions: 15,
      duration: 50,
      skillAssessmentsParsed: [
        { name: "HTML/CSS", score: "9/10", percentage: 90 },
        { name: "JavaScript", score: "8.2/10", percentage: 82 },
        { name: "React", score: "7.5/10", percentage: 75 },
        { name: "Accessibility", score: "6.5/10", percentage: 65 },
        { name: "System Design", score: "7/10", percentage: 70 },
        { name: "Communication", score: "9/10", percentage: 90 }
      ],
      codeAssessmentParsed: {
        task: "Build a responsive portfolio site using React",
        code: "// Portfolio project code omitted",
        evaluation: [
          { type: "positive", points: ["Responsive design and layout"] },
          { type: "warning", points: ["Accessibility improvements needed"] }
        ]
      },
      aiSummary: "Megha created a sleek frontend project showing strong CSS and JavaScript skills. Improving accessibility practices would enhance her value for frontend-focused roles."
    },
    {
      id: "16",
      interview: {
        candidate: { name: "Rahul Dubey", email: "rahul.dubey@example.com" },
        position: { title: "Data Engineer" },
        date: "2025-03-30T13:30:00Z"
      },
      overallScore: "8.7/10",
      questionsAnswered: 14,
      totalQuestions: 15,
      duration: 60,
      skillAssessmentsParsed: [
        { name: "SQL", score: "9.5/10", percentage: 95 },
        { name: "Python", score: "8.7/10", percentage: 87 },
        { name: "Spark", score: "8/10", percentage: 80 },
        { name: "ETL Design", score: "8.8/10", percentage: 88 },
        { name: "System Design", score: "8.5/10", percentage: 85 },
        { name: "Communication", score: "9/10", percentage: 90 }
      ],
      codeAssessmentParsed: {
        task: "Build an ETL pipeline to clean and load CSV data into PostgreSQL",
        code: "// ETL script sample omitted",
        evaluation: [
          { type: "positive", points: ["Efficient pipeline structure"] },
          { type: "warning", points: ["Missing retry logic"] }
        ]
      },
      aiSummary: "Rahul delivered a clean and efficient ETL solution and showed deep knowledge of SQL and pipeline design. With a few robustness tweaks, he’s ready for data engineering challenges."
    },
    {
      id: "17",
      interview: {
        candidate: { name: "Neha Rathi", email: "neha.rathi@example.com" },
        position: { title: "QA Engineer" },
        date: "2025-04-02T10:00:00Z"
      },
      overallScore: "8.2/10",
      questionsAnswered: 13,
      totalQuestions: 15,
      duration: 50,
      skillAssessmentsParsed: [
        { name: "Test Automation", score: "8.5/10", percentage: 85 },
        { name: "Selenium", score: "8.2/10", percentage: 82 },
        { name: "Java", score: "8.3/10", percentage: 83 },
        { name: "API Testing", score: "7.9/10", percentage: 79 },
        { name: "System Design", score: "7.8/10", percentage: 78 },
        { name: "Communication", score: "8.7/10", percentage: 87 }
      ],
      codeAssessmentParsed: {
        task: "Write Selenium tests for a login and registration flow",
        code: "// Selenium test sample omitted",
        evaluation: [
          { type: "positive", points: ["Clear test cases and reusable methods"] },
          { type: "warning", points: ["Missing negative case coverage"] }
        ]
      },
      aiSummary: "Neha performed well in automation testing and showed strong command of Selenium. Her approach to reusable test logic is commendable. Adding more edge cases would improve test coverage."
    },
    {
      id: "18",
      interview: {
        candidate: { name: "Karan Bedi", email: "karan.bedi@example.com" },
        position: { title: "Software Engineer Intern" },
        date: "2025-04-07T15:45:00Z"
      },
      overallScore: "7.5/10",
      questionsAnswered: 12,
      totalQuestions: 15,
      duration: 40,
      skillAssessmentsParsed: [
        { name: "Python", score: "7.5/10", percentage: 75 },
        { name: "Algorithms", score: "7.2/10", percentage: 72 },
        { name: "OOP", score: "6.8/10", percentage: 68 },
        { name: "Version Control", score: "8.3/10", percentage: 83 },
        { name: "System Design", score: "6.5/10", percentage: 65 },
        { name: "Communication", score: "8/10", percentage: 80 }
      ],
      codeAssessmentParsed: {
        task: "Implement a basic CLI tool using Python argparse",
        code: "// Python CLI tool sample omitted",
        evaluation: [
          { type: "positive", points: ["Effective use of argparse and functions"] },
          { type: "warning", points: ["Error messages can be improved"] }
        ]
      },
      aiSummary: "Karan showed enthusiasm and promise for a junior developer role. His Python fundamentals are sound, and he can grow quickly with mentorship and exposure to real-world projects."
    }
  ];

  const [selectedSummary, setSelectedSummary] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const summariesPerPage = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSummaryClick = (summary) => {
    setSelectedSummary(summary);
  };

  const handleBackToList = () => {
    setSelectedSummary(null);
  };

  // Pagination logic
  const indexOfLastSummary = currentPage * summariesPerPage;
  const indexOfFirstSummary = indexOfLastSummary - summariesPerPage;
  const currentSummaries = summaries.slice(indexOfFirstSummary, indexOfLastSummary);
  const totalPages = Math.ceil(summaries.length / summariesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (selectedSummary) {
    return (
      <div className="container-fluid">
        <div className="container py-3 py-md-4">
          <button onClick={handleBackToList} className="btn btn-sm btn-outline-primary mb-4">
            ← Back to List
          </button>

          <div className="row mb-4">
            <div className="col-12">
              <h1 className="fw-bold mb-3">Interview Summary</h1>
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h5 className="fw-bold">Candidate</h5>
                      <p className="mb-1"><strong>Name:</strong> {selectedSummary.interview.candidate.name}</p>
                      <p className="mb-0"><strong>Email:</strong> {selectedSummary.interview.candidate.email}</p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="fw-bold">Position</h5>
                      <p className="mb-1"><strong>Title:</strong> {selectedSummary.interview.position.title}</p>
                      <p className="mb-0"><strong>Date:</strong> {formatDate(selectedSummary.interview.date)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Metrics */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h3 className="fw-bold text-primary">{selectedSummary.overallScore}</h3>
                  <p className="mb-0">Overall Score</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h3 className="fw-bold text-primary">{selectedSummary.questionsAnswered}/{selectedSummary.totalQuestions}</h3>
                  <p className="mb-0">Questions Answered</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h3 className="fw-bold text-primary">{selectedSummary.duration} min</h3>
                  <p className="mb-0">Interview Duration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Assessment */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">Skills Assessment</h4>
                  <div className="row">
                    {selectedSummary.skillAssessmentsParsed.map((skill, index) => (
                      <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="fw-bold">{skill.name}</h6>
                            <div className="progress mb-2" style={{ height: '10px' }}>
                              <div
                                className={`progress-bar ${skill.percentage >= 80 ? 'bg-success' : skill.percentage >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                role="progressbar"
                                style={{ width: `${skill.percentage}%` }}
                                aria-valuenow={skill.percentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <p className="mb-0">{skill.score} ({skill.percentage}%)</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Assessment */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">Code Assessment</h4>
                  <h5 className="mb-2">Task:</h5>
                  <p className="mb-4">{selectedSummary.codeAssessmentParsed.task}</p>

                  <h5 className="mb-2">Solution:</h5>
                  <pre className="bg-light p-3 rounded mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                    <code>{selectedSummary.codeAssessmentParsed.code}</code>
                  </pre>

                  <h5 className="mb-2">Evaluation:</h5>
                  <div className="row">
                    {selectedSummary.codeAssessmentParsed.evaluation.map((item, index) => (
                      <div key={index} className="col-md-4 mb-3">
                        <div className={`card h-100 border-${item.type === 'positive' ? 'success' : 'warning'}`}>
                          <div className="card-body">
                            <h6 className={`text-${item.type === 'positive' ? 'success' : 'warning'}`}>
                              {item.type === 'positive' ? '✅ Strengths' : '⚠️ Areas for Improvement'}
                            </h6>
                            <ul className="mb-0">
                              {item.points.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">AI Summary</h4>
                  <div className="p-3 bg-light rounded">
                    {selectedSummary.aiSummary.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="container py-3 py-md-4">
        <div className="d-flex flex-column justify-content-between align-items-stretch mb-4 gap-3">
          <div className="mb-3 mb-lg-0">
            <h2 className="fw-bold mb-1">Interview Summaries ({summaries.length})</h2>
            <p className="text-muted mb-0">Interview Summaries of Candidates</p>
          </div>
          <div className="d-flex flex-column flex-md-row gap-3 w-100 w-lg-auto">
            <div className="position-relative flex-grow-1">
              <input
                type="text"
                className="form-control form-control-sm ps-5"
                placeholder="Search interviewers..."
              />
              <i className="ti ti-search position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
            </div>
            <select className="form-select form-select-sm w-auto">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Product Design</option>
              <option>Data Science</option>
              <option>Product Management</option>
            </select>
            <select className="form-select form-select-sm w-auto">
              <option>All Positions</option>
              <option>Full Stack Developer</option>
              <option>Frontend Engineer</option>
              <option>Backend Engineer</option>
              <option>DevOps Engineer</option>
            </select>
            <select className="form-select form-select-sm w-auto">
              <option>Sort by Date (Newest First)</option>
              <option>Sort by Date (Oldest First)</option>
              <option>Sort by Score (High to Low)</option>
              <option>Sort by Score (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Summary List */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              {/* Desktop Table (hidden on mobile) */}
              <table className="table table-striped table-hover d-none d-lg-table">
                <thead className="table-light">
                  <tr>
                    <th style={{ minWidth: '200px' }}>Candidate</th>
                    <th style={{ minWidth: '150px' }}>Position</th>
                    <th style={{ minWidth: '120px' }}>Date</th>
                    <th style={{ minWidth: '100px' }}>Score</th>
                    <th style={{ minWidth: '120px' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSummaries.length > 0 ? (
                    currentSummaries.map((summary) => (
                      <tr key={summary.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <div className="fw-bold">{summary.interview.candidate.name}</div>
                              <div className="small text-muted">{summary.interview.candidate.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{summary.interview.position.title}</td>
                        <td>{formatDate(summary.interview.date)}</td>
                        <td>
                          <span className={`badge ${parseFloat(summary.overallScore) >= 8 ? 'bg-success' :
                            parseFloat(summary.overallScore) >= 6 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                            {summary.overallScore}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleSummaryClick(summary)}
                          >
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No interview summaries available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mobile Cards (hidden on desktop) */}
              <div className="d-lg-none">
                {currentSummaries.length > 0 ? (
                  currentSummaries.map((summary) => (
                    <div key={summary.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-0 fw-bold">{summary.interview.candidate.name}</h6>
                            <small className="text-muted">{summary.interview.candidate.email}</small>
                          </div>
                          <span className={`badge ${parseFloat(summary.overallScore) >= 8 ? 'bg-success' :
                            parseFloat(summary.overallScore) >= 6 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                            {summary.overallScore}
                          </span>
                        </div>

                        <div className="mb-2">
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-briefcase me-2"></i>
                            <span>{summary.interview.position.title}</span>
                          </div>
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-calendar me-2"></i>
                            <span>{formatDate(summary.interview.date)}</span>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary flex-grow-1"
                            onClick={() => handleSummaryClick(summary)}
                          >
                            View Full Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted">
                    No interview summaries available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(pageNum)}>
                    {pageNum}
                  </button>
                </li>
              );
            })}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CompanyReport;