// import React, { useState } from 'react';

// const InterviewReportGenerator = () => {
//     const [selectedId, setSelectedId] = useState('');
//     const [selectedReport, setSelectedReport] = useState(null);

//     const summaries = [
//         {
//           id: "01",
//           interview: {
//             candidate: { name: "Aarav Mehta", email: "aarav.mehta@example.com" },
//             position: { title: "Frontend Developer" },
//             date: "2025-04-01T06:04:21.835073"
//           },
//           overallScore: "8.6/10",
//           questionsAnswered: 14,
//           totalQuestions: 15,
//           duration: 45,
//           skillAssessmentsParsed: [
//             { name: "JavaScript", score: "8.8/10", percentage: 88 },
//             { name: "React", score: "7.8/10", percentage: 78 },
//             { name: "Node.js", score: "7.3/10", percentage: 73 },
//             { name: "MongoDB", score: "8.7/10", percentage: 87 },
//             { name: "System Design", score: "8.5/10", percentage: 85 },
//             { name: "Communication", score: "9.6/10", percentage: 96 }
//           ],
//           codeAssessmentParsed: {
//             task: "Create a dashboard using Chart.js and REST APIs",
//             code: "// sample code omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Clear structure", "Good coding practices"] },
//               { type: "warning", points: ["Could improve error handling"] }
//             ]
//           },
//           interviewerSummary: "Aarav Mehta showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Frontend Developer role."
//         },
//         {
//           id: "02",
//           interview: {
//             candidate: { name: "Nisha Kapoor", email: "nisha.kapoor@example.com" },
//             position: { title: "Backend Developer" },
//             date: "2025-03-20T06:04:21.835084"
//           },
//           overallScore: "9.2/10",
//           questionsAnswered: 12,
//           totalQuestions: 15,
//           duration: 45,
//           skillAssessmentsParsed: [
//             { name: "JavaScript", score: "9.5/10", percentage: 95 },
//             { name: "React", score: "9.4/10", percentage: 94 },
//             { name: "Node.js", score: "9.3/10", percentage: 93 },
//             { name: "MongoDB", score: "9.8/10", percentage: 98 },
//             { name: "System Design", score: "9.5/10", percentage: 95 },
//             { name: "Communication", score: "9.3/10", percentage: 93 }
//           ],
//           codeAssessmentParsed: {
//             task: "Create a dashboard using Chart.js and REST APIs",
//             code: "// sample code omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Clear structure", "Good coding practices"] },
//               { type: "warning", points: ["Could improve error handling"] }
//             ]
//           },
//           interviewerSummary: "Nisha Kapoor showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Backend Developer role."
//         },
//         {
//           id: "03",
//           interview: {
//             candidate: { name: "Ravi Joshi", email: "ravi.joshi@example.com" },
//             position: { title: "Full Stack Developer" },
//             date: "2025-04-03T06:04:21.835088"
//           },
//           overallScore: "9.0/10",
//           questionsAnswered: 14,
//           totalQuestions: 15,
//           duration: 60,
//           skillAssessmentsParsed: [
//             { name: "JavaScript", score: "8.7/10", percentage: 87 },
//             { name: "React", score: "8.1/10", percentage: 81 },
//             { name: "Node.js", score: "9.3/10", percentage: 93 },
//             { name: "MongoDB", score: "9.6/10", percentage: 96 },
//             { name: "System Design", score: "9.3/10", percentage: 93 },
//             { name: "Communication", score: "8.9/10", percentage: 89 }
//           ],
//           codeAssessmentParsed: {
//             task: "Create a dashboard using Chart.js and REST APIs",
//             code: "// sample code omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Clear structure", "Good coding practices"] },
//               { type: "warning", points: ["Could improve error handling"] }
//             ]
//           },
//           interviewerSummary: "Ravi Joshi showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Full Stack Developer role."
//         },
//         {
//           id: "04",
//           interview: {
//             candidate: { name: "Simran Verma", email: "simran.verma@example.com" },
//             position: { title: "DevOps Engineer" },
//             date: "2025-03-28T09:15:00Z"
//           },
//           overallScore: "8.3/10",
//           questionsAnswered: 12,
//           totalQuestions: 15,
//           duration: 55,
//           skillAssessmentsParsed: [
//             { name: "CI/CD", score: "8.5/10", percentage: 85 },
//             { name: "Docker", score: "8/10", percentage: 80 },
//             { name: "Kubernetes", score: "7.5/10", percentage: 75 },
//             { name: "AWS", score: "9/10", percentage: 90 },
//             { name: "System Design", score: "8/10", percentage: 80 },
//             { name: "Communication", score: "9/10", percentage: 90 }
//           ],
//           codeAssessmentParsed: {
//             task: "Write a deployment script using Docker Compose for a Node.js app",
//             code: "// docker-compose.yml example omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Well-documented and structured"] },
//               { type: "warning", points: ["Missing resource constraints"] }
//             ]
//           },
//           interviewerSummary: "Simran has a strong grasp of DevOps concepts and communicated effectively. Her Docker deployment script was functional but can be improved by including memory and CPU constraints."
//         },
//         {
//           id: "05",
//           interview: {
//             candidate: { name: "Aditya Nair", email: "aditya.nair@example.com" },
//             position: { title: "Mobile App Developer" },
//             date: "2025-04-06T14:45:00Z"
//           },
//           overallScore: "9.4/10",
//           questionsAnswered: 15,
//           totalQuestions: 15,
//           duration: 65,
//           skillAssessmentsParsed: [
//             { name: "Flutter", score: "9.6/10", percentage: 96 },
//             { name: "Dart", score: "9.2/10", percentage: 92 },
//             { name: "Firebase", score: "8.8/10", percentage: 88 },
//             { name: "UX Design", score: "9.1/10", percentage: 91 },
//             { name: "System Design", score: "9/10", percentage: 90 },
//             { name: "Communication", score: "9.5/10", percentage: 95 }
//           ],
//           codeAssessmentParsed: {
//             task: "Build a note-taking app using Flutter and Firebase",
//             code: "// Flutter UI and Firebase setup omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Excellent UI and code structure"] },
//               { type: "positive", points: ["Secure and scalable Firebase usage"] }
//             ]
//           },
//           interviewerSummary: "Aditya delivered a clean, responsive Flutter app with excellent Firebase integration. Strong communicator with attention to UX and data handling. Ideal for mobile app development roles."
//         },
//         {
//           id: "06",
//           interview: {
//             candidate: { name: "Megha Sinha", email: "megha.sinha@example.com" },
//             position: { title: "Frontend Engineer" },
//             date: "2025-04-08T11:00:00Z"
//           },
//           overallScore: "7.9/10",
//           questionsAnswered: 13,
//           totalQuestions: 15,
//           duration: 50,
//           skillAssessmentsParsed: [
//             { name: "HTML/CSS", score: "9/10", percentage: 90 },
//             { name: "JavaScript", score: "8.2/10", percentage: 82 },
//             { name: "React", score: "7.5/10", percentage: 75 },
//             { name: "Accessibility", score: "6.5/10", percentage: 65 },
//             { name: "System Design", score: "7/10", percentage: 70 },
//             { name: "Communication", score: "9/10", percentage: 90 }
//           ],
//           codeAssessmentParsed: {
//             task: "Build a responsive portfolio site using React",
//             code: "// Portfolio project code omitted",
//             evaluation: [
//               { type: "positive", points: ["Responsive design and layout"] },
//               { type: "warning", points: ["Accessibility improvements needed"] }
//             ]
//           },
//           interviewerSummary: "Megha created a sleek frontend project showing strong CSS and JavaScript skills. Improving accessibility practices would enhance her value for frontend-focused roles."
//         },
//         {
//           id: "07",
//           interview: {
//             candidate: { name: "Rahul Dubey", email: "rahul.dubey@example.com" },
//             position: { title: "Data Engineer" },
//             date: "2025-03-30T13:30:00Z"
//           },
//           overallScore: "8.7/10",
//           questionsAnswered: 14,
//           totalQuestions: 15,
//           duration: 60,
//           skillAssessmentsParsed: [
//             { name: "SQL", score: "9.5/10", percentage: 95 },
//             { name: "Python", score: "8.7/10", percentage: 87 },
//             { name: "Spark", score: "8/10", percentage: 80 },
//             { name: "ETL Design", score: "8.8/10", percentage: 88 },
//             { name: "System Design", score: "8.5/10", percentage: 85 },
//             { name: "Communication", score: "9/10", percentage: 90 }
//           ],
//           codeAssessmentParsed: {
//             task: "Build an ETL pipeline to clean and load CSV data into PostgreSQL",
//             code: "// ETL script sample omitted",
//             evaluation: [
//               { type: "positive", points: ["Efficient pipeline structure"] },
//               { type: "warning", points: ["Missing retry logic"] }
//             ]
//           },
//           interviewerSummary: "Rahul delivered a clean and efficient ETL solution and showed deep knowledge of SQL and pipeline design. With a few robustness tweaks, he’s ready for data engineering challenges."
//         },
//         {
//           id: "08",
//           interview: {
//             candidate: { name: "Neha Rathi", email: "neha.rathi@example.com" },
//             position: { title: "QA Engineer" },
//             date: "2025-04-02T10:00:00Z"
//           },
//           overallScore: "8.2/10",
//           questionsAnswered: 13,
//           totalQuestions: 15,
//           duration: 50,
//           skillAssessmentsParsed: [
//             { name: "Test Automation", score: "8.5/10", percentage: 85 },
//             { name: "Selenium", score: "8.2/10", percentage: 82 },
//             { name: "Java", score: "8.3/10", percentage: 83 },
//             { name: "API Testing", score: "7.9/10", percentage: 79 },
//             { name: "System Design", score: "7.8/10", percentage: 78 },
//             { name: "Communication", score: "8.7/10", percentage: 87 }
//           ],
//           codeAssessmentParsed: {
//             task: "Write Selenium tests for a login and registration flow",
//             code: "// Selenium test sample omitted",
//             evaluation: [
//               { type: "positive", points: ["Clear test cases and reusable methods"] },
//               { type: "warning", points: ["Missing negative case coverage"] }
//             ]
//           },
//           interviewerSummary: "Neha performed well in automation testing and showed strong command of Selenium. Her approach to reusable test logic is commendable. Adding more edge cases would improve test coverage."
//         },
//         {
//           id: "09",
//           interview: {
//             candidate: { name: "Karan Bedi", email: "karan.bedi@example.com" },
//             position: { title: "Software Engineer Intern" },
//             date: "2025-04-07T15:45:00Z"
//           },
//           overallScore: "7.5/10",
//           questionsAnswered: 12,
//           totalQuestions: 15,
//           duration: 40,
//           skillAssessmentsParsed: [
//             { name: "Python", score: "7.5/10", percentage: 75 },
//             { name: "Algorithms", score: "7.2/10", percentage: 72 },
//             { name: "OOP", score: "6.8/10", percentage: 68 },
//             { name: "Version Control", score: "8.3/10", percentage: 83 },
//             { name: "System Design", score: "6.5/10", percentage: 65 },
//             { name: "Communication", score: "8/10", percentage: 80 }
//           ],
//           codeAssessmentParsed: {
//             task: "Implement a basic CLI tool using Python argparse",
//             code: "// Python CLI tool sample omitted",
//             evaluation: [
//               { type: "positive", points: ["Effective use of argparse and functions"] },
//               { type: "warning", points: ["Error messages can be improved"] }
//             ]
//           },
//           interviewerSummary: "Karan showed enthusiasm and promise for a junior developer role. His Python fundamentals are sound, and he can grow quickly with mentorship and exposure to real-world projects."
//         },
//         {
//           id: "10",
//           interview: {
//             candidate: { name: "Aarav Mehta", email: "aarav.mehta@example.com" },
//             position: { title: "Frontend Developer" },
//             date: "2025-04-01T06:04:21.835073"
//           },
//           overallScore: "8.6/10",
//           questionsAnswered: 14,
//           totalQuestions: 15,
//           duration: 45,
//           skillAssessmentsParsed: [
//             { name: "JavaScript", score: "8.8/10", percentage: 88 },
//             { name: "React", score: "7.8/10", percentage: 78 },
//             { name: "Node.js", score: "7.3/10", percentage: 73 },
//             { name: "MongoDB", score: "8.7/10", percentage: 87 },
//             { name: "System Design", score: "8.5/10", percentage: 85 },
//             { name: "Communication", score: "9.6/10", percentage: 96 }
//           ],
//           codeAssessmentParsed: {
//             task: "Create a dashboard using Chart.js and REST APIs",
//             code: "// sample code omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Clear structure", "Good coding practices"] },
//               { type: "warning", points: ["Could improve error handling"] }
//             ]
//           },
//           interviewerSummary: "Aarav Mehta showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Frontend Developer role."
//         },
//         {
//           id: "11",
//           interview: {
//             candidate: { name: "Nisha Kapoor", email: "nisha.kapoor@example.com" },
//             position: { title: "Backend Developer" },
//             date: "2025-03-20T06:04:21.835084"
//           },
//           overallScore: "9.2/10",
//           questionsAnswered: 12,
//           totalQuestions: 15,
//           duration: 45,
//           skillAssessmentsParsed: [
//             { name: "JavaScript", score: "9.5/10", percentage: 95 },
//             { name: "React", score: "9.4/10", percentage: 94 },
//             { name: "Node.js", score: "9.3/10", percentage: 93 },
//             { name: "MongoDB", score: "9.8/10", percentage: 98 },
//             { name: "System Design", score: "9.5/10", percentage: 95 },
//             { name: "Communication", score: "9.3/10", percentage: 93 }
//           ],
//           codeAssessmentParsed: {
//             task: "Create a dashboard using Chart.js and REST APIs",
//             code: "// sample code omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Clear structure", "Good coding practices"] },
//               { type: "warning", points: ["Could improve error handling"] }
//             ]
//           },
//           interviewerSummary: "Nisha Kapoor showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Backend Developer role."
//         },
//         {
//           id: "12",
//           interview: {
//             candidate: { name: "Ravi Joshi", email: "ravi.joshi@example.com" },
//             position: { title: "Full Stack Developer" },
//             date: "2025-04-03T06:04:21.835088"
//           },
//           overallScore: "9.0/10",
//           questionsAnswered: 14,
//           totalQuestions: 15,
//           duration: 60,
//           skillAssessmentsParsed: [
//             { name: "JavaScript", score: "8.7/10", percentage: 87 },
//             { name: "React", score: "8.1/10", percentage: 81 },
//             { name: "Node.js", score: "9.3/10", percentage: 93 },
//             { name: "MongoDB", score: "9.6/10", percentage: 96 },
//             { name: "System Design", score: "9.3/10", percentage: 93 },
//             { name: "Communication", score: "8.9/10", percentage: 89 }
//           ],
//           codeAssessmentParsed: {
//             task: "Create a dashboard using Chart.js and REST APIs",
//             code: "// sample code omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Clear structure", "Good coding practices"] },
//               { type: "warning", points: ["Could improve error handling"] }
//             ]
//           },
//           interviewerSummary: "Ravi Joshi showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Full Stack Developer role."
//         },
//         {
//           id: "13",
//           interview: {
//             candidate: { name: "Simran Verma", email: "simran.verma@example.com" },
//             position: { title: "DevOps Engineer" },
//             date: "2025-03-28T09:15:00Z"
//           },
//           overallScore: "8.3/10",
//           questionsAnswered: 12,
//           totalQuestions: 15,
//           duration: 55,
//           skillAssessmentsParsed: [
//             { name: "CI/CD", score: "8.5/10", percentage: 85 },
//             { name: "Docker", score: "8/10", percentage: 80 },
//             { name: "Kubernetes", score: "7.5/10", percentage: 75 },
//             { name: "AWS", score: "9/10", percentage: 90 },
//             { name: "System Design", score: "8/10", percentage: 80 },
//             { name: "Communication", score: "9/10", percentage: 90 }
//           ],
//           codeAssessmentParsed: {
//             task: "Write a deployment script using Docker Compose for a Node.js app",
//             code: "// docker-compose.yml example omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Well-documented and structured"] },
//               { type: "warning", points: ["Missing resource constraints"] }
//             ]
//           },
//           interviewerSummary: "Simran has a strong grasp of DevOps concepts and communicated effectively. Her Docker deployment script was functional but can be improved by including memory and CPU constraints."
//         },
//         {
//           id: "14",
//           interview: {
//             candidate: { name: "Aditya Nair", email: "aditya.nair@example.com" },
//             position: { title: "Mobile App Developer" },
//             date: "2025-04-06T14:45:00Z"
//           },
//           overallScore: "9.4/10",
//           questionsAnswered: 15,
//           totalQuestions: 15,
//           duration: 65,
//           skillAssessmentsParsed: [
//             { name: "Flutter", score: "9.6/10", percentage: 96 },
//             { name: "Dart", score: "9.2/10", percentage: 92 },
//             { name: "Firebase", score: "8.8/10", percentage: 88 },
//             { name: "UX Design", score: "9.1/10", percentage: 91 },
//             { name: "System Design", score: "9/10", percentage: 90 },
//             { name: "Communication", score: "9.5/10", percentage: 95 }
//           ],
//           codeAssessmentParsed: {
//             task: "Build a note-taking app using Flutter and Firebase",
//             code: "// Flutter UI and Firebase setup omitted for brevity",
//             evaluation: [
//               { type: "positive", points: ["Excellent UI and code structure"] },
//               { type: "positive", points: ["Secure and scalable Firebase usage"] }
//             ]
//           },
//           interviewerSummary: "Aditya delivered a clean, responsive Flutter app with excellent Firebase integration. Strong communicator with attention to UX and data handling. Ideal for mobile app development roles."
//         },
//         {
//           id: "15",
//           interview: {
//             candidate: { name: "Megha Sinha", email: "megha.sinha@example.com" },
//             position: { title: "Frontend Engineer" },
//             date: "2025-04-08T11:00:00Z"
//           },
//           overallScore: "7.9/10",
//           questionsAnswered: 13,
//           totalQuestions: 15,
//           duration: 50,
//           skillAssessmentsParsed: [
//             { name: "HTML/CSS", score: "9/10", percentage: 90 },
//             { name: "JavaScript", score: "8.2/10", percentage: 82 },
//             { name: "React", score: "7.5/10", percentage: 75 },
//             { name: "Accessibility", score: "6.5/10", percentage: 65 },
//             { name: "System Design", score: "7/10", percentage: 70 },
//             { name: "Communication", score: "9/10", percentage: 90 }
//           ],
//           codeAssessmentParsed: {
//             task: "Build a responsive portfolio site using React",
//             code: "// Portfolio project code omitted",
//             evaluation: [
//               { type: "positive", points: ["Responsive design and layout"] },
//               { type: "warning", points: ["Accessibility improvements needed"] }
//             ]
//           },
//           interviewerSummary: "Megha created a sleek frontend project showing strong CSS and JavaScript skills. Improving accessibility practices would enhance her value for frontend-focused roles."
//         },
//         {
//           id: "16",
//           interview: {
//             candidate: { name: "Rahul Dubey", email: "rahul.dubey@example.com" },
//             position: { title: "Data Engineer" },
//             date: "2025-03-30T13:30:00Z"
//           },
//           overallScore: "8.7/10",
//           questionsAnswered: 14,
//           totalQuestions: 15,
//           duration: 60,
//           skillAssessmentsParsed: [
//             { name: "SQL", score: "9.5/10", percentage: 95 },
//             { name: "Python", score: "8.7/10", percentage: 87 },
//             { name: "Spark", score: "8/10", percentage: 80 },
//             { name: "ETL Design", score: "8.8/10", percentage: 88 },
//             { name: "System Design", score: "8.5/10", percentage: 85 },
//             { name: "Communication", score: "9/10", percentage: 90 }
//           ],
//           codeAssessmentParsed: {
//             task: "Build an ETL pipeline to clean and load CSV data into PostgreSQL",
//             code: "// ETL script sample omitted",
//             evaluation: [
//               { type: "positive", points: ["Efficient pipeline structure"] },
//               { type: "warning", points: ["Missing retry logic"] }
//             ]
//           },
//           interviewerSummary: "Rahul delivered a clean and efficient ETL solution and showed deep knowledge of SQL and pipeline design. With a few robustness tweaks, he’s ready for data engineering challenges."
//         },
//         {
//           id: "17",
//           interview: {
//             candidate: { name: "Neha Rathi", email: "neha.rathi@example.com" },
//             position: { title: "QA Engineer" },
//             date: "2025-04-02T10:00:00Z"
//           },
//           overallScore: "8.2/10",
//           questionsAnswered: 13,
//           totalQuestions: 15,
//           duration: 50,
//           skillAssessmentsParsed: [
//             { name: "Test Automation", score: "8.5/10", percentage: 85 },
//             { name: "Selenium", score: "8.2/10", percentage: 82 },
//             { name: "Java", score: "8.3/10", percentage: 83 },
//             { name: "API Testing", score: "7.9/10", percentage: 79 },
//             { name: "System Design", score: "7.8/10", percentage: 78 },
//             { name: "Communication", score: "8.7/10", percentage: 87 }
//           ],
//           codeAssessmentParsed: {
//             task: "Write Selenium tests for a login and registration flow",
//             code: "// Selenium test sample omitted",
//             evaluation: [
//               { type: "positive", points: ["Clear test cases and reusable methods"] },
//               { type: "warning", points: ["Missing negative case coverage"] }
//             ]
//           },
//           interviewerSummary: "Neha performed well in automation testing and showed strong command of Selenium. Her approach to reusable test logic is commendable. Adding more edge cases would improve test coverage."
//         },
//         {
//           id: "18",
//           interview: {
//             candidate: { name: "Karan Bedi", email: "karan.bedi@example.com" },
//             position: { title: "Software Engineer Intern" },
//             date: "2025-04-07T15:45:00Z"
//           },
//           overallScore: "7.5/10",
//           questionsAnswered: 12,
//           totalQuestions: 15,
//           duration: 40,
//           skillAssessmentsParsed: [
//             { name: "Python", score: "7.5/10", percentage: 75 },
//             { name: "Algorithms", score: "7.2/10", percentage: 72 },
//             { name: "OOP", score: "6.8/10", percentage: 68 },
//             { name: "Version Control", score: "8.3/10", percentage: 83 },
//             { name: "System Design", score: "6.5/10", percentage: 65 },
//             { name: "Communication", score: "8/10", percentage: 80 }
//           ],
//           codeAssessmentParsed: {
//             task: "Implement a basic CLI tool using Python argparse",
//             code: "// Python CLI tool sample omitted",
//             evaluation: [
//               { type: "positive", points: ["Effective use of argparse and functions"] },
//               { type: "warning", points: ["Error messages can be improved"] }
//             ]
//           },
//           interviewerSummary: "Karan showed enthusiasm and promise for a junior developer role. His Python fundamentals are sound, and he can grow quickly with mentorship and exposure to real-world projects."
//         }
//       ];

//     const uniqueCandidates = Array.from(
//         new Map(
//             summaries.map((s) => [
//                 s.interview.candidate.email,
//                 {
//                     id: s.id,
//                     name: s.interview.candidate.name,
//                     email: s.interview.candidate.email,
//                     position: s.interview.position.title,
//                 },
//             ])
//         ).values()
//     );

//     const handleGenerate = () => {
//         const report = summaries.find((s) => s.id === selectedId);
//         setSelectedReport(report || null);
//     };

//     const formatDate = (dateStr) => {
//         const date = new Date(dateStr);
//         return date.toLocaleString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//         });
//     };

//     return (
//         <div className="container my-4">
//             <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
//                 <h1 className="text-primary">Interview Report Generator</h1>
//             </div>

//             <div className="d-flex flex-wrap gap-2 mb-4">
//                 <select
//                     className="form-select w-auto"
//                     value={selectedId}
//                     onChange={(e) => setSelectedId(e.target.value)}
//                 >
//                     <option value="">Select a candidate</option>
//                     {uniqueCandidates.map((c) => (
//                         <option key={c.id} value={c.id}>
//                             {c.name} - {c.position}
//                         </option>
//                     ))}
//                 </select>
//                 <button className="btn btn-primary" onClick={handleGenerate}>
//                     Generate Report
//                 </button>
//                 {selectedReport && (
//                     <button
//                         className="btn btn-secondary"
//                         onClick={() => window.print()}
//                     >
//                         Print Report
//                     </button>
//                 )}
//             </div>

//             <div className="bg-white p-4 rounded shadow-sm mb-5">
//                 {!selectedReport ? (
//                     <div className="text-center text-muted p-5">
//                         <h4>No report selected</h4>
//                         <p>Please select a candidate and click "Generate Report"</p>
//                     </div>
//                 ) : (
//                     <>
//                         <h2>Interview Evaluation Report</h2>
//                         <div className="row mt-4">
//                             <div className="col-md-4 mb-3">
//                                 <div className="bg-light p-3 rounded">
//                                     <h5 className="text-primary">Candidate Information</h5>
//                                     <p><strong>Name:</strong> {selectedReport.interview.candidate.name}</p>
//                                     <p><strong>Email:</strong> {selectedReport.interview.candidate.email}</p>
//                                 </div>
//                             </div>
//                             <div className="col-md-4 mb-3">
//                                 <div className="bg-light p-3 rounded">
//                                     <h5 className="text-primary">Position Details</h5>
//                                     <p><strong>Position:</strong> {selectedReport.interview.position.title}</p>
//                                     <p><strong>Interview Date:</strong> {formatDate(selectedReport.interview.date)}</p>
//                                 </div>
//                             </div>
//                             <div className="col-md-4 mb-3">
//                                 <div className="bg-light p-3 rounded">
//                                     <h5 className="text-primary">Interview Metrics</h5>
//                                     <p><strong>Overall Score:</strong> {selectedReport.overallScore}</p>
//                                     <p><strong>Questions Answered:</strong> {selectedReport.questionsAnswered}/{selectedReport.totalQuestions}</p>
//                                     <p><strong>Duration:</strong> {selectedReport.duration} minutes</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <h3 className="mt-5">Skill Assessments</h3>
//                         <div className="row mt-3">
//                             {selectedReport.skillAssessmentsParsed.map((skill, i) => (
//                                 <div className="col-md-4 mb-3" key={i}>
//                                     <div className="p-3 rounded shadow-sm bg-white border">
//                                         <div className="fw-bold">{skill.name}</div>
//                                         <div className="text-primary fs-5">{skill.score}</div>
//                                         <div className="progress mt-2" style={{ height: '10px' }}>
//                                             <div
//                                                 className="progress-bar bg-primary"
//                                                 style={{ width: `${skill.percentage}%` }}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <h3 className="mt-5">Code Assessment</h3>
//                         <div className="bg-light p-4 rounded mb-4">
//                             <p><strong>Task:</strong> {selectedReport.codeAssessmentParsed.task}</p>
//                             <div className="mt-3">
//                                 {selectedReport.codeAssessmentParsed.evaluation.map((evalItem, i) => (
//                                     <div
//                                         className={`p-3 mb-3 rounded border-start border-4 ${evalItem.type === 'positive' ? 'bg-success-subtle border-success' : 'bg-warning-subtle border-warning'
//                                             }`}
//                                         key={i}
//                                     >
//                                         <strong>{evalItem.type === 'positive' ? 'Strengths' : 'Areas for Improvement'}:</strong>
//                                         <ul className="mb-0">
//                                             {evalItem.points.map((point, j) => (
//                                                 <li key={j}>{point}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <h3>Interviewer Summary</h3>
//                         <div className="p-4 bg-info-subtle border-start border-4 border-info rounded">
//                             <p>{selectedReport.interviewerSummary}</p>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default InterviewReportGenerator;





// import React, { useState } from 'react';

// const InterviewReportGenerator = () => {
//     const [selectedCandidateId, setSelectedCandidateId] = useState('');
//     const [showReport, setShowReport] = useState(false);

//     // This would typically come from props or an API call
//     const summaries = [
//         {
//             id: "01",
//             interview: {
//                 candidate: { name: "Aarav Mehta", email: "aarav.mehta@example.com" },
//                 position: { title: "Frontend Developer" },
//                 date: "2025-04-01T06:04:21.835073"
//             },
//             overallScore: "8.6/10",
//             questionsAnswered: 14,
//             totalQuestions: 15,
//             duration: 45,
//             skillAssessmentsParsed: [
//                 { name: "JavaScript", score: "8.8/10", percentage: 88 },
//                 { name: "React", score: "7.8/10", percentage: 78 },
//                 { name: "Node.js", score: "7.3/10", percentage: 73 },
//                 { name: "MongoDB", score: "8.7/10", percentage: 87 },
//                 { name: "System Design", score: "8.5/10", percentage: 85 },
//                 { name: "Communication", score: "9.6/10", percentage: 96 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Create a dashboard using Chart.js and REST APIs",
//                 code: "// sample code omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Clear structure", "Good coding practices"] },
//                     { type: "warning", points: ["Could improve error handling"] }
//                 ]
//             },
//             interviewerSummary: "Aarav Mehta showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Frontend Developer role."
//         },
//         {
//             id: "02",
//             interview: {
//                 candidate: { name: "Nisha Kapoor", email: "nisha.kapoor@example.com" },
//                 position: { title: "Backend Developer" },
//                 date: "2025-03-20T06:04:21.835084"
//             },
//             overallScore: "9.2/10",
//             questionsAnswered: 12,
//             totalQuestions: 15,
//             duration: 45,
//             skillAssessmentsParsed: [
//                 { name: "JavaScript", score: "9.5/10", percentage: 95 },
//                 { name: "React", score: "9.4/10", percentage: 94 },
//                 { name: "Node.js", score: "9.3/10", percentage: 93 },
//                 { name: "MongoDB", score: "9.8/10", percentage: 98 },
//                 { name: "System Design", score: "9.5/10", percentage: 95 },
//                 { name: "Communication", score: "9.3/10", percentage: 93 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Create a dashboard using Chart.js and REST APIs",
//                 code: "// sample code omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Clear structure", "Good coding practices"] },
//                     { type: "warning", points: ["Could improve error handling"] }
//                 ]
//             },
//             interviewerSummary: "Nisha Kapoor showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Backend Developer role."
//         },
//         {
//             id: "03",
//             interview: {
//                 candidate: { name: "Ravi Joshi", email: "ravi.joshi@example.com" },
//                 position: { title: "Full Stack Developer" },
//                 date: "2025-04-03T06:04:21.835088"
//             },
//             overallScore: "9.0/10",
//             questionsAnswered: 14,
//             totalQuestions: 15,
//             duration: 60,
//             skillAssessmentsParsed: [
//                 { name: "JavaScript", score: "8.7/10", percentage: 87 },
//                 { name: "React", score: "8.1/10", percentage: 81 },
//                 { name: "Node.js", score: "9.3/10", percentage: 93 },
//                 { name: "MongoDB", score: "9.6/10", percentage: 96 },
//                 { name: "System Design", score: "9.3/10", percentage: 93 },
//                 { name: "Communication", score: "8.9/10", percentage: 89 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Create a dashboard using Chart.js and REST APIs",
//                 code: "// sample code omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Clear structure", "Good coding practices"] },
//                     { type: "warning", points: ["Could improve error handling"] }
//                 ]
//             },
//             interviewerSummary: "Ravi Joshi showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Full Stack Developer role."
//         },
//         {
//             id: "04",
//             interview: {
//                 candidate: { name: "Simran Verma", email: "simran.verma@example.com" },
//                 position: { title: "DevOps Engineer" },
//                 date: "2025-03-28T09:15:00Z"
//             },
//             overallScore: "8.3/10",
//             questionsAnswered: 12,
//             totalQuestions: 15,
//             duration: 55,
//             skillAssessmentsParsed: [
//                 { name: "CI/CD", score: "8.5/10", percentage: 85 },
//                 { name: "Docker", score: "8/10", percentage: 80 },
//                 { name: "Kubernetes", score: "7.5/10", percentage: 75 },
//                 { name: "AWS", score: "9/10", percentage: 90 },
//                 { name: "System Design", score: "8/10", percentage: 80 },
//                 { name: "Communication", score: "9/10", percentage: 90 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Write a deployment script using Docker Compose for a Node.js app",
//                 code: "// docker-compose.yml example omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Well-documented and structured"] },
//                     { type: "warning", points: ["Missing resource constraints"] }
//                 ]
//             },
//             interviewerSummary: "Simran has a strong grasp of DevOps concepts and communicated effectively. Her Docker deployment script was functional but can be improved by including memory and CPU constraints."
//         },
//         {
//             id: "05",
//             interview: {
//                 candidate: { name: "Aditya Nair", email: "aditya.nair@example.com" },
//                 position: { title: "Mobile App Developer" },
//                 date: "2025-04-06T14:45:00Z"
//             },
//             overallScore: "9.4/10",
//             questionsAnswered: 15,
//             totalQuestions: 15,
//             duration: 65,
//             skillAssessmentsParsed: [
//                 { name: "Flutter", score: "9.6/10", percentage: 96 },
//                 { name: "Dart", score: "9.2/10", percentage: 92 },
//                 { name: "Firebase", score: "8.8/10", percentage: 88 },
//                 { name: "UX Design", score: "9.1/10", percentage: 91 },
//                 { name: "System Design", score: "9/10", percentage: 90 },
//                 { name: "Communication", score: "9.5/10", percentage: 95 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Build a note-taking app using Flutter and Firebase",
//                 code: "// Flutter UI and Firebase setup omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Excellent UI and code structure"] },
//                     { type: "positive", points: ["Secure and scalable Firebase usage"] }
//                 ]
//             },
//             interviewerSummary: "Aditya delivered a clean, responsive Flutter app with excellent Firebase integration. Strong communicator with attention to UX and data handling. Ideal for mobile app development roles."
//         },
//         {
//             id: "06",
//             interview: {
//                 candidate: { name: "Megha Sinha", email: "megha.sinha@example.com" },
//                 position: { title: "Frontend Engineer" },
//                 date: "2025-04-08T11:00:00Z"
//             },
//             overallScore: "7.9/10",
//             questionsAnswered: 13,
//             totalQuestions: 15,
//             duration: 50,
//             skillAssessmentsParsed: [
//                 { name: "HTML/CSS", score: "9/10", percentage: 90 },
//                 { name: "JavaScript", score: "8.2/10", percentage: 82 },
//                 { name: "React", score: "7.5/10", percentage: 75 },
//                 { name: "Accessibility", score: "6.5/10", percentage: 65 },
//                 { name: "System Design", score: "7/10", percentage: 70 },
//                 { name: "Communication", score: "9/10", percentage: 90 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Build a responsive portfolio site using React",
//                 code: "// Portfolio project code omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Responsive design and layout"] },
//                     { type: "warning", points: ["Accessibility improvements needed"] }
//                 ]
//             },
//             interviewerSummary: "Megha created a sleek frontend project showing strong CSS and JavaScript skills. Improving accessibility practices would enhance her value for frontend-focused roles."
//         },
//         {
//             id: "07",
//             interview: {
//                 candidate: { name: "Rahul Dubey", email: "rahul.dubey@example.com" },
//                 position: { title: "Data Engineer" },
//                 date: "2025-03-30T13:30:00Z"
//             },
//             overallScore: "8.7/10",
//             questionsAnswered: 14,
//             totalQuestions: 15,
//             duration: 60,
//             skillAssessmentsParsed: [
//                 { name: "SQL", score: "9.5/10", percentage: 95 },
//                 { name: "Python", score: "8.7/10", percentage: 87 },
//                 { name: "Spark", score: "8/10", percentage: 80 },
//                 { name: "ETL Design", score: "8.8/10", percentage: 88 },
//                 { name: "System Design", score: "8.5/10", percentage: 85 },
//                 { name: "Communication", score: "9/10", percentage: 90 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Build an ETL pipeline to clean and load CSV data into PostgreSQL",
//                 code: "// ETL script sample omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Efficient pipeline structure"] },
//                     { type: "warning", points: ["Missing retry logic"] }
//                 ]
//             },
//             interviewerSummary: "Rahul delivered a clean and efficient ETL solution and showed deep knowledge of SQL and pipeline design. With a few robustness tweaks, he’s ready for data engineering challenges."
//         },
//         {
//             id: "08",
//             interview: {
//                 candidate: { name: "Neha Rathi", email: "neha.rathi@example.com" },
//                 position: { title: "QA Engineer" },
//                 date: "2025-04-02T10:00:00Z"
//             },
//             overallScore: "8.2/10",
//             questionsAnswered: 13,
//             totalQuestions: 15,
//             duration: 50,
//             skillAssessmentsParsed: [
//                 { name: "Test Automation", score: "8.5/10", percentage: 85 },
//                 { name: "Selenium", score: "8.2/10", percentage: 82 },
//                 { name: "Java", score: "8.3/10", percentage: 83 },
//                 { name: "API Testing", score: "7.9/10", percentage: 79 },
//                 { name: "System Design", score: "7.8/10", percentage: 78 },
//                 { name: "Communication", score: "8.7/10", percentage: 87 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Write Selenium tests for a login and registration flow",
//                 code: "// Selenium test sample omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Clear test cases and reusable methods"] },
//                     { type: "warning", points: ["Missing negative case coverage"] }
//                 ]
//             },
//             interviewerSummary: "Neha performed well in automation testing and showed strong command of Selenium. Her approach to reusable test logic is commendable. Adding more edge cases would improve test coverage."
//         },
//         {
//             id: "09",
//             interview: {
//                 candidate: { name: "Karan Bedi", email: "karan.bedi@example.com" },
//                 position: { title: "Software Engineer Intern" },
//                 date: "2025-04-07T15:45:00Z"
//             },
//             overallScore: "7.5/10",
//             questionsAnswered: 12,
//             totalQuestions: 15,
//             duration: 40,
//             skillAssessmentsParsed: [
//                 { name: "Python", score: "7.5/10", percentage: 75 },
//                 { name: "Algorithms", score: "7.2/10", percentage: 72 },
//                 { name: "OOP", score: "6.8/10", percentage: 68 },
//                 { name: "Version Control", score: "8.3/10", percentage: 83 },
//                 { name: "System Design", score: "6.5/10", percentage: 65 },
//                 { name: "Communication", score: "8/10", percentage: 80 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Implement a basic CLI tool using Python argparse",
//                 code: "// Python CLI tool sample omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Effective use of argparse and functions"] },
//                     { type: "warning", points: ["Error messages can be improved"] }
//                 ]
//             },
//             interviewerSummary: "Karan showed enthusiasm and promise for a junior developer role. His Python fundamentals are sound, and he can grow quickly with mentorship and exposure to real-world projects."
//         },
//         {
//             id: "10",
//             interview: {
//                 candidate: { name: "Aarav Mehta", email: "aarav.mehta@example.com" },
//                 position: { title: "Frontend Developer" },
//                 date: "2025-04-01T06:04:21.835073"
//             },
//             overallScore: "8.6/10",
//             questionsAnswered: 14,
//             totalQuestions: 15,
//             duration: 45,
//             skillAssessmentsParsed: [
//                 { name: "JavaScript", score: "8.8/10", percentage: 88 },
//                 { name: "React", score: "7.8/10", percentage: 78 },
//                 { name: "Node.js", score: "7.3/10", percentage: 73 },
//                 { name: "MongoDB", score: "8.7/10", percentage: 87 },
//                 { name: "System Design", score: "8.5/10", percentage: 85 },
//                 { name: "Communication", score: "9.6/10", percentage: 96 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Create a dashboard using Chart.js and REST APIs",
//                 code: "// sample code omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Clear structure", "Good coding practices"] },
//                     { type: "warning", points: ["Could improve error handling"] }
//                 ]
//             },
//             interviewerSummary: "Aarav Mehta showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Frontend Developer role."
//         },
//         {
//             id: "11",
//             interview: {
//                 candidate: { name: "Nisha Kapoor", email: "nisha.kapoor@example.com" },
//                 position: { title: "Backend Developer" },
//                 date: "2025-03-20T06:04:21.835084"
//             },
//             overallScore: "9.2/10",
//             questionsAnswered: 12,
//             totalQuestions: 15,
//             duration: 45,
//             skillAssessmentsParsed: [
//                 { name: "JavaScript", score: "9.5/10", percentage: 95 },
//                 { name: "React", score: "9.4/10", percentage: 94 },
//                 { name: "Node.js", score: "9.3/10", percentage: 93 },
//                 { name: "MongoDB", score: "9.8/10", percentage: 98 },
//                 { name: "System Design", score: "9.5/10", percentage: 95 },
//                 { name: "Communication", score: "9.3/10", percentage: 93 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Create a dashboard using Chart.js and REST APIs",
//                 code: "// sample code omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Clear structure", "Good coding practices"] },
//                     { type: "warning", points: ["Could improve error handling"] }
//                 ]
//             },
//             interviewerSummary: "Nisha Kapoor showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Backend Developer role."
//         },
//         {
//             id: "12",
//             interview: {
//                 candidate: { name: "Ravi Joshi", email: "ravi.joshi@example.com" },
//                 position: { title: "Full Stack Developer" },
//                 date: "2025-04-03T06:04:21.835088"
//             },
//             overallScore: "9.0/10",
//             questionsAnswered: 14,
//             totalQuestions: 15,
//             duration: 60,
//             skillAssessmentsParsed: [
//                 { name: "JavaScript", score: "8.7/10", percentage: 87 },
//                 { name: "React", score: "8.1/10", percentage: 81 },
//                 { name: "Node.js", score: "9.3/10", percentage: 93 },
//                 { name: "MongoDB", score: "9.6/10", percentage: 96 },
//                 { name: "System Design", score: "9.3/10", percentage: 93 },
//                 { name: "Communication", score: "8.9/10", percentage: 89 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Create a dashboard using Chart.js and REST APIs",
//                 code: "// sample code omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Clear structure", "Good coding practices"] },
//                     { type: "warning", points: ["Could improve error handling"] }
//                 ]
//             },
//             interviewerSummary: "Ravi Joshi showed solid technical skills and communicated clearly. Code was functional but could be enhanced with more robust error handling. Strong potential for the Full Stack Developer role."
//         },
//         {
//             id: "13",
//             interview: {
//                 candidate: { name: "Simran Verma", email: "simran.verma@example.com" },
//                 position: { title: "DevOps Engineer" },
//                 date: "2025-03-28T09:15:00Z"
//             },
//             overallScore: "8.3/10",
//             questionsAnswered: 12,
//             totalQuestions: 15,
//             duration: 55,
//             skillAssessmentsParsed: [
//                 { name: "CI/CD", score: "8.5/10", percentage: 85 },
//                 { name: "Docker", score: "8/10", percentage: 80 },
//                 { name: "Kubernetes", score: "7.5/10", percentage: 75 },
//                 { name: "AWS", score: "9/10", percentage: 90 },
//                 { name: "System Design", score: "8/10", percentage: 80 },
//                 { name: "Communication", score: "9/10", percentage: 90 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Write a deployment script using Docker Compose for a Node.js app",
//                 code: "// docker-compose.yml example omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Well-documented and structured"] },
//                     { type: "warning", points: ["Missing resource constraints"] }
//                 ]
//             },
//             interviewerSummary: "Simran has a strong grasp of DevOps concepts and communicated effectively. Her Docker deployment script was functional but can be improved by including memory and CPU constraints."
//         },
//         {
//             id: "14",
//             interview: {
//                 candidate: { name: "Aditya Nair", email: "aditya.nair@example.com" },
//                 position: { title: "Mobile App Developer" },
//                 date: "2025-04-06T14:45:00Z"
//             },
//             overallScore: "9.4/10",
//             questionsAnswered: 15,
//             totalQuestions: 15,
//             duration: 65,
//             skillAssessmentsParsed: [
//                 { name: "Flutter", score: "9.6/10", percentage: 96 },
//                 { name: "Dart", score: "9.2/10", percentage: 92 },
//                 { name: "Firebase", score: "8.8/10", percentage: 88 },
//                 { name: "UX Design", score: "9.1/10", percentage: 91 },
//                 { name: "System Design", score: "9/10", percentage: 90 },
//                 { name: "Communication", score: "9.5/10", percentage: 95 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Build a note-taking app using Flutter and Firebase",
//                 code: "// Flutter UI and Firebase setup omitted for brevity",
//                 evaluation: [
//                     { type: "positive", points: ["Excellent UI and code structure"] },
//                     { type: "positive", points: ["Secure and scalable Firebase usage"] }
//                 ]
//             },
//             interviewerSummary: "Aditya delivered a clean, responsive Flutter app with excellent Firebase integration. Strong communicator with attention to UX and data handling. Ideal for mobile app development roles."
//         },
//         {
//             id: "15",
//             interview: {
//                 candidate: { name: "Megha Sinha", email: "megha.sinha@example.com" },
//                 position: { title: "Frontend Engineer" },
//                 date: "2025-04-08T11:00:00Z"
//             },
//             overallScore: "7.9/10",
//             questionsAnswered: 13,
//             totalQuestions: 15,
//             duration: 50,
//             skillAssessmentsParsed: [
//                 { name: "HTML/CSS", score: "9/10", percentage: 90 },
//                 { name: "JavaScript", score: "8.2/10", percentage: 82 },
//                 { name: "React", score: "7.5/10", percentage: 75 },
//                 { name: "Accessibility", score: "6.5/10", percentage: 65 },
//                 { name: "System Design", score: "7/10", percentage: 70 },
//                 { name: "Communication", score: "9/10", percentage: 90 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Build a responsive portfolio site using React",
//                 code: "// Portfolio project code omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Responsive design and layout"] },
//                     { type: "warning", points: ["Accessibility improvements needed"] }
//                 ]
//             },
//             interviewerSummary: "Megha created a sleek frontend project showing strong CSS and JavaScript skills. Improving accessibility practices would enhance her value for frontend-focused roles."
//         },
//         {
//             id: "16",
//             interview: {
//                 candidate: { name: "Rahul Dubey", email: "rahul.dubey@example.com" },
//                 position: { title: "Data Engineer" },
//                 date: "2025-03-30T13:30:00Z"
//             },
//             overallScore: "8.7/10",
//             questionsAnswered: 14,
//             totalQuestions: 15,
//             duration: 60,
//             skillAssessmentsParsed: [
//                 { name: "SQL", score: "9.5/10", percentage: 95 },
//                 { name: "Python", score: "8.7/10", percentage: 87 },
//                 { name: "Spark", score: "8/10", percentage: 80 },
//                 { name: "ETL Design", score: "8.8/10", percentage: 88 },
//                 { name: "System Design", score: "8.5/10", percentage: 85 },
//                 { name: "Communication", score: "9/10", percentage: 90 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Build an ETL pipeline to clean and load CSV data into PostgreSQL",
//                 code: "// ETL script sample omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Efficient pipeline structure"] },
//                     { type: "warning", points: ["Missing retry logic"] }
//                 ]
//             },
//             interviewerSummary: "Rahul delivered a clean and efficient ETL solution and showed deep knowledge of SQL and pipeline design. With a few robustness tweaks, he’s ready for data engineering challenges."
//         },
//         {
//             id: "17",
//             interview: {
//                 candidate: { name: "Neha Rathi", email: "neha.rathi@example.com" },
//                 position: { title: "QA Engineer" },
//                 date: "2025-04-02T10:00:00Z"
//             },
//             overallScore: "8.2/10",
//             questionsAnswered: 13,
//             totalQuestions: 15,
//             duration: 50,
//             skillAssessmentsParsed: [
//                 { name: "Test Automation", score: "8.5/10", percentage: 85 },
//                 { name: "Selenium", score: "8.2/10", percentage: 82 },
//                 { name: "Java", score: "8.3/10", percentage: 83 },
//                 { name: "API Testing", score: "7.9/10", percentage: 79 },
//                 { name: "System Design", score: "7.8/10", percentage: 78 },
//                 { name: "Communication", score: "8.7/10", percentage: 87 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Write Selenium tests for a login and registration flow",
//                 code: "// Selenium test sample omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Clear test cases and reusable methods"] },
//                     { type: "warning", points: ["Missing negative case coverage"] }
//                 ]
//             },
//             interviewerSummary: "Neha performed well in automation testing and showed strong command of Selenium. Her approach to reusable test logic is commendable. Adding more edge cases would improve test coverage."
//         },
//         {
//             id: "18",
//             interview: {
//                 candidate: { name: "Karan Bedi", email: "karan.bedi@example.com" },
//                 position: { title: "Software Engineer Intern" },
//                 date: "2025-04-07T15:45:00Z"
//             },
//             overallScore: "7.5/10",
//             questionsAnswered: 12,
//             totalQuestions: 15,
//             duration: 40,
//             skillAssessmentsParsed: [
//                 { name: "Python", score: "7.5/10", percentage: 75 },
//                 { name: "Algorithms", score: "7.2/10", percentage: 72 },
//                 { name: "OOP", score: "6.8/10", percentage: 68 },
//                 { name: "Version Control", score: "8.3/10", percentage: 83 },
//                 { name: "System Design", score: "6.5/10", percentage: 65 },
//                 { name: "Communication", score: "8/10", percentage: 80 }
//             ],
//             codeAssessmentParsed: {
//                 task: "Implement a basic CLI tool using Python argparse",
//                 code: "// Python CLI tool sample omitted",
//                 evaluation: [
//                     { type: "positive", points: ["Effective use of argparse and functions"] },
//                     { type: "warning", points: ["Error messages can be improved"] }
//                 ]
//             },
//             interviewerSummary: "Karan showed enthusiasm and promise for a junior developer role. His Python fundamentals are sound, and he can grow quickly with mentorship and exposure to real-world projects."
//         }
//     ];

//     // Get unique candidates
//     // const uniqueCandidates = [];

//     const uniqueCandidates = Array.from(
//         new Map(
//             summaries.map((s) => [
//                 s.interview.candidate.email,
//                 {
//                     id: s.id,
//                     name: s.interview.candidate.name,
//                     email: s.interview.candidate.email,
//                     position: s.interview.position.title,
//                 },
//             ])
//         ).values()
//     );

//     const addedEmails = new Set();

//     summaries.forEach(summary => {
//         if (!addedEmails.has(summary.interview.candidate.email)) {
//             addedEmails.add(summary.interview.candidate.email);
//             uniqueCandidates.push({
//                 id: summary.id,
//                 name: summary.interview.candidate.name,
//                 email: summary.interview.candidate.email,
//                 position: summary.interview.position.title
//             });
//         }
//     });

//     const generateReport = () => {
//         if (selectedCandidateId) {
//             setShowReport(true);
//         }
//     };

//     const printReport = () => {
//         window.print();
//     };

//     const renderReport = () => {
//         const summary = summaries.find(s => s.id === selectedCandidateId);
//         if (!summary) return null;

//         const interviewDate = new Date(summary.interview.date);
//         const formattedDate = interviewDate.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });

//         return (
//             <div className="report-container p-4 bg-white rounded shadow-sm mt-3">
//                 <h1 className="mb-4">Interview Evaluation Report</h1>

//                 <div className="candidate-info d-flex flex-wrap justify-content-between mb-4">
//                     <div className="info-card p-3 bg-light rounded mb-3 flex-grow-1 me-3">
//                         <h3 className="h5 text-primary mb-3">Candidate Information</h3>
//                         <p><strong>Name:</strong> {summary.interview.candidate.name}</p>
//                         <p><strong>Email:</strong> {summary.interview.candidate.email}</p>
//                     </div>

//                     <div className="info-card p-3 bg-light rounded mb-3 flex-grow-1 me-3">
//                         <h3 className="h5 text-primary mb-3">Position Details</h3>
//                         <p><strong>Position:</strong> {summary.interview.position.title}</p>
//                         <p><strong>Interview Date:</strong> {formattedDate}</p>
//                     </div>

//                     <div className="info-card p-3 bg-light rounded mb-3 flex-grow-1">
//                         <h3 className="h5 text-primary mb-3">Interview Metrics</h3>
//                         <p><strong>Overall Score:</strong> {summary.overallScore}</p>
//                         <p><strong>Questions Answered:</strong> {summary.questionsAnswered}/{summary.totalQuestions}</p>
//                         <p><strong>Duration:</strong> {summary.duration} minutes</p>
//                     </div>
//                 </div>

//                 <h2 className="mb-3">Skill Assessments</h2>
//                 <div className="skills-container d-flex flex-wrap gap-3 mb-4">
//                     {summary.skillAssessmentsParsed.map((skill, index) => (
//                         <div className="skill-card p-3 bg-white rounded shadow-sm flex-grow-1" key={index} style={{ minWidth: '150px' }}>
//                             <div className="skill-name fw-bold mb-1">{skill.name}</div>
//                             <div className="skill-score text-primary fs-5">{skill.score}</div>
//                             <div className="progress mt-2" style={{ height: '10px' }}>
//                                 <div
//                                     className="progress-bar"
//                                     role="progressbar"
//                                     style={{ width: `${skill.percentage}%` }}
//                                     aria-valuenow={skill.percentage}
//                                     aria-valuemin="0"
//                                     aria-valuemax="100"
//                                 ></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <h2 className="mb-3">Code Assessment</h2>
//                 <div className="code-assessment p-4 bg-light rounded mb-4">
//                     <p><strong>Task:</strong> {summary.codeAssessmentParsed.task}</p>

//                     <div className="code-evaluation mt-3">
//                         {summary.codeAssessmentParsed.evaluation.map((evalItem, index) => (
//                             <div
//                                 className={`p-3 rounded mb-3 ${evalItem.type === 'positive' ? 'bg-success bg-opacity-10 border-start border-success border-4' : 'bg-warning bg-opacity-10 border-start border-warning border-4'}`}
//                                 key={index}
//                             >
//                                 <strong>{evalItem.type === 'positive' ? 'Strengths:' : 'Areas for Improvement:'}</strong>
//                                 <ul className="mb-0">
//                                     {evalItem.points.map((point, i) => (
//                                         <li key={i}>{point}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <h2 className="mb-3">Interviewer Summary</h2>
//                 <div className="ai-summary p-4 bg-info bg-opacity-10 rounded border-start border-info border-4">
//                     <p className="mb-0">{summary.interviewerSummary}</p>
//                 </div>

//                 <button
//                     onClick={printReport}
//                     className="print-btn btn btn-primary mt-3 d-print-none"
//                 >
//                     Print Report
//                 </button>
//             </div>
//         );
//     };

//     return (
//         <div className="container py-4" style={{ maxWidth: '1200px' }}>
//             <div className="header d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
//                 <div className="logo fs-4 fw-bold text-primary">Interview Report Generator</div>
//             </div>

//             <div className="controls d-flex gap-3 mb-4 flex-wrap">
//                 <select
//                     className="form-select"
//                     id="candidateSelect"
//                     value={selectedCandidateId}
//                     onChange={(e) => setSelectedCandidateId(e.target.value)}
//                 >
//                     <option value="">Select a candidate</option>
//                     {uniqueCandidates.map(candidate => (
//                         <option key={candidate.id} value={candidate.id}>
//                             {candidate.name} - {candidate.position}
//                         </option>
//                     ))}
//                 </select>
//                 <button
//                     className="btn btn-primary"
//                     id="generateBtn"
//                     onClick={generateReport}
//                 >
//                     Generate Report
//                 </button>
//             </div>

//             {showReport && selectedCandidateId ? (
//                 renderReport()
//             ) : (
//                 <div className="report-container p-5 text-center text-muted">
//                     <h2 className="mb-3">No report selected</h2>
//                     <p>Please select a candidate from the dropdown and click "Generate Report"</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default InterviewReportGenerator;




import React, { useState } from 'react';

const InterviewReportGenerator = () => {
    // Form state
    const [formData, setFormData] = useState({
        candidateName: '',
        candidateEmail: '',
        positionTitle: '',
        interviewDate: '',
        overallScore: '',
        questionsAnswered: '',
        totalQuestions: '',
        duration: '',
        skills: [{ name: '', score: '', percentage: '' }],
        codeTask: '',
        codeEvaluation: [{ type: 'positive', points: [''] }],
        interviewerSummary: ''
    });

    const [generatedReport, setGeneratedReport] = useState(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle skill changes
    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index][field] = value;

        // Auto-calculate percentage if score changes
        if (field === 'score') {
            const scoreNum = parseInt(value) || 0;
            updatedSkills[index].percentage = Math.min(scoreNum * 10, 100);
        }

        setFormData({
            ...formData,
            skills: updatedSkills
        });
    };

    // Add new skill
    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, { name: '', score: '', percentage: '' }]
        });
    };

    // Remove skill
    const removeSkill = (index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills.splice(index, 1);
        setFormData({
            ...formData,
            skills: updatedSkills
        });
    };

    // Handle code evaluation changes
    const handleCodeEvalChange = (index, field, value) => {
        const updatedEval = [...formData.codeEvaluation];
        updatedEval[index][field] = value;
        setFormData({
            ...formData,
            codeEvaluation: updatedEval
        });
    };

    // Handle point changes in code evaluation
    const handlePointChange = (evalIndex, pointIndex, value) => {
        const updatedEval = [...formData.codeEvaluation];
        updatedEval[evalIndex].points[pointIndex] = value;
        setFormData({
            ...formData,
            codeEvaluation: updatedEval
        });
    };

    // Add new point to evaluation
    const addPoint = (evalIndex) => {
        const updatedEval = [...formData.codeEvaluation];
        updatedEval[evalIndex].points.push('');
        setFormData({
            ...formData,
            codeEvaluation: updatedEval
        });
    };

    // Remove point from evaluation
    const removePoint = (evalIndex, pointIndex) => {
        const updatedEval = [...formData.codeEvaluation];
        updatedEval[evalIndex].points.splice(pointIndex, 1);
        setFormData({
            ...formData,
            codeEvaluation: updatedEval
        });
    };

    // Add new evaluation section
    const addEvaluation = (type) => {
        setFormData({
            ...formData,
            codeEvaluation: [...formData.codeEvaluation, { type, points: [''] }]
        });
    };

    // Remove evaluation section
    const removeEvaluation = (index) => {
        const updatedEval = [...formData.codeEvaluation];
        updatedEval.splice(index, 1);
        setFormData({
            ...formData,
            codeEvaluation: updatedEval
        });
    };

    // Change evaluation type (positive/improvement)
    const handleEvalTypeChange = (evalIndex, type) => {
        const updatedEval = [...formData.codeEvaluation];
        updatedEval[evalIndex].type = type;
        setFormData({
            ...formData,
            codeEvaluation: updatedEval
        });
    };

    // Generate the report
    const generateReport = () => {
        setGeneratedReport({ ...formData });
    };

    // Print the report
    const printReport = () => {
        window.print();
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            candidateName: '',
            candidateEmail: '',
            positionTitle: '',
            interviewDate: '',
            overallScore: '',
            questionsAnswered: '',
            totalQuestions: '',
            duration: '',
            skills: [{ name: '', score: '', percentage: '' }],
            codeTask: '',
            codeEvaluation: [{ type: 'positive', points: [''] }],
            interviewerSummary: ''
        });
        setGeneratedReport(null);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container py-4">

                    <div className="header d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                        <h1 className="text-primary">Interview Report Generator</h1>
                    </div>

                    {!generatedReport ? (
                        <div className="form-container bg-light p-4 rounded">
                            <h2 className="mb-4">Enter Interview Details</h2>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h3 className="mb-3">Candidate Information</h3>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="candidateName"
                                            value={formData.candidateName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="candidateEmail"
                                            value={formData.candidateEmail}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <h3 className="mb-3">Position Details</h3>
                                    <div className="mb-3">
                                        <label className="form-label">Position Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="positionTitle"
                                            value={formData.positionTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Interview Date</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="interviewDate"
                                            value={formData.interviewDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <h3 className="mb-3">Interview Metrics</h3>
                                    <div className="mb-3">
                                        <label className="form-label">Overall Score (1-10)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            className="form-control"
                                            name="overallScore"
                                            value={formData.overallScore}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Questions Answered</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="questionsAnswered"
                                            value={formData.questionsAnswered}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Total Questions</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="totalQuestions"
                                            value={formData.totalQuestions}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Duration (minutes)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <h3 className="mb-3">Skill Assessments</h3>
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="row mb-3 align-items-end">
                                            <div className="col-md-4">
                                                <label className="form-label">Skill Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={skill.name}
                                                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Score (1-10)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    className="form-control"
                                                    value={skill.score}
                                                    onChange={(e) => handleSkillChange(index, 'score', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Percentage</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        className="form-control"
                                                        value={skill.percentage}
                                                        onChange={(e) => handleSkillChange(index, 'percentage', e.target.value)}
                                                    />
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                {formData.skills.length > 1 && (
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => removeSkill(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <button className="btn btn-secondary mt-2" onClick={addSkill}>
                                        Add Skill
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-3">Code Assessment</h3>
                                <div className="mb-3">
                                    <label className="form-label">Task Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="codeTask"
                                        value={formData.codeTask}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <h4 className="mt-4 mb-3">Evaluation</h4>
                                {formData.codeEvaluation.map((evaluation, evalIndex) => (
                                    <div key={evalIndex} className="mb-4 p-3 bg-white rounded">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${evaluation.type === 'positive' ? 'btn-success' : 'btn-outline-success'}`}
                                                    onClick={() => handleEvalTypeChange(evalIndex, 'positive')}
                                                >
                                                    Strengths
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${evaluation.type === 'improvement' ? 'btn-warning' : 'btn-outline-warning'}`}
                                                    onClick={() => handleEvalTypeChange(evalIndex, 'improvement')}
                                                >
                                                    Improvements
                                                </button>
                                            </div>
                                            {formData.codeEvaluation.length > 1 && (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => removeEvaluation(evalIndex)}
                                                >
                                                    Remove Section
                                                </button>
                                            )}
                                        </div>
                                        {evaluation.points.map((point, pointIndex) => (
                                            <div key={pointIndex} className="d-flex mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={point}
                                                    onChange={(e) => handlePointChange(evalIndex, pointIndex, e.target.value)}
                                                />
                                                {evaluation.points.length > 1 && (
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removePoint(evalIndex, pointIndex)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            className="btn btn-sm btn-outline-primary mt-2"
                                            onClick={() => addPoint(evalIndex)}
                                        >
                                            Add Point
                                        </button>
                                    </div>
                                ))}
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => addEvaluation('positive')}
                                    >
                                        Add Strengths
                                    </button>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => addEvaluation('improvement')}
                                    >
                                        Add Areas for Improvement
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="mb-3">Interviewer Summary</h3>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    name="interviewerSummary"
                                    value={formData.interviewerSummary}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-danger" onClick={resetForm}>
                                    Reset Form
                                </button>
                                <button className="btn btn-primary" onClick={generateReport}>
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="report-container">
                            <div className="d-flex justify-content-between mb-4">
                                <h1 className="text-primary">Interview Evaluation Report</h1>
                                <div>
                                    <button className="btn btn-secondary me-2" onClick={() => setGeneratedReport(null)}>
                                        Edit Report
                                    </button>
                                    <button className="btn btn-primary">
                                        Download Rerport in Pdf
                                    </button>
                                    {/* <button className="btn btn-primary" onClick={printReport}>
                                        Print Report
                                    </button> */}
                                </div>
                            </div>

                            <div className="candidate-info d-flex flex-wrap justify-content-between mb-4">
                                <div className="info-card p-3 bg-light rounded mb-3 flex-grow-1 me-3">
                                    <h3 className="h5 text-primary mb-3">Candidate Information</h3>
                                    <p><strong>Name:</strong> {generatedReport.candidateName}</p>
                                    <p><strong>Email:</strong> {generatedReport.candidateEmail}</p>
                                </div>

                                <div className="info-card p-3 bg-light rounded mb-3 flex-grow-1 me-3">
                                    <h3 className="h5 text-primary mb-3">Position Details</h3>
                                    <p><strong>Position:</strong> {generatedReport.positionTitle}</p>
                                    <p><strong>Interview Date:</strong> {new Date(generatedReport.interviewDate).toLocaleString()}</p>
                                </div>

                                <div className="info-card p-3 bg-light rounded mb-3 flex-grow-1">
                                    <h3 className="h5 text-primary mb-3">Interview Metrics</h3>
                                    <p><strong>Overall Score:</strong> {generatedReport.overallScore}</p>
                                    <p><strong>Questions Answered:</strong> {generatedReport.questionsAnswered}/{generatedReport.totalQuestions}</p>
                                    <p><strong>Duration:</strong> {generatedReport.duration} minutes</p>
                                </div>
                            </div>

                            <h2 className="mb-3">Skill Assessments</h2>
                            <div className="skills-container d-flex flex-wrap gap-3 mb-4">
                                {generatedReport.skills.map((skill, index) => (
                                    <div className="skill-card p-3 bg-white rounded shadow-sm flex-grow-1" key={index} style={{ minWidth: '150px' }}>
                                        <div className="skill-name fw-bold mb-1">{skill.name}</div>
                                        <div className="skill-score text-primary fs-5">{skill.score}</div>
                                        <div className="progress mt-2" style={{ height: '10px' }}>
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${skill.percentage}%` }}
                                                aria-valuenow={skill.percentage}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="mb-3">Code Assessment</h2>
                            <div className="code-assessment p-4 bg-light rounded mb-4">
                                <p><strong>Task:</strong> {generatedReport.codeTask}</p>

                                <div className="code-evaluation mt-3">
                                    {generatedReport.codeEvaluation.map((evaluation, index) => (
                                        <div
                                            className={`p-3 rounded mb-3 ${evaluation.type === 'positive' ? 'bg-success bg-opacity-10 border-start border-success border-4' : 'bg-warning bg-opacity-10 border-start border-warning border-4'}`}
                                            key={index}
                                        >
                                            <strong>{evaluation.type === 'positive' ? 'Strengths:' : 'Areas for Improvement:'}</strong>
                                            <ul className="mb-0">
                                                {evaluation.points.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 className="mb-3">Interviewer Summary</h2>
                            <div className="ai-summary p-4 bg-info bg-opacity-10 rounded border-start border-info border-4">
                                <p className="mb-0">{generatedReport.interviewerSummary}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default InterviewReportGenerator;

