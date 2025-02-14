import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDB } from "~/db/getDB";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      const db = await getDB()
        const employees = await db.all("SELECT * FROM employees;")
     
      setEmployees(employees);
    };

    fetchEmployees();
  }, []);
  const handleRowClick = (id: number) => {
    navigate(`/employees/${id}`);
  };
  return (
    <div className="employees-container">
      <h1>Employees List</h1>
      <table className="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any) => (
            <tr key={employee.id} onClick={() => handleRowClick(employee.id)}>
              <td>{employee.id}</td>
              <td>{employee.full_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.job_title}</td>
              <td>{employee.department}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    // handleDelete(employee.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <ul>
        <li><a href="/employees/new">New Employee</a></li>
      </ul>
    </div>
  );
};

export default EmployeeList;
