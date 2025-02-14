import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import './timesheet_form.css'; // Import the CSS file

export async function loader({ params }: { params: { timesheetId: string } }) {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  const timesheet = params.timesheetId !== 'new' ? await db.get('SELECT * FROM timesheets WHERE id = ?', [params.timesheetId]) : null;
  return { timesheet, employees };
}

export const action = async ({ request, params }: { request: Request, params: { timesheetId: string } }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const summary = formData.get("summary");

  if (!employee_id || !start_time || !end_time) {
    return { error: "All fields are required." };
  }
  const startTime = new Date(start_time.toString());
  const endTime = new Date(end_time.toString());

  if (startTime > endTime) {
    return { error: "Start time must be before end time." };
  }

  const db = await getDB();
  if (params.timesheetId === 'new') {
    await db.run(
      'INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)',
      [employee_id, start_time, end_time, summary]
    );
  } else {
    await db.run(
      'UPDATE timesheets SET employee_id = ?, start_time = ?, end_time = ?, summary = ? WHERE id = ?',
      [employee_id, start_time, end_time, summary, params.timesheetId]
    );
  }

  return redirect("/timesheets");
}

export default function TimesheetPage() {
  const { timesheet, employees } = useLoaderData();

  return (
    <div className="container">
      <h1>{timesheet ? "Edit Timesheet" : "Create Timesheet"}</h1>
      <Form method="post">
        <div>
          <label htmlFor="employee_id">Employee</label>
          <select name="employee_id" id="employee_id" defaultValue={timesheet ? timesheet.employee_id : ""} required>
            <option value="">Select Employee</option>
            {employees.map((employee: any) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input type="datetime-local" name="start_time" id="start_time" defaultValue={timesheet ? new Date(timesheet.start_time).toISOString().slice(0, 16) : ""} required />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" name="end_time" id="end_time" defaultValue={timesheet ? new Date(timesheet.end_time).toISOString().slice(0, 16) : ""} required />
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <textarea name="summary" id="summary" defaultValue={timesheet ? timesheet.summary : ""}></textarea>
        </div>
        <button type="submit">{timesheet ? "Update Timesheet" : "Create Timesheet"}</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}
