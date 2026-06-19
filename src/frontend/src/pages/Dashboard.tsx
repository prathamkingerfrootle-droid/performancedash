import { KPICard } from "@/components/KPICard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDashboardKPIs,
  useDepartmentSummaries,
  useEmployees,
  usePerformanceTrends,
} from "@/hooks/useEmployeeData";
import {
  CalendarCheck,
  CheckCircle2,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Dashboard() {
  const { data: kpis, isLoading: kpisLoading } = useDashboardKPIs();
  const { data: trends, isLoading: trendsLoading } = usePerformanceTrends();
  const { data: employees, isLoading: employeesLoading } = useEmployees();
  const { data: departments, isLoading: departmentsLoading } =
    useDepartmentSummaries();

  const recentEmployees = employees?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your team's performance metrics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpisLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : kpis ? (
          <>
            <KPICard
              title="Total Employees"
              value={kpis.totalEmployees}
              subtitle={`${kpis.activeEmployees} active, ${kpis.onLeaveEmployees} on leave`}
              icon={Users}
              trend={{ value: 8.2, label: "vs last month" }}
              data-ocid="dashboard.kpi.total_employees"
            />
            <KPICard
              title="Avg Performance"
              value={`${kpis.avgPerformanceScore}%`}
              subtitle="Across all departments"
              icon={Target}
              trend={{ value: 3.5, label: "vs last quarter" }}
              data-ocid="dashboard.kpi.avg_performance"
            />
            <KPICard
              title="Attendance Rate"
              value={`${kpis.attendanceRate}%`}
              subtitle="Year to date average"
              icon={CalendarCheck}
              trend={{ value: 1.2, label: "vs last month" }}
              data-ocid="dashboard.kpi.attendance"
            />
            <KPICard
              title="Task Completion"
              value={`${kpis.taskCompletionRate}%`}
              subtitle="Tasks completed on time"
              icon={CheckCircle2}
              trend={{ value: -0.8, label: "vs last month" }}
              data-ocid="dashboard.kpi.task_completion"
            />
          </>
        ) : null}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trendsLoading ? (
              <Skeleton className="h-[250px]" />
            ) : trends ? (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={trends}>
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="oklch(var(--chart-1))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(var(--chart-1))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="period"
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={12}
                    domain={[80, 95]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgScore"
                    stroke="oklch(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {departmentsLoading ? (
              <Skeleton className="h-[250px]" />
            ) : departments ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departments}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="department"
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
                    dataKey="avgPerformance"
                    fill="oklch(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Recent Employees & Top Performers */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Recent Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            {employeesLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            ) : (
              <div className="space-y-3">
                {recentEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth"
                    data-ocid={`dashboard.recent_employee.item.${employee.id}`}
                  >
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {employee.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {employee.role}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {employee.department}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {departmentsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            ) : departments ? (
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div
                    key={dept.department}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-smooth"
                    data-ocid={`dashboard.department.item.${dept.department}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <TrendingUp className="size-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{dept.department}</p>
                        <p className="text-xs text-muted-foreground">
                          {dept.employeeCount} employees
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {dept.avgPerformance.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {dept.totalTasksCompleted}/{dept.totalTasks} tasks
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
