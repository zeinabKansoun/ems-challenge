import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import './employees.css';

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleRowClick = (id: number) => {
    navigate(`/employees/${id}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterField(event.target.value);
  };

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const filteredEmployees = employees
    .filter((employee: any) =>
      employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((employee: any) =>
      filterField ? employee[filterField].toLowerCase().includes(filterValue.toLowerCase()) : true
    )
    .sort((a: any, b: any) => {
      if (sortField) {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();
        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });

  return (
    <div className="employees-container">
      <h1>Employees List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <label htmlFor="filter-select">Filter by:</label>
        <select id="filter-select" className="filter-select" value={filterField} onChange={handleFilterChange}>
          <option value="">Filter by</option>
          <option value="job_title">Job Title</option>
          <option value="department">Department</option>
        </select>
        <input
          type="text"
          placeholder="Filter value..."
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      </div>
      <table className="employees-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("full_name")}>Full Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("job_title")}>Job Title</th>
            <th onClick={() => handleSort("department")}>Department</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee: any) => (
            <tr key={employee.id} onClick={() => handleRowClick(employee.id)}>
              <td>{employee.id}</td>
              <td>{employee.full_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.job_title}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <ul>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}