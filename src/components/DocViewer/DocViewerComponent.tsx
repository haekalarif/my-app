import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface IDocViewer {
    documents: any[],
    activeDocument: any,
    style?: Object
}

const DocViewerComponent: React.FunctionComponent<IDocViewer> = (props) => {
    const documents: any[] = props.documents;
    const activeDocument = props.activeDocument;
    const style = props?.style;
    return (
        <DocViewer
            documents={documents}
            pluginRenderers={DocViewerRenderers}
            activeDocument={activeDocument}
            style={style}
            config={{
                header: {
                    disableHeader: true
                },
                pdfVerticalScrollByDefault: true
            }}
        />
    )
}
export default DocViewerComponent;