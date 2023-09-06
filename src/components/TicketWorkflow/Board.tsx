import React from "react"
import { FlowEditor } from "teamswork-library";

const Board: React.FunctionComponent = (props) => {
    return (
        <FlowEditor
            nodes={[]}
            edges={[]}
            onNodeChange={undefined}
            onEdgeChange={undefined}
        />
    )
}

export default Board;