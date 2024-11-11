import { CheckCircle, PlayCircle, Search, UserCircle } from "lucide-react";
import React, { useState } from "react";

// Dummy data for courses
const courses = [
  { id: 1, name: "Math 101", instructor: "Dr. Smith", progress: 85, status: "active" },
  { id: 2, name: "History 202", instructor: "Prof. Lee", progress: 50, status: "active" },
  { id: 3, name: "Physics 303", instructor: "Dr. Williams", progress: 100, status: "completed" },
  { id: 4, name: "Computer Science 404", instructor: "Prof. Zhang", progress: 25, status: "active" },
  { id: 5, name: "Literature 505", instructor: "Dr. Johnson", progress: 75, status: "completed" },
];

const CoursesList = () => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query (case-insensitive)
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" p-8 rounded-lg shadow-lg space-y-8">
      {/* Search Bar with Icon */}
      <div className="flex justify-start mb-6">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-3 p-1 text-gray-400 h-6 w-6" />
          <input
            type="text"
            className="w-full p-3 pl-12 bg-base-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            placeholder="Search courses by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-semibold  mb-6">Your Courses</h2>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center ">No courses found</div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-base-300 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {/* Course Header */}
              <div className="flex justify-between  mb-4">
                <h3 className="text-xl justify-end flex  font-semibold ">{course.name}</h3>
                <div
                  className={`flex  space-x-2 text-sm ${
                    course.status === "completed" ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {course.status === "completed" ? <CheckCircle /> : <PlayCircle />}
                  <span className="w-full">{course.status === "completed" ? "Completed" : "In Progress"}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-2 mb-4 text-gray-500">
                <UserCircle />
                <span>{course.instructor}</span>
              </div>

              {/* Progress Bar */}
              <div className="relative pt-1 mb-4">
                <label htmlFor="progress" className="block text-sm font-semibold text-gray-500">
                  Progress
                </label>
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    {course.progress}%
                  </span>
                </div>
                <div className="flex mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="bg-blue-500 h-2 rounded-full"
                    ></div>
                  </div>
                </div>
              </div>

              {/* Course Status & Action */}
              <div className="mt-4">
                {course.status === "active" ? (
                  <button
                    className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg focus:outline-none transition duration-200 ease-in-out"
                  >
                    Continue Course
                  </button>
                ) : (
                  <button
                    className="w-full py-2 text-white bg-gray-500 cursor-not-allowed rounded-lg"
                    disabled
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesList;
