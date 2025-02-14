import { getDB } from "~/db/getDB"
export const getAllEmployees = async () => {
  const db = await getDB();
  return await db.all('SELECT * FROM employees');
};

export const getEmployeeById = async (id) => {
  const db = await getDB();
  return await db.get('SELECT * FROM employees WHERE id = ?', [id]);
};

export const createEmployee = async (employee) => {
  const db = await getDB();
  const { full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv } = employee;
  const result = await db.run(
    'INSERT INTO employees (full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv]
  );
  return result.lastID;
};

export const updateEmployee = async (id, employee) => {
  const db = await getDB();
  const { full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv } = employee;
  await db.run(
    'UPDATE employees SET full_name = ?, email = ?, phone = ?, date_of_birth = ?, job_title = ?, department = ?, salary = ?, start_date = ?, end_date = ?, photo = ?, cv = ? WHERE id = ?',
    [full_name, email, phone, date_of_birth, job_title, department, salary, start_date, end_date, photo, cv, id]
  );
};

export const deleteEmployee = async (id) => {
  const db = await getDB();
  await db.run('DELETE FROM employees WHERE id = ?', [id]);
};