import React, { useState } from "react";
import { IColumn, IIconProps, IconButton, Stack, Text, FontIcon, Toggle, IPersonaProps } from "@fluentui/react";
import { useMediaQuery } from "react-responsive";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ConditionKey, IAutomation, ICondition, IInstance, formatComponent } from "./AutomationRules";
import { addDays, format } from "date-fns";
import { Tag, Tooltip as AntdTooltip } from "antd";
/**
 * Icons
 */

const editIcon: IIconProps = { iconName: 'Edit' };
const deleteIcon: IIconProps = { iconName: 'Delete' };
const globalNavButton: string = "GlobalNavButton";

export const conditionText = {
    requestorAny: "Requestor any of {requestor}",
    requestorEmailContains: "Requestor email contains {text}",
    titleIncludes: "Ticket title includes {text}",
    titleOrDescriptionIncludes: "Ticket title or description includes {text}",
    descriptionIncludes: "Description includes {text}",
    descriptionIsBlank: "Description is blank",
    exactDateIs: "Exact date {field} is {date}",
    exactDateIsBefore: "Exact date {field} is before {date}",
    exactDateIsAfter: "Exact date {field} is after {date}",
    relativeDateIs: "Relative date {field} is {date}",
    relativeDateIsBefore: "Relative date {field} is before {date}",
    relativeDateIsAfter: "Relative date {field} is after {date}",
    tagsIncludesAny: "Tags include any of {tags}",
    tagsIncludesAll: "Tags include all of {tags}",
    tagsIsBlank: "Tags are blank",
    priorityIsAny: "Priority is any of {priority}",
    priorityIsBlank: "Priority is blank",
    departmentIncludesAny: "Department includes any of {list}",
    departmentIsBlank: "Department is blank",
    categoryIncludesAny: "Category includes any of {list}",
    categoryIsBlank: "Category is blank",

    toggleIsTrue: "{field} is true",
    toggleIsFalse: "{field} is false",
    listIncludesAny: "{field} includes any of {list}",
    listIncludesAll: "{field} includes all of {list}",
    listIsBlank: "{field} is blank",
    peoplePickerIncludesAny: "{field} includes any of {list}",
    peoplePickerIncludesAll: "{field} includes all of {list}",
    peoplePickerIsBlank: "{field} is blank",
    emailPickerIncludesAny: "{field} includes any of {list}",
    emailPickerIncludesAll: "{field} includes all of {list}",
    emailPickerIsBlank: "{field} is blank",
    assignee: "Assign ticket to {assignee}",
    priority: "Set priority to {priority}",
    tags: "Apply following tags: {tags}",


    /**
     * This part is text for actions side
     */
    "1_text": "{field} contains {text}",
    "2_textarea": "{field} contains {text}",
    "3_date": "{field} is {date}",
    "4_toggle": "{field} is {boolean}",
    "5_list": "{field} are {list}",
    "6_peoplepicker": "{field} are {list}",
    "7_emailpicker": "{field} are {list}",

};



interface ISpecialList {
    columns: IColumn[],
    items: any[],
    instance: IInstance,
    onRenderHeaderColumn?: Function,
    onRenderItemColumn?: Function,
    tagCategories: any[]
}



const onRenderCondition = (conditions: ICondition[], instance: IInstance, tagCategories: any[], isStopProcessingMoreRules?: boolean) => {

    let string: JSX.Element[] = [];
    conditions?.map((c) => {
        const key = c.key;
        const value = c.value;
        // console.log("key", key);
        if (string.length > 0) string.push(<> and </>)
        /**
         * If it's not first condition we should be change the letter of sentence to be lowercase
        */
        let text: string = conditionText[key];

        let field;
        let popKey;
        if (!!!text) {
            /**
             * We set some custom field has id is separated when construct option condition for custom field, so we need to separate it here
             */
            const splitedKey = String(key).split("_");
            const customFields = instance?.customFieldsLeft.concat(instance?.customFieldsRight);
            const shiftKey = splitedKey.shift();
            popKey = splitedKey.pop();

            if (customFields.find((item) => item.id === key)) field = customFields.find((item) => item.id === key);
            else if (customFields.find((item) => item.id === shiftKey)) field = customFields.find((item) => item.id === shiftKey);

            text = conditionText[popKey];
            /**
              * If text still doesn't exist it mean that the text is custom field in actions side
            */
            if (!!!text) text = conditionText[field.type.key];
        }

        if (string) text = text.replace(/^./, text[0].toLowerCase());

        switch (c.key) {
            case ConditionKey.RequestorAny:
                string.push(formatComponent(text, {
                    requestor: value.map((item: IPersonaProps) => item.text)?.join(", ") as string
                }))
                break;
            case ConditionKey.RequestorEmailContains:
            case ConditionKey.TitleIncludes:
            case ConditionKey.TitleOrDescriptionIncludes:
            case ConditionKey.DescriptionIncludes:
                string.push(formatComponent(text, {
                    text: value
                }));
                break;
            case ConditionKey.ExactDateIs:
            case ConditionKey.ExactDateIsAfter:
            case ConditionKey.ExactDateIsBefore:
                string.push(formatComponent(text, {
                    field: "Expected date",
                    date: format(new Date(value), "dd MMM yyyy")
                }));
                break;
            case ConditionKey.RelativeDateIs:
            case ConditionKey.RelativeDateIsBefore:
            case ConditionKey.RelativeDateIsAfter:
                string.push(formatComponent(text, {
                    field: "Expected date",
                    date: format(addDays(new Date(), value), 'dd MMM yyyy')
                }));
                break;
            case ConditionKey.TagsIncludesAny:
            case ConditionKey.TagsIncludesAll:
            case ConditionKey.Tags:
                string.push(formatComponent(text, {
                    // tags: value?.map((item) => item.split("_").pop().toUpperCase())?.join(", ") as string,
                    tags: (
                        <Stack horizontal tokens={{ childrenGap: 3 }}>
                            {value?.map((item) => {
                                const tag = item.split("_");
                                let id = tag.shift();
                                let text = tag.pop();

                                const tagCategory: any = tagCategories?.find(o => o.id === id);
                                return (
                                    <AntdTooltip title={text?.toUpperCase()} placement="top" >
                                        <a style={{ display: "inline-block" }}>
                                            <Tag
                                                color={tagCategory ? tagCategory.color : "error"}
                                                key={`${id}_${text}`}>
                                                {text?.toUpperCase()}
                                            </Tag>
                                        </a>
                                    </AntdTooltip>
                                )
                            })}
                        </Stack>)
                }));
                break;
            case ConditionKey.PriorityIsAny:
                string.push(formatComponent(text, {
                    priority: value?.map((item) => item.split("_").pop())?.join(", ") as string
                }))
                break;
            case ConditionKey.DepartmentIncludesAny:
            case ConditionKey.CategoryIncludesAny:
                string.push(formatComponent(text, {
                    list: value?.join(", ") as string
                }));
                break
            case ConditionKey.Assignee:
                string.push(formatComponent(text, {
                    assignee: value.map((item: IPersonaProps) => item.text)?.join(", ") as string
                }))
                break;
            case ConditionKey.Priority:
                string.push(formatComponent(text, {
                    priority: value.split("_").pop()
                }))
                break;
            case ConditionKey.DescriptionIsBlank:
            case ConditionKey.TagsIsBlank:
            case ConditionKey.PriorityIsBlank:
            case ConditionKey.DepartmentIsBlank:
            case ConditionKey.CategoryIsBlank:
                string.push(<>{text}</>);
                break;
            default:

                switch (field?.type?.key) {
                    case "1_text":
                    case "2_textarea":
                        string.push(formatComponent(text, {
                            field: field.title,
                            text: value,
                        }));
                        break;
                    case "3_date":

                        switch (popKey) {

                            case ConditionKey.ExactDateIs:
                            case ConditionKey.ExactDateIsBefore:
                            case ConditionKey.ExactDateIsAfter:
                                string.push(formatComponent(text, {
                                    field: field.title,
                                    date: format(new Date(value), "dd MMM yyyy")
                                }));

                                break;
                            case ConditionKey.RelativeDateIs:
                            case ConditionKey.RelativeDateIsBefore:
                            case ConditionKey.RelativeDateIsAfter:
                                string.push(formatComponent(text, {
                                    field: field.title,
                                    date: format(addDays(new Date(), value), 'dd MMM yyyy')
                                }));

                                break;
                            default:
                                /**
                                 * Default is part for actions colomn of the rule
                                 */

                                string.push(formatComponent(text, {
                                    field: field.title,
                                    date: format(new Date(value), 'dd MMM yyyy')
                                }))
                                break;
                        }

                        break;
                    case "4_toggle":
                        switch (popKey) {
                            case ConditionKey.ToggleIsTrue:
                            case ConditionKey.ToggleIsFalse:

                                string.push(formatComponent(text, {
                                    field: field.title
                                }))
                                break;
                            default:
                                /**
                               * Default is part for actions colomn of the rule
                               */

                                string.push(formatComponent(text, {
                                    field: field.title,
                                    boolean: value
                                }));
                                break;
                        }
                        break;
                    case "5_list":
                        switch (popKey) {
                            case ConditionKey.ListIsBlank:
                                string.push(formatComponent(text, {
                                    field: field.title
                                }));
                                break;
                            case ConditionKey.ListIncludesAny:
                            case ConditionKey.ListIncludesAll:
                            default:
                                /**
                                 * Default is part for actions colomn of the rule
                                 */
                                string.push(formatComponent(text, {
                                    field: field.title,
                                    // eslint-disable-next-line array-callback-return
                                    list: value.map((item) => {
                                        let opt = field.options.find((o) => o.key === item);
                                        if (opt) return opt.text;
                                    })?.filter((item) => item !== undefined)?.join(", ") as string
                                }));
                                break;
                        }
                        break;
                    case "6_peoplepicker":

                        switch (popKey) {
                            case ConditionKey.PeoplePickerIsBlank:
                                string.push(formatComponent(text, {
                                    field: field.title
                                }));
                                break;
                            case ConditionKey.PeoplePickerIncludesAny:
                            case ConditionKey.PeoplePickerIncludesAll:
                            default:
                                /**
                                * Default is part for actions colomn of the rule
                                */
                                string.push(formatComponent(text, {
                                    field: field.title,
                                    list: value.map((item: IPersonaProps) => item.text)?.join(", ") as string
                                }));
                                break;
                        }

                        break;
                    case "7_emailpicker":
                        switch (popKey) {
                            case ConditionKey.EmailPickerIsBlank:
                                string.push(formatComponent(text, {
                                    field: field.title
                                }));
                                break;
                            case ConditionKey.EmailPickerIncludesAny:
                            case ConditionKey.EmailPickerIncludesAll:
                            default:
                                /**
                                * Default is part for actions colomn of the rule
                                */
                                string.push(formatComponent(text, {
                                    field: field.title,
                                    // eslint-disable-next-line array-callback-return
                                    list: value.map((item) => {
                                        let opt = field.options.find((o) => o.key === item);
                                        if (opt) return opt.text;
                                    })?.filter((item) => item !== undefined)?.join(", ") as string
                                }));
                                break;
                        }
                        break;
                    default:
                        return <></>;
                }

                break;
        }
    });

    if (isStopProcessingMoreRules) string.push(<> and stop processing more rules</>);
    return <>{string.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)}</>;

}


// eslint-disable-next-line react-hooks/rules-of-hooks
const SpecialList: React.FunctionComponent<ISpecialList> = (props: ISpecialList) => {
    const isSizeChangeScreen = useMediaQuery({ query: "(max-width: 1040px)" });
    const instance = props.instance;
    return (
        <DragDropContext onDragEnd={(data) => {
            console.log(data);
        }}>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-lg12">
                    <div className="listRuleAssignee">

                        <div className={isSizeChangeScreen ? "containHeaderMobile" : "containHeader"}>

                            {/* Header column section */}
                            {props.columns.map((col: IColumn, index) => {
                                return (
                                    <div style={{
                                        padding: '8px 12px',
                                        minWidth: `${isSizeChangeScreen ?
                                            `${String(col.maxWidth + 20)}px` :
                                            `${(index + 1) === props.columns.length ? '' :
                                                `${String(col.maxWidth + 20)}px`}`}`,

                                        maxWidth: `${isSizeChangeScreen ?
                                            `${String(col.maxWidth + 20)}px` :
                                            `${(index + 1) === props.columns.length ? '' :
                                                `${String(col.maxWidth + 20)}px`}`}`,
                                        flexGrow: 1,
                                        // backgroundColor: props.isAutomaticAssignTickets ? "#ededed" : "",
                                    }}
                                        className="item-header"
                                    >
                                        <Stack
                                            style={{ height: '100%' }}
                                            horizontal
                                            verticalAlign='center'
                                        >
                                            <Text>
                                                <strong>
                                                    {col.name}
                                                </strong>
                                            </Text>
                                        </Stack>
                                    </div>
                                )
                            })}
                        </div>
                        {/* Body section */}
                        {props.items.map((item: IAutomation, index) => {
                            // console.log(item);
                            const isOtherwiseCondition = (item.id === "999");

                            return (
                                <Droppable droppableId='rowAssigneeId'>
                                    {(provided: any, snapshot: any) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            isDraggingOver={snapshot.isDraggingOver}
                                        >
                                            <Draggable key={!!!isOtherwiseCondition && item.id} draggableId={!!!isOtherwiseCondition && item.id} index={!!!isOtherwiseCondition && index}>
                                                {(provided: any, snapshot: any) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        isDragging={snapshot.isDragging}
                                                    >
                                                        <div
                                                            className={isSizeChangeScreen ? "containRowMobile" : "containRow"}
                                                            style={{
                                                                backgroundColor: !!!item.enable ? "#f3f2f1" : "",
                                                                cursor: isOtherwiseCondition && "default"
                                                            }}
                                                        >

                                                            {props.columns.map((col) => {

                                                                const style: React.CSSProperties = {
                                                                    padding: "0px 12px",
                                                                    minWidth: `${String(col.maxWidth + 20)}px`,
                                                                    maxWidth: `${String(col.maxWidth + 20)}px`
                                                                }

                                                                switch (col.fieldName) {
                                                                    case "-":
                                                                        return (
                                                                            <Stack
                                                                                style={style}>
                                                                                <FontIcon iconName={globalNavButton} />
                                                                            </Stack>
                                                                        );
                                                                    case "conditions":
                                                                        return (
                                                                            <Stack
                                                                                style={style}>
                                                                                {!!!isOtherwiseCondition ? onRenderCondition(item.conditions, instance, props.tagCategories, item.isStopProcessingMoreRules) : "Otherwise"}
                                                                            </Stack>
                                                                        );
                                                                    case "actions":

                                                                        return (
                                                                            <Stack
                                                                                style={style}>
                                                                                {onRenderCondition(item.actions, instance, props.tagCategories)}
                                                                            </Stack>
                                                                        );
                                                                    case "status":
                                                                        return (
                                                                            <Stack
                                                                                style={style}
                                                                            >

                                                                                <Toggle
                                                                                    onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {

                                                                                    }}
                                                                                    styles={{ root: { margin: 0 } }}
                                                                                />
                                                                            </Stack>
                                                                        );
                                                                    case "action":
                                                                        return (
                                                                            <Stack
                                                                                style={style}>
                                                                                <Stack
                                                                                    style={{
                                                                                        height: '100%'
                                                                                    }}
                                                                                    horizontal
                                                                                    verticalAlign='center'
                                                                                >
                                                                                    <IconButton
                                                                                        // disabled={props.isAutomaticAssignTickets}
                                                                                        iconProps={editIcon}
                                                                                        onClick={(e) => {

                                                                                        }}
                                                                                    />
                                                                                    {!!!isOtherwiseCondition &&
                                                                                        <IconButton
                                                                                            // disabled={props.isAutomaticAssignTickets}
                                                                                            iconProps={deleteIcon}
                                                                                            onClick={(e) => {

                                                                                            }}
                                                                                        />
                                                                                    }
                                                                                </Stack>
                                                                            </Stack>
                                                                        )
                                                                    default:
                                                                        break;
                                                                }
                                                            })}
                                                            <div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })}

                    </div>
                </div>
            </div >
        </DragDropContext >
    )
}

export default SpecialList;