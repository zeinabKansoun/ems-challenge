import express from 'express';
import { getDB } from "../db/getDB.ts"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Employee service functions
const getAllEmployees = async () => {
  const db = await getDB();
  return await db.all('SELECT * FROM employees');
};

const getEmployeeById = async (id) => {
  const db = await getDB();
  return await db.get('SELECT * FROM employees WHERE id = ?', [id]);
};

const createEmployee = async (employee) => {
  const db = await getDB();
  const { full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv } = employee;
  const result = await db.run(
    'INSERT INTO employees (full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv]
  );
  return result.lastID;
};

const updateEmployee = async (id, employee) => {
  const db = await getDB();
  const { full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv } = employee;
  await db.run(
    'UPDATE employees SET full_name = ?, email = ?, phone = ?, date_of_birth = ?, job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ?, photo = ?, cv = ? WHERE id = ?',
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv, id]
  );
};

const deleteEmployee = async (id) => {
  const db = await getDB();
  await db.run('DELETE FROM employees WHERE id = ?', [id]);
};

// Timesheet service functions
const getAllTimesheets = async () => {
  const db = await getDB();
  return await db.all('SELECT * FROM timesheets');
};

const getTimesheetById = async (id) => {
  const db = await getDB();
  return await db.get('SELECT * FROM timesheets WHERE id = ?', [id]);
};

const createTimesheet = async (timesheet) => {
  const db = await getDB();
  const { employee_id, start_time, end_time, summary } = timesheet;
  const result = await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)',
    [employee_id, start_time, end_time, summary]
  );
  return result.lastID;
};

const updateTimesheet = async (id, timesheet) => {
  const db = await getDB();
  const { employee_id, start_time, end_time, summary } = timesheet;
  await db.run(
    'UPDATE timesheets SET employee_id = ?, start_time = ?, end_time = ?, summary = ? WHERE id = ?',
    [employee_id, start_time, end_time, summary, id]
  );
};

const deleteTimesheet = async (id) => {
  const db = await getDB();
  await db.run('DELETE FROM timesheets WHERE id = ?', [id]);
};

// Routes
app.get('/api/employees', async (req, res) => {
  const employees = await getAllEmployees();
  res.json(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await getEmployeeById(req.params.id);
  res.json(employee);
});

app.post('/api/employees', async (req, res) => {
  const id = await createEmployee(req.body);
  res.json({ id });
});

app.put('/api/employees/:id', async (req, res) => {
  await updateEmployee(req.params.id, req.body);
  res.json({ message: 'Employee updated successfully' });
});

app.delete('/api/employees/:id', async (req, res) => {
  await deleteEmployee(req.params.id);
  res.json({ message: 'Employee deleted successfully' });
});

app.get('/api/timesheets', async (req, res) => {
  const timesheets = await getAllTimesheets();
  res.json(timesheets);
});

app.get('/api/timesheets/:id', async (req, res) => {
  const timesheet = await getTimesheetById(req.params.id);
  res.json(timesheet);
});

app.post('/api/timesheets', async (req, res) => {
  const id = await createTimesheet(req.body);
  res.json({ id });
});

app.put('/api/timesheets/:id', async (req, res) => {
  await updateTimesheet(req.params.id, req.body);
  res.json({ message: 'Timesheet updated successfully' });
});

app.delete('/api/timesheets/:id', async (req, res) => {
  await deleteTimesheet(req.params.id);
  res.json({ message: 'Timesheet deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});