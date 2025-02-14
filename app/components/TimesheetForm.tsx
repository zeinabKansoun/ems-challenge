// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { getTimesheet, saveTimesheet } from "../services/timesheetService";
// import { getEmployees } from "../services/employeeService";
// import type { Timesheet } from "~/types/timesheetForm";

// const TimesheetForm = () => {
//   const { id } = useParams<{id:string}>();
//   const navigate = useNavigate();
//   const [timesheet, setTimesheet] = useState<Timesheet>({
//     id: 0,
//     employee_id: 0,
//     start_time: "",
//     end_time: "",
//     summary: "",
//   });
//   const [employees, setEmployees] = useState<Employee[]>([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const data = await getEmployees();
//       setEmployees(data);
//     };

//     const fetchTimesheet = async () => {
//       if (id) {
//         const data = await getTimesheet(Number(id));
//         setTimesheet(data);
//       }
//     };

//     fetchEmployees();
//     fetchTimesheet();
//   }, [id]);

//   const handleChange = (e:any) => {
//     const { name, value } = e.target;
//     setTimesheet((prevTimesheet) => ({
//       ...prevTimesheet,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await saveTimesheet(timesheet);
//     navigate("/timesheets");
//   };

//   return (
//     <div>
//       <h1>{id ? "Update Timesheet" : "Create Timesheet"}</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="employee_id">Employee</label>
//           <select
//             id="employee_id"
//             name="employee_id"
//             value={timesheet.employee_id}
//             onChange={handleChange}
//           >
//             <option value="">Select an employee</option>
//             {employees.map((employee) => (
//               <option key={employee.id} value={employee.id}>
//                 {employee.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label htmlFor="start_time">Start Time</label>
//           <input
//             type="datetime-local"
//             id="start_time"
//             name="start_time"
//             value={timesheet.start_time}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="end_time">End Time</label>
//           <input
//             type="datetime-local"
//             id="end_time"
//             name="end_time"
//             value={timesheet.end_time}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="summary">Summary</label>
//           <textarea
//             id="summary"
//             name="summary"
//             value={timesheet.summary}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">{id ? "Update" : "Create"}</button>
//       </form>
//       <button>
//         <Link to="/employees">View Employees</Link>
//       </button>
//       <button>
//         <Link to="/timesheets">View Timesheets</Link>
//       </button>
//     </div>
//   );
// };

// export default TimesheetForm;
