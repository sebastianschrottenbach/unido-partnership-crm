/**
 * Color Utilities
 * Standardized color schemes and helper functions for the dashboard
 */

/**
 * Theme colors
 */
export const themeColors = {
  primary: '#009cdc',      // Primary Color (Blue)
  background: '#f5f9ff',   // Background blue
  secondary: '#f47a42',    // Secondary Color (Orange)
  black: '#000000',        // Black
  white: '#ffffff',        // White
  grey: '#9c9c9c'          // Grey
};

/**
 * Standard colors for partner types - using theme colors where applicable
 */
export const typeColors = {
  'Private Sector': themeColors.primary,     // Blue #009cdc
  'Government': themeColors.secondary,       // Orange #f47a42
  'NGO': '#4caf50',                         // Green
  'Academic': '#9c27b0',                     // Purple
  'International Organization': '#ff9800',    // Orange/Amber
  // Add any missing partner types with theme-aligned colors
  'UN Agency': '#1976d2'                     // Darker blue to complement theme
};

/**
 * Standard colors for node types in network visualization
 */
export const nodeTypeColors = {
  'partner': themeColors.primary,
  'staff': themeColors.secondary
};

/**
 * Colors for project status
 */
export const statusColors = {
  'Planning': themeColors.primary,
  'In Progress': themeColors.secondary,
  'Completed': '#4caf50',
  'Active': themeColors.primary
};

/**
 * Standard regional colors
 */
export const regionColors = {
  'Africa': '#3498db',
  'Asia': '#e74c3c',
  'Europe': '#2ecc71',
  'Latin America': '#f1c40f',
  'Middle East': '#9b59b6',
  'North America': '#1abc9c',
  'Oceania': '#34495e'
};

/**
 * Colors for charts with consistent sequence
 */
export const chartColors = [
  themeColors.primary,   // Primary blue
  themeColors.secondary, // Secondary orange
  '#4caf50',            // Green
  '#9c27b0',            // Purple
  '#ff9800',            // Orange
  themeColors.grey,     // Grey from theme
  '#607d8b',            // Blue Grey
  '#ffc107'             // Amber
];

/**
 * Get color for SDG by number or name
 * 
 * @param {string|number} sdgIdentifier - SDG number or name (e.g., 1 or "SDG 1")
 * @returns {string} HEX color code for the SDG
 */
export const getSDGColor = (sdgIdentifier) => {
  let sdgNumber;
  
  if (typeof sdgIdentifier === 'string') {
    sdgNumber = parseInt(sdgIdentifier.replace('SDG ', ''));
  } else {
    sdgNumber = sdgIdentifier;
  }
  
  const sdgColors = {
    1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D',
    5: '#FF3A21', 6: '#26BDE2', 7: '#FCC30B', 8: '#A21942',
    9: '#FD6925', 10: '#DD1367', 11: '#FD9D24', 12: '#BF8B2E',
    13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B', 16: '#00689D',
    17: '#19486A'
  };
  
  return sdgColors[sdgNumber] || '#777777';
};

/**
 * Get color for a region
 * 
 * @param {string} region - Region name
 * @returns {string} HEX color code for the region
 */
export const getRegionColor = (region) => {
  return regionColors[region] || '#95a5a6';
};

/**
 * Get color for a partner type
 * 
 * @param {string} type - Partner type
 * @returns {string} HEX color code for the partner type
 */
export const getPartnerTypeColor = (type) => {
  return typeColors[type] || '#95a5a6';
};

/**
 * Get color for status
 * 
 * @param {string} status - Status text
 * @returns {string} HEX color code for the status
 */
export const getStatusColor = (status) => {
  return statusColors[status] || '#95a5a6';
};

/**
 * Get chart color by index
 * 
 * @param {number} index - Index in the color array
 * @returns {string} HEX color code from the chart colors array
 */
export const getChartColor = (index) => {
  return chartColors[index % chartColors.length];
};
