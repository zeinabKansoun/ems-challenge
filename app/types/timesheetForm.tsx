
export interface Timesheet {  
  id: number;  
  employee_id: number;  
  start_time: string; // Use Date type for better handling if needed  
  end_time: string;   // Use Date type for better handling if needed  
  summary?: string;  
}