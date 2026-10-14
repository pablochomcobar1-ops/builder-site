export type Transformation = {
  id: string;
  name: string;
  type: string;
  location: string;
  duration: string;
  stat: { label: string; value: string };
  before: string;
  after: string;
};

export const transformations: Transformation[] = [
  {
    id: "residency",
    name: "Aakar Residency",
    type: "Residential",
    location: "Ahmedabad",
    duration: "26 months",
    stat: { label: "Homes delivered", value: "144" },
    before: "/images/transformation/residential-before.jpg",
    after: "/images/transformation/residential-after.jpg",
  },
  {
    id: "business-park",
    name: "Aakar Business Park",
    type: "Commercial",
    location: "Gandhinagar",
    duration: "31 months",
    stat: { label: "Office space", value: "2.4 lakh sq.ft" },
    before: "/images/transformation/commercial-before.jpg",
    after: "/images/transformation/commercial-after.jpg",
  },
  {
    id: "villa",
    name: "Villa Serene",
    type: "Private Home",
    location: "Vadodara",
    duration: "11 months",
    stat: { label: "Built-up area", value: "6,200 sq.ft" },
    before: "/images/transformation/villa-before.jpg",
    after: "/images/transformation/villa-after.jpg",
  },
];
