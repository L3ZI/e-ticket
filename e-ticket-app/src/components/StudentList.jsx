import { Link } from 'react-router-dom';
import '../styles/StudentList.css';
const StudentList = ({ searchQuery = "" }) => {
  // Sample student list - replace with your actual data/API
  const allStudents = [
    "Mr.K.Kirushanth","Mr.V.S.M.Sarma","Mr.S.Isaijarashan", "Ms.R.H.Mithumala","Ms.G.Geerthiga","SMs.P.Sanchana",
    "Ms.M.P.N.Salgado","Ms.T.I.Vijayakumar","Mr.K.Kajaniethan","Mr.B.Bakeerathan","Ms.S.Gnanachelvam","Ms.V.Mohanarasa",
    "Ms.P.Arunagirinathan","Mr.R.P.Christie","Ms.S.Shanthiralingam","Mr.P.C.M.Croos","Ms.M.H.F.Nusfa","Ms.K.W.P.D.Ekanayaka","Ms.P.E.I.Wijetunge ",
    "Ms.A.D.Weerakkodi","Ms.M.Ajeerththana","Ms.M.H.F.Rifath","Ms.M.M.F.Samra","Ms.A.R.F.Fatheena","Ms.A.S.F.Saneeja","Ms.I.F.Seefa","Ms .D.T.E.Tharmarajah",
    "Mr.S.Piraiyalan","Ms.D.A.N.Sawanathpriya","Ms.H.O.V.Fonseka","Ms.M.H.N.Hudha","Ms.K.Pilothama","Mr.B.D.S.Peiris","Ms.G.S.Pabasara","Ms.L.S.Sanjeewani",
    "Mr.W.J.H.Prabath","Ms.H.M.S.Herath","Mr.H.P.Madhusanka","Ms.N.W.K.D.D.Chandrasekara","Mr.U.L.D.R.H.Gunasinghe","Ms.H.D.K.K.Kumari","Mr.D.M.R.S.Dissanayake","Ms.K.M.R.W.P.K.Kulasekara",
    "Ms.S.F.Ifasha ","Mr.K.M.I.D.Karunarathna","Mr.R.N.Suranga","Ms.A.R.F.Milara","Mr.S.A.Khan","Ms.V.Sahana","Ms.D.B.I.W.A.I.K.Dasanayake","Ms.P.J.I.Wijetunge",
    "Ms.B.G.I.Maduwanthi","Ms.R.M.K.M.Ranathunga","Ms.F.Atheefa"
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