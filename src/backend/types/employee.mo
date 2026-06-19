import Common "common";

module {
  public type Employee = {
    id : Common.UserId;
    name : Text;
    email : Text;
    department : Text;
    role : Text;
    joinDate : Common.Timestamp;
    avatar : ?Text;
  };

  public type PerformanceMetrics = {
    employeeId : Common.UserId;
    period : Text;
    productivityScore : Float;
    qualityScore : Float;
    attendanceRate : Float;
    taskCompletionRate : Float;
    overallScore : Float;
  };

  public type DepartmentSummary = {
    department : Text;
    employeeCount : Nat;
    avgPerformance : Float;
    avgAttendance : Float;
  };

  public type DashboardKPIs = {
    totalEmployees : Nat;
    avgOverallScore : Float;
    avgAttendanceRate : Float;
    avgTaskCompletionRate : Float;
    topDepartment : Text;
  };
};
