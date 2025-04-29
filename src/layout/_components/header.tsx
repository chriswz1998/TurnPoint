// Header.tsx
// The Header component renders a page header with a sidebar trigger button on the left 
// and dynamic breadcrumbs based on the current route. It also reserves space on the right 
// side for future user avatar, notifications, or settings actions.

import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Import breadcrumb UI components
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx"; // Sidebar open/close button
import { Separator } from "@/components/ui/separator.tsx"; // Vertical separator component

// Mapping of paths to readable breadcrumb labels
const breadcrumbNameMap: Record<string, string> = {
  "/Dashboard": "Dashboard",
  "/UploadFile": "Upload File",
  "/Search": "Search",
  "/Report": "Reports",
  "/CreateAccount": "Create Account",
  "/TestPage": "Test Page",
  "/report/intake-reporting": "Intake Reporting",
  "/report/flow-through": "Flow Through",
  "/report/loss-of-service": "Loss of Service",
  "/report/rent-supplement-request": "Rent Supplement",
  "/report/goals-and-progress": "Goals & Progress",
  "/report/safety-plan": "Safety Plan",
  "/report/overdose-safety-plan": "Overdose Safety",
  "/report/incident-report": "Incident Report",
  "/report/individuals": "Individuals",
  "/report/shelter-diversion-follow-up-log": "Shelter Diversion",
  "/report/site-list": "Site List",
};

// Header component
export const Header = () => { // Get current location
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean); // Split and clean the path


  return (
    <header className="p-4 w-full border-b bg-white dark:bg-neutral-950 px-6 shadow-sm flex items-center justify-between">
      {/* Left side: Sidebar trigger button + Breadcrumb */}
      <div className="flex items-center gap-4">
        {/* Sidebar open/close button */}
        <SidebarTrigger className="-ml-1" />
        {/* Vertical separator */}
        <Separator orientation="vertical" className="h-6" />
        {/* Breadcrumb navigation */}
        <Breadcrumb>
          <BreadcrumbList>
          {/* If at root ("/"), show 'Home' */}
            {pathnames.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base font-medium">
                  Home
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              // Otherwise, map each segment of the URL into breadcrumbs
              pathnames.map((segment, index) => {
                const url = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                const label = breadcrumbNameMap[url] || segment; // Use friendly name or fallback

                return (
                  <React.Fragment key={url}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-base font-medium">
                          {label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            to={url}
                            className="text-sm text-muted-foreground hover:underline"
                          >
                            {label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {/* Only render separator if not the last item */}
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right side: Placeholder for avatar, notifications, settings */}
      <div className="flex items-center gap-4">
         {/* Future spot for <UserAvatar />, <NotificationsBell />, <SettingsButton />, etc. */}
      </div>
    </header>
  );
};
