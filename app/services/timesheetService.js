import { getDB } from "~/db/getDB"
export const getAllTimesheets = async () => {
  const db = await getDB();
  return await db.all('SELECT * FROM timesheets');
};

export const getTimesheetById = async (id) => {
  const db = await getDB();
  return await db.get('SELECT * FROM timesheets WHERE id = ?', [id]);
};

export const createTimesheet = async (timesheet) => {
  const db = await getDB();
  const { employee_id, start_time, end_time, summary } = timesheet;
  const result = await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)',
    [employee_id, start_time, end_time, summary]
  );
  return result.lastID;
};

export const updateTimesheet = async (id, timesheet) => {
  const db = await getDB();
  const { employee_id, start_time, end_time, summary } = timesheet;
  await db.run(
    'UPDATE timesheets SET employee_id = ?, start_time = ?, end_time = ?, summary = ? WHERE id = ?',
    [employee_id, start_time, end_time, summary, id]
  );
};

export const deleteTimesheet = async (id) => {
  const db = await getDB();
  await db.run('DELETE FROM timesheets WHERE id = ?', [id]);
};