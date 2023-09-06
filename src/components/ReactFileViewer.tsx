import React from "react";
import FileViewer from "react-file-viewer";

function ReactFileViewer(props) {

    const onError = e => {
        console.log(e, "error in file-viewer");
    };
    const type = 'xlsx';
    const file = 'file:///C:/Users/Candidate/Downloads/text_preview/file_example_XLSX_10.xlsx';
    return (
        <div>
            <FileViewer fileType={type} filePath={file} onError={onError} />
        </div>
    );
}
export default ReactFileViewer;