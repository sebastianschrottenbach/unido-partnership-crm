/**
 * Network Visualization Utilities
 * Provides helper functions for processing and enhancing network data
 */

/**
 * Enhances basic network data with additional properties for richer visualization
 * 
 * @param {Object} originalData - Original network data with nodes and links
 * @returns {Object} Enhanced network data
 */
export const enhanceNetworkData = (originalData) => {
  if (!originalData || !originalData.nodes || !originalData.links) {
    return { nodes: [], links: [] };
  }

  // Deep clone to avoid mutations
  const data = JSON.parse(JSON.stringify(originalData));
  
  // Enhance nodes with additional properties
  data.nodes = data.nodes.map(node => {
    // Infer partner roles based on existing data
    const partnerRoles = inferPartnerRoles(node);
    
    // Calculate connection strength based on projects and other factors
    const connectionStrength = calculateConnectionStrength(node);
    
    return {
      ...node,
      partnerRoles,
      connectionStrength
    };
  });
  
  // Enhance links with additional properties
  data.links = data.links.map(link => {
    // Find source and target nodes
    const sourceNode = data.nodes.find(n => n.id === link.source);
    const targetNode = data.nodes.find(n => n.id === link.target);
    
    // Calculate link strength based on relationship factors
    const strength = calculateLinkStrength(sourceNode, targetNode);
    
    return {
      ...link,
      strength
    };
  });
  
  return data;
};

/**
 * Infers partner functional roles based on existing data
 * 
 * @param {Object} node - Partner node
 * @returns {Array} Array of inferred roles
 */
const inferPartnerRoles = (node) => {
  const roles = [];
  
  // Logic to infer roles based on partner attributes
  if (node.type === 'Private Sector') {
    roles.push('Implementation');
    if (node.contributions > 100000) roles.push('Financing');
  } else if (node.type === 'Government') {
    roles.push('Policy');
    roles.push('Financing');
  } else if (node.type === 'Academic') {
    roles.push('Knowledge');
    roles.push('Innovation');
  } else if (node.type === 'NGO') {
    roles.push('Implementation');
    roles.push('Knowledge');
  } else if (node.type === 'UN Agency' || node.type === 'International Organization') {
    roles.push('Coordination');
    roles.push('Policy');
    roles.push('Knowledge');
  }
  
  return roles;
};

/**
 * Calculates connection strength based on node attributes
 * 
 * @param {Object} node - Partner node
 * @returns {Number} Connection strength value
 */
const calculateConnectionStrength = (node) => {
  let strength = 1;
  
  // More projects = stronger connections
  if (node.projects) {
    strength += Math.min(node.projects, 10) * 0.2;
  }
  
  // Higher contributions = stronger connections
  if (node.contributions) {
    strength += Math.min(Math.log10(node.contributions) * 0.3, 3);
  }
  
  return strength;
};

/**
 * Calculates link strength between two nodes
 * 
 * @param {Object} source - Source node
 * @param {Object} target - Target node
 * @returns {Number} Link strength value
 */
const calculateLinkStrength = (source, target) => {
  if (!source || !target) return 1;
  
  let strength = 1;
  
  // Links between complementary roles are stronger
  if (source.partnerRoles && target.partnerRoles) {
    // Implementation + Financing is a strong combo
    if (source.partnerRoles.includes('Implementation') && 
        target.partnerRoles.includes('Financing')) {
      strength += 1;
    }
    
    // Knowledge + Implementation is a strong combo
    if (source.partnerRoles.includes('Knowledge') && 
        target.partnerRoles.includes('Implementation')) {
      strength += 0.8;
    }
  }
  
  // Similar regions might indicate stronger partnerships
  if (source.region === target.region) {
    strength += 0.5;
  }
  
  return strength;
};

/**
 * Analyzes network for strategic insights
 * 
 * @param {Object} data - Network data with nodes and links
 * @returns {Object} Strategic insights
 */
export const analyzeNetwork = (data) => {
  if (!data || !data.nodes || !data.links) {
    return {};
  }
  
  // Calculate network density
  const density = calculateNetworkDensity(data);
  
  // Find potential partnership opportunities
  const opportunities = findPartnershipOpportunities(data);
  
  // Identify key connectors (nodes that bridge parts of the network)
  const keyConnectors = identifyKeyConnectors(data);
  
  return {
    density,
    opportunities,
    keyConnectors
  };
};

/**
 * Calculates network density (ratio of actual links to potential links)
 * 
 * @param {Object} data - Network data
 * @returns {Number} Network density
 */
const calculateNetworkDensity = (data) => {
  const n = data.nodes.length;
  const maxPossibleLinks = (n * (n - 1)) / 2;
  return data.links.length / maxPossibleLinks;
};

/**
 * Finds potential partnership opportunities
 * 
 * @param {Object} data - Network data
 * @returns {Array} Array of potential partnership opportunities
 */
const findPartnershipOpportunities = (data) => {
  const opportunities = [];
  
  // Simple implementation: look for nodes that have complementary roles
  // but aren't directly connected
  data.nodes.forEach(node1 => {
    data.nodes.forEach(node2 => {
      if (node1.id === node2.id) return;
      
      // Check if nodes already have a direct connection
      const alreadyConnected = data.links.some(link => 
        (link.source === node1.id && link.target === node2.id) ||
        (link.source === node2.id && link.target === node1.id)
      );
      
      if (!alreadyConnected) {
        // Check for role complementarity
        const hasComplementaryRoles = checkRoleComplementarity(node1, node2);
        
        if (hasComplementaryRoles) {
          opportunities.push({
            source: node1.id,
            target: node2.id,
            reason: "Complementary roles"
          });
        }
      }
    });
  });
  
  return opportunities.slice(0, 10); // Limit to top 10 opportunities
};

/**
 * Checks if two nodes have complementary roles
 * 
 * @param {Object} node1 - First node
 * @param {Object} node2 - Second node
 * @returns {Boolean} Whether the nodes have complementary roles
 */
const checkRoleComplementarity = (node1, node2) => {
  if (!node1.partnerRoles || !node2.partnerRoles) return false;
  
  // Define complementary role pairs
  const complementaryPairs = [
    ['Implementation', 'Financing'],
    ['Knowledge', 'Implementation'],
    ['Innovation', 'Financing'],
    ['Policy', 'Implementation']
  ];
  
  return complementaryPairs.some(pair => {
    const [role1, role2] = pair;
    return (
      (node1.partnerRoles.includes(role1) && node2.partnerRoles.includes(role2)) ||
      (node1.partnerRoles.includes(role2) && node2.partnerRoles.includes(role1))
    );
  });
};

/**
 * Identifies key connector nodes in the network
 * 
 * @param {Object} data - Network data
 * @returns {Array} Array of key connector nodes
 */
const identifyKeyConnectors = (data) => {
  // Simple implementation: count number of connections
  const nodeDegrees = data.nodes.map(node => {
    const connections = data.links.filter(link => 
      link.source === node.id || link.target === node.id
    ).length;
    
    return {
      id: node.id,
      name: node.name,
      connections
    };
  });
  
  // Sort by number of connections
  return nodeDegrees
    .sort((a, b) => b.connections - a.connections)
    .slice(0, 5); // Top 5 connectors
};
