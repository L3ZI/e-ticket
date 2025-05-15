import { Link } from 'react-router-dom';
import '../styles/StudentList.css';
const StudentList = ({ searchQuery = "" }) => {
  // Sample student list - replace with your actual data/API
  const allStudents = [
    "John Smith",
    "Emma Johnson",
    "Michael Brown", 
    "Olivia Davis",
    "William Wilson",
    "Sophia Martinez",
    "James Taylor",
    "Isabella Anderson",
    "Robert Thomas",
    "Mia Garcia",
    "David Rodriguez",
    "Elizabeth Martinez",
    "Joseph Hernandez",
    "Charlotte Robinson",
    "Charles Clark",
    "Amelia Lewis",
    "Daniel Lee",
    "Harper Walker"
    // Add more students as needed
  ];
  
  // Filter students based on search query
  const filteredStudents = allStudents.filter(student => 
    student.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="student-list-wrapper">
      {filteredStudents.length > 0 ? (
        <ul className="name-list">
          {filteredStudents.map((student, index) => (
            <li key={index}>
              <Link to={`/ticket/${encodeURIComponent(student)}`} className="student-name-link">
                {student}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p>No matching names found</p>
        </div>
      )}
      
      {filteredStudents.length > 0 && (
        <div className="results-count">
          Showing {filteredStudents.length} of {allStudents.length} students
        </div>
      )}
    </div>
  );
};

export default StudentList;