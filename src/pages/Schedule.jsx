import React, { useState, useEffect } from "react";

// Hourly time slots from 8:30 AM to 6:30 PM
const timeSlots = [
    "8:30 AM  - 11:00 AM",
    "11:00 AM - 1:15 PM",
    "1:30 PM - 4:00 PM",
    "4:00 PM  - 6:30 PM"
];

const Schedule = () => {
  // State for group, level, and class selections
  const [groups, setGroups] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // Initial schedule state (empty hours for simplicity)
  const [schedule, setSchedule] = useState({
    Monday: Array(timeSlots.length).fill(null),
    Tuesday: Array(timeSlots.length).fill(null),
    Wednesday: Array(timeSlots.length).fill(null),
    Thursday: Array(timeSlots.length).fill(null),
    Friday: Array(timeSlots.length).fill(null),
    Saturday: Array(timeSlots.length).fill(null)
  });

  // Fetch the agenda data from the JSON server and extract groups and levels
  useEffect(() => {
    fetch('http://localhost:3000/agendas')
      .then(response => response.json())
      .then(data => {
        const groupKeys = Object.keys(data);
        setGroups(groupKeys);
        if (selectedGroup) {
          const levelKeys = Object.keys(data[selectedGroup]);
          setLevels(levelKeys);
        }
      })
      .catch(error => console.error('Error fetching the agenda:', error));
  }, [selectedGroup]);

  // Fetch the schedule data when group and level are selected
  useEffect(() => {
    if (selectedGroup && selectedLevel) {
      fetch('http://localhost:3000/agendas')
        .then(response => response.json())
        .then(data => {
          if (data[selectedGroup] && data[selectedGroup][selectedLevel]) {
            setSchedule(data[selectedGroup][selectedLevel]);
          } else {
            console.error('Invalid data structure:', data);
          }
        })
        .catch(error => console.error('Error fetching the agenda:', error));
    }
  }, [selectedGroup, selectedLevel]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen rounded-lg">
      {/* Dropdowns for Group, Level, and Class */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="w-full md:w-1/3 md:pr-4 mb-4 md:mb-0">
          <label htmlFor="group" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Select Group
          </label>
          <select
            id="group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Group</option>
            {groups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3 md:px-2 mb-4 md:mb-0">
          <label htmlFor="level" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Select Level
          </label>
          <select
            id="level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weekly Schedule Table */}
      <div className="overflow-x-auto min max-w-screen-md">
        <div className="inline-block min-w-full size-max overflow-hidden align-middle">
          <div className="overflow-hidden border-b border-gray-200 shadow ">
            <table className="min-w-full bg-white dark:bg-gray-700  shadow-lg border-foreground">
              <thead className="text-gray-700 dark:text-gray-300 border border-foreground">
                <tr>
                  <th className="px-4 py-2 text-left border border-foreground">Day</th>
                  {timeSlots.map((slot, index) => (
                    <th key={index} className="px-4 py-2 text-left text-sm border border-foreground">{slot}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(schedule).map((day) => (
                  <tr key={day} className="text-gray-700 dark:text-gray-300">
                    <td className="border border-foreground px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">{day}</td>
                    {schedule[day].map((slot, index) => (
                      <td key={index} className={`border border-foreground px-4 py-2 ${slot === 'empty' ? 'bg-white dark:bg-black' : ''}`}>
                        <span>{slot !== 'empty' && slot}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;