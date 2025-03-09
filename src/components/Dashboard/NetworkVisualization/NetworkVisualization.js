import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Chip, Tooltip } from '@mui/material';
import * as d3 from 'd3';
import unidoOrganization from '../../../data/unidoOrganization';
import { getStaffById } from '../../../data/unidoStaff';

const NetworkVisualization = ({ 
  data, 
  width = 800, 
  height = 420, 
  onNodeClick 
}) => {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Define UNIDO organizational units for clustering at component level so they're available throughout
  // Arrange units in a perfect circle for symmetry
  const unidoUnits = [
    { id: 'odg', name: 'Office of the Director General', color: '#2c3e50' },
    { id: 'spp', name: 'Directorate of Strategic Planning, Programming and Policy', color: '#e74c3c' },
    { id: 'iet', name: 'Directorate of SDG Innovation and Economic Transformation', color: '#3498db' },
    { id: 'glo', name: 'Directorate of Global Partnerships and External Relations', color: '#16a085' },
    { id: 'tcs', name: 'Technical Cooperation and Sustainable Industrial Development', color: '#27ae60' }
  ];
  
  // Calculate positions in a perfect circle pattern
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.35; // Use 35% of the smallest dimension
  
  // Position the units in a circle
  unidoUnits.forEach((unit, index) => {
    const angle = (index / unidoUnits.length) * 2 * Math.PI; // Distribute evenly around the circle
    unit.x = centerX + radius * Math.cos(angle); // Convert polar to cartesian coordinates
    unit.y = centerY + radius * Math.sin(angle);
  });
  
  // Track selected organizational unit
  const [selectedUnit, setSelectedUnit] = useState(null);

  // D3 force simulation setup
  useEffect(() => {
    if (!data || !data.nodes || !data.links || data.nodes.length === 0 || !svgRef.current) {
      return;
    }

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Define color scale for node types
    const typeColors = {
      'Private Sector': '#009cdc',
      'Government': '#f47a42',
      'NGO': '#4caf50', 
      'Academic': '#9c27b0',
      'UN Agency': '#ffeb3b',
      'International Organization': '#ff9800'
    };
    
    // Define color scale for UNIDO directorates
    const directorateColors = {
      'odg': '#2c3e50',   // Office of the Director General
      'tcs': '#27ae60',   // Technical Cooperation and Sustainable Industrial Development
      'iet': '#3498db',   // Directorate of SDG Innovation and Economic Transformation
      'spp': '#e74c3c',   // Directorate of Strategic Planning, Programming and Policy
      'glo': '#16a085',   // Directorate of Global Partnerships and External Relations
      'DEFAULT': '#95a5a6' // Default color
    };
    
    // Use imported unidoOrganization and getStaffById from the imports above
    
    // Using the unidoUnits defined at component level
    
    // Assign each partner to an organizational unit based on main contact person
    data.nodes.forEach(node => {
      // Only process partner nodes (not staff or other types)
      if (node.nodeType === 'partner') {
        let assigned = false;
        
        // First attempt to assign based on contact person
        if (node.contactPerson) {
          const staff = getStaffById(node.contactPerson);
          if (staff && staff.unit && staff.unit.directorate) {
            node.unit = staff.unit.directorate;
            node.division = staff.unit.division;
            assigned = true;
          }
        }
        
        // If no assignment was made, use the sector to determine the organizational unit
        if (!assigned) {
          // Map the sector to the appropriate UNIDO directorate
          if (node.sector === 'Directorate of SDG Innovation and Economic Transformation') {
            node.unit = 'iet';
          } else if (node.sector === 'Technical Cooperation and Sustainable Industrial Development') {
            node.unit = 'tcs';
          } else if (node.sector === 'Directorate of Strategic Planning, Programming and Policy') {
            node.unit = 'spp';
          } else if (node.sector === 'Directorate of Global Partnerships and External Relations') {
            node.unit = 'glo';
          } else if (node.sector === 'Office of the Director General') {
            node.unit = 'odg';
          } else {
            node.unit = 'glo'; // Default
          }
        }
        
        // Find the assigned unit
        const assignedUnit = unidoUnits.find(unit => unit.id === node.unit);
        if (assignedUnit) {
          // Store unit color for later use
          node.unitColor = assignedUnit.color;
          // Initialize positions toward the unit center
          node.x = assignedUnit.x + (Math.random() - 0.5) * 100;
          node.y = assignedUnit.y + (Math.random() - 0.5) * 100;
        }
      }
    });

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom)
      .on("click", (event) => {
        // Only handle background clicks (not bubbled events from nodes)
        if (event.target === svg.node()) {
          // Clear all selections when clicking on background
          setSelectedNode(null);
          setSelectedUnit(null);
          updateForcesForSelectedNode(null);
          updateVisualsForSelectedNode(null);
          updateVisualsForSelectedUnit(null);
        }
      });
    
    // Create a container group for all elements
    const g = svg.append("g");

    // Draw organizational unit areas
    const unitAreas = g.selectAll('.unit-area')
      .data(unidoUnits)
      .enter()
      .append('g')
      .attr('class', 'unit-area');
      
    // Add background circles for units with click interactions
    unitAreas.append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 80)
      .attr('fill', d => d.color)
      .attr('opacity', 0.1)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.3)
      .attr('cursor', 'pointer') // Add pointer cursor to indicate clickability
      .on('mouseover', function() {
        // Highlight on hover
        d3.select(this).transition().duration(200)
          .attr('opacity', 0.2);
      })
      .on('mouseout', function(event, d) {
        // Return to normal opacity unless it's the selected unit
        if (!selectedUnit || d.id !== selectedUnit) {
          d3.select(this).transition().duration(200)
            .attr('opacity', 0.1);
        }
      })
      .on('click', (event, d) => {
        // Toggle selection - if already selected, deselect it
        const newSelectedUnit = selectedUnit === d.id ? null : d.id;
        setSelectedUnit(newSelectedUnit);
        
        // Clear any selected node when selecting a unit
        setSelectedNode(null);
        
        // Update visualization based on unit selection
        updateVisualsForSelectedUnit(newSelectedUnit);
        
        event.stopPropagation();
      });
      
    // Add unit labels with the same click functionality
    unitAreas.append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y - 90)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', d => d.color)
      .attr('cursor', 'pointer')
      .text(d => d.name)
      .on('click', (event, d) => {
        // Toggle selection - if already selected, deselect it
        const newSelectedUnit = selectedUnit === d.id ? null : d.id;
        setSelectedUnit(newSelectedUnit);
        
        // Clear any selected node when selecting a unit
        setSelectedNode(null);
        
        // Update visualization based on unit selection
        updateVisualsForSelectedUnit(newSelectedUnit);
        
        event.stopPropagation();
      });
    
    // Create a custom force to cluster nodes by organizational unit
    const unitForce = (alpha) => {
      for (let i = 0; i < data.nodes.length; i++) {
        const node = data.nodes[i];
        const unit = unidoUnits.find(u => u.id === node.unit);
        if (unit) {
          // Apply force toward unit center
          node.vx += (unit.x - node.x) * alpha * 0.2;
          node.vy += (unit.y - node.y) * alpha * 0.2;
        }
      }
    };
    
    // Create a simulation with forces
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links)
        .id(d => d.id)
        .distance(d => 60 + (d.strength || 1) * 10)) // Stronger connections are shorter
      .force("charge", d3.forceManyBody().strength(-150))
      .force("collision", d3.forceCollide().radius(d => calculateNodeSize(d) + 2)) // Prevent node overlap
      .force("x", d3.forceX(width / 2).strength(0.01))
      .force("y", d3.forceY(height / 2).strength(0.01))
      .on("tick", () => {
        // Apply custom unit force in each tick
        unitForce(simulation.alpha());
      });
      
    // Store the simulation in the ref for later access
    simulationRef.current = simulation;

    // Draw links
    const link = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => 1 + (d.strength || 1) * 0.5) // Make link thickness more noticeable
      .attr("stroke", d => {
        // Different colors for different link types
        if (d.type === 'contact-relationship') {
          return '#e74c3c'; // Red for staff-partner links
        }
        if (d.type === 'staff-division') {
          return '#3498db'; // Blue for staff-staff (same division)
        }
        if (d.type === 'staff-directorate') {
          return '#95a5a6'; // Grey for staff-staff (same directorate)
        }
        return '#999'; // Default for partner-partner connections
      })
      .attr("stroke-opacity", d => {
        // Primary links should be more visible
        if (d.type === 'contact-relationship') return 0.8;
        if (d.type === 'staff-division') return 0.7;
        return 0.5;
      })
      .attr("stroke-dasharray", d => {
        // Use dashed lines for certain relationship types
        if (d.type === 'staff-directorate') return '3,3';
        return null;
      })
      .attr("class", "network-link");

    // Create a group for each node
    const node = g.append("g")
      .selectAll(".node")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        // Toggle selected node state
        const newSelectedNode = selectedNode && selectedNode.id === d.id ? null : d;
        setSelectedNode(newSelectedNode);
        
        // Call the parent's click handler if provided
        if (onNodeClick) onNodeClick(d);
        
        // Update visualization based on selection
        if (newSelectedNode) {
          // Modify forces and visuals when a node is selected
          updateForcesForSelectedNode(d);
          updateVisualsForSelectedNode(d.id);
        } else {
          // Reset to default state if deselected
          updateForcesForSelectedNode(null);
          updateVisualsForSelectedNode(null);
        }
        
        event.stopPropagation();
      });

    // Add appropriate shape based on node type (circle for staff, rectangle for partners)
    node.each(function(d) {
      const element = d3.select(this);
      
      if (d.nodeType === 'staff') {
        // Get directorate ID from staff - ensure lowercase for consistency
        const directorate = (d.directorate || '').toLowerCase();
        
        // Get the unit color directly from unidoUnits for consistency
        const unitColor = (() => {
          const unit = unidoUnits.find(u => u.id === directorate);
          return unit ? unit.color : directorateColors.DEFAULT;
        })();
        
        // Save unit info for later reference
        d.unit = directorate;
        d.unitColor = unitColor;
        
        // Staff are circles
        element.append("circle")
          .attr("r", d => calculateNodeSize(d))
          .attr("fill", unitColor)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5);
      } else {
        // Partners are rectangles
        const size = calculateNodeSize(d) * 1.8;
        
        // Get the unit color from the unidoUnits array to ensure consistency
        const unitColor = (() => {
          // Find the organizational unit for this node
          const unitId = d.unit || 'glo'; // Default to global partnerships if no unit
          const unit = unidoUnits.find(u => u.id === unitId);
          return unit ? unit.color : '#fff';
        })();
        
        // Save unit color for later reference
        d.unitColor = unitColor;
        
        element.append("rect")
          .attr("x", -size/2)
          .attr("y", -size/2)
          .attr("width", size)
          .attr("height", size)
          .attr("fill", d => typeColors[d.type] || "#999")
          .attr("stroke", unitColor)
          .attr("stroke-width", 2)
          .attr("rx", 3) // Rounded corners
          .attr("ry", 3);
      }
    });

    // Add text labels to nodes
    node.append("text")
      .attr("dx", d => d.nodeType === 'staff' ? 10 : 12) // Different positioning for staff vs partners
      .attr("dy", ".35em")
      .attr("font-size", d => d.nodeType === 'staff' ? '9px' : '10px') // Smaller font for staff
      .text(d => {
        // Show different information based on node type
        if (d.nodeType === 'staff') {
          return d.name;
        } else {
          return d.name;
        }
      })
      .style("pointer-events", "none")
      .style("fill", "#333")
      .style("font-weight", d => d.nodeType === 'staff' ? 'normal' : 'bold')
      .each(function(d) {
        const textLength = this.getComputedTextLength();
        if (textLength > 100) {
          d3.select(this).text(d.name.slice(0, 12) + "...");
        }
      });

    // Add title for hover tooltip
    node.append("title")
      .text(d => {
        // Get the organizational unit name
        const organizationalUnit = d.unit ? unidoUnits.find(unit => unit.id === d.unit)?.name || 'Unknown' : 'Unknown';
        
        return `${d.name}\nType: ${d.type}\nOrganizational Unit: ${organizationalUnit}\nProjects: ${d.projects || 0}\nRegion: ${d.region || 'Unknown'}`;
      });

    // Define tick function to update positions
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    
    // Function to update node and link appearance based on selected node
    const updateVisualsForSelectedNode = (selectedNodeId) => {
      // Remove any existing unit highlight and info labels
      g.selectAll('.unit-highlight, .node-unit-info').remove();
      
      if (!selectedNodeId) {
        // Reset all nodes and links to default appearance
        node.selectAll('circle, rect')
          .transition().duration(300)
          .attr('stroke-width', d => d.nodeType === 'staff' ? 1.5 : 2)
          .attr('stroke-opacity', 1)
          .attr('opacity', 1);
          
        link.transition().duration(300)
          .attr('stroke-opacity', d => {
            if (d.type === 'contact-relationship') return 0.8;
            if (d.type === 'staff-division') return 0.7;
            return 0.5;
          })
          .attr('stroke-width', d => 1 + (d.strength || 1) * 0.5);
          
        // Reset unit area opacity
        g.selectAll('.unit-area circle')
          .transition().duration(300)
          .attr('opacity', 0.1);
          
        g.selectAll('.unit-area text')
          .transition().duration(300)
          .attr('opacity', 1);
          
        return;
      }
      
      // Get the selected node data
      const selectedNode = data.nodes.find(n => n.id === selectedNodeId);
      if (!selectedNode) return;
      
      // Find the unit for the selected node
      const nodeUnit = selectedNode.unit;
      const unitInfo = unidoUnits.find(u => u.id === nodeUnit);
      
      // Get connected node IDs
      const connectedNodeIds = new Set();
      data.links.forEach(link => {
        if (link.source.id === selectedNodeId) {
          connectedNodeIds.add(link.target.id);
        } else if (link.target.id === selectedNodeId) {
          connectedNodeIds.add(link.source.id);
        }
      });
      
      // Update nodes
      node.selectAll('circle, rect')
        .transition().duration(300)
        .attr('stroke-width', d => {
          if (d.id === selectedNodeId) return 4; // Highlight selected node
          if (connectedNodeIds.has(d.id)) return 3; // Highlight connected nodes
          return d.nodeType === 'staff' ? 1.5 : 2; // Default
        })
        .attr('stroke', d => {
          // Keep organizational unit color on border for easier identification
          if (d.id === selectedNodeId || connectedNodeIds.has(d.id)) {
            return d.unitColor || (d.nodeType === 'staff' ? directorateColors[d.directorate] : '#fff');
          }
          return d.nodeType === 'staff' ? '#fff' : (d.unitColor || '#fff');
        })
        .attr('stroke-opacity', d => {
          if (d.id === selectedNodeId || connectedNodeIds.has(d.id)) return 1;
          return 0.3; // Fade unrelated nodes
        })
        .attr('opacity', d => {
          if (d.id === selectedNodeId || connectedNodeIds.has(d.id)) return 1;
          return 0.3; // Fade unrelated nodes
        });
      
      // Update links
      link.transition().duration(300)
        .attr('stroke-opacity', d => {
          if (d.source.id === selectedNodeId || d.target.id === selectedNodeId) return 1;
          return 0.1; // Fade unrelated links
        })
        .attr('stroke-width', d => {
          if (d.source.id === selectedNodeId || d.target.id === selectedNodeId) {
            return 2 + (d.strength || 1) * 0.5; // Thicker for connected links
          }
          return 0.5; // Thinner for unrelated links
        });
        
      // Fade background unit circles except for the one related to the selected node
      g.selectAll('.unit-area circle')
        .transition().duration(300)
        .attr('opacity', d => d.id === nodeUnit ? 0.2 : 0.05);
        
      g.selectAll('.unit-area text')
        .transition().duration(300)
        .attr('opacity', d => d.id === nodeUnit ? 1 : 0.3);
        
      if (unitInfo) {
        // Add a unit highlight ring around the selected node
        const selectedElem = node.filter(d => d.id === selectedNodeId);
        const nodeData = selectedElem.datum();
        const nodeSize = calculateNodeSize(nodeData) * (nodeData.nodeType === 'staff' ? 1 : 1.8);
        
        // Add organizational unit info label near the selected node
        g.append('text')
          .attr('class', 'node-unit-info')
          .attr('x', nodeData.x)
          .attr('y', nodeData.y - nodeSize - 10)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('font-weight', 'bold')
          .attr('fill', unitInfo.color)
          .text(unitInfo.name)
          .attr('opacity', 0)
          .transition().duration(300)
          .attr('opacity', 1);
      }
    };

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Calculate node size based on node type and attributes
    function calculateNodeSize(node) {
      // Different sizing logic for staff vs partners
      if (node.nodeType === 'staff') {
        // Staff nodes are sized based on their organizational level
        if (!node.division) {
          // Directorate/Director level - larger
          return 8;
        } else {
          // Division level - standard size
          return 6;
        }
      } else {
        // Base size for partner nodes
        let size = 6; 
      
        // Calculate contribution size using a log scale for better differentiation
        let contributionFactor = 0;
        if (node.contributions && node.contributions > 0) {
          // Log scale provides better visual differentiation with large value ranges
          contributionFactor = Math.log10(node.contributions + 1) * 2.5;
        }
      
        // Calculate project size
        let projectFactor = 0;
        if (node.projects && node.projects > 0) {
          projectFactor = Math.sqrt(node.projects) * 1.2;
        }
      
        // Combine factors with higher weight to contributions
        size += contributionFactor + projectFactor;
      
        // Ensure size is within reasonable bounds
        return Math.max(6, Math.min(size, 22));
      }
    }

    // Function to update visuals for selected organizational unit
    const updateVisualsForSelectedUnit = (unitId) => {
      // Reset all visual highlights
      if (!unitId) {
        // Reset all nodes and links to default appearance
        node.selectAll('circle, rect')
          .transition().duration(300)
          .attr('stroke-width', d => d.nodeType === 'staff' ? 1.5 : 2)
          .attr('stroke-opacity', 1)
          .attr('opacity', 1);
          
        link.transition().duration(300)
          .attr('stroke-opacity', d => {
            if (d.type === 'contact-relationship') return 0.8;
            if (d.type === 'staff-division') return 0.7;
            return 0.5;
          })
          .attr('stroke-width', d => 1 + (d.strength || 1) * 0.5);
          
        // Reset unit area opacity
        g.selectAll('.unit-area circle')
          .transition().duration(300)
          .attr('opacity', 0.1);
          
        g.selectAll('.unit-area text')
          .transition().duration(300)
          .attr('opacity', 1);
          
        // Reset forces to default
        simulation.force("x", d3.forceX(width / 2).strength(0.01));
        simulation.force("y", d3.forceY(height / 2).strength(0.01));
        simulation.force("charge", d3.forceManyBody().strength(-150));
        simulation.alpha(0.3).restart();
          
        return;
      }
      
      // Find nodes that are part of this unit
      const unitNodeIds = new Set();
      data.nodes.forEach(n => {
        if (n.unit === unitId) {
          unitNodeIds.add(n.id);
        }
      });
      
      // Find links that connect nodes within this unit
      const unitLinkIds = new Set();
      data.links.forEach((link, i) => {
        if (unitNodeIds.has(link.source.id) && unitNodeIds.has(link.target.id)) {
          unitLinkIds.add(i);
        }
      });
      
      // Update node appearance
      node.selectAll('circle, rect')
        .transition().duration(300)
        .attr('opacity', d => unitNodeIds.has(d.id) ? 1 : 0.2)
        .attr('stroke-width', d => unitNodeIds.has(d.id) ? 3 : 1)
        .attr('stroke-opacity', d => unitNodeIds.has(d.id) ? 1 : 0.3);
      
      // Update link appearance
      link.transition().duration(300)
        .attr('stroke-opacity', (d, i) => unitLinkIds.has(i) ? 1 : 0.1)
        .attr('stroke-width', (d, i) => unitLinkIds.has(i) ? 2 : 0.5);
      
      // Highlight the selected unit background
      g.selectAll('.unit-area circle')
        .transition().duration(300)
        .attr('opacity', d => d.id === unitId ? 0.2 : 0.05);
      
      g.selectAll('.unit-area text')
        .transition().duration(300)
        .attr('opacity', d => d.id === unitId ? 1 : 0.3);
      
      // Find the selected unit
      const selectedUnitInfo = unidoUnits.find(u => u.id === unitId);
      if (selectedUnitInfo) {
        // Modify the forces to pull unit nodes toward their unit center
        simulation.force("x", d3.forceX(d => {
          if (unitNodeIds.has(d.id)) {
            // Pull unit nodes toward unit center
            return selectedUnitInfo.x + (Math.random() - 0.5) * 100;
          } else {
            // Push other nodes away
            return width / 2 + (Math.random() - 0.5) * 200;
          }
        }).strength(d => unitNodeIds.has(d.id) ? 0.2 : 0.05));
        
        simulation.force("y", d3.forceY(d => {
          if (unitNodeIds.has(d.id)) {
            // Pull unit nodes toward unit center
            return selectedUnitInfo.y + (Math.random() - 0.5) * 100;
          } else {
            // Push other nodes away
            return height / 2 + (Math.random() - 0.5) * 200;
          }
        }).strength(d => unitNodeIds.has(d.id) ? 0.2 : 0.05));
        
        // Adjust repulsion force
        simulation.force("charge", d3.forceManyBody()
          .strength(d => unitNodeIds.has(d.id) ? -100 : -30));
        
        // Start the simulation with more energy to create movement
        simulation.alpha(0.5).restart();
      }
    };
    
    // Function to update forces based on the selected node
    const updateForcesForSelectedNode = (selectedNode) => {
      if (!simulation) return;
      
      if (!selectedNode) {
        // Reset to default forces when no node is selected
        simulation.force("x", d3.forceX(width / 2).strength(0.01));
        simulation.force("y", d3.forceY(height / 2).strength(0.01));
        simulation.force("charge", d3.forceManyBody().strength(-150));
        simulation.alpha(0.2).restart();
        return;
      }
      
      // Get directly connected nodes
      const connectedNodeIds = new Set();
      data.links.forEach(link => {
        if (link.source.id === selectedNode.id) {
          connectedNodeIds.add(link.target.id);
        } else if (link.target.id === selectedNode.id) {
          connectedNodeIds.add(link.source.id);
        }
      });
      
      // Modify the node positions - selected node will be centered
      simulation.force("x", d3.forceX(d => {
        if (d.id === selectedNode.id) {
          // Pull selected node toward center
          return width / 2;
        } else if (connectedNodeIds.has(d.id)) {
          // Keep connected nodes close to the center
          return width / 2 + (Math.random() - 0.5) * 100;
        } else {
          // Push unrelated nodes outward
          return width / 2 + (Math.random() - 0.5) * 200;
        }
      }).strength(d => {
        if (d.id === selectedNode.id) return 0.2; // Stronger pull for selected node
        if (connectedNodeIds.has(d.id)) return 0.1; // Medium pull for connected nodes
        return 0.05; // Weak pull for unrelated nodes
      }));
      
      simulation.force("y", d3.forceY(d => {
        if (d.id === selectedNode.id) {
          // Pull selected node toward center
          return height / 2;
        } else if (connectedNodeIds.has(d.id)) {
          // Keep connected nodes close to the center
          return height / 2 + (Math.random() - 0.5) * 100;
        } else {
          // Push unrelated nodes outward
          return height / 2 + (Math.random() - 0.5) * 200;
        }
      }).strength(d => {
        if (d.id === selectedNode.id) return 0.2;
        if (connectedNodeIds.has(d.id)) return 0.1;
        return 0.05;
      }));
      
      // Modify charge force to create more space
      simulation.force("charge", d3.forceManyBody().strength(d => {
        if (d.id === selectedNode.id) return -200; // Stronger repulsion
        if (connectedNodeIds.has(d.id)) return -150; // Normal repulsion
        return -100; // Less repulsion for unrelated nodes
      }));
      
      // Restart the simulation with a higher alpha to create more movement
      simulation.alpha(0.3).restart();
    };
    
    setIsInitialized(true);

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [data, width, height, onNodeClick]);

  // While loading or no data, show appropriate UI
  if (!data || !data.nodes || data.nodes.length === 0) {
    return (
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: '100%', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {!isInitialized && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <CircularProgress />
        </Box>
      )}
      
      <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 100, maxWidth: '220px' }}>
        <Paper elevation={3} sx={{ p: 1, backgroundColor: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="caption" component="div" color="text.secondary">
            <strong>Node shapes:</strong>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box component="span" sx={{ display: 'inline-block', width: 10, height: 10, borderRadius: '2px', backgroundColor: '#009cdc', mr: 1 }} />
            <Typography variant="caption">Partners (squares)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box component="span" sx={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3498db', mr: 1 }} />
            <Typography variant="caption">UNIDO staff (circles)</Typography>
          </Box>
          
          <Typography variant="caption" component="div" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Node colors:</strong>
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            - Partner nodes: Fill color by partner type, border color by organizational unit
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            - Staff nodes: Colored by organizational unit
          </Typography>
          
          <Typography variant="caption" component="div" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Node size:</strong>
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            - Partner nodes: based on contributions & projects
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            - Staff nodes: based on organizational level
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Connection lines:</strong>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box component="span" sx={{ display: 'inline-block', width: 20, height: 2, backgroundColor: '#e74c3c', mr: 1 }} />
            <Typography variant="caption">Staff-Partner connection</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box component="span" sx={{ display: 'inline-block', width: 20, height: 2, backgroundColor: '#3498db', mr: 1 }} />
            <Typography variant="caption">Same division connection</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ display: 'inline-block', width: 20, height: 2, backgroundColor: '#95a5a6', mr: 1, borderTop: '1px dashed #95a5a6' }} />
            <Typography variant="caption">Same directorate connection</Typography>
          </Box>
          
          <Typography variant="caption" component="div" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Organizational Units:</strong>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {unidoUnits.map((unit) => (
              <Chip 
                key={unit.name}
                label={unit.name}
                size="small"
                sx={{ 
                  height: '16px',
                  fontSize: '9px', 
                  backgroundColor: `${unit.color}20`,
                  color: unit.color,
                  border: `1px solid ${unit.color}`,
                  '& .MuiChip-label': { px: 0.5 }
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
      
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    </Box>
  );
};

export default NetworkVisualization;
