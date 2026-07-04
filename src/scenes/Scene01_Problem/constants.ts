import {
  CreditCard,
  Heart,
  Images,
  MessageCircle,
} from "lucide-react";

export const studioChaosCards = [
  {
    label: "New Inquiry",
    title: "Rahul & Sneha",
    meta: "WhatsApp · 2 mins ago",
    icon: MessageCircle,
    className: "left-[10%] top-[20%] -rotate-6",
  },
  {
    label: "Payment Pending",
    title: "₹25,000",
    meta: "Due today",
    icon: CreditCard,
    className: "right-[10%] top-[20%] rotate-5",
  },
  {
    label: "Album Approval",
    title: "143 photos waiting",
    meta: "Client review",
    icon: Images,
    className: "left-[10%] bottom-[18%] rotate-3",
  },
  {
    label: "Instagram Lead",
    title: "Budget shared",
    meta: "Needs follow-up",
    icon: Heart,
    className: "right-[10%] bottom-[18%] -rotate-4",
  },
];