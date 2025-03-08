export const partnershipData = [
  {
    id: 1,
    name: "TechGlobal Inc.",
    type: "Private Sector",
    sector: "ICT",
    region: "Europe",
    country: "Germany",
    sdgAlignment: [9, 17],
    status: "Active",
    startDate: "2023-05-15",
    contactPerson: "Maria Schmidt",
    email: "m.schmidt@techglobal.com",
    description: "Strategic partnership focused on digital transformation solutions for developing countries.",
    engagements: [
      { date: "2023-06-01", type: "Meeting", notes: "Initial partnership discussion" },
      { date: "2023-08-15", type: "Event", notes: "Joint SDG Innovation Workshop" }
    ],
    agreements: [
      { 
        type: "Memorandum of Understanding",
        startDate: "2023-05-20",
        endDate: "2026-05-19",
        status: "Active",
        description: "Framework agreement for digital transformation initiatives"
      },
      {
        type: "Project Agreement",
        startDate: "2023-07-10",
        endDate: "2024-12-31",
        status: "Active",
        description: "Specific agreement for ICT capacity building in East Africa"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-05",
        name: "Digital Skills for Youth",
        location: "Kenya, Rwanda, Uganda",
        budget: 850000,
        sdgs: [4, 8, 9],
        status: "In Progress"
      },
      {
        id: "PRJ-2023-11",
        name: "Smart Manufacturing Initiative",
        location: "Global",
        budget: 1250000,
        sdgs: [9, 12],
        status: "Planning"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 500000,
        currency: "USD",
        date: "2023-06-01",
        purpose: "Digital Skills for Youth program funding"
      },
      {
        type: "In-kind",
        description: "Technical expertise - 3 full-time engineers for 6 months",
        estimatedValue: 180000,
        currency: "USD",
        date: "2023-08-15"
      }
    ],
    connections: [4, 5] // IDs of connected partners
  },
  {
    id: 2,
    name: "EcoSolutions Ltd",
    type: "Private Sector",
    sector: "Clean Energy",
    region: "Africa",
    country: "Kenya",
    sdgAlignment: [7, 13],
    status: "Active",
    startDate: "2023-03-10",
    contactPerson: "James Odhiambo",
    email: "j.odhiambo@ecosolutions.co.ke",
    description: "Partnership to deploy renewable energy solutions in rural areas.",
    engagements: [
      { date: "2023-03-10", type: "Meeting", notes: "Partnership agreement signing" },
      { date: "2023-07-22", type: "Field Visit", notes: "Site assessment in Nakuru County" }
    ]
  },
  {
    id: 3,
    name: "Ministry of Industry - Brazil",
    type: "Government",
    sector: "Policy",
    region: "Latin America",
    country: "Brazil",
    sdgAlignment: [9, 8],
    status: "Planning",
    startDate: "2024-01-15",
    contactPerson: "Carlos Mendez",
    email: "c.mendez@industria.gov.br",
    description: "Collaboration on national industrial policy framework development.",
    engagements: [
      { date: "2023-11-05", type: "Conference", notes: "Initial contact at UNIDO Global Forum" },
      { date: "2024-01-15", type: "Meeting", notes: "Preliminary planning discussion" }
    ]
  },
  {
    id: 4,
    name: "Global Education Foundation",
    type: "NGO",
    sector: "Education",
    region: "Asia",
    country: "India",
    sdgAlignment: [4, 9],
    status: "Active",
    startDate: "2023-04-18",
    contactPerson: "Priya Sharma",
    email: "p.sharma@gef.org",
    description: "Joint initiative on technical skills development for youth.",
    engagements: [
      { date: "2023-04-18", type: "Meeting", notes: "Partnership kickoff" },
      { date: "2023-09-30", type: "Workshop", notes: "Curriculum development workshop" }
    ]
  },
  {
    id: 5,
    name: "AquaTech Solutions",
    type: "Private Sector",
    sector: "Water",
    region: "Middle East",
    country: "Jordan",
    sdgAlignment: [6, 12],
    status: "Inactive",
    startDate: "2022-07-12",
    endDate: "2023-08-30",
    contactPerson: "Ahmed Khalil",
    email: "a.khalil@aquatech.jo",
    description: "Water purification technology transfer project (completed).",
    engagements: [
      { date: "2022-07-12", type: "Meeting", notes: "Project initiation" },
      { date: "2023-08-30", type: "Report", notes: "Final project evaluation and closure" }
    ]
  }
];

export const regions = ["Africa", "Asia", "Europe", "Latin America", "Middle East", "North America", "Oceania"];
export const sectors = ["ICT", "Clean Energy", "Policy", "Education", "Water", "Agriculture", "Manufacturing", "Finance"];
export const types = ["Private Sector", "Government", "NGO", "Academic", "UN Agency", "International Organization"];
export const statuses = ["Active", "Planning", "On Hold", "Inactive"];
export const sdgs = [
  { number: 1, name: "No Poverty" },
  { number: 2, name: "Zero Hunger" },
  { number: 3, name: "Good Health and Well-being" },
  { number: 4, name: "Quality Education" },
  { number: 5, name: "Gender Equality" },
  { number: 6, name: "Clean Water and Sanitation" },
  { number: 7, name: "Affordable and Clean Energy" },
  { number: 8, name: "Decent Work and Economic Growth" },
  { number: 9, name: "Industry, Innovation and Infrastructure" },
  { number: 10, name: "Reduced Inequality" },
  { number: 11, name: "Sustainable Cities and Communities" },
  { number: 12, name: "Responsible Consumption and Production" },
  { number: 13, name: "Climate Action" },
  { number: 14, name: "Life Below Water" },
  { number: 15, name: "Life on Land" },
  { number: 16, name: "Peace, Justice and Strong Institutions" },
  { number: 17, name: "Partnerships for the Goals" }
];
