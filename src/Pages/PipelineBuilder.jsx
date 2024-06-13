// src/FlowChart.js

import { useState, useCallback } from "react";
import ReactFlow, { addEdge, Controls, Background, Handle } from "reactflow";
import "reactflow/dist/style.css";

const SourceNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #007BFF",
        borderRadius: 5,
        background: "#E6F7FF",
      }}
    >
      <Handle
        type="source"
        position="right"
        style={{ borderColor: "#007BFF" }}
      />
      <strong>{data.label}</strong>
    </div>
  );
};

const DestinationNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #28A745",
        borderRadius: 5,
        background: "#E6FFE6",
      }}
    >
      <Handle
        type="target"
        position="left"
        style={{ borderColor: "#28A745" }}
      />
      <strong className="">{data.label}</strong>
    </div>
  );
};

const nodeTypes = {
  source: SourceNode,
  destination: DestinationNode,
};

const initialNodes = [
  {
    id: "1",
    type: "source",
    data: { label: "Source 1" },
    position: { x: 50, y: 50 },
  },
  {
    id: "2",
    type: "source",
    data: { label: "Source 2" },
    position: { x: 50, y: 150 },
  },
  {
    id: "3",
    type: "source",
    data: { label: "Source 3" },
    position: { x: 50, y: 250 },
  },
  {
    id: "4",
    type: "destination",
    data: { label: "Destination 1" },
    position: { x: 400, y: 100 },
  },
  {
    id: "5",
    type: "destination",
    data: { label: "Destination 2" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges = [];

const FlowChart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (type) => {
    const lastNodeOfType = nodes
      .filter((node) => node.type === type)
      .slice(-1)[0]; // Get the last node of the same type
    const sourceNodes = nodes.filter((node) => node.type === type);

    const newNode = {
      id: `${nodes.length + 1}`,
      type: type,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
          sourceNodes.length + 1
        }`,
      },
      position: {
        x: lastNodeOfType ? lastNodeOfType.position.x : 50, // If there's no last node, default to 50
        y: lastNodeOfType ? lastNodeOfType.position.y + 100 : 50, // Add 100 to y position of last node of the same type
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onEdgeClick = (event, element) => {
    const updatedElements = edges.filter((edge) => edge.id !== element.id);
    setEdges(updatedElements);
  };

  const onNodeDrag = (event, node) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.id) {
        // Update the position of the dragged node
        return {
          ...n,
          position: { x: node.position.x, y: node.position.y },
        };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button
          className="bg-black text-white rounded-lg p-3 m-2 hover:bg-slate-800"
          onClick={() => addNode("source")}
        >
          Add Source
        </button>
        <button
          className="bg-black text-white rounded-lg p-3 m-2 hover:bg-slate-800"
          onClick={() => addNode("destination")}
        >
          Add Destination
        </button>
      </div>
      <div style={{ height: 600 }}>
        <ReactFlow
          nodes={nodes}
          onNodeDrag={onNodeDrag}
          edges={edges}
          onEdgeClick={onEdgeClick}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowChart;
