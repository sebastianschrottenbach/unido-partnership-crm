export const partnershipData = [
  {
    id: 1,
    name: "TechGlobal Inc.",
    type: "Private Sector",
    sector: "Directorate of SDG Innovation and Economic Transformation",
    region: "Europe",
    country: "Germany",
    sdgAlignment: [9, 17],
    status: "Active",
    startDate: "2023-05-15",
    contactPerson: "Maria Schmidt",
    email: "m.schmidt@techglobal.com",
    mainContactPerson: "staff_302", // Aisha Nairobi - Digital Innovation Specialist
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
      },
      {
        type: "Service Level Agreement",
        startDate: "2023-01-15",
        endDate: "2024-03-16",
        status: "Active",
        description: "Cloud services support for Digital Skills platform"
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
    connections: [4, 5]
  },
  {
    id: 2,
    name: "EcoSolutions Ltd",
    type: "Private Sector",
    sector: "Technical Cooperation and Sustainable Industrial Development",
    region: "Africa",
    country: "Kenya",
    sdgAlignment: [7, 13],
    status: "Active",
    startDate: "2023-03-10",
    contactPerson: "James Odhiambo",
    email: "j.odhiambo@ecosolutions.co.ke",
    mainContactPerson: "staff_402", // Elena Santos - Clean Energy Expert
    description: "Partnership to deploy renewable energy solutions in rural areas.",
    engagements: [
      { date: "2023-03-10", type: "Meeting", notes: "Partnership agreement signing" },
      { date: "2023-07-22", type: "Field Visit", notes: "Site assessment in Nakuru County" }
    ],
    agreements: [
      {
        type: "Implementation Agreement",
        startDate: "2023-03-10",
        endDate: "2025-03-09",
        status: "Active",
        description: "Agreement for clean energy deployment in rural Kenya"
      },
      {
        type: "Technical Cooperation",
        startDate: "2023-04-15",
        endDate: "2025-06-30", 
        status: "Active",
        description: "Knowledge transfer and capacity building for renewable energy technicians"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-02",
        name: "Solar Microgrids for Rural Communities",
        location: "Kenya",
        budget: 625000,
        sdgs: [7, 9, 13],
        status: "In Progress"
      },
      {
        id: "PRJ-2023-08",
        name: "Renewable Energy Training Program",
        location: "East Africa",
        budget: 320000,
        sdgs: [4, 7, 8],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 150000,
        currency: "USD",
        date: "2023-04-05",
        purpose: "Solar Microgrids initial funding"
      },
      {
        type: "In-kind",
        description: "Solar equipment donation for pilot installations",
        estimatedValue: 75000,
        currency: "USD",
        date: "2023-05-20"
      }
    ],
    connections: [4]
  },
  {
    id: 3,
    name: "Ministry of Industry - Brazil",
    type: "Government",
    sector: "Directorate of Strategic Planning, Programming and Policy",
    region: "Latin America",
    country: "Brazil",
    sdgAlignment: [9, 8],
    status: "Planning",
    startDate: "2024-01-15",
    contactPerson: "Carlos Mendez",
    email: "c.mendez@industria.gov.br",
    mainContactPerson: "staff_201", // James Wilson - Managing Director, PPF
    description: "Collaboration on national industrial policy framework development.",
    engagements: [
      { date: "2023-11-05", type: "Conference", notes: "Initial contact at UNIDO Global Forum" },
      { date: "2024-01-15", type: "Meeting", notes: "Preliminary planning discussion" }
    ],
    agreements: [
      {
        type: "Memorandum of Understanding",
        startDate: "2024-01-15",
        endDate: "2025-07-30",
        status: "Planning",
        description: "Framework for industrial policy cooperation"
      }
    ],
    projects: [
      {
        id: "PRJ-2024-01",
        name: "Sustainable Industrial Development Policy Framework",
        location: "Brazil",
        budget: 980000,
        sdgs: [8, 9, 12],
        status: "Planning"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 750000,
        currency: "USD",
        date: "2024-02-01",
        purpose: "Policy development program funding (committed)"
      }
    ],
    connections: []
  },
  {
    id: 4,
    name: "Global Education Foundation",
    type: "NGO",
    sector: "Office of the Director General",
    region: "Asia",
    country: "India",
    sdgAlignment: [4, 9],
    status: "Active",
    startDate: "2023-04-18",
    contactPerson: "Priya Sharma",
    email: "p.sharma@gef.org",
    mainContactPerson: "staff_503", // Fatima Al-Mansour - Education Specialist
    description: "Joint initiative on technical skills development for youth.",
    engagements: [
      { date: "2023-04-18", type: "Meeting", notes: "Partnership kickoff" },
      { date: "2023-09-30", type: "Workshop", notes: "Curriculum development workshop" }
    ],
    agreements: [
      {
        type: "Partnership Agreement",
        startDate: "2023-04-18",
        endDate: "2025-04-17",
        status: "Active",
        description: "Framework for technical education cooperation"
      },
      {
        type: "Grant Agreement",
        startDate: "2023-06-01",
        endDate: "2024-05-31",
        status: "Active",
        description: "Financial support for educational programs"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-04",
        name: "Technical Skills for Sustainable Industries",
        location: "India",
        budget: 520000,
        sdgs: [4, 8, 9],
        status: "In Progress"
      },
      {
        id: "PRJ-2023-07",
        name: "Digital Literacy for Manufacturing Workers",
        location: "South Asia",
        budget: 375000,
        sdgs: [4, 8, 9],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "In-kind",
        description: "Educational curriculum development and teacher training",
        estimatedValue: 230000,
        currency: "USD",
        date: "2023-05-10"
      }
    ],
    connections: [1, 2, 5]
  },
  {
    id: 5,
    name: "AquaTech Solutions",
    type: "Private Sector",
    sector: "Technical Cooperation and Sustainable Industrial Development",
    region: "Middle East",
    country: "Jordan",
    sdgAlignment: [6, 12],
    status: "Inactive",
    startDate: "2022-07-12",
    endDate: "2023-08-30",
    contactPerson: "Ahmed Khalil",
    email: "a.khalil@aquatech.jo",
    mainContactPerson: "staff_505", // Kwame Osei - Water Management Expert
    description: "Water purification technology transfer project (completed).",
    engagements: [
      { date: "2022-07-12", type: "Meeting", notes: "Project initiation" },
      { date: "2023-08-30", type: "Report", notes: "Final project evaluation and closure" }
    ],
    agreements: [
      {
        type: "Technology Transfer Agreement",
        startDate: "2022-07-12",
        endDate: "2023-08-30",
        status: "Completed",
        description: "Water purification technology deployment in refugee camps"
      }
    ],
    projects: [
      {
        id: "PRJ-2022-06",
        name: "Clean Water Access for Refugee Communities",
        location: "Jordan",
        budget: 420000,
        sdgs: [6, 3, 11],
        status: "Completed"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 220000,
        currency: "USD",
        date: "2022-08-01",
        purpose: "Clean water project implementation"
      },
      {
        type: "In-kind",
        description: "Water purification equipment and technical expertise",
        estimatedValue: 180000,
        currency: "USD",
        date: "2022-09-15"
      }
    ],
    connections: [1, 4]
  },
  {
    id: 6,
    name: "Strategic Solutions International",
    type: "Private Sector",
    sector: "Directorate of Strategic Planning, Programming and Policy",
    region: "Europe",
    country: "Switzerland",
    sdgAlignment: [9, 17],
    status: "Active",
    startDate: "2023-09-15",
    contactPerson: "Laura Weber",
    email: "l.weber@strategicsol.ch",
    mainContactPerson: "staff_201", // Manuel Albaladejo - Managing Director, SPP
    description: "Partnership for organizational excellence and strategic planning frameworks for developing countries.",
    engagements: [
      { date: "2023-09-15", type: "Meeting", notes: "Initial partnership discussion" },
      { date: "2023-11-10", type: "Workshop", notes: "Strategic Planning Methodology Workshop" }
    ],
    agreements: [
      { 
        type: "Memorandum of Understanding",
        startDate: "2023-09-20",
        endDate: "2026-09-19",
        status: "Active",
        description: "Framework agreement for strategic planning initiatives"
      },
      {
        type: "Project Agreement",
        startDate: "2023-10-05",
        endDate: "2024-12-31",
        status: "Active",
        description: "Implementation of Strategic Planning frameworks in 5 countries"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-15",
        name: "Strategic Excellence Initiative",
        location: "Global",
        budget: 750000,
        sdgs: [16, 17],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 450000,
        currency: "USD",
        date: "2023-10-01",
        purpose: "Strategic Excellence Initiative funding"
      },
      {
        type: "In-kind",
        description: "Strategic planning experts - 4 consultants for 6 months",
        estimatedValue: 300000,
        currency: "USD",
        date: "2023-10-15"
      }
    ],
    connections: [3]
  },
  {
    id: 7,
    name: "Global Coordination Forum",
    type: "International Organization",
    sector: "Office of the Director General",
    region: "Europe",
    country: "Belgium",
    sdgAlignment: [16, 17],
    status: "Active",
    startDate: "2023-07-01",
    contactPerson: "Jean-Paul Dumont",
    email: "jp.dumont@globalcoordination.org",
    mainContactPerson: "staff_201", // Manuel Albaladejo - Managing Director, SPP
    description: "International coordination body focused on enhancing cooperation across sectors for sustainable development.",
    engagements: [
      { date: "2023-07-01", type: "Conference", notes: "Global Coordination Annual Summit" },
      { date: "2023-08-15", type: "Meeting", notes: "Partnership framework discussion" }
    ],
    agreements: [
      { 
        type: "Cooperation Agreement",
        startDate: "2023-07-20",
        endDate: "2025-07-19",
        status: "Active",
        description: "Agreement for coordinating international development efforts"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-17",
        name: "Multi-Stakeholder Coordination Platform",
        location: "Global",
        budget: 1200000,
        sdgs: [16, 17],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 600000,
        currency: "USD",
        date: "2023-08-01",
        purpose: "Coordination platform development"
      },
      {
        type: "In-kind",
        description: "Access to global network of coordination experts and resources",
        estimatedValue: 500000,
        currency: "USD",
        date: "2023-08-15"
      }
    ],
    connections: [3, 6]
  },
  {
    id: 8,
    name: "Organizational Development Institute",
    type: "Academic",
    sector: "Directorate of Global Partnerships and External Relations",
    region: "North America",
    country: "United States",
    sdgAlignment: [4, 8, 17],
    status: "Active",
    startDate: "2023-04-10",
    contactPerson: "Dr. Michael Rodriguez",
    email: "m.rodriguez@odi.edu",
    mainContactPerson: "staff_201", // Manuel Albaladejo - Managing Director, SPP
    description: "Research and capacity building institution specialized in organizational development methodologies for public sector.",
    engagements: [
      { date: "2023-04-10", type: "Workshop", notes: "Knowledge sharing workshop on organizational development" },
      { date: "2023-06-22", type: "Conference", notes: "Joint presentation at Development Conference" }
    ],
    agreements: [
      { 
        type: "Academic Cooperation Agreement",
        startDate: "2023-04-15",
        endDate: "2026-04-14",
        status: "Active",
        description: "Research and capacity building cooperation"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-09",
        name: "Organizational Excellence for Sustainable Development",
        location: "Global",
        budget: 850000,
        sdgs: [4, 8, 16],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 350000,
        currency: "USD",
        date: "2023-05-01",
        purpose: "Research program funding"
      },
      {
        type: "In-kind",
        description: "Academic expertise, curriculum development, and training materials",
        estimatedValue: 400000,
        currency: "USD",
        date: "2023-05-15"
      }
    ],
    connections: [6, 7]
  },
  {
    id: 9,
    name: "African Development Bank",
    type: "International Organization",
    sector: "Directorate of Global Partnerships and External Relations",
    region: "Africa",
    country: "Côte d'Ivoire",
    sdgAlignment: [1, 8, 9],
    status: "Active",
    startDate: "2023-02-15",
    contactPerson: "Dr. Amina Diallo",
    email: "a.diallo@afdb.org",
    mainContactPerson: "staff_105",
    description: "Strategic partnership for industrial development financing in Africa.",
    engagements: [
      { date: "2023-02-15", type: "Meeting", notes: "Partnership framework discussion" },
      { date: "2023-05-20", type: "Conference", notes: "Africa Investment Forum" }
    ],
    agreements: [
      { 
        type: "Cooperation Framework",
        startDate: "2023-03-01",
        endDate: "2027-02-28",
        status: "Active",
        description: "Framework for joint financing of industrial development projects in Africa"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-14",
        name: "African Industrial Innovation Fund",
        location: "Pan-African",
        budget: 2500000,
        sdgs: [8, 9, 17],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 1500000,
        currency: "USD",
        date: "2023-04-10",
        purpose: "Initial contribution to Innovation Fund"
      }
    ],
    connections: [2, 4]
  },
  {
    id: 10,
    name: "European Commission - DG INTPA",
    type: "Government",
    sector: "Directorate of Global Partnerships and External Relations",
    region: "Europe",
    country: "Belgium",
    sdgAlignment: [5, 9, 17],
    status: "Active",
    startDate: "2022-11-10",
    contactPerson: "Marie Dubois",
    email: "marie.dubois@ec.europa.eu",
    mainContactPerson: "staff_103",
    description: "Partnership on sustainable industrial development and gender equality in developing countries.",
    engagements: [
      { date: "2022-11-10", type: "Meeting", notes: "Initial partnership discussion" },
      { date: "2023-07-05", type: "Workshop", notes: "Gender and industry policy workshop" }
    ],
    agreements: [
      { 
        type: "Contribution Agreement",
        startDate: "2023-01-15",
        endDate: "2026-12-31",
        status: "Active",
        description: "Agreement for multi-year program funding"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-20",
        name: "Women in Sustainable Industry",
        location: "Global",
        budget: 3700000,
        sdgs: [5, 8, 9],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 2500000,
        currency: "EUR",
        date: "2023-02-15",
        purpose: "Program funding for 2023-2024"
      }
    ],
    connections: [7]
  },
  {
    id: 11,
    name: "Clean Technology Research Center",
    type: "Academic",
    sector: "Technical Cooperation and Sustainable Industrial Development",
    region: "Asia",
    country: "Japan",
    sdgAlignment: [7, 9, 13],
    status: "Active",
    startDate: "2023-09-05",
    contactPerson: "Dr. Takashi Yamamoto",
    email: "yamamoto@ctrc.jp",
    mainContactPerson: "staff_206",
    description: "Collaboration on clean technology transfer and capacity building for developing countries.",
    engagements: [
      { date: "2023-09-05", type: "Meeting", notes: "Partnership framework discussion" },
      { date: "2023-11-12", type: "Workshop", notes: "Clean technology showcase" }
    ],
    agreements: [
      { 
        type: "Technical Cooperation Agreement",
        startDate: "2023-10-01",
        endDate: "2026-09-30",
        status: "Active",
        description: "Framework for technology transfer and joint research"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-25",
        name: "Low-Carbon Industrial Solutions",
        location: "Southeast Asia",
        budget: 1800000,
        sdgs: [7, 9, 13],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "In-kind",
        description: "Technical expertise and research facilities",
        estimatedValue: 950000,
        currency: "USD",
        date: "2023-10-15"
      }
    ],
    connections: [2, 5]
  },
  {
    id: 12,
    name: "Digital Innovation Hub",
    type: "Private Sector",
    sector: "Directorate of SDG Innovation and Economic Transformation",
    region: "North America",
    country: "United States",
    sdgAlignment: [4, 9, 17],
    status: "Active",
    startDate: "2023-06-20",
    contactPerson: "Sarah Johnson",
    email: "s.johnson@dihub.com",
    mainContactPerson: "staff_302",
    description: "Partnership focusing on digital solutions for sustainable development challenges.",
    engagements: [
      { date: "2023-06-20", type: "Meeting", notes: "Initial partnership discussion" },
      { date: "2023-09-15", type: "Hackathon", notes: "SDG Innovation Challenge" }
    ],
    agreements: [
      { 
        type: "Partnership Agreement",
        startDate: "2023-07-01",
        endDate: "2025-06-30",
        status: "Active",
        description: "Framework for digital innovation collaboration"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-21",
        name: "AI for Sustainable Development",
        location: "Global",
        budget: 1200000,
        sdgs: [9, 17],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "In-kind",
        description: "AI platform development and technical expertise",
        estimatedValue: 750000,
        currency: "USD",
        date: "2023-08-01"
      },
      {
        type: "Financial",
        amount: 250000,
        currency: "USD",
        date: "2023-07-15",
        purpose: "Seed funding for innovation challenges"
      }
    ],
    connections: [1, 8]
  },
  {
    id: 13,
    name: "Policy Innovation Institute",
    type: "NGO",
    sector: "Directorate of Strategic Planning, Programming and Policy",
    region: "Europe",
    country: "Sweden",
    sdgAlignment: [9, 16, 17],
    status: "Active",
    startDate: "2023-04-10",
    contactPerson: "Dr. Lars Andersson",
    email: "l.andersson@pii.org",
    mainContactPerson: "staff_405",
    description: "Partnership focusing on industrial policy innovation and governance frameworks.",
    engagements: [
      { date: "2023-04-10", type: "Meeting", notes: "Initial partnership discussion" },
      { date: "2023-07-25", type: "Workshop", notes: "Policy innovation workshop" }
    ],
    agreements: [
      { 
        type: "Cooperation Agreement",
        startDate: "2023-05-01",
        endDate: "2026-04-30",
        status: "Active",
        description: "Framework for policy research and capacity building"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-18",
        name: "Governance for Industrial Transformation",
        location: "Global",
        budget: 950000,
        sdgs: [9, 16, 17],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "In-kind",
        description: "Policy research and expertise",
        estimatedValue: 400000,
        currency: "USD",
        date: "2023-06-01"
      },
      {
        type: "Financial",
        amount: 300000,
        currency: "USD",
        date: "2023-05-15",
        purpose: "Program funding"
      }
    ],
    connections: [3, 6]
  },
  {
    id: 14,
    name: "Director General's Innovation Think Tank",
    type: "NGO",
    sector: "Office of the Director General",
    region: "Europe",
    country: "Austria",
    sdgAlignment: [9, 16, 17],
    status: "Active",
    startDate: "2023-03-15",
    contactPerson: "Dr. Franz Weber",
    email: "f.weber@dginnovation.org",
    mainContactPerson: "staff_101",
    description: "High-level advisory group providing strategic guidance on innovation and industrial development.",
    engagements: [
      { date: "2023-03-15", type: "Meeting", notes: "Inaugural meeting" },
      { date: "2023-08-10", type: "Conference", notes: "Future of Industry Symposium" }
    ],
    agreements: [
      { 
        type: "Advisory Agreement",
        startDate: "2023-04-01",
        endDate: "2025-03-31",
        status: "Active",
        description: "Framework for strategic advice and guidance"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-22",
        name: "Strategic Foresight for Industrial Development",
        location: "Global",
        budget: 750000,
        sdgs: [9, 17],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "In-kind",
        description: "Expert advisors and strategic guidance",
        estimatedValue: 500000,
        currency: "USD",
        date: "2023-04-15"
      }
    ],
    connections: [6, 7]
  },
  {
    id: 15,
    name: "Sustainable Infrastructure Coalition",
    type: "International Organization",
    sector: "Technical Cooperation and Sustainable Industrial Development",
    region: "Global",
    country: "Switzerland",
    sdgAlignment: [9, 11, 13],
    status: "Active",
    startDate: "2023-05-08",
    contactPerson: "Thomas Keller",
    email: "t.keller@sic-global.org",
    mainContactPerson: "staff_303",
    description: "Coalition focusing on sustainable industrial infrastructure development.",
    engagements: [
      { date: "2023-05-08", type: "Meeting", notes: "Initial partnership discussion" },
      { date: "2023-09-20", type: "Field Visit", notes: "Infrastructure assessment mission" }
    ],
    agreements: [
      { 
        type: "Cooperation Framework",
        startDate: "2023-06-01",
        endDate: "2026-05-31",
        status: "Active",
        description: "Framework for sustainable infrastructure initiatives"
      }
    ],
    projects: [
      {
        id: "PRJ-2023-19",
        name: "Climate-Resilient Industrial Parks",
        location: "Global",
        budget: 2800000,
        sdgs: [9, 11, 13],
        status: "In Progress"
      }
    ],
    contributions: [
      {
        type: "Financial",
        amount: 1200000,
        currency: "USD",
        date: "2023-07-01",
        purpose: "Program implementation"
      },
      {
        type: "In-kind",
        description: "Technical expertise and network access",
        estimatedValue: 800000,
        currency: "USD",
        date: "2023-06-15"
      }
    ],
    connections: [2, 5, 11]
  }
];

export const regions = ["Africa", "Asia", "Europe", "Latin America", "Middle East", "North America", "Oceania"];
// UNIDO organizational units
export const sectors = [
  "Office of the Director General",                         // ODG
  "Directorate of Global Partnerships and External Relations", // GLO
  "Technical Cooperation and Sustainable Industrial Development", // TCS
  "Directorate of SDG Innovation and Economic Transformation", // IET
  "Directorate of Strategic Planning, Programming and Policy"  // SPP
];
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

// Create a copy of the first partner with an agreement expiring soon
export const addExpiringAgreement = () => {
  // Find TechGlobal Inc.
  const partner = partnershipData.find(p => p.id === 1);
  
  if (partner && partner.agreements) {
    // Create a date 30 days from now
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 30);
    
    // Format date as YYYY-MM-DD
    const formattedDate = expiryDate.toISOString().split('T')[0];
    
    // Add the expiring agreement
    partner.agreements.push({
      type: "Service Level Agreement",
      startDate: "2023-01-15",
      endDate: formattedDate,
      status: "Active",
      description: "Cloud services support for Digital Skills platform"
    });
  }
};

// Call this function to add the expiring agreement
addExpiringAgreement();
