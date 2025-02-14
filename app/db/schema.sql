DROP TABLE IF EXISTS timesheets;
DROP TABLE IF EXISTS employees;

-- Create employees table
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    date_of_birth DATE,
    job_title TEXT,
    department TEXT,
    salary REAL NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    photo TEXT,  -- URL for the photo
    cv TEXT      -- URL for the CV
);

-- Create timesheets table
CREATE TABLE timesheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    summary TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);