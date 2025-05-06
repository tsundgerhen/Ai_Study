'use client';
import { Home, Inbox, Joystick } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Games',
    url: '#',
    icon: Joystick,
  },
];

export function AppSidebar() {
  const [isSpoken, setIsSpoken] = useState(false);
  const speak = async () => {
    const text = "Гайхалтай байна, сансрын нисгэгч! Чи 15-ын 1-ийг хасчихлаа, одоо 14 хөлөг байна — цуг буудъя.";
  
    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        body: text,
      });
  
      if (!response.ok) {
        console.error("Failed to fetch audio");
        return;
      }
  
      const audioData = await response.arrayBuffer();
      const blob = new Blob([audioData], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
  
      setIsSpoken(true);
    } catch (error) {
      console.error("Error while speaking:", error);
    }
  };

  useEffect(() => {
    // Optional: You can add a one-time event listener
    const handleClick = () => {
      if (!isSpoken) {
        speak();
      }
    };
    window.addEventListener('click', handleClick, { once: true });

    return () => window.removeEventListener('click', handleClick);
  }, [isSpoken]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Study</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <button onClick={speak}>Speak Now</button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
