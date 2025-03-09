/**
 * Dashboard Utilities
 * Helper functions for processing dashboard data and metrics
 */
import { findAppropriateContact } from '../../../data/unidoStaff';

/**
 * Process partner and staff data into node and link format for network visualization
 * 
 * @param {Array} partners - Array of partner objects
 * @param {Array} staff - Array of staff objects
 * @returns {Object} Object with nodes and links arrays
 */
export const processNetworkData = (partners, staff) => {
  if (!partners || !Array.isArray(partners)) return { nodes: [], links: [] };
  if (!staff || !Array.isArray(staff)) staff = [];
  
  // First collect staff IDs that will be included in the visualization
  const includedStaffIds = new Set();
  partners.forEach(p => {
    if (p.mainContactPerson && staff.some(s => s.id === p.mainContactPerson)) {
      includedStaffIds.add(p.mainContactPerson);
    }
  });
  
  const nodes = [
    // Create partner nodes
    ...partners.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      sector: p.sector,
      region: p.region,
      nodeType: 'partner',
      contributions: p.contributions?.reduce((sum, c) => sum + (c.amount || c.estimatedValue || 0), 0) || 0,
      projects: p.projects?.length || 0,
      contactPerson: p.mainContactPerson || null,
    })),
    // Create staff nodes only for staff that will be included
    ...staff
      .filter(s => includedStaffIds.has(s.id))
      .map(s => ({
        id: s.id,
        name: s.name,
        nodeType: 'staff',
        directorate: s.unit?.directorate || 'Unknown',
      })),
  ];
  
  // Create a Set of all node IDs for quick lookup
  const nodeIds = new Set(nodes.map(node => node.id));
  
  const links = [
    // Only create links to staff that exist in the nodes array
    ...partners
      .filter(p => p.mainContactPerson && nodeIds.has(p.mainContactPerson))
      .map(p => ({ source: p.id, target: p.mainContactPerson, type: 'contact' })),
    // Only create partner-partner links if both partners exist in the nodes array
    ...partners.flatMap(p => 
      p.connections?.filter(c => nodeIds.has(c))
        .map(c => ({ source: p.id, target: c, type: 'partner-partner' })) || []
    ),
  ];
  
  return { nodes, links };
};

/**
 * Enhance the network data with colors and additional properties for visualization
 * 
 * @param {Object} data - Network data with nodes and links
 * @returns {Object} Enhanced network data
 */
export const enhanceLocalNetworkData = (data) => {
  if (!data) return { nodes: [], links: [] };
  
  // Define colors for node types
  const typeColors = {
    'partner': '#009cdc',
    'staff': '#f47a42'
  };
  
  return {
    nodes: data.nodes.map(node => ({
      ...node,
      color: typeColors[node.nodeType] || '#999'
    })),
    links: data.links
  };
};

/**
 * Calculate days until a specific date
 * 
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {number} Number of days from today to the target date
 */
export const daysUntil = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const differenceInTime = targetDate.getTime() - today.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};

/**
 * Calculate total contributions across all partners
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {number} Total contributions value
 */
export const calculateTotalContributions = (partners) => {
  let total = 0;
  if (!partners || !Array.isArray(partners)) return total;
  
  partners.forEach(partner => {
    if (partner.contributions) {
      partner.contributions.forEach(contrib => {
        total += contrib.type === 'Financial' ? (contrib.amount || 0) : (contrib.estimatedValue || 0);
      });
    }
  });
  return total;
};

/**
 * Calculate number of active projects across all partners
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {number} Number of active projects
 */
export const calculateActiveProjects = (partners) => {
  let activeProjects = 0;
  if (!partners || !Array.isArray(partners)) return activeProjects;
  
  partners.forEach(partner => {
    if (partner.projects) {
      partner.projects.forEach(project => {
        if (project.status === 'In Progress' || project.status === 'Active') {
          activeProjects++;
        }
      });
    }
  });
  return activeProjects;
};

/**
 * Get unique countries from partners and their projects
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {Array} Array of unique country names
 */
export const getUniqueCountries = (partners) => {
  const countries = new Set();
  if (!partners || !Array.isArray(partners)) return Array.from(countries);
  
  partners.forEach(partner => {
    if (partner.country) {
      countries.add(partner.country);
    }
    if (partner.projects) {
      partner.projects.forEach(project => {
        if (project.location) {
          const locations = project.location.split(',');
          locations.forEach(loc => countries.add(loc.trim()));
        }
      });
    }
  });
  return Array.from(countries);
};

/**
 * Get contribution data by type for charting
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {Array} Array of contribution data by type
 */
export const getContributionTypeData = (partners) => {
  const types = { 'Financial': 0, 'In-kind': 0, 'Other': 0 };
  if (!partners || !Array.isArray(partners)) return Object.keys(types).map(key => ({ name: key, value: types[key] }));
  
  partners.forEach(partner => {
    if (partner.contributions) {
      partner.contributions.forEach(contrib => {
        if (contrib.type === 'Financial') {
          types['Financial'] += (contrib.amount || 0);
        } else if (contrib.type === 'In-kind') {
          types['In-kind'] += (contrib.estimatedValue || 0);
        } else {
          types['Other'] += (contrib.estimatedValue || 0);
        }
      });
    }
  });
  return Object.keys(types).map(key => ({ name: key, value: types[key] }));
};

/**
 * Get SDG alignment data for charting
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {Array} Array of SDG alignment data
 */
export const getSDGAlignmentData = (partners) => {
  const sdgCounts = {};
  
  if (!partners || !Array.isArray(partners)) return [];
  
  partners.forEach(partner => {
    if (partner.sdgAlignment) {
      partner.sdgAlignment.forEach(sdgNumber => {
        sdgCounts[sdgNumber] = (sdgCounts[sdgNumber] || 0) + 1;
      });
    }
  });
  
  return Object.keys(sdgCounts).map(sdg => ({
    sdg: `SDG ${sdg}`,
    count: sdgCounts[sdg]
  }));
};

/**
 * Get regional distribution data for charting
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {Array} Array of regional distribution data
 */
export const getRegionalDistributionData = (partners) => {
  const regionCounts = {};
  
  if (!partners || !Array.isArray(partners)) return [];
  
  partners.forEach(partner => {
    if (partner.region) {
      regionCounts[partner.region] = (regionCounts[partner.region] || 0) + 1;
    }
  });
  
  return Object.keys(regionCounts).map(region => ({
    name: region,
    value: regionCounts[region]
  }));
};

/**
 * Get sector distribution data for charting
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {Array} Array of sector distribution data (top 6)
 */
export const getSectorDistributionData = (partners) => {
  const sectorCounts = {};
  
  if (!partners || !Array.isArray(partners)) return [];
  
  partners.forEach(partner => {
    if (partner.sector) {
      sectorCounts[partner.sector] = (sectorCounts[partner.sector] || 0) + 1;
    }
  });
  
  // Get top 6 sectors by count
  return Object.keys(sectorCounts)
    .map(sector => ({ name: sector, value: sectorCounts[sector] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
};

/**
 * Filter partners based on filter criteria
 * 
 * @param {Array} partners - Array of partner objects
 * @param {Object} filters - Filter criteria object
 * @param {Array} unidoStaff - Array of UNIDO staff objects
 * @returns {Array} Filtered partners array
 */
export const filterPartners = (partners, filters, unidoStaff, directorates = []) => {
  if (!partners || !Array.isArray(partners)) return [];
  if (!unidoStaff || !Array.isArray(unidoStaff)) unidoStaff = [];
  if (!filters) filters = { partnerType: 'all', status: 'all', sdg: 'all', directorate: 'all', region: 'all', year: 'all' };
  
  return partners.filter(partner => {
    // Apply partner type filter
    if (filters.partnerType !== 'all' && partner.type !== filters.partnerType) {
      return false;
    }
    
    // Apply status filter
    if (filters.status !== 'all' && partner.status !== filters.status) {
      return false;
    }
    
    // Apply region filter
    if (filters.region !== 'all' && partner.region !== filters.region) {
      return false;
    }
    
    // Apply year filter
    if (filters.year !== 'all') {
      const filterYear = parseInt(filters.year);
      // Check if partner has any activity in the selected year
      let hasActivityInYear = false;
      
      // Check projects for the year
      if (partner.projects && Array.isArray(partner.projects)) {
        hasActivityInYear = partner.projects.some(project => {
          const startYear = project.startDate ? new Date(project.startDate).getFullYear() : null;
          const endYear = project.endDate ? new Date(project.endDate).getFullYear() : null;
          
          // Project is active in filter year if it starts before or during filter year
          // and ends after or during filter year
          return (!startYear || startYear <= filterYear) && (!endYear || endYear >= filterYear);
        });
      }
      
      // Check contributions for the year
      if (!hasActivityInYear && partner.contributions && Array.isArray(partner.contributions)) {
        hasActivityInYear = partner.contributions.some(contribution => {
          const contribYear = contribution.date ? new Date(contribution.date).getFullYear() : null;
          return contribYear === filterYear;
        });
      }
      
      // Check agreements for the year
      if (!hasActivityInYear && partner.agreements && Array.isArray(partner.agreements)) {
        hasActivityInYear = partner.agreements.some(agreement => {
          const signYear = agreement.signDate ? new Date(agreement.signDate).getFullYear() : null;
          const expiryYear = agreement.expiryDate ? new Date(agreement.expiryDate).getFullYear() : null;
          
          // Agreement is active in filter year if it is signed before or during filter year
          // and expires after or during filter year
          return (!signYear || signYear <= filterYear) && (!expiryYear || expiryYear >= filterYear);
        });
      }
      
      if (!hasActivityInYear) {
        return false;
      }
    }
    
    // Apply SDG filter
    if (filters.sdg !== 'all' && 
        (!partner.sdgAlignment || !partner.sdgAlignment.includes(parseInt(filters.sdg)))) {
      return false;
    }
    
    // If directorate filter is applied, we'll need to check the contact person's directorate
    if (filters.directorate !== 'all') {
      // For our dashboard, we're using the partner's sector directly to match the directorate
      // This mapping is managed in the Dashboard component through the directorates array
      const directorate = filters.directorate;
      const matchingDirectorate = directorates.find(d => d.id === directorate);
      
      if (matchingDirectorate && partner.sector !== matchingDirectorate.name) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Calculate various dashboard metrics
 * 
 * @param {Array} partners - Array of partner objects
 * @returns {Object} Dashboard metrics object
 */
export const calculateDashboardMetrics = (partners) => {
  if (!partners || !Array.isArray(partners)) {
    return {
      partners: { active: 0, total: 0 },
      projects: { planning: 0, inProgress: 0, completed: 0 },
      totalProjectBudget: 0,
      projectSDGData: [],
      agreementsByType: [],
      expiringAgreements: [],
      financialContributions: 0,
      inKindContributions: 0,
      topContributors: []
    };
  }
  
  // Basic partner metrics
  const active = partners.filter(p => p.status === 'Active').length;
  const total = partners.length;
  
  // Project metrics
  const allProjects = partners.reduce((acc, partner) => {
    if (partner.projects && Array.isArray(partner.projects)) {
      return [...acc, ...partner.projects.map(project => ({
        ...project,
        partnerId: partner.id,
        partnerName: partner.name
      }))];
    }
    return acc;
  }, []);
  
  const projectsByStatus = {
    planning: allProjects.filter(p => p.status === 'Planning').length,
    inProgress: allProjects.filter(p => p.status === 'In Progress').length,
    completed: allProjects.filter(p => p.status === 'Completed').length
  };
  
  const totalProjectBudget = allProjects.reduce((sum, project) => sum + (project.budget || 0), 0);
  
  // Projects by SDG
  const projectsBySDG = {};
  if (allProjects && Array.isArray(allProjects)) {
    allProjects.forEach(project => {
      if (project.sdgs && Array.isArray(project.sdgs)) {
        project.sdgs.forEach(sdg => {
          projectsBySDG[`SDG ${sdg}`] = (projectsBySDG[`SDG ${sdg}`] || 0) + 1;
        });
      }
    });
  }
  
  const projectSDGData = Object.entries(projectsBySDG)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  
  // Agreement metrics
  const allAgreements = partners.reduce((acc, partner) => {
    if (partner.agreements && Array.isArray(partner.agreements)) {
      return [...acc, ...partner.agreements.map(agreement => ({
        ...agreement,
        partnerId: partner.id,
        partnerName: partner.name
      }))];
    }
    return acc;
  }, []);
  
  const agreementsByType = Object.entries(
    allAgreements.reduce((acc, agreement) => {
      acc[agreement.type] = (acc[agreement.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
  
  // Find agreements expiring in the next 90 days
  const today = new Date();
  const ninetyDaysFromNow = new Date();
  ninetyDaysFromNow.setDate(today.getDate() + 90);
  
  const expiringAgreements = allAgreements
    .filter(agreement => {
      if (!agreement.endDate) return false;
      const endDate = new Date(agreement.endDate);
      return endDate > today && endDate <= ninetyDaysFromNow;
    })
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
  
  // Contribution metrics
  const allContributions = partners.reduce((acc, partner) => {
    if (partner.contributions && Array.isArray(partner.contributions)) {
      return [...acc, ...partner.contributions.map(contribution => ({
        ...contribution,
        partnerId: partner.id,
        partnerName: partner.name
      }))];
    }
    return acc;
  }, []);
  
  const totalFinancialContributions = allContributions
    .filter(c => c.type === 'Financial')
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  
  const totalInKindContributions = allContributions
    .filter(c => c.type === 'In-kind')
    .reduce((sum, c) => sum + (c.estimatedValue || 0), 0);
  
  // Top contributors
  const contributionsByPartner = {};
  allContributions.forEach(contribution => {
    if (contribution.type === 'Financial' && contribution.amount) {
      contributionsByPartner[contribution.partnerName] = 
        (contributionsByPartner[contribution.partnerName] || 0) + contribution.amount;
    }
  });
  
  const topContributors = Object.entries(contributionsByPartner)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  // Partners by region
  const partnersByRegion = Object.entries(
    partners.reduce((acc, partner) => {
      acc[partner.region] = (acc[partner.region] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
  
  // Partners by type
  const partnersByType = Object.entries(
    partners.reduce((acc, partner) => {
      acc[partner.type] = (acc[partner.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
  
  // SDG coverage
  const sdgCoverage = {};
  partners.forEach(partner => {
    if (partner.sdgAlignment && Array.isArray(partner.sdgAlignment)) {
      partner.sdgAlignment.forEach(sdg => {
        sdgCoverage[`SDG ${sdg}`] = (sdgCoverage[`SDG ${sdg}`] || 0) + 1;
      });
    }
  });
  
  const sdgData = Object.entries(sdgCoverage)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  
  // Mock upcoming activities - in a real app this would come from the database
  const upcomingActivities = [
    {
      type: 'Follow-up Call',
      partnerName: 'TechGlobal Inc.',
      partnerId: 1,
      date: '2025-03-15',
      description: 'Discuss partnership renewal terms'
    },
    {
      type: 'Workshop',
      partnerName: 'Global Education Foundation',
      partnerId: 4,
      date: '2025-03-20',
      description: 'Technical skills development workshop'
    },
    {
      type: 'Report Due',
      partnerName: 'EcoSolutions Ltd',
      partnerId: 2,
      date: '2025-04-01',
      description: 'Q1 impact assessment report'
    }
  ];
  
  return {
    active,
    total,
    projects: {
      total: allProjects.length,
      byStatus: projectsByStatus,
      totalBudget: totalProjectBudget,
      bySDG: projectSDGData
    },
    agreements: {
      total: allAgreements.length,
      byType: agreementsByType,
      expiring: expiringAgreements
    },
    contributions: {
      financial: totalFinancialContributions,
      inKind: totalInKindContributions,
      topContributors
    },
    upcomingActivities,
    regions: partnersByRegion,
    types: partnersByType,
    sdgs: sdgData
  };
};
