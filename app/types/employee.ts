// Example of employee and timesheet types  
interface Employee {  
    id: number;  
    name: string;  
    email: string;  
    phone?: string;  
    date_of_birth: string; // Use Date type for better handling if needed  
    job_title: string;  
    department: string;  
    salary: number;  
    start_date: string;  
    end_date?: string;  
    photo?: string | null; // URL or null for no image  
    cv?: string | null;    // URL or null for no CV  
}  

interface Timesheet {  
    id: number;  
    employee_id: number;  
    start_time: string; // Use Date type for better handling if needed  
    end_time: string;   // Use Date type for better handling if needed  
    summary?: string;  
}