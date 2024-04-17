import { IButtonStyles, IContextualMenuItem, IContextualMenuProps, CommandButton, DefaultButton, IconButton } from "@fluentui/react";
import React, { useEffect } from "react";

export default function Text(props) {
    useEffect(() => {
        // loadData();
    }, []);
    const actionButtonStyles: IButtonStyles = {
        root: { minWidth: "" },
        splitButtonMenuButton: {
            padding: 0,
            border: "none",
            backgroundColor: "#fff"
        },
        splitButtonContainer: {
            minWidth: ""
        },
    };
    const menuProps: IContextualMenuProps = {
        items: [
            {
                key: 'Delete',
                text: 'Delete',
                iconProps: { iconName: 'Delete' },
                onClick: (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>, props?: IContextualMenuItem) => {
                    // setDeletedIndex(index);
                    // setActiveAttachment(item);
                    // setShowDeleteDialog(true);
                }
            }
        ],
        styles: {
            root: {
                minWidth: ""
            }
        }
    };
    return (<>

        <CommandButton
            split
            iconProps={{ iconName: "Archive" }}
            menuProps={menuProps}
            styles={actionButtonStyles}
            // onMenuClick={() => {
            //     console.log("haha")
            // }}
            onClick={() => {
                console.log("haha")
            }}
        />

        {/* <IconButton
            iconProps={{ iconName: "Archive" }}
            split
            splitButtonAriaLabel="See 2 options"
            aria-roledescription="split button"
            menuProps={menuProps}
            styles={{
                root: {
                    minWidth: 0
                },
                splitButtonMenuButton: {
                    border: "none",
                    backgroundColor: "#fff"
                }
            }}
            onClick={() => {
                console.log("haha")
            }}
        // disabled={disabled}
        // checked={checked}
        /> */}
    </>)
}
