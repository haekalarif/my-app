import React, { useState } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Button, Modal, Select } from 'antd';
import { mergeStyleSets } from '@fluentui/react';


const AntdModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const styles = mergeStyleSets({
        headerOption: {
            padding: "4px 12px",
            color: "#0078d4",
            fontWeight: "600"
        }
    })

    const options = [
        // { key: 'resolutionHeader', text: text.components.dialogsResolutionDialog.header, itemType: DropdownMenuItemType.Header },
        { value: 'Fixed', label: "Fixed" }, // Needs to change text for database
        { value: 'Cannot be resolved', label: "Cannot be resolved" }, // Needs to change text for database
        { value: 'Cancelled', label: "Cancelled" }, // Needs to change text for database
    ];
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Select
                // value={props?.resolution}
                style={{ width: 120 }}
                onChange={(value: string) => {

                }}
                options={options}
                dropdownRender={(menu: React.ReactElement) => (
                    <span>
                        <div className={styles.headerOption}>
                            Hello
                        </div>
                        {menu}
                    </span>
                )}
            />
        </>
    );
};

export default AntdModal;