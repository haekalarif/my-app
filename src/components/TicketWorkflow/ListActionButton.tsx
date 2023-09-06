import React, { useEffect } from "react";
import { ActionButton, BaseButton, CommandButton, Dropdown, ICommandBarItemProps, IComponentAs, IComponentAsProps, IContextualMenuItem, IContextualMenuProps, IIconProps } from "@fluentui/react";
import { useState } from "react";
import { IWorkflowStep, activeItem } from "./Workflow";

const viewIcon: IIconProps = { iconName: 'DocumentSearch' };
const editIcon: IIconProps = { iconName: 'Edit' };
const assignIcon: IIconProps = { iconName: 'Assign' };
const startIcon: IIconProps = { iconName: 'Forward' };
const reopenIcon: IIconProps = { iconName: 'Reply' };
const priorityIcon: IIconProps = { iconName: 'SortUp' };
const resolveIcon: IIconProps = { iconName: 'CheckMark' };
const closeIcon: IIconProps = { iconName: 'Archive' };
const ellipsisIcon: IIconProps = { iconName: 'MoreVertical' };
const linkIcon: IIconProps = { iconName: 'Link' };

const CaseActionEnum = {
    view: 'viewCase',
    edit: 'editCase',
    start: 'startCase',
    resolve: 'resolveCase',
    close: 'closeCase',
    reopen: 'reopenCase',
    assignToMe: 'assignCaseToMe',
    priority: 'setPriorityCase'
}
const CaseStatusEnum = {
    open: "Open",
    inProgress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
    reopened: "Reopened"
}

const ListActionButton: React.FunctionComponent = (props) => {

    const [menuProps, setMenuProps] = useState<IContextualMenuProps>();

    const customViewButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton
                iconProps={viewIcon}
                id={CaseActionEnum.view}
                text={"View Ticket"}
            />
        )

    };
    const customEditButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton
                iconProps={editIcon}
                id={CaseActionEnum.edit}
                text={"Edit Ticket"}
            />
        )
    };
    const customPriorityButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>, dismissMenu) => {
        return (
            <Dropdown
                options={[]}
                // label={text.components.CaseItemButtons.priority}
                onChange={(event, option, index) => {
                    // _handlePriorityChange(event, option, index)
                    // dismissMenu()
                }}
            // placeholder={text.components.CaseItemButtons.priorityPlaceholder}
            // defaultValue={item.priority}
            // action={props.action}
            // value={priority}
            // styles={dropdownStyles}
            />
        )
    };
    const customAssignToButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>, dismissMenu) => {
        return (
            <></>
        )
    };
    const customAssignToMeButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton
                iconProps={startIcon}
                id={CaseActionEnum.assignToMe}
                text={"Assign to me"}
            />
        )
    };
    const customStartButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton iconProps={startIcon} id={CaseActionEnum.start} text={"Start Ticket"} />
        )
    };
    const customReopenButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton iconProps={reopenIcon} id={CaseActionEnum.reopen} text={"Reopen Ticket"} />
        )
    };
    const customResolveButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton iconProps={resolveIcon} id={CaseActionEnum.resolve} text={"Resolve Ticket"} />
        )
    };
    const customCloseButton: IComponentAs<ICommandBarItemProps> = (props: IComponentAsProps<ICommandBarItemProps>) => {
        return (
            <ActionButton iconProps={closeIcon} id={CaseActionEnum.close} text={"Close Ticket"} />
        )
    };
    let baseMenuItems: IContextualMenuItem[] = [
        {
            ariaLabel: "View Ticket",
            key: 'viewCase',
            iconProps: viewIcon,
            onRender: customViewButton
        },
        {
            ariaLabel: "Edit Ticket",
            key: 'editCase',
            iconProps: editIcon,
            onRender: customEditButton
        },
        {
            ariaLabel: "Change Priority",
            key: 'setPriorityCase',
            iconProps: priorityIcon,
            onRender: customPriorityButton,
            data: { enabledInStatus: [CaseStatusEnum.open, CaseStatusEnum.reopened, CaseStatusEnum.inProgress] }
        },
        {
            ariaLabel: 'Assign To',
            key: 'setAssignee',
            iconProps: assignIcon,
            onRender: customAssignToButton,
        },
        {
            ariaLabel: 'Assign to Me',
            key: 'assignToMe',
            iconProps: assignIcon,
            onRender: customAssignToMeButton
        },
        {
            ariaLabel: "Start Ticket",
            key: 'startCase',
            iconProps: startIcon,
            onRender: customStartButton,
            data: { enabledInStatus: [CaseStatusEnum.open] }
        },
        {
            ariaLabel: 'Resolve ticket',
            key: 'resolveCase',
            iconProps: resolveIcon,
            onRender: customResolveButton,
            data: { enabledInStatus: [CaseStatusEnum.open, CaseStatusEnum.reopened, CaseStatusEnum.inProgress] }
        },
        {
            ariaLabel: 'Reopen ticket',
            key: 'reopenCase',
            iconProps: reopenIcon,
            onRender: customReopenButton,
            data: { enabledInStatus: [CaseStatusEnum.resolved, CaseStatusEnum.closed] }
        },
        {
            ariaLabel: 'Close ticket',
            key: 'closeCase',
            iconProps: closeIcon,
            onRender: customCloseButton,
            data: { enabledInStatus: [CaseStatusEnum.reopened, CaseStatusEnum.resolved, CaseStatusEnum.open, CaseStatusEnum.inProgress] }
        },
        {
            ariaLabel: 'Copy link to ticket',
            key: 'copyLink',
            iconProps: linkIcon,
            text: "Copy Link",
            // onClick: handleCopyLink
        },
    ];

    function onClickWorkflowButton(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | HTMLSpanElement, MouseEvent>, item?): void | undefined {
        const eventTarget: any = event.currentTarget;
        const buttonId: string = eventTarget.id
        console.log(buttonId);
    }
    function loadActionButtons() {
        if (activeItem?.workflow && activeItem?.workflow?.length > 0) {
            baseMenuItems = baseMenuItems.filter((item) => !!!["startCase", "resolveCase", "reopenCase", "closeCase"].includes(item.key))
            let actionList: IContextualMenuItem[] = [];
            const workflow: IWorkflowStep | undefined = activeItem.workflow.find((item) => item.id == activeItem.status);
            if (workflow) {
                workflow.nextSteps.map((item) => {
                    actionList.push({
                        key: item.targetId,
                        ariaLabel: item.transitionLabel,
                        text: item.transitionLabel,
                        iconProps: { iconName: item.transitionIcon },
                        onRender: () => {
                            return (
                                <ActionButton
                                    iconProps={{ iconName: item.transitionIcon }}
                                    id={item.targetId}
                                    // text={item.transitionLabel}
                                    text={item.transitionLabel}
                                    onClick={(e: any) => onClickWorkflowButton(e, activeItem)}
                                />
                            )
                        }
                    })
                })
                // embed action list from workflow
                baseMenuItems.splice(5, 0, ...actionList);
            }
            setMenuProps({ items: baseMenuItems })
        }
    }
    useEffect(() => {
        loadActionButtons();
    }, []);

    return (
        <CommandButton
            id={'CaseItemButtons'}
            iconProps={ellipsisIcon}
            menuProps={menuProps}
            onRenderMenuIcon={() => <></>}
            // onRenderIcon={handleRenderEllipsis}
            // style={{ padding: 0, margin: 0, height: 11 }}
            text={""}
        />

    )

}
export default ListActionButton;