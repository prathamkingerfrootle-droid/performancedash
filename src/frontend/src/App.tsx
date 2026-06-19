import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Departments } from "@/pages/Departments";
import { Employees } from "@/pages/Employees";
import { Performance } from "@/pages/Performance";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const employeesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employees",
  component: Employees,
});

const performanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/performance",
  component: Performance,
});

const departmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/departments",
  component: Departments,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  employeesRoute,
  performanceRoute,
  departmentsRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
