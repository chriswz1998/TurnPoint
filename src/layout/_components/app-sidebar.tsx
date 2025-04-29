// AppSidebar.tsx
// The AppSidebar component renders a collapsible sidebar with navigation links for the application,
// including links to the Dashboard, Upload File, Report, and Create Account pages. It also displays 
// the user information in the sidebar footer. This sidebar uses a UI structure based on reusable 
// components and the lucide-react icon library.

import * as React from "react";
import {
  ChartLine,
  FolderUp,
  GalleryVerticalEnd,
  Home,
  UserRoundPlus,
} from "lucide-react"; // Import icons

import { NavUser } from "./nav-user"; // Import the user info display component
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"; // Import sidebar UI components
import { useAuth } from "@/context/AuthContext.tsx"; // Import custom authentication context
import { Link } from "react-router-dom"; // Import Link for client-side navigation

// Define the sidebar navigation items
const items = [
  {
    title: "Dashboard",// Label shown in the sidebar
    url: "/",// URL to navigate when clicked
    icon: Home,// Icon displayed next to the label
  },
  {
    title: "Upload File",
    url: "/UploadFile",
    icon: FolderUp,
  },
  // Example for future expansion:
  // {
  //   title: 'Search',
  //   url: '/Search',
  //   icon: SearchIcon
  // },
  {
    title: "Report",
    url: "/Report",
    icon: ChartLine,
  },
  {
    title: "Create Account",
    url: "/CreateAccount",
    icon: UserRoundPlus,
  },
];

// AppSidebar component
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth(); // Access the current authenticated user
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Sidebar Header with logo and title */}
      <SidebarHeader>
        <div className="flex">
          {/* App logo icon */}
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {/* App name and company */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Turning Point</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Main Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dynamically render navigation items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with user information */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      {/* Collapsed Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
