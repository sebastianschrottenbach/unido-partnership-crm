/**
 * UNIDO Staff Data Model
 * This file contains a simplified representation of UNIDO staff
 * with their organizational affiliations.
 */

export const unidoStaff = [
  // Director General's Office
  {
    id: "staff_001",
    name: "Gerd Müller",
    title: "Director General",
    email: "g.mueller@unido.org",
    unit: { 
      directorate: "DG",
      division: null
    },
    location: "Vienna/HQ"
  },
  
  // Reassigned former CSO staff to other directorates
  {
    id: "staff_101",
    name: "Fatou Haidara",
    title: "Program Management Officer",
    email: "f.haidara@unido.org",
    unit: { 
      directorate: "SPP", 
      division: "SPP/SPM" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_102",
    name: "Johannes Dobinger",
    title: "Financial Program Coordinator",
    email: "j.dobinger@unido.org",
    unit: { 
      directorate: "GLO", 
      division: "GLO/FPR" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_103",
    name: "Matteo Fachin",
    title: "Digital Transformation Specialist",
    email: "m.fachin@unido.org",
    unit: { 
      directorate: "TCS", 
      division: "TCS/DAI" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_104",
    name: "Caroline Neubauer",
    title: "Partnerships Development Officer",
    email: "c.neubauer@unido.org",
    unit: { 
      directorate: "GLO", 
      division: "GLO/PMO" 
    },
    location: "Vienna/HQ"
  },
  
  // Directorate of Strategic Planning, Programming and Policy (SPP)
  {
    id: "staff_201",
    name: "Manuel Albaladejo",
    title: "Managing Director, SPP",
    email: "m.albaladejo@unido.org",
    unit: { 
      directorate: "SPP", 
      division: "SPP/OMD" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_202",
    name: "Cecilia Ugaz Estrada",
    title: "Strategic Planning Officer",
    email: "c.ugaz-estrada@unido.org",
    unit: { 
      directorate: "SPP", 
      division: "SPP/SPM" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_203",
    name: "Alejandro Lavopa",
    title: "Policy Research Analyst",
    email: "a.lavopa@unido.org",
    unit: { 
      directorate: "SPP", 
      division: "SPP/IPS/IPR" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_204",
    name: "Nobuya Haraguchi",
    title: "South-South Cooperation Coordinator",
    email: "n.haraguchi@unido.org",
    unit: { 
      directorate: "SPP", 
      division: "SPP/SSC" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_205",
    name: "Fernando Santiago",
    title: "Gender Equality & Women's Empowerment Specialist",
    email: "f.santiago@unido.org",
    unit: { 
      directorate: "SPP", 
      division: "SPP/GEW" 
    },
    location: "Vienna/HQ"
  },
  
  // Directorate of Digitalization, Technology and Innovation (DTI)
  {
    id: "staff_301",
    name: "Bernardo Calzadilla-Sarmiento",
    title: "Managing Director, DTI",
    email: "b.calzadilla@unido.org",
    unit: { 
      directorate: "DTI", 
      division: null 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_302",
    name: "Nilgun Tas",
    title: "Chief, Industrial Resource Efficiency",
    email: "n.tas@unido.org",
    unit: { 
      directorate: "DTI", 
      division: "IRE" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_303",
    name: "Valentin Todorov",
    title: "Data Analytics Specialist",
    email: "v.todorov@unido.org",
    unit: { 
      directorate: "DTI", 
      division: "BIDA" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_304",
    name: "Fernando Santiago",
    title: "Innovation & Digitalization Lead",
    email: "f.santiago-rodriguez@unido.org",
    unit: { 
      directorate: "DTI", 
      division: "ID" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_305",
    name: "Alejandro Rivera",
    title: "Standards and Quality Infrastructure Officer",
    email: "a.rivera@unido.org",
    unit: { 
      directorate: "DTI", 
      division: "SQI" 
    },
    location: "Vienna/HQ"
  },
  
  // Directorate of Environment and Energy (EAE)
  {
    id: "staff_401",
    name: "Tareq Emtairah",
    title: "Director, EAE",
    email: "t.emtairah@unido.org",
    unit: { 
      directorate: "EAE", 
      division: null 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_402",
    name: "Petra Schwager",
    title: "Chief, Industrial Circular Economy",
    email: "p.schwager@unido.org",
    unit: { 
      directorate: "EAE", 
      division: "ICE" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_403",
    name: "Emma Watson",
    title: "Circular Economy Officer",
    email: "e.watson@unido.org",
    unit: { 
      directorate: "TCB", 
      division: "CEEP" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_404",
    name: "Samuel Okafor",
    title: "Agribusiness Specialist",
    email: "s.okafor@unido.org",
    unit: { 
      directorate: "TCB", 
      division: "AISD" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_405",
    name: "Anna Petrov",
    title: "Climate Tech Officer",
    email: "a.petrov@unido.org",
    unit: { 
      directorate: "TCB", 
      division: "CTI" 
    },
    location: "Vienna/HQ"
  },
  
  // SDG Innovation and Economic Transformation (SDG)
  {
    id: "staff_501",
    name: "Hiroshi Tanaka",
    title: "Managing Director, SDG",
    email: "h.tanaka@unido.org",
    unit: { 
      directorate: "SDG", 
      division: null 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_502",
    name: "Maria Gonzalez",
    title: "Industrial Policy Advisor",
    email: "m.gonzalez@unido.org",
    unit: { 
      directorate: "SDG", 
      division: "IPR" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_503",
    name: "Leila Ibrahim",
    title: "Gender Equality Officer",
    email: "l.ibrahim@unido.org",
    unit: { 
      directorate: "SDG", 
      division: "GEE" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_504",
    name: "Thomas Berg",
    title: "Renewable Energy Specialist",
    email: "t.berg@unido.org",
    unit: { 
      directorate: "SDG", 
      division: "CRE" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_505",
    name: "Priya Sharma",
    title: "Digital Transformation Expert",
    email: "p.sharma@unido.org",
    unit: { 
      directorate: "SDG", 
      division: "DTI" 
    },
    location: "Vienna/HQ"
  },
  {
    id: "staff_506",
    name: "Luis Vasquez",
    title: "Sustainable Development Officer",
    email: "l.vasquez@unido.org",
    unit: { 
      directorate: "SDG", 
      division: "SDCA" 
    },
    location: "Vienna/HQ"
  }
];

/**
 * Maps sectors/focus areas to likely UNIDO staff contacts
 * This is a simplified mapping for demonstration purposes
 */
export const sectorToStaffMapping = {
  "Energy": "staff_504", // Thomas Berg, Renewable Energy Specialist
  "Renewable Energy": "staff_504",
  "Clean Energy": "staff_504",
  
  "Agriculture": "staff_404", // Samuel Okafor, Agribusiness Specialist
  "Food Processing": "staff_305", // Pierre Dupont, Food Systems Coordinator
  "Nutrition": "staff_305",
  
  "Environment": "staff_403", // Emma Watson, Circular Economy Officer
  "Waste Management": "staff_403",
  "Water Management": "staff_403",
  
  "ICT": "staff_505", // Priya Sharma, Digital Transformation Expert
  "Technology": "staff_505",
  "Digitalization": "staff_505",
  
  "Gender": "staff_503", // Leila Ibrahim, Gender Equality Officer
  "Women Empowerment": "staff_503",
  
  "Climate": "staff_405", // Anna Petrov, Climate Tech Officer
  "Climate Change": "staff_405",
  
  "Research": "staff_203", // Mei Li, Research Analyst
  "Policy": "staff_502", // Maria Gonzalez, Industrial Policy Advisor
  
  "Standards": "staff_402", // Roberto Silva, Quality Infrastructure Expert
  "Quality": "staff_402",
  
  // Default mappings for common partner types
  "UN Agency": "staff_204", // Rafael Santos, UN Relations Coordinator
  "International Organization": "staff_204",
  "Academic": "staff_203", // Mei Li, Research Analyst
  "Government": "staff_303", // Ahmed Hassan, Regional Strategist
  "Private Sector": "staff_202", // John Adeyemi, Strategic Partnerships Officer
  "NGO": "staff_304" // Sofia Nkosi, Cultural Integration Officer
};

/**
 * Find appropriate UNIDO staff contact based on partner attributes
 * @param {Object} partner Partner data
 * @returns {String} Staff ID of recommended primary contact
 */
export const findAppropriateContact = (partner) => {
  // First try to match based on sector
  if (partner.sector && sectorToStaffMapping[partner.sector]) {
    return sectorToStaffMapping[partner.sector];
  }
  
  // If no sector match, try to match based on partner type
  if (partner.type && sectorToStaffMapping[partner.type]) {
    return sectorToStaffMapping[partner.type];
  }
  
  // Default to strategic partnerships officer
  return "staff_202";
};

/**
 * Get staff information by ID
 * @param {String} staffId Staff ID to look up
 * @returns {Object|null} Staff information or null if not found
 */
export const getStaffById = (staffId) => {
  return unidoStaff.find(staff => staff.id === staffId) || null;
};

export default unidoStaff;
