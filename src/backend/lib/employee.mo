import Types "../types/employee";
import Common "../types/common";
import Array "mo:core/Array";
import Float "mo:core/Float";

module {
  public func getAllEmployees(employees : [Types.Employee]) : [Types.Employee] {
    employees
  };

  public func getEmployeeById(employees : [Types.Employee], id : Common.UserId) : ?Types.Employee {
    for (e in employees.vals()) {
      if (e.id == id) { return ?e };
    };
    null
  };

  public func getEmployeesByDepartment(employees : [Types.Employee], department : Text) : [Types.Employee] {
    employees.filter(func(e : Types.Employee) : Bool { e.department == department })
  };

  public func getPerformanceMetrics(metrics : [Types.PerformanceMetrics], employeeId : Common.UserId) : [Types.PerformanceMetrics] {
    metrics.filter(func(m : Types.PerformanceMetrics) : Bool { m.employeeId == employeeId })
  };

  public func getDepartmentSummaries(employees : [Types.Employee], metrics : [Types.PerformanceMetrics]) : [Types.DepartmentSummary] {
    let departments = ["Engineering", "Sales", "Marketing", "HR"];
    var result : [Types.DepartmentSummary] = [];
    for (dept in departments.vals()) {
      let count = employees.filter(func(e : Types.Employee) : Bool { e.department == dept }).size();
      var perfSum = 0.0;
      var attSum = 0.0;
      var metricCount = 0;
      for (m in metrics.vals()) {
        switch (getEmployeeById(employees, m.employeeId)) {
          case (?e) {
            if (e.department == dept) {
              perfSum += m.overallScore;
              attSum += m.attendanceRate;
              metricCount += 1;
            };
          };
          case null {};
        };
      };
      let avgPerf = if (metricCount == 0) { 0.0 } else { perfSum / metricCount.toFloat() };
      let avgAtt = if (metricCount == 0) { 0.0 } else { attSum / metricCount.toFloat() };
      let newSummary : Types.DepartmentSummary = { department = dept; employeeCount = count; avgPerformance = avgPerf; avgAttendance = avgAtt };
      let newResult = Array.tabulate(result.size() + 1, func(i : Nat) : Types.DepartmentSummary {
        if (i < result.size()) { result[i] } else { newSummary }
      });
      result := newResult;
    };
    result
  };

  public func getDashboardKPIs(employees : [Types.Employee], metrics : [Types.PerformanceMetrics]) : Types.DashboardKPIs {
    let totalEmployees = employees.size();
    var overallSum = 0.0;
    var attSum = 0.0;
    var taskSum = 0.0;
    for (m in metrics.vals()) {
      overallSum += m.overallScore;
      attSum += m.attendanceRate;
      taskSum += m.taskCompletionRate;
    };
    let avgOverall = if (metrics.size() == 0) { 0.0 } else { overallSum / metrics.size().toFloat() };
    let avgAttendance = if (metrics.size() == 0) { 0.0 } else { attSum / metrics.size().toFloat() };
    let avgTaskCompletion = if (metrics.size() == 0) { 0.0 } else { taskSum / metrics.size().toFloat() };
    let summaries = getDepartmentSummaries(employees, metrics);
    var topDept = "";
    var bestPerf = -1.0;
    for (s in summaries.vals()) {
      if (s.avgPerformance > bestPerf) {
        bestPerf := s.avgPerformance;
        topDept := s.department;
      };
    };
    { totalEmployees; avgOverallScore = avgOverall; avgAttendanceRate = avgAttendance; avgTaskCompletionRate = avgTaskCompletion; topDepartment = topDept }
  };

  public func addEmployee(employees : [Types.Employee], state : { var nextEmployeeId : Common.UserId }, employee : { name : Text; email : Text; department : Text; role : Text; joinDate : Common.Timestamp; avatar : ?Text }) : ([Types.Employee], Types.Employee) {
    let newEmployee : Types.Employee = {
      id = state.nextEmployeeId;
      name = employee.name;
      email = employee.email;
      department = employee.department;
      role = employee.role;
      joinDate = employee.joinDate;
      avatar = employee.avatar;
    };
    state.nextEmployeeId += 1;
    let newList : [Types.Employee] = Array.tabulate<Types.Employee>(employees.size() + 1, func(i : Nat) : Types.Employee {
      if (i < employees.size()) { employees[i] } else { newEmployee }
    });
    (newList, newEmployee)
  };

  public func updateEmployee(employees : [Types.Employee], updated : Types.Employee) : ([Types.Employee], Bool) {
    var found = false;
    let result = Array.tabulate(employees.size(), func(i : Nat) : Types.Employee {
      let e = employees[i];
      if (e.id == updated.id) {
        found := true;
        updated
      } else {
        e
      }
    });
    (result, found)
  };

  public func addPerformanceMetrics(metrics : [Types.PerformanceMetrics], entry : Types.PerformanceMetrics) : [Types.PerformanceMetrics] {
    Array.tabulate<Types.PerformanceMetrics>(metrics.size() + 1, func(i : Nat) : Types.PerformanceMetrics {
      if (i < metrics.size()) { metrics[i] } else { entry }
    })
  };
};
