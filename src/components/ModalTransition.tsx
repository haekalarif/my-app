import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Modal as AntdModal } from 'antd';
import { CommandButton, IIconProps, PrimaryButton } from "@fluentui/react";
import JoditRTE from "./JoditRTE";

export const ModalTransition = () => {
    const ellipsisIcon: IIconProps = { iconName: 'MoreVertical' };
    const editorRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState<string>("");
    const handleCommentChange = (newValue?: string | undefined): void => {
        console.log(newValue);
        if (newValue && (newValue !== '<p><br></p>')) {
            setComment(newValue);
        }
    }

    const divRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            var key = event.key || event.keyCode;

            if (key === 'ArrowRight' || key === 39) {
                console.log('Tombol panah kanan ditekan.');
                // Tambahkan logika Anda di sini
            } else if (key === 'ArrowLeft' || key === 37) {
                console.log('Tombol panah kiri ditekan.');
                // Tambahkan logika Anda di sini
            } else if (key === 'ArrowUp' || key === 38) {
                console.log('Tombol panah atas ditekan.');
                // Tambahkan logika Anda di sini
            } else if (key === 'ArrowDown' || key === 40) {
                console.log('Tombol panah bawah ditekan.');
                // Tambahkan logika Anda di sini
            }
        };
        console.log(editorRef);
        // Menambahkan event listener pada elemen div
        const divElement: any = editorRef;
        // divElement?.addEventListener('keydown', handleKeyDown);

        // // Membersihkan event listener saat komponen unmount
        // return () => {
        //     divElement?.removeEventListener('keydown', handleKeyDown);
        // };
    }, [editorRef]); // Efek hanya dijalankan sekali setelah komponen dipasang

    return (
        <>
            <PrimaryButton text='Open Modal' onClick={() => setIsModalOpen(true)} />

            <div
                onDoubleClick={event => {
                    console.log(event)
                    return event.stopPropagation();
                }}
                onClick={event => {
                    console.log(event)
                    return event.stopPropagation();
                }}
                onKeyDown={key => {
                    console.log(key)
                }}
                onKeyPress={event => {
                    console.log(event);
                }}
                ref={divRef}
            >
                <AntdModal
                    visible={isModalOpen}
                    onCancel={() => setIsModalOpen(!!!isModalOpen)}
                    footer={null}
                    // width={}
                    destroyOnClose={true}
                    transitionName=""
                    maskClosable={false}
                >
                    <JoditRTE
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder={""}
                        isShowToolbar={true}
                        isShowImageTool={false}
                        ref={editorRef}
                    />
                </AntdModal>
            </div>
        </>
    )
}