import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { ActionButton, DefaultButton, FontWeights, IButtonStyles, IIconProps, IStackStyles, IconButton, Modal, PrimaryButton, Stack, Text, getTheme, mergeStyleSets } from "@fluentui/react";
import { useId, useBoolean } from '@fluentui/react-hooks';
import DocViewerComponent from "./DocViewerComponent";
import CodeViewer from "./CodeViewer";
import AudioPlayer from "./AudioPlayer";
import { format } from "date-fns";
import axios from "axios";


const theme = getTheme();
const buttonStyles: IButtonStyles = mergeStyleSets({
    root: {
        // width: 40,
        // height: 40
    },
    icon: {
        fontSize: 24
    }
});
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const contentStyles: any = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '10px 24px 0px',
        },
    ],
    body: {
        // flex: '4 4 auto',
        padding: '0px 24px',
        display: "flex",
        flexDirection: "column",
        width: '900px',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
        minHeight: '500px'
    },
    footer: {
        marginTop: "auto"
    }
});
const iconButtonStyles: Partial<IButtonStyles> = mergeStyleSets({
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
});
const headerButtonStyles: IStackStyles = {
    root: {
        marginBottom: 15
    }
};
interface IAttachment {
    src: string,
    caption: string,
    createdDateTime: string,
    createdBy: string,
    id: string,
    isImage?: boolean,
    isHyperlink?: boolean,
    // isArchive: boolean
}
interface IDocument {
    id: string,
    uri: string,
    fileType: string,
    fileName: string,
    createdDateTime?: string,
    createdBy?: string,
    size?: any
}

const cloudDownload: IIconProps = { iconName: "CloudDownload" };
const chevronRightSmall: IIconProps = { iconName: "ChevronRightSmall" };
const chevronLeftSmall: IIconProps = { iconName: "ChevronLeftSmall" };

const ViewAttachmentComponent: React.FunctionComponent = (props) => {
    const data: IAttachment[] = [
        // {
        //     "src": "/text_preview/artimatika.cpp",
        //     "caption": "8167227034946101-artimatika.cpp",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "8167227034946101",
        //     "isImage": false
        // },
        // {
        //     "src": "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_XLSX.xlsx",
        //     "caption": "522790540589773-file_example_XLSX_10.xlsx",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "522790540589773",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/file-sample_100kB.rtf",
        //     "caption": "9093004358035708-file-sample_100kB.rtf",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "9093004358035708",
        //     "isImage": false
        // },
        // {
        //     "src": "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PPTX.pptx",
        //     "caption": "44891072808529864-Free_Test_Data_100KB_PPTX.pptx",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "44891072808529864",
        //     "isImage": false
        // },
        {
            "src": "https://calibre-ebook.com/downloads/demos/demo.docx",
            "caption": "6203883909578487-Hello.docx",
            "createdDateTime": "8/3/2023",
            "createdBy": "Haekal Arif Rozikin",
            "id": "6203883909578487",
            "isImage": false
        },
        // {
        //     "src": "/text_preview/hello.py",
        //     "caption": "16574856933607052-hello.py",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "16574856933607052",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/HelloWorld.java",
        //     "caption": "07855160564229324-HelloWorld.java",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "07855160564229324",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/index.css",
        //     "caption": "36864273257887126-index.css",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "36864273257887126",
        //     "isImage": false
        // },
        // {
        //     "src": "https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/organizations/organizations-100.csv",
        //     "caption": "7032140485268548-organizations-100.csv",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "7032140485268548",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/sample_html.html",
        //     "caption": "015443553069231841-sample_html.html",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "015443553069231841",
        //     "isImage": false
        // },
        {
            "src": "https://getsamplefiles.com/download/pdf/sample-5.pdf",
            "caption": "3124941550450453-sample-1.pdf",
            "createdDateTime": "8/3/2023",
            "createdBy": "Haekal Arif Rozikin",
            "id": "3124941550450453",
            "isImage": false
        },
        // {
        //     "src": "/text_preview/sample-3.aac",
        //     "caption": "7518569885034136-sample-3.aac",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "7518569885034136",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/sample-3s.mp3",
        //     "caption": "7989007546614999-sample-3s.mp3",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "7989007546614999",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/sample-3s.wav",
        //     "caption": "9784414724096295-sample-3s.wav",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "9784414724096295",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/status_workflow%20-%20Copy.txt",
        //     "caption": "5060755868650038-status_workflow - Copy.txt",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "5060755868650038",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/status_workflow.txt",
        //     "caption": "9928419021304529-status_workflow.txt",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "9928419021304529",
        //     "isImage": false
        // },
        // {
        //     "src": "/text_preview/testBundle.js",
        //     "caption": "08581249896674126-testBundle.js",
        //     "createdDateTime": "8/3/2023",
        //     "createdBy": "Haekal Arif Rozikin",
        //     "id": "08581249896674126",
        //     "isImage": false
        // }
    ]
    // const docs: any = [
    //     {
    //         id: 1,
    //         uri: require("file:///C:/Users/Candidate/Downloads/text_preview/status_workflow.txt"),
    //         fileType: "txt",
    //         fileName: "txtFile.txt"
    //     },
    //     {
    //         id: 2,
    //         // uri: require("file:///C:/Users/Candidate/Downloads/text_preview/Hello.docx"),
    //         uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
    //         fileType: "docx",
    //         fileName: "docxFile.docx"
    //     },
    //     {
    //         id: 3,
    //         uri: "/text_preview/file-sample_100kB.rtf",
    //         fileType: "rtf",
    //         fileName: "rtfFile.rtf"
    //     },
    //     {
    //         id: 4,
    //         uri: "https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/organizations/organizations-100.csv",
    //         fileType: "csv",
    //         fileName: "csvFile.csv"
    //     },
    //     {
    //         id: 5,
    //         uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
    //         fileType: "xls",
    //         fileName: "xlsFile.xls"
    //     },
    //     {
    //         id: 6,
    //         uri: "https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt",
    //         fileType: "ppt",
    //         fileName: "pptFile.ppt"
    //     },
    //     {
    //         id: 7,
    //         uri: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_XLSX.xlsx",
    //         fileType: "xlsx",
    //         fileName: "xlsxFile.xlsx"
    //     },
    //     {
    //         id: 9,
    //         uri: "https://getsamplefiles.com/download/pdf/sample-5.pdf",
    //         fileType: 'pdf',
    //         fileName: "pdfFile.pdf"
    //     },
    //     {
    //         id: 10,
    //         uri: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PPTX.pptx",
    //         fileType: "pptx",
    //         fileName: "pptxFile.pptx"
    //     },
    //     {
    //         id: 11,
    //         uri: "https://sample-videos.com/doc/Sample-doc-file-100kb.doc",
    //         fileType: "doc",
    //         fileName: "docxFile.doc"
    //     },
    //     {
    //         id: 12,
    //         uri: "https://unpkg.com/scriptjs@2.5.8/dist/script.js",
    //         fileType: "js",
    //         fileName: "jsFile.js"
    //     },
    //     {
    //         id: 13,
    //         uri: "/text_preview/index.css",
    //         fileType: "css",
    //         fileName: "cssFile.css"
    //     },
    //     {
    //         id: 14,
    //         uri: '/text_preview/artimatika.cpp',
    //         fileType: "cpp",
    //         fileName: "cppFile.cpp"
    //     },
    //     {
    //         id: 15,
    //         uri: '/text_preview/hello.py',
    //         fileType: "py",
    //         fileName: "pyFile.py"
    //     },
    //     {
    //         id: 16,
    //         uri: '/text_preview/HelloWorld.java',
    //         fileType: "java",
    //         fileName: "javaFile.java"
    //     },
    //     {
    //         id: 17,
    //         uri: '/text_preview/sample-3s.mp3',
    //         fileType: "mp3",
    //         fileName: "mp3File.mp3"
    //     },
    //     {
    //         id: 18,
    //         uri: '/text_preview/sample-3s.wav',
    //         fileType: "wav",
    //         fileName: "wavFile.wav"
    //     },
    //     {
    //         id: 19,
    //         uri: '/text_preview/sample-3.aac',
    //         fileType: "aac",
    //         fileName: "aacFile.aac"
    //     },
    // ];

    const titleId = useId('title');
    const docFileExt = ['txt', 'docx', 'doc', 'csv', 'ppt', 'xls', 'pdf', 'xlsx', 'pptx'];
    const codeFileExt = ['rtf', 'html', 'css', 'js', 'py', 'java', 'cpp'];
    const audioFileExt = ['mp3', 'wav', 'aac'];
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const [activeDocument, setActiveDocument] = useState<IDocument>();
    const [docType, setDocType] = useState<"file" | "code" | "audio">("file");
    const [docOrder, setDocOrder] = useState<number>(1);
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

    function setDocumentType(extFile) {
        if (docFileExt.includes(extFile)) setDocType("file");
        else if (codeFileExt.includes(extFile)) setDocType("code");
        else if (audioFileExt.includes(extFile)) setDocType("audio");
    }

    function onClickButton() {
        const doc = documents[0];
        console.log(doc)
        const extFile: string = doc?.fileName?.split(".").pop();

        setDocumentType(extFile);
        setActiveDocument(doc);
        setDocOrder(documents.findIndex((item) => item.id == doc.id) + 1);
        showModal();
    }

    function nextButton() {
        const index = documents.findIndex((item) => item.id == activeDocument.id);
        const newIndex = (index + 1);

        if (newIndex > (documents.length - 1)) return;
        const doc = documents[newIndex];

        const extFile: string = doc.fileName?.split(".").pop();
        setDocOrder(newIndex + 1);
        setActiveDocument(doc);
        setDocumentType(extFile);
    }
    function prevButton() {
        const index = documents.findIndex((item) => item.id == activeDocument.id);
        const newIndex = (index - 1);

        if (newIndex < 0) return;
        const doc = documents[newIndex];

        const extFile: string = doc.fileName?.split(".").pop();
        setDocOrder(newIndex + 1);
        setActiveDocument(doc);
        setDocumentType(extFile);
    }
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    async function loadData() {

        let docs: any[] = [];
        for (const item of data) {
            const extFile: string = item.caption?.split(".").pop();
            // const response = await axios.get(item.src, { responseType: 'blob' });
            // const contentLength = response.data['size'];

            const response = await axios.head(item.src);
            const contentLength = response.headers['content-length'];

            // const response = await fetch(item.src, { method: 'HEAD' });
            // const contentLength = response.headers.get('content-length');
            // console.log(response)
            const size = formatFileSize(Number(contentLength));
            docs.push({
                id: item.id,
                uri: item.src,
                fileType: extFile,
                fileName: item.caption,
                createdDateTime: format(new Date(item.createdDateTime), 'd MMM yyyy'),
                createdBy: item.createdBy,
                size: size
            });
        }
        setDocuments(docs);
    }
    { console.log(docType) }
    useEffect(() => {
        console.log("App is running")
        loadData();
    }, [])
    return (
        <div>
            <div className="ms-Grid">
                <div className="ms-Grid-row" style={{ margin: 10 }}>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                        <PrimaryButton
                            text="Open Modal"
                            onClick={onClickButton}
                        />
                    </div>
                </div>
            </div>

            <Modal
                // titleAriaId={titleId}
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={true}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={hideModal}
                    />
                </div>

                <div className={contentStyles.body}>
                    <div>
                        <Stack styles={headerButtonStyles} >
                            <Stack
                                horizontal
                                tokens={{ childrenGap: '10px' }}
                                verticalAlign="center"
                            >
                                <Text variant="xLarge">{activeDocument?.fileName}</Text>
                                <ActionButton
                                    iconProps={cloudDownload}
                                    title="Download"
                                    aria-label="Download"
                                />
                            </Stack>
                            <Stack>
                                <Text>Attached by <b>{activeDocument?.createdBy}</b> on <b>{activeDocument?.createdDateTime}</b></Text>
                            </Stack>
                            <Stack>
                                <Text>{activeDocument?.size}</Text>
                            </Stack>
                        </Stack>
                    </div>

                    {(docType == "file") &&
                        <DocViewerComponent
                            // documents={documents.map((item) => {
                            //     return ({
                            //         id: item?.id,
                            //         uri: item?.uri,
                            //         fileType: item?.fileType,
                            //         fileName: item?.fileName
                            //     })
                            // })}
                            // activeDocument={{
                            //     id: activeDocument?.id,
                            //     uri: activeDocument?.uri,
                            //     fileType: activeDocument?.fileType,
                            //     fileName: activeDocument?.fileName,
                            // }}
                            documents={documents}
                            activeDocument={activeDocument}
                            style={{
                                height: 400,
                                overflowX: "hidden"
                            }}
                        />
                    }
                    {(docType == "code") &&
                        <CodeViewer
                            src={activeDocument?.uri}
                            style={{
                                height: 350,
                            }}
                        />
                    }
                    {(docType == "audio") &&
                        <AudioPlayer
                            src={activeDocument?.uri}
                            style={{
                                width: '100%'
                            }}
                        />
                    }
                    <div className={contentStyles.footer}>
                        <Stack
                            horizontal
                            verticalAlign="center"
                            horizontalAlign="center"
                            tokens={{ childrenGap: 10 }}
                            styles={{ root: { padding: "10px 0px" } }}
                        >
                            <ActionButton
                                iconProps={chevronLeftSmall}
                                styles={buttonStyles}
                                onClick={prevButton}
                            />
                            <Text>{docOrder} / {documents.length}</Text>
                            <ActionButton
                                iconProps={chevronRightSmall}
                                styles={buttonStyles}
                                onClick={nextButton}
                            />
                        </Stack>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewAttachmentComponent;