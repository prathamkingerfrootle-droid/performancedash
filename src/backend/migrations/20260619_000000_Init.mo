module {
  type Employee = {
    id : Nat;
    name : Text;
    email : Text;
    department : Text;
    role : Text;
    joinDate : Int;
    avatar : ?Text;
  };

  type PerformanceMetrics = {
    employeeId : Nat;
    period : Text;
    productivityScore : Float;
    qualityScore : Float;
    attendanceRate : Float;
    taskCompletionRate : Float;
    overallScore : Float;
  };

  type OldActor = {};

  type NewActor = {
    employees : [Employee];
    metrics : [PerformanceMetrics];
    nextEmployeeId : Nat;
  };

  public func migration(_ : OldActor) : NewActor {
    let employees : [Employee] = [
      { id = 1; name = "Alice Chen"; email = "alice.chen@company.com"; department = "Engineering"; role = "Senior Engineer"; joinDate = 1609459200000000000; avatar = null },
      { id = 2; name = "Bob Martinez"; email = "bob.martinez@company.com"; department = "Engineering"; role = "Software Engineer"; joinDate = 1625097600000000000; avatar = null },
      { id = 3; name = "Carol White"; email = "carol.white@company.com"; department = "Engineering"; role = "Lead Engineer"; joinDate = 1577836800000000000; avatar = null },
      { id = 4; name = "David Kim"; email = "david.kim@company.com"; department = "Sales"; role = "Sales Manager"; joinDate = 1612137600000000000; avatar = null },
      { id = 5; name = "Eva Johnson"; email = "eva.johnson@company.com"; department = "Sales"; role = "Sales Representative"; joinDate = 1630454400000000000; avatar = null },
      { id = 6; name = "Frank Lee"; email = "frank.lee@company.com"; department = "Sales"; role = "Account Executive"; joinDate = 1619827200000000000; avatar = null },
      { id = 7; name = "Grace Park"; email = "grace.park@company.com"; department = "Marketing"; role = "Marketing Manager"; joinDate = 1601510400000000000; avatar = null },
      { id = 8; name = "Henry Brown"; email = "henry.brown@company.com"; department = "Marketing"; role = "Content Strategist"; joinDate = 1635724800000000000; avatar = null },
      { id = 9; name = "Iris Davis"; email = "iris.davis@company.com"; department = "Marketing"; role = "Digital Marketer"; joinDate = 1643673600000000000; avatar = null },
      { id = 10; name = "Jack Wilson"; email = "jack.wilson@company.com"; department = "HR"; role = "HR Manager"; joinDate = 1593561600000000000; avatar = null },
      { id = 11; name = "Karen Taylor"; email = "karen.taylor@company.com"; department = "HR"; role = "HR Specialist"; joinDate = 1648771200000000000; avatar = null },
      { id = 12; name = "Leo Anderson"; email = "leo.anderson@company.com"; department = "HR"; role = "Recruiter"; joinDate = 1656633600000000000; avatar = null },
    ];
    let metrics : [PerformanceMetrics] = [
      { employeeId = 1; period = "Q1-2026"; productivityScore = 92.0; qualityScore = 95.0; attendanceRate = 98.0; taskCompletionRate = 94.0; overallScore = 94.75 },
      { employeeId = 2; period = "Q1-2026"; productivityScore = 85.0; qualityScore = 88.0; attendanceRate = 96.0; taskCompletionRate = 87.0; overallScore = 89.0 },
      { employeeId = 3; period = "Q1-2026"; productivityScore = 96.0; qualityScore = 97.0; attendanceRate = 99.0; taskCompletionRate = 97.0; overallScore = 97.25 },
      { employeeId = 4; period = "Q1-2026"; productivityScore = 88.0; qualityScore = 84.0; attendanceRate = 95.0; taskCompletionRate = 90.0; overallScore = 89.25 },
      { employeeId = 5; period = "Q1-2026"; productivityScore = 78.0; qualityScore = 80.0; attendanceRate = 92.0; taskCompletionRate = 82.0; overallScore = 83.0 },
      { employeeId = 6; period = "Q1-2026"; productivityScore = 91.0; qualityScore = 89.0; attendanceRate = 97.0; taskCompletionRate = 93.0; overallScore = 92.5 },
      { employeeId = 7; period = "Q1-2026"; productivityScore = 87.0; qualityScore = 90.0; attendanceRate = 96.0; taskCompletionRate = 88.0; overallScore = 90.25 },
      { employeeId = 8; period = "Q1-2026"; productivityScore = 82.0; qualityScore = 85.0; attendanceRate = 94.0; taskCompletionRate = 84.0; overallScore = 86.25 },
      { employeeId = 9; period = "Q1-2026"; productivityScore = 79.0; qualityScore = 83.0; attendanceRate = 91.0; taskCompletionRate = 81.0; overallScore = 83.5 },
      { employeeId = 10; period = "Q1-2026"; productivityScore = 84.0; qualityScore = 87.0; attendanceRate = 97.0; taskCompletionRate = 86.0; overallScore = 88.5 },
      { employeeId = 11; period = "Q1-2026"; productivityScore = 80.0; qualityScore = 82.0; attendanceRate = 95.0; taskCompletionRate = 83.0; overallScore = 85.0 },
      { employeeId = 12; period = "Q1-2026"; productivityScore = 76.0; qualityScore = 79.0; attendanceRate = 93.0; taskCompletionRate = 78.0; overallScore = 81.5 },
    ];
    {
      employees;
      metrics;
      nextEmployeeId = 13;
    };
  };
};
