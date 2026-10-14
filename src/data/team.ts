export type Member = {
  id: string;
  name: string;
  role: string;
  experience: string;
  image?: string;
};

export const team: Member[] = [
  {
    id: "rajesh",
    name: "Rajesh Mehta",
    role: "Founder & Managing Director",
    experience: "32 years",
    image: "/images/team/rajesh.jpg",
  },
  {
    id: "priya",
    name: "Priya Shah",
    role: "Principal Architect",
    experience: "18 years",
    image: "/images/team/priya.jpg",
  },
  {
    id: "arjun",
    name: "Arjun Patel",
    role: "Head of Construction",
    experience: "21 years",
    image: "/images/team/arjun.jpg",
  },
  {
    id: "neha",
    name: "Neha Desai",
    role: "Structural Engineer",
    experience: "12 years",
    image: "/images/team/neha.jpg",
  },
  {
    id: "vikram",
    name: "Vikram Joshi",
    role: "Senior Project Manager",
    experience: "15 years",
    image: "/images/team/vikram.jpg",
  },
  {
    id: "kavya",
    name: "Kavya Trivedi",
    role: "Interior Design Lead",
    experience: "9 years",
    image: "/images/team/kavya.jpg",
  },
];
