import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DepartmentSummary {
    avgAttendance: number;
    employeeCount: bigint;
    department: string;
    avgPerformance: number;
}
export type UserId = bigint;
export type Timestamp = bigint;
export interface Employee {
    id: UserId;
    joinDate: Timestamp;
    name: string;
    role: string;
    email: string;
    department: string;
    avatar?: string;
}
export interface DashboardKPIs {
    totalEmployees: bigint;
    avgOverallScore: number;
    topDepartment: string;
    avgTaskCompletionRate: number;
    avgAttendanceRate: number;
}
export interface PerformanceMetrics {
    overallScore: number;
    productivityScore: number;
    period: string;
    qualityScore: number;
    taskCompletionRate: number;
    attendanceRate: number;
    employeeId: UserId;
}
export interface backendInterface {
    addEmployee(name: string, email: string, department: string, role: string, joinDate: Timestamp, avatar: string | null): Promise<Employee>;
    addPerformanceMetrics(entry: PerformanceMetrics): Promise<void>;
    getAllEmployees(): Promise<Array<Employee>>;
    getDashboardKPIs(): Promise<DashboardKPIs>;
    getDepartmentSummaries(): Promise<Array<DepartmentSummary>>;
    getEmployeeById(id: UserId): Promise<Employee | null>;
    getEmployeesByDepartment(department: string): Promise<Array<Employee>>;
    getPerformanceMetrics(employeeId: UserId): Promise<Array<PerformanceMetrics>>;
    updateEmployee(employee: Employee): Promise<boolean>;
}
