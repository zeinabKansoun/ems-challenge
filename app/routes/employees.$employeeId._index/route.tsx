import { useLoaderData, Form, redirect, useActionData } from "react-router";
import { getDB } from "~/db/getDB";
import './employee_view.css'; // Import the CSS file

export async function loader({ params }: { params: { employeeId: string } }) {
  const db = await getDB();
  const employee = await db.get('SELECT * FROM employees WHERE id = ?', [params.employeeId]);
  return { employee };
}

export const action = async ({ request, params }: { request: Request, params: { employeeId: string } }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const date_of_birth = formData.get("date_of_birth") as string;
  const job_title = formData.get("job_title") as string;
  const department = formData.get("department") as string;
  const salary = formData.get("salary") as string;
  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;

  if (!full_name || !email || !phone || !date_of_birth || !job_title || !department || !salary || !start_date) {
    return { error: "All fields are required." };
  }

  if (new Date(date_of_birth) > new Date()) {
    return { error: "Date of birth must be in the past." };
  }

  if (new Date(start_date) > new Date()) {
    return { error: "Start date must be in the past." };
  }

  const db = await getDB();
  await db.run(
    'UPDATE employees SET full_name = ?, email = ?, phone = ?, date_of_birth = ?, job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ? WHERE id = ?',
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, params.employeeId]
  );

  return { success: "Employee updated successfully." };
}

export default function EmployeePage() {
  const { employee } = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="container">
      <h1>Update Employee</h1>
      {actionData?.success && <p className="success-message">{actionData.success}</p>}
      <Form method="post">
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" name="full_name" id="full_name" defaultValue={employee.full_name} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" defaultValue={employee.email} required />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="tel" name="phone" id="phone" defaultValue={employee.phone} required />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input type="date" name="date_of_birth" id="date_of_birth" defaultValue={employee.date_of_birth} required />
        </div>
        <div>
          <label htmlFor="job_title">Job Title</label>
          <input type="text" name="job_title" id="job_title" defaultValue={employee.job_title} required />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input type="text" name="department" id="department" defaultValue={employee.department} required />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input type="number" name="salary" id="salary" defaultValue={employee.salary} required />
        </div>
        <div>
          <label htmlFor="start_date">Start Date</label>
          <input type="date" name="start_date" id="start_date" defaultValue={employee.start_date} required />
        </div>
        <div>
          <label htmlFor="end_date">End Date</label>
          <input type="date" name="end_date" id="end_date" defaultValue={employee.end_date} />
        </div>
        <button type="submit">Update Employee</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}
