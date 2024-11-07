import { Role, User } from "@prisma/client";
import { AudioWaveform, BarChart, ChevronRight, ClipboardList, FileBarChart, GraduationCap, Home, Terminal, Trophy, UserCheck, Users } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter } from "@/hooks/use-router.ts";

export function SidebarComponent({ user }: { user: User & { role: Role } }) {
  const organization = {
    name: "Tutly",
    logo: AudioWaveform,
    role: user?.role,
  };

  const OrganizationIcon = organization.logo;
  const router = useRouter();
  const pathname = router.pathname;
  const InstructorItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Assignments",
      url: "/instructor/assignments",
      icon: ClipboardList,
    },
    {
      title: "Leaderboard",
      url: "/instructor/leaderboard",
      icon: Trophy,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Attendance",
      url: "/instructor/attendance",
      icon: UserCheck,
    },
    {
      title: "Statistics",
      url: "/instructor/statistics",
      icon: BarChart,
    },
    {
      title: "Report",
      url: "/instructor/report",
      icon: FileBarChart,
    }
  ];

  const MentorItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Assignments",
      url: "/mentor/assignments",
      icon: ClipboardList,
    },
    {
      title: "Leaderboard",
      url: "/mentor/leaderboard",
      icon: Trophy,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Attendance",
      url: "/mentor/attendance",
      icon: UserCheck,
    },
    {
      title: "Statistics",
      url: "/mentor/statistics",
      icon: BarChart,
    },
    {
      title: "Report",
      url: "/mentor/report",
      icon: FileBarChart,
    }
  ];

  const StudentItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      title: "Assignments",
      url: "/assignments",
      icon: ClipboardList,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Playgrounds",
      url: "/playgrounds",
      icon: Terminal,
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: BarChart,
    }
  ];

  let sideBarItems: any[] = [];

  switch (user.role) {
    case "INSTRUCTOR":
      sideBarItems = InstructorItems;
      break;
    case "MENTOR":
      sideBarItems = MentorItems;
      break;
    case "STUDENT":
      sideBarItems = StudentItems;
      break;
  }

  return (
    <Sidebar collapsible="icon" className="w-56">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {OrganizationIcon && <OrganizationIcon className="size-6" />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{organization.name}</span>
                <span className="truncate text-xs">{organization.role}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sideBarItems?.map((item: any) => {
              const ItemIcon = item.icon;
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive || pathname.startsWith(item.url)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.items ? (
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${pathname === item.url ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"} m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-6 text-base`}
                        >
                          {ItemIcon && <ItemIcon className="size-6" />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    ) : (
                      <a href={item.url}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`${pathname === item.url ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"} m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-6 text-base`}
                        >
                          {ItemIcon && <ItemIcon className="size-6" />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </a>
                    )}
                    {item.items && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem: any) => {
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={`${pathname === subItem.url ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"} m-auto flex cursor-pointer items-center gap-4 rounded px-5 py-6 text-base`}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
