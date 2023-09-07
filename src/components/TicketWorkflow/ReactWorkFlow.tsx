import React, { useState, useCallback } from "react";
import ReactFlow, {
    addEdge,
    FitViewOptions,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    Background,
    Controls,
    NodeTypes,
    DefaultEdgeOptions,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from "./CustomNode";
const initialNodes: Node[] = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
};

const nodeTypes: NodeTypes = {
    custom: CustomNode,
};
const ReactWorkFlow: React.FunctionComponent = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );
    React.useEffect(() => {
        console.log("Hello world")
    }, []);
    return (
        <div style={{ height: 800 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div >
    );
}
export default ReactWorkFlow;