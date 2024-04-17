import { PrimaryButton, Modal as FluentModal } from '@fluentui/react';
import { Modal as AntdModal } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { getEventListeners } from 'events';

const ModalComponent: React.FC<any> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div
            onDoubleClick={() => {
                console.log("hello")
            }}
            id={"caselist"}
            className={"caselist"}
        >
            <PrimaryButton text='Open Modal' onClick={() => setIsModalOpen(true)} />
            <div onDoubleClick={event => {
                console.log(event)
                return event.stopPropagation();
            }}>
                <AntdModal
                    visible={isModalOpen}
                    onCancel={() => setIsModalOpen(!!!isModalOpen)}
                    footer={null}
                    // width={}
                    destroyOnClose={true}
                    transitionName=""
                    maskClosable={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </AntdModal>
            </div>
            {/* <FluentModal
                isOpen={isModalOpen}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </FluentModal> */}
        </div>
    )

}
export default ModalComponent;