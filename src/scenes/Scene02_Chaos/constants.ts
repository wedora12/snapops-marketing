import {
    CalendarDays,
    CreditCard,
    Heart,
    Images,
    MessageCircle,
    Phone,
  } from "lucide-react";
  
  export const chaosNotifications = [
    {
      app: "WhatsApp",
      title: "Rahul & Sneha",
      message: "Loved your work. Available for Dec 12?",
      time: "9:02 AM",
      icon: MessageCircle,
    },
    {
      app: "Payment",
      title: "₹25,000 Pending",
      message: "Due before the wedding week.",
      time: "9:14 AM",
      icon: CreditCard,
    },
    {
      app: "Call",
      title: "Bride's Father",
      message: "Calling...",
      time: "9:28 AM",
      icon: Phone,
    },
    {
      app: "Album",
      title: "143 Photos Waiting",
      message: "Client approval still pending.",
      time: "10:15 AM",
      icon: Images,
    },
    {
      app: "Instagram",
      title: "Budget Shared",
      message: "New lead needs follow-up.",
      time: "11:48 AM",
      icon: Heart,
    },
    {
      app: "Tomorrow",
      title: "Wedding Timeline Pending",
      message: "Crew plan not finalized.",
      time: "12:06 PM",
      icon: CalendarDays,
    },
  ];