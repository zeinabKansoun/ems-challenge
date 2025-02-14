import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import './employee_new.css'; // Import the CSS file

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const date_of_birth = formData.get("date_of_birth");
  const job_title = formData.get("job_title");
  const department = formData.get("department");
  const salary = formData.get("salary");
  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");
  const photo = formData.get("photo");
  const cv = formData.get("cv");

  const db = await getDB();
  await db.run(
    `INSERT INTO employees (full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv]
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div className="container">
      <h1>Create New Employee</h1>
      <Form method="post">
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" name="full_name" id="full_name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="tel" name="phone" id="phone" pattern="\+[0-9]{1,3}-[0-9]{1,14}" />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input type="date" name="date_of_birth" id="date_of_birth" max={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <label htmlFor="job_title">Job Title</label>
          <input type="text" name="job_title" id="job_title" required />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input type="text" name="department" id="department" required />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input type="number" name="salary" id="salary" step="0.01" min="0" required />
        </div>
        <div>
          <label htmlFor="start_date">Start Date</label>
          <input type="date" name="start_date" id="start_date" max={new Date().toISOString().split('T')[0]} required />
        </div>
        <div>
          <label htmlFor="end_date">End Date</label>
          <input type="date" name="end_date" id="end_date" />
        </div>
        <div>
          <label htmlFor="photo">Photo URL</label>
          <input type="url" name="photo" id="photo" />
        </div>
        <div>
          <label htmlFor="cv">CV URL</label>
          <input type="url" name="cv" id="cv" />
        </div>
        <button type="submit">Create Employee</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}