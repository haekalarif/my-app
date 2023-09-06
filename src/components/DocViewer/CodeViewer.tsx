import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import atelierCaveDark from "react-syntax-highlighter/dist/esm/styles/hljs/atelier-cave-dark";
import axios from "axios";

interface ICodeViewer {
    src: string,
    style?: Object
}

const CodeViewer: React.FunctionComponent<ICodeViewer> = (props) => {
    const fileUrl = props.src;
    const style = props?.style;
    const [fileContent, setFileContent] = useState('');

    async function getFile() {
        try {
            const res = await axios.get(fileUrl)
            setFileContent(res.data);
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFile();
    }, [fileUrl]);

    return (
        <div>
            <SyntaxHighlighter
                showLineNumbers
                showInlineLineNumbers
                style={atelierCaveDark}
                customStyle={style}
                wrapLongLines
            >
                {fileContent}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeViewer;