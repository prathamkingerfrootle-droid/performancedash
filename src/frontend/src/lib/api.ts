import type {
  DashboardKPIs,
  DepartmentSummary,
  Employee,
  PerformanceMetrics,
  PerformanceTrend,
} from "@/types/employee";
import {
  mockDashboardKPIs,
  mockDepartmentSummaries,
  mockEmployees,
  mockPerformanceMetrics,
  mockPerformanceTrends,
} from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllEmployees(): Promise<Employee[]> {
  await delay(400);
  return [...mockEmployees];
}

export async function getEmployeeById(
  id: string,
): Promise<Employee | undefined> {
  await delay(300);
  return mockEmployees.find((e) => e.id === id);
}

export async function getEmployeesByDepartment(
  department: string,
): Promise<Employee[]> {
  await delay(300);
  return mockEmployees.filter((e) => e.department === department);
}

export async function getPerformanceMetrics(
  employeeId?: string,
): Promise<PerformanceMetrics[]> {
  await delay(400);
  if (employeeId) {
    return mockPerformanceMetrics.filter((m) => m.employeeId === employeeId);
  }
  return [...mockPerformanceMetrics];
}

export async function getDepartmentSummaries(): Promise<DepartmentSummary[]> {
  await delay(300);
  return [...mockDepartmentSummaries];
}

export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  await delay(300);
  return { ...mockDashboardKPIs };
}

export async function getPerformanceTrends(): Promise<PerformanceTrend[]> {
  await delay(300);
  return [...mockPerformanceTrends];
}

export async function addEmployee(
  employee: Omit<Employee, "id">,
): Promise<Employee> {
  await delay(500);
  const newEmployee: Employee = {
    ...employee,
    id: `emp-${String(mockEmployees.length + 1).padStart(3, "0")}`,
  };
  mockEmployees.push(newEmployee);
  return newEmployee;
}

export async function updateEmployee(
  id: string,
  updates: Partial<Employee>,
): Promise<Employee | undefined> {
  await delay(400);
  const index = mockEmployees.findIndex((e) => e.id === id);
  if (index === -1) return undefined;
  mockEmployees[index] = { ...mockEmployees[index], ...updates };
  return mockEmployees[index];
}

export async function addPerformanceMetrics(
  metrics: Omit<PerformanceMetrics, "period"> & { period: string },
): Promise<PerformanceMetrics> {
  await delay(400);
  mockPerformanceMetrics.push(metrics as PerformanceMetrics);
  return metrics as PerformanceMetrics;
}
