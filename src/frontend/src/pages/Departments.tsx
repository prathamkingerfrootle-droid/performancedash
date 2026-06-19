import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDepartmentSummaries,
  useEmployeesByDepartment,
} from "@/hooks/useEmployeeData";
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Departments() {
  const { data: departments, isLoading } = useDepartmentSummaries();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const { data: deptEmployees } = useEmployeesByDepartment(selectedDept ?? "");

  const chartData =
    departments?.map((d) => ({
      name: d.department,
      performance: d.avgPerformance,
      attendance: d.avgAttendance,
      employees: d.employeeCount,
    })) ?? [];

  const COLORS = [
    "oklch(var(--chart-1))",
    "oklch(var(--chart-2))",
    "oklch(var(--chart-3))",
    "oklch(var(--chart-4))",
    "oklch(var(--chart-5))",
    "oklch(var(--primary))",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Departments
        </h1>
        <p className="text-muted-foreground">
          View aggregated statistics by department.
        </p>
      </div>

      {/* Department Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map(() => (
              <Skeleton key="dept-skeleton" className="h-48" />
            ))
          : departments?.map((dept, index) => (
              <Card
                key={dept.department}
                className="cursor-pointer transition-smooth hover:shadow-md"
                onClick={() => setSelectedDept(dept.department)}
                data-ocid={`departments.card.${index + 1}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${COLORS[index % COLORS.length]}20`,
                        }}
                      >
                        <Building2
                          className="size-4"
                          style={{ color: COLORS[index % COLORS.length] }}
                        />
                      </div>
                      <CardTitle className="text-base font-display">
                        {dept.department}
                      </CardTitle>
                    </div>
                    <Badge variant="secondary">
                      {dept.employeeCount} members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Avg Performance
                      </span>
                      <span className="font-medium">
                        {dept.avgPerformance.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={dept.avgPerformance} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className="font-medium">
                        {dept.avgAttendance.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={dept.avgAttendance} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Task Completion
                      </span>
                      <span className="font-medium">
                        {(
                          (dept.totalTasksCompleted / dept.totalTasks) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(dept.totalTasksCompleted / dept.totalTasks) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="pt-2 border-t flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tasks</span>
                    <span className="font-medium">
                      {dept.totalTasksCompleted}/{dept.totalTasks}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Department Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px]" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  domain={[80, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="performance"
                  name="Performance"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Selected Department Employees */}
      {selectedDept && deptEmployees && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display">
                {selectedDept} Team
              </CardTitle>
              <button
                type="button"
                onClick={() => setSelectedDept(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid="departments.close_team_button"
              >
                Close
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {deptEmployees.map((emp, index) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  data-ocid={`departments.team_member.${index + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {emp.role}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={emp.status === "active" ? "default" : "secondary"}
                    className="text-xs capitalize"
                  >
                    {emp.status.replace("-", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
