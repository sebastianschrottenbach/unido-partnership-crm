/**
 * UNIDO Organizational Structure
 * Based on the official UNIDO organizational chart
 */

export const unidoOrganization = {
  directorGeneral: {
    id: "ODG",
    name: "Office of the Director General",
    head: "Gerd Müller",
    location: "Vienna/HQ"
  },
  
  // Main offices reporting directly to DG
  offices: [
    {
      id: "ODG/ODG",
      name: "Office of the Director General",
      location: "Vienna/HQ"
    },
    {
      id: "ODG/COC",
      name: "Office of the Chief of Cabinet",
      location: "Vienna/HQ"
    },
    {
      id: "ODG/LEG",
      name: "Legal Office",
      location: "Vienna/HQ"
    },
    {
      id: "ODG/CCM",
      name: "Communications and Media",
      location: "Vienna/HQ"
    },
    {
      id: "EIO",
      name: "Office of Evaluation & Internal Oversight",
      location: "Vienna/HQ",
      divisions: [
        { id: "EIO/IEU", name: "EIO/IEU" },
        { id: "EIO/IOU", name: "EIO/IOU" }
      ]
    }
  ],
  
  // Main directorates
  directorates: [
    {
      id: "GLO",
      name: "Directorate of Global Partnerships and External Relations",
      location: "Vienna/HQ",
      divisions: [
        { id: "GLO/OMD", name: "GLO/OMD" },
        { id: "GLO/BRO", name: "GLO/BRO" },
        { id: "GLO/GVO", name: "GLO/GVO" },
        { id: "GLO/NYO", name: "GLO/NYO" },
        { id: "GLO/PMO", name: "GLO/PMO" },
        { id: "GLO/FPR", name: "GLO/FPR" },
        { id: "GLO/FPR/GEF", name: "GLO/FPR/GEF" },
        { id: "GLO/ITP", name: "GLO/ITP" },
        { id: "GLO/ITP/BAH", name: "GLO/ITP/BAH" },
        { id: "GLO/ITP/BEI", name: "GLO/ITP/BEI" },
        { id: "GLO/ITP/BER", name: "GLO/ITP/BER" },
        { id: "GLO/ITP/GER", name: "GLO/ITP/GER" },
        { id: "GLO/ITP/ITA", name: "GLO/ITP/ITA" },
        { id: "GLO/ITP/JPN", name: "GLO/ITP/JPN" },
        { id: "GLO/ITP/ROK", name: "GLO/ITP/ROK" },
        { id: "GLO/ITP/RUS", name: "GLO/ITP/RUS" },
        { id: "GLO/RFO", name: "GLO/RFO" },
        { id: "GLO/RFO/AFR", name: "GLO/RFO/AFR" },
        { id: "GLO/RFO/ARB", name: "GLO/RFO/ARB" },
        { id: "GLO/RFO/ASP", name: "GLO/RFO/ASP" },
        { id: "GLO/RFO/EUR", name: "GLO/RFO/EUR" },
        { id: "GLO/RFO/LAC", name: "GLO/RFO/LAC" },
        { id: "GLO/RFO/FLD/AFR/ETH", name: "GLO/RFO/FLD/AFR/ETH" },
        { id: "GLO/RFO/FLD/AFR/NIR", name: "GLO/RFO/FLD/AFR/NIR" },
        { id: "GLO/RFO/FLD/AFR/IVC", name: "GLO/RFO/FLD/AFR/IVC" },
        { id: "GLO/RFO/FLD/AFR/SAF", name: "GLO/RFO/FLD/AFR/SAF" },
        { id: "GLO/RFO/FLD/AFR/BKF", name: "GLO/RFO/FLD/AFR/BKF" },
        { id: "GLO/RFO/FLD/AFR/CMR", name: "GLO/RFO/FLD/AFR/CMR" },
        { id: "GLO/RFO/FLD/AFR/COD", name: "GLO/RFO/FLD/AFR/COD" },
        { id: "GLO/RFO/FLD/AFR/GHA", name: "GLO/RFO/FLD/AFR/GHA" },
        { id: "GLO/RFO/FLD/AFR/GUI", name: "GLO/RFO/FLD/AFR/GUI" },
        { id: "GLO/RFO/FLD/AFR/KEN", name: "GLO/RFO/FLD/AFR/KEN" },
        { id: "GLO/RFO/FLD/AFR/MAG", name: "GLO/RFO/FLD/AFR/MAG" },
        { id: "GLO/RFO/FLD/AFR/MOZ", name: "GLO/RFO/FLD/AFR/MOZ" },
        { id: "GLO/RFO/FLD/AFR/SEN", name: "GLO/RFO/FLD/AFR/SEN" },
        { id: "GLO/RFO/FLD/AFR/SIL", name: "GLO/RFO/FLD/AFR/SIL" },
        { id: "GLO/RFO/FLD/AFR/UGA", name: "GLO/RFO/FLD/AFR/UGA" },
        { id: "GLO/RFO/FLD/AFR/URT", name: "GLO/RFO/FLD/AFR/URT" },
        { id: "GLO/RFO/FLD/ARB/EGY", name: "GLO/RFO/FLD/ARB/EGY" },
        { id: "GLO/RFO/FLD/ARB/ALG", name: "GLO/RFO/FLD/ARB/ALG" },
        { id: "GLO/RFO/FLD/ARB/JOR", name: "GLO/RFO/FLD/ARB/JOR" },
        { id: "GLO/RFO/FLD/ARB/LEB", name: "GLO/RFO/FLD/ARB/LEB" },
        { id: "GLO/RFO/FLD/ARB/MOR", name: "GLO/RFO/FLD/ARB/MOR" },
        { id: "GLO/RFO/FLD/ARB/SUD", name: "GLO/RFO/FLD/ARB/SUD" },
        { id: "GLO/RFO/FLD/ARB/TUN", name: "GLO/RFO/FLD/ARB/TUN" },
        { id: "GLO/RFO/FLD/ASP/THA", name: "GLO/RFO/FLD/ASP/THA" },
        { id: "GLO/RFO/FLD/ASP/CPR", name: "GLO/RFO/FLD/ASP/CPR" },
        { id: "GLO/RFO/FLD/ASP/IND", name: "GLO/RFO/FLD/ASP/IND" },
        { id: "GLO/RFO/FLD/ASP/BGD", name: "GLO/RFO/FLD/ASP/BGD" },
        { id: "GLO/RFO/FLD/ASP/CMB", name: "GLO/RFO/FLD/ASP/CMB" },
        { id: "GLO/RFO/FLD/ASP/INS", name: "GLO/RFO/FLD/ASP/INS" },
        { id: "GLO/RFO/FLD/ASP/IRA", name: "GLO/RFO/FLD/ASP/IRA" },
        { id: "GLO/RFO/FLD/ASP/LAO", name: "GLO/RFO/FLD/ASP/LAO" },
        { id: "GLO/RFO/FLD/ASP/PAK", name: "GLO/RFO/FLD/ASP/PAK" },
        { id: "GLO/RFO/FLD/ASP/PHI", name: "GLO/RFO/FLD/ASP/PHI" },
        { id: "GLO/RFO/FLD/ASP/VIE", name: "GLO/RFO/FLD/ASP/VIE" },
        { id: "GLO/RFO/FLD/EUR/ARM", name: "GLO/RFO/FLD/EUR/ARM" },
        { id: "GLO/RFO/FLD/EUR/KYR", name: "GLO/RFO/FLD/EUR/KYR" },
        { id: "GLO/RFO/FLD/EUR/TUR", name: "GLO/RFO/FLD/EUR/TUR" },
        { id: "GLO/RFO/FLD/LAC/MEX", name: "GLO/RFO/FLD/LAC/MEX" },
        { id: "GLO/RFO/FLD/LAC/BAR", name: "GLO/RFO/FLD/LAC/BAR" },
        { id: "GLO/RFO/FLD/LAC/URU", name: "GLO/RFO/FLD/LAC/URU" },
        { id: "GLO/RFO/FLD/LAC/BOL", name: "GLO/RFO/FLD/LAC/BOL" },
        { id: "GLO/RFO/FLD/LAC/BRA", name: "GLO/RFO/FLD/LAC/BRA" },
        { id: "GLO/RFO/FLD/LAC/COL", name: "GLO/RFO/FLD/LAC/COL" },
        { id: "GLO/RFO/FLD/LAC/ECU", name: "GLO/RFO/FLD/LAC/ECU" },
        { id: "GLO/RFO/FLD/LAC/NIC", name: "GLO/RFO/FLD/LAC/NIC" }
      ]
    },
    {
      id: "TCS",
      name: "Directorate of Technical Cooperation and Sustainable Industrial Development",
      location: "Vienna/HQ",
      divisions: [
        { id: "TCS/OMD", name: "TCS/OMD" },
        { id: "TCS/IPC", name: "TCS/IPC" },
        { id: "TCS/CEG", name: "TCS/CEG" },
        { id: "TCS/CEG/CRE", name: "TCS/CEG/CRE" },
        { id: "TCS/CEG/RMC", name: "TCS/CEG/RMC" },
        { id: "TCS/ECA", name: "TCS/ECA" },
        { id: "TCS/ECA/ESD", name: "TCS/ECA/ESD" },
        { id: "TCS/ECA/JET", name: "TCS/ECA/JET" },
        { id: "TCS/CMP", name: "TCS/CMP" },
        { id: "TCS/CMP/CTI", name: "TCS/CMP/CTI" },
        { id: "TCS/CMP/MPU", name: "TCS/CMP/MPU" },
        { id: "TCS/SME", name: "TCS/SME" },
        { id: "TCS/SME/MDJ", name: "TCS/SME/MDJ" },
        { id: "TCS/SME/CQC", name: "TCS/SME/CQC" },
        { id: "TCS/DAI", name: "TCS/DAI" }
      ]
    },
    {
      id: "IET",
      name: "Directorate of SDG Innovation and Economic Transformation",
      location: "Vienna/HQ",
      divisions: [
        { id: "IET/OMD", name: "IET/OMD" },
        { id: "IET/AGR", name: "IET/AGR" },
        { id: "IET/AGR/FSS", name: "IET/AGR/FSS" },
        { id: "IET/AGR/RAP", name: "IET/AGR/RAP" },
        { id: "IET/AGR/AIB", name: "IET/AGR/AIB" },
        { id: "IET/PST", name: "IET/PST" },
        { id: "IET/PST/SEF", name: "IET/PST/SEF" },
        { id: "IET/PST/SIB", name: "IET/PST/SIB" },
        { id: "IET/CTP", name: "IET/CTP" },
        { id: "IET/IFI", name: "IET/IFI" },
        { id: "IET/PPP", name: "IET/PPP" }
      ]
    },
    {
      id: "SPP",
      name: "Directorate of Strategic Planning, Programming and Policy",
      location: "Vienna/HQ",
      divisions: [
        { id: "SPP/OMD", name: "SPP/OMD" },
        { id: "SPP/SSC", name: "SPP/SSC" },
        { id: "SPP/SSC/SPN", name: "SPP/SSC/SPN" },
        { id: "SPP/SEC", name: "SPP/SEC" },
        { id: "SPP/SPM", name: "SPP/SPM" },
        { id: "SPP/SPM/SPR", name: "SPP/SPM/SPR" },
        { id: "SPP/SPM/QAS", name: "SPP/SPM/QAS" },
        { id: "SPP/IPS/ISR", name: "SPP/IPS/ISR" },
        { id: "SPP/IPS/IPR", name: "SPP/IPS/IPR" },
        { id: "SPP/GEW", name: "SPP/GEW" },
        { id: "SPP/KMG", name: "SPP/KMG" }
      ]
    }
  ],
  
  // Helper function to get a flat list of all divisions for easier lookups
  getAllDivisions: function() {
    const divisions = [];
    
    this.directorates.forEach(directorate => {
      directorate.divisions.forEach(division => {
        divisions.push({
          ...division,
          directorate: {
            id: directorate.id,
            name: directorate.name
          }
        });
      });
    });
    
    return divisions;
  },
  
  // Helper function to get a flat list of all organizational units for dropdown menus
  getAllUnits: function() {
    const units = [
      // Start with Director General's office
      {
        id: this.directorGeneral.id,
        name: this.directorGeneral.name,
        type: 'office',
        parentId: null
      },
      
      // Add main offices
      ...this.offices.map(office => ({
        id: office.id,
        name: office.name,
        type: 'office',
        parentId: this.directorGeneral.id
      })),
      
      // Add directorates
      ...this.directorates.map(directorate => ({
        id: directorate.id,
        name: directorate.name,
        type: 'directorate',
        parentId: this.directorGeneral.id
      }))
    ];
    
    // Add all divisions
    this.directorates.forEach(directorate => {
      directorate.divisions.forEach(division => {
        units.push({
          id: division.id,
          name: division.name,
          type: 'division',
          parentId: directorate.id
        });
      });
    });
    
    return units;
  }
};

/**
 * Maps focus areas and sectors to relevant UNIDO directorate and division IDs
 */
export const sectorToUnitMapping = {
  "Energy": { directorate: "SDG", division: "CRE" },
  "Renewable Energy": { directorate: "SDG", division: "CRE" },
  "Clean Energy": { directorate: "SDG", division: "CRE" },
  
  "Agriculture": { directorate: "TCB", division: "AISD" },
  "Food Processing": { directorate: "GPR", division: "FSN" },
  "Nutrition": { directorate: "GPR", division: "FSN" },
  
  "Environment": { directorate: "TCB", division: "CEEP" },
  "Waste Management": { directorate: "TCB", division: "CEEP" },
  "Water Management": { directorate: "TCB", division: "CEEP" },
  
  "ICT": { directorate: "SDG", division: "DTI" },
  "Technology": { directorate: "SDG", division: "DTI" },
  "Digitalization": { directorate: "SDG", division: "DTI" },
  
  "Gender": { directorate: "SDG", division: "GEE" },
  "Women Empowerment": { directorate: "SDG", division: "GEE" },
  
  "SME Development": { directorate: "TCB", division: "SMEDE" },
  "Entrepreneurship": { directorate: "TCB", division: "SMEDE" },
  
  "Climate": { directorate: "TCB", division: "CTI" },
  "Climate Change": { directorate: "TCB", division: "CTI" },
  
  "Research": { directorate: "SPP", division: "SPP/IPS/IPR" },
  "Policy": { directorate: "SPP", division: "SPP/SPM" },
  
  "Strategic Planning": { directorate: "SPP", division: "SPP/OMD" },
  "Coordination": { directorate: "SPP", division: "SPP/OMD" },
  "Organizational Development": { directorate: "SPP", division: "SPP/OMD" },
  
  "Standards": { directorate: "TCB", division: "QISP" },
  "Quality": { directorate: "TCB", division: "QISP" },
  
  // Default mappings for common partner types
  "UN Agency": { directorate: "GLO", division: "GLO/UNR" },
  "International Organization": { directorate: "GLO", division: "GLO/MEA" },
  "Academic": { directorate: "SPP", division: "SPP/KMG" },
  "Government": { directorate: "GPR", division: "RAS" },
  "Private Sector": { directorate: "TCS", division: "TCS/DAI" },
  "NGO": { directorate: "GPR", division: "CISD" }
};

/**
 * Map partner to UNIDO organizational units based on its main contact person
 * @param {Object} partner - Partner data
 * @returns {Object} UNIDO organizational units the partner primarily works with 
 */
export const mapPartnerToUnidoUnits = (partner) => {
  // Start with an empty result
  const result = {
    primary: { directorate: null, division: null },
    secondary: []
  };
  
  // Import dynamically inside the function to avoid circular dependencies
  const { getStaffById } = require('../data/unidoStaff');
  
  // First try to map based on the partner's main contact person
  if (partner.mainContactPerson) {
    const staff = getStaffById(partner.mainContactPerson);
    
    if (staff && staff.unit) {
      // Set the primary directorate from the staff's unit
      result.primary.directorate = staff.unit.directorate;
      
      // Set the division if the staff has one
      if (staff.unit.division) {
        result.primary.division = staff.unit.division;
      }
      
      // If we have a valid assignment from the staff, return the result
      if (result.primary.directorate) {
        return result;
      }
    }
  }
  
  // Fallback to sector mapping if no main contact person or invalid assignment
  if (partner.sector && sectorToUnitMapping[partner.sector]) {
    result.primary = { ...sectorToUnitMapping[partner.sector] };
  } 
  // If no sector mapping, try to map based on partner type
  else if (partner.type && sectorToUnitMapping[partner.type]) {
    result.primary = { ...sectorToUnitMapping[partner.type] };
  }
  // Default fallback
  else {
    result.primary = { directorate: "SPP", division: "SPP/IPS" };
  }
  
  // If partner has focus areas, add them as secondary connections
  if (partner.focusAreas && Array.isArray(partner.focusAreas)) {
    partner.focusAreas.forEach(area => {
      if (sectorToUnitMapping[area] && 
          (sectorToUnitMapping[area].directorate !== result.primary.directorate || 
           sectorToUnitMapping[area].division !== result.primary.division)) {
        result.secondary.push({ ...sectorToUnitMapping[area] });
      }
    });
  }
  
  return result;
};

export default unidoOrganization;
