import Types "../types/employee";
import Common "../types/common";
import EmployeeLib "../lib/employee";

mixin (
  employees : { var data : [Types.Employee] },
  metrics : { var data : [Types.PerformanceMetrics] },
  state : { var nextEmployeeId : Common.UserId }
) {
  public query func getAllEmployees() : async [Types.Employee] {
    EmployeeLib.getAllEmployees(employees.data)
  };

  public query func getEmployeeById(id : Common.UserId) : async ?Types.Employee {
    EmployeeLib.getEmployeeById(employees.data, id)
  };

  public query func getEmployeesByDepartment(department : Text) : async [Types.Employee] {
    EmployeeLib.getEmployeesByDepartment(employees.data, department)
  };

  public query func getPerformanceMetrics(employeeId : Common.UserId) : async [Types.PerformanceMetrics] {
    EmployeeLib.getPerformanceMetrics(metrics.data, employeeId)
  };

  public query func getDepartmentSummaries() : async [Types.DepartmentSummary] {
    EmployeeLib.getDepartmentSummaries(employees.data, metrics.data)
  };

  public query func getDashboardKPIs() : async Types.DashboardKPIs {
    EmployeeLib.getDashboardKPIs(employees.data, metrics.data)
  };

  public shared func addEmployee(name : Text, email : Text, department : Text, role : Text, joinDate : Common.Timestamp, avatar : ?Text) : async Types.Employee {
    let (newList, newEmployee) = EmployeeLib.addEmployee(employees.data, state, { name; email; department; role; joinDate; avatar });
    employees.data := newList;
    newEmployee
  };

  public shared func updateEmployee(employee : Types.Employee) : async Bool {
    let (newList, found) = EmployeeLib.updateEmployee(employees.data, employee);
    employees.data := newList;
    found
  };

  public shared func addPerformanceMetrics(entry : Types.PerformanceMetrics) : async () {
    metrics.data := EmployeeLib.addPerformanceMetrics(metrics.data, entry);
  };
};
