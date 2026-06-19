import {
  addEmployee,
  addPerformanceMetrics,
  getAllEmployees,
  getDashboardKPIs,
  getDepartmentSummaries,
  getEmployeeById,
  getEmployeesByDepartment,
  getPerformanceMetrics,
  getPerformanceTrends,
  updateEmployee,
} from "@/lib/api";
import type {
  DashboardKPIs,
  DepartmentSummary,
  Employee,
  PerformanceMetrics,
  PerformanceTrend,
} from "@/types/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEmployees() {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
}

export function useEmployee(id: string) {
  return useQuery<Employee | undefined>({
    queryKey: ["employees", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  });
}

export function useEmployeesByDepartment(department: string) {
  return useQuery<Employee[]>({
    queryKey: ["employees", "department", department],
    queryFn: () => getEmployeesByDepartment(department),
    enabled: !!department,
  });
}

export function usePerformanceMetrics(employeeId?: string) {
  return useQuery<PerformanceMetrics[]>({
    queryKey: employeeId ? ["performance", employeeId] : ["performance"],
    queryFn: () => getPerformanceMetrics(employeeId),
  });
}

export function useDepartmentSummaries() {
  return useQuery<DepartmentSummary[]>({
    queryKey: ["departments"],
    queryFn: getDepartmentSummaries,
  });
}

export function useDashboardKPIs() {
  return useQuery<DashboardKPIs>({
    queryKey: ["kpis"],
    queryFn: getDashboardKPIs,
  });
}

export function usePerformanceTrends() {
  return useQuery<PerformanceTrend[]>({
    queryKey: ["trends"],
    queryFn: getPerformanceTrends,
  });
}

export function useAddEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Employee> }) =>
      updateEmployee(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useAddPerformanceMetrics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPerformanceMetrics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["performance"] });
      queryClient.invalidateQueries({ queryKey: ["trends"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}
