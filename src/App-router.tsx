import { Routes, Route } from "react-router-dom";
import { Login } from "@/auth/login.tsx";
import PrivateRoute from "@/components/PrivateRout.tsx";
import Layout from "@/layout/layout.tsx";
import UploadFile from "@/upload-file";
import Dashboard from "@/dashboard";
import TestPage from "@/test";
import AccountCreation from "@/createAccount/userCreation";

import Reports from "@/reports";
import ReportIntake from "@/reports/reportIntake";
import ReportFlowThrough from "@/reports/flow-through";
import ReportRentSupplement from "@/reports/reportRentSupplementRequest";
import ReportGoalsProgress from "@/reports/reportGoalsProgress";
import ReportSafetyPlan from "@/reports/reportSafetyPlan";
import ReportOverdoseSafetyPlan from "@/reports/reportOverdoseSafetyPlan";
import ReportIncident from "@/reports/reportIncident";
import ReportIndividuals from "@/reports/reportIndividuals";
import ReportShelterDiversion from "@/reports/reportShelterDiversion";
import ReportSiteList from "@/reports/reportIntake";
import ReportLOS from "@/reports/loss-of-service/index.tsx";
// TODO replace the Breadcrumb to page title.
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/UploadFile" element={<UploadFile />} />
      <Route path="/Search" element={<UploadFile />} />
      <Route path="/Report" element={<Reports />} />
      <Route path="/CreateAccount" element={<AccountCreation />} />
      <Route path="/TestPage" element={<TestPage />} />

      <Route path="/report/intake-reporting" element={<ReportIntake />} />
      <Route path="/report/flow-through/:id" element={<ReportFlowThrough />} />
      <Route path="/report/loss-of-service/:id" element={<ReportLOS />} />
      <Route
        path="/report/rent-supplement-request"
        element={<ReportRentSupplement />}
      />
      <Route
        path="/report/goals-and-progress"
        element={<ReportGoalsProgress />}
      />
      <Route path="/report/safety-plan" element={<ReportSafetyPlan />} />
      <Route
        path="/report/overdose-safety-plan"
        element={<ReportOverdoseSafetyPlan />}
      />
      <Route path="/report/incident-report" element={<ReportIncident />} />
      <Route path="/report/individuals" element={<ReportIndividuals />} />
      <Route
        path="/report/shelter-diversion-follow-up-log"
        element={<ReportShelterDiversion />}
      />
      <Route path="/report/site-list" element={<ReportSiteList />} />
    </Route>
  </Routes>
);

export default AppRoutes;
