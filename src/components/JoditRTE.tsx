import React, { useState, useRef, useMemo } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';
import { TextField } from '@fluentui/react';
import { Modal } from 'antd';

const JoditRTE: React.FC<any> = ({ placeholder, disabled }) => {
    const documentRef = useRef(null);
    const [content, setContent] = useState("");
    const buttons = ['paragraph', 'font', 'fontsize', 'brush', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'align', 'ol', 'ul', '|', 'link', 'image'];
    const config: any = useMemo(() => ({
        readonly: false,
        toolbar: true,
        disabled: disabled,
        placeholder: placeholder || 'Start typings...',
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        buttons: buttons,
        buttonsXS: buttons,
        buttonsMD: buttons,
        buttonsSM: buttons,
        enableDragAndDropFileToEditor: false,
        uploader: {
            insertImageAsBase64URI: true,
            url: ""

        },
        popup: {
            img: false,
        },
        link: {
            followOnDblClick: false,
            noFollowCheckbox: false,
            openInNewTabCheckbox: false,
            classNameForm: false
        },
        colorPickerDefaultTab: "text",
        controls: {
            font: {
                list: Jodit.atom({
                    'sans-serif': 'Sans Serif',
                    'calibri': 'Calibri',
                    'Segoe UI': 'Segoe UI',
                    "'Times New Roman',Times,serif": 'Times New Roman',
                    'monospace': 'Monospace'
                })
            },
            ul: {
                list: Jodit.atom({
                    default: 'Default',
                    circle: 'Circle',
                    square: 'Square'
                })
            },

        },
        minHeight: 150,
        // tabIndex: 1,
        // onFocus: true
    }), []);

    return (
        <div>
            <JoditEditor
                ref={documentRef}
                value={content}
                config={config}
                // onBlur={onBlurEditor} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {
                    console.log(newContent);
                    if (newContent && (newContent !== '<p><br></p>')) setContent(newContent);
                    // else setContent("")

                }}

            />
        </div>
    );
};

export default JoditRTE;