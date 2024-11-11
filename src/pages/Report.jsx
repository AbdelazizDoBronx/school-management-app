'use client'

import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function StudentReport() {
  const [student] = useState({
    name: 'John Doe',
    grade: '10th',
    id: '12345',
    gpa: 3.8,
  })

  const [grades] = useState({
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    datasets: [
      {
        label: 'Grade',
        data: [10, 19, 14, 14, 16],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  })

  const [assignments] = useState([
    { id: 1, subject: 'Math', title: 'Algebra Quiz', dueDate: '2023-06-15', grade: 90 },
    { id: 2, subject: 'Science', title: 'Lab Report', dueDate: '2023-06-18', grade: 85 },
    { id: 3, subject: 'English', title: 'Essay Draft', dueDate: '2023-06-20', grade: null },
    { id: 4, subject: 'History', title: 'Research Paper', dueDate: '2023-06-22', grade: null },
  ])

  const [activities] = useState([
    { name: 'Basketball Team', role: 'Team Captain' },
    { name: 'Debate Club', role: 'Member' },
    { name: 'Student Council', role: 'Treasurer' },
  ])

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">Student Report</h2>
          <p>Name: {student.name} | Grade: {student.grade} | ID: {student.id} | GPA: {student.gpa}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Grade Overview</h3>
            <Bar
              data={grades}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Subject Grades' },
                },
              }}
            />
          </div>
        </div>

        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Attendance Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Present</span>
                  <span>90%</span>
                </div>
                <progress className="progress progress-primary w-full" value="90" max="100"></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Absent</span>
                  <span>5%</span>
                </div>
                <progress className="progress progress-secondary w-full" value="5" max="100"></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Late</span>
                  <span>5%</span>
                </div>
                <progress className="progress progress-accent w-full" value="5" max="100"></progress>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-lg md:col-span-2">
          <div className="card-body">
            <h3 className="card-title">Recent Assignments</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.subject}</td>
                      <td>{assignment.title}</td>
                      <td>{assignment.dueDate}</td>
                      <td>{assignment.grade !== null ? assignment.grade : 'Pending'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card shadow-lg md:col-span-2">
          <div className="card-body">
            <h3 className="card-title">Extracurricular Activities</h3>
            <div className="flex flex-wrap gap-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="badge badge-outline">{activity.name}</div>
                  <span className="text-sm text-gray-500">{activity.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
