import { useLoaderData, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getDB } from "~/db/getDB";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import './timesheets.css'; // Import the CSS file

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const navigate = useNavigate();
  const [view, setView] = useState("table");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: timesheetsAndEmployees.map((timesheet: any) => ({
      id: timesheet.id.toString(),
      title: timesheet.full_name,
      start: new Date(timesheet.start_time).toISOString().split('T')[0],
      end: new Date(timesheet.end_time).toISOString().split('T')[0],
    })),
    plugins: [eventsService]
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, [eventsService]);

  const handleTableViewClick = () => {
    setView("table");
  };

  const handleCalendarViewClick = () => {
    setView("calendar");
  };

  
  const handleRowClick = (timesheetId: number) => {
    navigate(`/timesheets/${timesheetId}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterEmployee(event.target.value);
  };

  const filteredTimesheets = timesheetsAndEmployees
    .filter((timesheet: any) =>
      timesheet.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.start_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.end_time.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((timesheet: any) =>
      filterEmployee ? timesheet.full_name.toLowerCase().includes(filterEmployee.toLowerCase()) : true
    );

  return (
    <div className="employees-container">
      <h1>Timesheets</h1>
      <div>
        <button onClick={handleTableViewClick}>Table View</button>
        <button onClick={handleCalendarViewClick}>Calendar View</button>
      </div>
      {view === "table" ? (
         <div>
         <div className="search-bar">
           <input
             type="text"
             placeholder="Search..."
             value={searchTerm}
             onChange={handleSearch}
           />
           <label htmlFor="employee-filter">Filter by Employee</label>
           <select id="employee-filter" className="filter-select" value={filterEmployee} onChange={handleFilterChange}>
             <option value="">Filter by Employee</option>
             {timesheetsAndEmployees.map((timesheet: any) => (
               <option key={timesheet.employee_id} value={timesheet.full_name}>
                 {timesheet.full_name}
               </option>
             ))}
           </select>
         </div>
         <table className="employees-table">
           <thead>
             <tr>
               <th>ID</th>
               <th>Employee</th>
               <th>Start Time</th>
               <th>End Time</th>
             </tr>
           </thead>
           <tbody>
             {filteredTimesheets.map((timesheet: any) => (
               <tr key={timesheet.id} onClick={() => handleRowClick(timesheet.id)} style={{ cursor: 'pointer' }}>
                 <td>{timesheet.id}</td>
                 <td>{timesheet.full_name}</td>
                 <td>{new Date(timesheet.start_time).toISOString().split('T')[0]}</td>
                 <td>{new Date(timesheet.end_time).toISOString().split('T')[0]}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
      ) : (
        <div>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      )}
      <hr />
      <ul>
        <li><a href="/timesheets/new">New Timesheet</a></li>
          <li><a href="/employees">Employees</a></li>
      </ul>
      <ul>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}