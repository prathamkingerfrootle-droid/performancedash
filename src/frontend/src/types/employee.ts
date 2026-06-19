export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  joinDate: string;
  status: "active" | "on-leave" | "terminated";
}

export interface PerformanceMetrics {
  employeeId: string;
  period: string;
  score: number;
  attendance: number;
  tasksCompleted: number;
  tasksTotal: number;
  peerReview: number;
  selfReview: number;
}

export interface DepartmentSummary {
  department: string;
  employeeCount: number;
  avgPerformance: number;
  avgAttendance: number;
  totalTasksCompleted: number;
  totalTasks: number;
}

export interface DashboardKPIs {
  totalEmployees: number;
  avgPerformanceScore: number;
  attendanceRate: number;
  taskCompletionRate: number;
  activeEmployees: number;
  onLeaveEmployees: number;
}

export interface PerformanceTrend {
  period: string;
  avgScore: number;
  topPerformer: string;
}
