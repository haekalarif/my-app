import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';
import { TextField } from '@fluentui/react';
import { Modal } from 'antd';

const JoditRTE: React.FC<any> = (props) => {
    console.log(props);
    const editorRef: any = useRef();

    const placeholder = props.placeholder;
    const disabled = props.disabled;
    const value = props.value;
    const onChange = props.onChange;

    // const [content, setContent] = useState("");
    const buttons = ['paragraph', 'font', 'fontsize', 'brush', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'align', 'ol', 'ul', '|', 'link', 'image'];
    const config: any = useMemo(() => ({
        placeholder: placeholder ? placeholder : "",
        toolbar: props.isShowToolbar,
        disabled: props.disabled,
        readonly: false,
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        minHeight: 150,
        buttons: buttons,
        buttonsXS: buttons,
        buttonsMD: buttons,
        buttonsSM: buttons,
        uploader: {
            insertImageAsBase64URI: true,
        },
        popup: {
            img: false,
        },
        link: {
            followOnDblClick: false,
            noFollowCheckbox: false,
            openInNewTabCheckbox: false,
        },
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
        colorPickerDefaultTab: "text",
    }), [disabled]);

    return (
        // <div>
        <JoditEditor
            ref={editorRef}
            value={value}
            config={config}
            // onBlur={onBlurEditor} // preferred to use only this option to update the content for performance reasons
            onChange={onChange}
            onBlur={newContent => {
                console.log("on Blur")
                console.log(editorRef)
                editorRef?.current?.input?.focus()
            }}
        />
        // </div>
    );
};

export default JoditRTE;