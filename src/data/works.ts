export type WorkCategory = "Residential" | "Commercial" | "Villas";

export type Work = {
  id: string;
  title: string;
  category: WorkCategory;
  location: string;
  year: number;
  detail: string;
  image: string;
  wide?: boolean; // takes 2 columns on desktop
};

export const works: Work[] = [
  {
    id: "residency",
    title: "Aakar Residency",
    category: "Residential",
    location: "Ahmedabad",
    year: 2024,
    detail: "144 homes across two towers.",
    image: "/images/transformation/residential-after.jpg",
    wide: true,
  },
  {
    id: "business-park",
    title: "Aakar Business Park",
    category: "Commercial",
    location: "Gandhinagar",
    year: 2023,
    detail: "2.4 lakh sq.ft of Grade-A offices.",
    image: "/images/transformation/commercial-after.jpg",
  },
  {
    id: "villa-serene",
    title: "Villa Serene",
    category: "Villas",
    location: "Vadodara",
    year: 2025,
    detail: "A private home built around a courtyard.",
    image: "/images/transformation/villa-after.jpg",
  },
  {
    id: "skyline",
    title: "Skyline Towers",
    category: "Residential",
    location: "Surat",
    year: 2022,
    detail: "Three towers, 22 floors each.",
    image: "/images/works/skyline-towers.jpg",
  },
  {
    id: "meridian",
    title: "Meridian Plaza",
    category: "Commercial",
    location: "Rajkot",
    year: 2021,
    detail: "Retail at ground, offices above.",
    image: "/images/works/meridian-plaza.jpg",
    wide: true,
  },
  {
    id: "orchard",
    title: "Orchard Villas",
    category: "Villas",
    location: "Ahmedabad",
    year: 2023,
    detail: "A gated community of 24 villas.",
    image: "/images/works/orchard-villas.jpg",
  },
  {
    id: "harmony",
    title: "Harmony Homes",
    category: "Residential",
    location: "Anand",
    year: 2020,
    detail: "Affordable 2 & 3 BHK homes for 300 families.",
    image: "/images/works/harmony-homes.jpg",
  },
];
