import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Package, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { notificationApi, type Notification } from "../api/notificationApi";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await notificationApi.getNotifications();
      const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotifications(sortedData);
      setUnreadCount(sortedData.filter(n => !n.isRead).length);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5 text-primary" />;
      case 'payment': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default: return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const displayedNotifications = showUnreadOnly 
    ? notifications.filter(n => !n.isRead) 
    : notifications;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer w-10 h-10 rounded-full hover:bg-muted/50 transition-colors">
          <Bell className="w-[22px] h-[22px] text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-bold text-white shadow-sm ring-2 ring-background animate-in zoom-in">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[450px] flex flex-col glass-effect p-0 overflow-hidden border-border/40 shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/40">
          <DropdownMenuLabel className="p-0 text-base font-semibold">Notifications</DropdownMenuLabel>
          <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-primary hover:text-primary/80 hover:bg-transparent" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <div className="px-4 py-2 border-b border-border/40 bg-muted/10">
          <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setShowUnreadOnly(v === 'unread')}>
            <TabsList className="h-8 w-full grid grid-cols-2 bg-muted/50">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="overflow-y-auto max-h-[300px]">
          {displayedNotifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <Bell className="w-8 h-8 text-muted-foreground/30" />
              {showUnreadOnly ? "No unread notifications." : "No notifications yet."}
            </div>
          ) : (
            displayedNotifications.map(notification => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`flex flex-col items-start gap-1 p-3.5 cursor-pointer border-b border-border/30 last:border-0 rounded-none transition-colors ${!notification.isRead ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'}`}
                onSelect={(e) => {
                  e.preventDefault(); // Prevents the dropdown from closing
                  if (!notification.isRead) {
                    handleMarkAsRead(notification.id);
                  }
                }}
              >
                <div className="flex items-center gap-2.5 w-full">
                  <div className="p-1.5 rounded-full bg-background shadow-sm border border-border/50">
                    {getIcon(notification.type)}
                  </div>
                  <span className={`font-medium text-sm flex-1 ${!notification.isRead ? 'text-foreground' : 'text-foreground/80'}`}>{notification.title}</span>
                  {!notification.isRead && (
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
                  )}
                </div>
                <p className={`text-xs pl-[42px] line-clamp-2 ${!notification.isRead ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                  {notification.message}
                </p>
                <span className="text-[10px] text-muted-foreground/60 pl-[42px] mt-1 font-medium">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
