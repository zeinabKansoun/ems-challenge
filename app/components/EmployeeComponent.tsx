import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEmployee, saveEmployee } from "../services/employeeService";

const EmployeeForm = () => {
  const { id } = useParams<{id:string}>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    job_title: "",
    department: "",
    salary: 0,
    start_date: "",
    end_date: "",
    photo: "",
    cv: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        const data = await getEmployee(Number(id));
        setEmployee(data);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveEmployee(employee);
    navigate("/employees");
  };

  return (
    <div>
      <h1>{id ? "Update Employee" : "Create Employee"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={employee.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="job_title">Job Title</label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={employee.job_title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={employee.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={employee.end_date}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="photo">Photo</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={employee.photo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cv">CV</label>
          <input
            type="text"
            id="cv"
            name="cv"
            value={employee.cv}
            onChange={handleChange}
          />
        </div> */}
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
      <button>
        <Link to="/employees">View Employees</Link>
      </button>
    </div>
  );
};

export default EmployeeForm;
