import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useEmployees,
  usePerformanceMetrics,
  usePerformanceTrends,
} from "@/hooks/useEmployeeData";
import { Calendar, CheckCircle, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Performance() {
  const { data: employees } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const { data: metrics, isLoading: metricsLoading } = usePerformanceMetrics(
    selectedEmployee === "all" ? undefined : selectedEmployee,
  );
  const { data: trends } = usePerformanceTrends();

  const selectedEmployeeData = employees?.find(
    (e) => e.id === selectedEmployee,
  );

  // Calculate averages for radar chart
  const radarData = metrics
    ? [
        {
          metric: "Performance",
          value: metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length,
          fullMark: 100,
        },
        {
          metric: "Attendance",
          value:
            metrics.reduce((sum, m) => sum + m.attendance, 0) / metrics.length,
          fullMark: 100,
        },
        {
          metric: "Task Completion",
          value:
            metrics.reduce(
              (sum, m) => sum + (m.tasksCompleted / m.tasksTotal) * 100,
              0,
            ) / metrics.length,
          fullMark: 100,
        },
        {
          metric: "Peer Review",
          value:
            metrics.reduce((sum, m) => sum + m.peerReview, 0) / metrics.length,
          fullMark: 100,
        },
        {
          metric: "Self Review",
          value:
            metrics.reduce((sum, m) => sum + m.selfReview, 0) / metrics.length,
          fullMark: 100,
        },
      ]
    : [];

  // Line chart data - group by period
  const _lineChartData =
    trends?.map((t) => ({
      period: t.period,
      avgScore: t.avgScore,
    })) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Performance
          </h1>
          <p className="text-muted-foreground">
            Track individual and team performance metrics.
          </p>
        </div>
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger
            className="w-full sm:w-[240px]"
            data-ocid="performance.employee_select"
          >
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees (Average)</SelectItem>
            {employees?.map((emp) => (
              <SelectItem key={emp.id} value={emp.id}>
                {emp.name} - {emp.role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Employee Info */}
      {selectedEmployeeData && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {selectedEmployeeData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{selectedEmployeeData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedEmployeeData.role} ·{" "}
                  {selectedEmployeeData.department}
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {selectedEmployeeData.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Cards */}
      {metrics && metrics.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="size-4" />
                Avg Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {(
                  metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="size-4" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {(
                  metrics.reduce((sum, m) => sum + m.attendance, 0) /
                  metrics.length
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="size-4" />
                Task Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {(
                  (metrics.reduce((sum, m) => sum + m.tasksCompleted, 0) /
                    metrics.reduce((sum, m) => sum + m.tasksTotal, 0)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="size-4" />
                Peer Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {(
                  metrics.reduce((sum, m) => sum + m.peerReview, 0) /
                  metrics.length
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Performance Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {metricsLoading ? (
              <Skeleton className="h-[300px]" />
            ) : metrics && metrics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics}>
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
                    domain={[70, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Performance Score"
                    stroke="oklch(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "oklch(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    name="Attendance"
                    stroke="oklch(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "oklch(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No performance data available.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Performance Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {metricsLoading ? (
              <Skeleton className="h-[300px]" />
            ) : radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(var(--border))" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "oklch(var(--foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 10,
                    }}
                  />
                  <Radar
                    name="Current Period"
                    dataKey="value"
                    stroke="oklch(var(--chart-1))"
                    fill="oklch(var(--chart-1))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No performance data available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Quarterly Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          {metricsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          ) : metrics && metrics.length > 0 ? (
            <div className="space-y-4">
              {metrics.map((metric) => (
                <div
                  key={metric.period}
                  className="grid grid-cols-2 md:grid-cols-6 gap-4 p-3 rounded-lg bg-muted/30"
                  data-ocid={`performance.quarterly.item.${metric.period}`}
                >
                  <div>
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p className="text-sm font-medium">{metric.period}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-sm font-medium">{metric.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className="text-sm font-medium">{metric.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="text-sm font-medium">
                      {metric.tasksCompleted}/{metric.tasksTotal}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Peer Review</p>
                    <p className="text-sm font-medium">{metric.peerReview}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Self Review</p>
                    <p className="text-sm font-medium">{metric.selfReview}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No quarterly data available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
