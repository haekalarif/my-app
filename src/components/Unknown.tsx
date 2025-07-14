import { addDays, Callout, Dropdown, DropdownMenuItemType, IColumn, Icon, IDropdownOption, IIconProps, IPersonaProps, ITooltipHostProps, Label, Stack, Text, TextField } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Tag } from 'antd';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { CaseStatusEnum, ICustomField, IFilterByColumn, IInstance, INodeData, ITagCategory, priorityOptionsConst, StatusColorEnum } from '../Types';
import { LangContext } from '../Page';
import { DatePickerBasic } from './DatePicker';
import DropdownFilter from './DropdownFilter';
import { isMobile } from 'react-device-detect';
import DropdownBasic from './DropdownBasic';
import { RequestorPicker } from './RequestorPicker';
import { NodeTypeEnum, ReactFlow } from '@kitameraki/teamswork-library';
import { generatePersona } from '../helper/Helper';
import NewRequestorPicker from './NewRequestorPicker';

function _handleFilterByColumn(data: { newData: IFilterByColumn[] | any, handleFilterByColumn: Function }) {
    data.handleFilterByColumn(data.newData);
}

const handleFilterByColumn = debounce(_handleFilterByColumn, 800);

const TextType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, resetFilterByColumn: any, text: any }) => {

    const onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>, newValue?: string) => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        if (newValue) {
            if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
                newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: newValue } : item)
            } else {
                newData = [...newData, { id: props.column?.key, value: newValue, type: '1_text' }]
            }
        } else {
            newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key);
        }
        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
    }

    const onRenderSuffix = () => {
        if (props.filterItem?.value) return (<ActionButton iconProps={{ iconName: "Clear" }} styles={{ root: { height: 30 } }} onClick={props.resetFilterByColumn} />);
        else return (<></>);
    }




    const options: IDropdownOption[] = [
        // { key: 'resolutionHeader', text: props.text.components.dialogsResolutionDialog.header, itemType: DropdownMenuItemType.Header },
        { key: '', text: "" }, // Needs to change text for database
        { key: 'Fixed', text: props.text.components.dialogsResolutionDialog.fixed }, // Needs to change text for database
        { key: 'Cannot be resolved', text: props.text.components.dialogsResolutionDialog.cannotResolve }, // Needs to change text for database
        { key: 'Cancelled', text: props.text.components.dialogsResolutionDialog.cancelled }, // Needs to change text for database
    ];

    // special for column Resolution
    if (props.column?.key == "column16") {
        return (
            <Dropdown
                options={options}
                onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                    if (option) onChange(event, option.key.toString())
                }}
                styles={{ dropdownItems: { maxHeight: 360 } }}
                selectedKey={props.filterItem?.value ?? ""}
            />
        )
    } else {
        return (
            <Stack>
                <TextField
                    placeholder={props.text.container.Landing.enterTextToFilter}
                    onChange={onChange}
                    value={props.filterItem?.value ?? ""}
                    onRenderSuffix={onRenderSuffix}
                    styles={{
                        suffix: {
                            padding: 0
                        }
                    }}
                />
            </Stack>
        )
    }
}

const TagType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, text: any, tagCategoriesOption: IDropdownOption[], CaretDown: any }) => {

    const onChange = (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        let optionKey = option.key.toString();
        if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
            if (props.filterItem.value.length > 0) {
                if (props.filterItem.value.filter((item) => item == optionKey).length < 1) {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: [...item.value, optionKey] } : item)
                } else {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: item.value.filter((item) => item !== optionKey) } : item);

                    if (newData.find((item: IFilterByColumn) => item.id == props.column?.key)?.value.length < 1) newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key)
                }
            }
        } else {
            newData = [...newData, { id: props.column?.key, value: [optionKey], type: '2_list' }]
        }
        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);
    }
    function onRenderTitleTagCategories(option: IDropdownOption[]) {
        return (
            option.map((item: IDropdownOption) => (
                <Tag
                    color={item.data.color}
                    key={item.key}
                >
                    {item.text}
                </Tag>
            ))
        );
    }

    function onRenderOptionTagCategories(option: IDropdownOption) {
        return (
            <Tag
                color={option.data.color}
                key={option.key}
            >
                {option.text}
            </Tag>);
    }

    return (
        <DropdownBasic
            placeholder={props.text.container.Landing.selectAnOption}
            multiSelect={true}
            onChange={onChange}
            options={props.tagCategoriesOption}
            selectedKeys={props.filterItem?.value ?? []}
            styles={{ dropdown: { width: '100%' }, dropdownItems: { maxHeight: 360 } }}
            onRenderTitle={onRenderTitleTagCategories}
            onRenderOption={onRenderOptionTagCategories}
            onRenderCaretDown={props.CaretDown}
        />
    )
}

const PriorityType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, text: any, CaretDown: any }) => {

    const onChange = (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        let optionKey = option?.key.toString();
        if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
            if (props.filterItem.value.length > 0) {
                if (props.filterItem.value.filter((item) => item == optionKey).length < 1) {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: [...item.value, optionKey] } : item)
                } else {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: item.value.filter((item) => item !== optionKey) } : item)


                    if (newData.find((item: IFilterByColumn) => item.id == props.column?.key)?.value.length < 1) newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key)
                }
            }
        } else {
            newData = [...newData, { id: props.column?.key, value: [option?.key.toString()], type: '2_list' }]
        }

        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);
    }

    const priorityOptions: IDropdownOption[] = [
        { key: priorityOptionsConst.allCases, text: props.text.container.Landing.allTickets },
        { key: priorityOptionsConst.urgent, text: props.text.container.Landing.urgent },
        { key: priorityOptionsConst.important, text: props.text.container.Landing.important },
        { key: priorityOptionsConst.medium, text: props.text.container.Landing.medium },
        { key: priorityOptionsConst.low, text: props.text.container.Landing.low },
    ];

    return (
        <DropdownFilter
            options={priorityOptions}
            ariaLabel={!!!isMobile ? props.text.container.Landing.priorityFilterHeader : props.text.container.Landing.priorityFilterHeaderMobile}
            placeholder={!!!isMobile ? props.text.container.Landing.priorityFilterHeader : props.text.container.Landing.priorityFilterHeaderMobile}
            onChange={onChange}
            multiSelect={true}
            selectedKeys={props.filterItem?.value ?? []}
            onRenderCaretDown={props.CaretDown}
        />)
}

const StatusType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, text: any, CaretDown: any, instance: IInstance }) => {
    const instance: IInstance = props.instance;

    const onChange = (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        let optionKey = option?.key.toString();
        if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
            if (props.filterItem.value.length > 0) {
                if (props.filterItem.value.filter((item) => item == optionKey).length < 1) {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: [...item.value, optionKey] } : item)
                } else {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: item.value.filter((item) => item !== optionKey) } : item);

                    if (newData.find((item: IFilterByColumn) => item.id == props.column?.key)?.value.length < 1) newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key)
                }
            }
        } else {
            newData = [...newData, { id: props.column?.key, value: [optionKey], type: '2_list' }]
        }

        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);

    }

    // On render option for status component
    function onRenderOption(option: IDropdownOption | IDropdownOption[]) {
        function renderItem(option: IDropdownOption) {

            /**
             * Indicates the statuses of the workflow
             */
            if (option.hasOwnProperty("data")) {
                return (
                    <Tag
                        color={option.data.color}
                        key={option.key}
                        style={option.key == CaseStatusEnum.open ? { color: '#000000', border: '1px solid #000000' } : {}}
                    >
                        {option.text}
                    </Tag>);
            } else {
                switch (option.key) {
                    case CaseStatusEnum.open:
                        return (
                            <Tag
                                color={StatusColorEnum.open}
                                key={option.key}
                                style={{ color: '#000000', border: '1px solid #000000' }}
                            >
                                {option.text}
                            </Tag>);
                        break;
                    case CaseStatusEnum.inProgress:
                        return (
                            <Tag
                                color={StatusColorEnum.inProgress}
                                key={option.key}
                            >
                                {option.text}
                            </Tag>);
                        break;
                    case CaseStatusEnum.reopened:
                        return (
                            <Tag
                                color={StatusColorEnum.reopened}
                                key={option.key}
                            >
                                {option.text}
                            </Tag>);
                        break;
                    case CaseStatusEnum.resolved:
                        return (
                            <Tag
                                color={StatusColorEnum.resolved}
                                key={option.key}
                            >
                                {option.text}
                            </Tag>);
                        break;
                    case CaseStatusEnum.closed:
                        return (
                            <Tag
                                color={StatusColorEnum.closed}
                                key={option.key}
                            >
                                {option.text}
                            </Tag>);
                        break;
                    default:
                        break;
                }
            }
        }
        if (Array.isArray(option)) return (option.map((item) => { return renderItem(item) }))
        else return renderItem(option);
    }

    let statusOptions: IDropdownOption[] = [
        { key: CaseStatusEnum.open, text: props.text.types.CaseStatusEnum.open },
        { key: CaseStatusEnum.inProgress, text: props.text.types.CaseStatusEnum.inProgress },
        { key: CaseStatusEnum.reopened, text: props.text.types.CaseStatusEnum.reopened },
        { key: CaseStatusEnum.resolved, text: props.text.types.CaseStatusEnum.resolved },
        { key: CaseStatusEnum.closed, text: props.text.types.CaseStatusEnum.closed },
    ];
    if (instance?.workflows && instance?.workflows?.isCustomWorkflow) {
        const workflowOptions: IDropdownOption[] = instance.workflows?.ticket[0]?.nodes.map((item: ReactFlow.Node<INodeData, NodeTypeEnum>) => {
            return ({
                key: item.id,
                text: item.data.label,
                data: item.data
            });
        });
        statusOptions = workflowOptions;
    }

    return (
        <DropdownBasic
            placeholder={props.text.container.Landing.selectAnOption}
            onChange={onChange}
            options={statusOptions}
            selectedKeys={props.filterItem?.value ?? []}
            styles={{ dropdown: { width: '100%' } }}
            onRenderTitle={onRenderOption}
            onRenderOption={onRenderOption}
            multiSelect={true}
            onRenderCaretDown={props.CaretDown}
        />
    )
}

const PeoplePickerType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, text: any, CaretDown: any, peoples: IPersonaProps[], user: IPersonaProps, columnCustomField: ICustomField }) => {

    const onChange = (users?: IPersonaProps[] | undefined): void | undefined => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        if (users.length > 0) {
            /**
             * Checking if there is invalid user
             * Actually this validation when user onBlur people picker form 
             */
            if (users.length == 1 && users[0]?.hasOwnProperty("key") && !!!users[0]?.key) return;

            if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
                newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: users } : item)
            } else {
                newData = [...newData, { id: props.column?.key, value: users, type: '2_list' }]
            }
        } else {
            newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key);
        }
        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);
    }

    return (
        <NewRequestorPicker
            peoples={props.peoples.length > 0 ? props.peoples : undefined}
            userId={props.user.id}
            onChange={onChange}
            value={props.filterItem?.value ?? []}
            placeholder={props.text.container.Landing.selectAnOption}
        />
    )
}

const ListType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, text: any, CaretDown: any, columnCustomField: ICustomField }) => {

    const onChange = (_, option: IDropdownOption) => {
        // console.log(option)
        let newData: IFilterByColumn[] = props.filterByColumn;
        let optionKey = option?.key.toString();
        if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
            if (props.filterItem.value.length > 0) {
                if (props.filterItem.value.filter((item) => item == optionKey).length < 1) {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: [...item.value, optionKey] } : item);
                } else {
                    newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: item.value.filter((item) => item !== optionKey) } : item);

                    if (newData.find((item: IFilterByColumn) => item.id == props.column?.key)?.value.length < 1) newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key)
                }
            }
        } else {
            newData = [...newData, { id: props.column?.key, value: [optionKey], type: '2_list' }];
        }
        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);

    }

    return (
        <Dropdown
            placeholder={props.text.container.Landing.selectAnOption}
            options={props.columnCustomField.options}
            multiSelect={true}
            onChange={onChange}
            selectedKey={props.filterItem?.value ?? []}
            selectedKeys={props.filterItem?.value ?? []}
            onRenderCaretDown={props.CaretDown}
            styles={{ dropdownItems: { maxHeight: 360 } }}
        />
    )
}

const DateType = (props: { filterByColumn: IFilterByColumn[], setFilterByColumn: Function, column: IColumn, handleFilterByColumn: Function, filterItem: IFilterByColumn, text: any, CaretDown: any }) => {
    console.log(props);
    if (!props) return null;
    const onChangeFrom = (date: Date | null | undefined): void | undefined => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        if (date) {
            if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
                newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: { ...item.value, from: date } } : item);
            } else {
                newData = [...newData, { id: props.column?.key, value: { from: date, to: '' }, type: '3_date' }]
            }
            props?.setFilterByColumn(newData);
            handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
            // handleFilterByColumn(newData);
        }
    }

    const onClearFrom = () => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        if (!!!newData.find((item: IFilterByColumn) => item.id == props.column?.key)?.value.to) {
            newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key);
        } else {
            newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: { ...item.value, from: '' } } : item);
        }
        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);
    }


    const onChangeTo = (date: Date | null | undefined): void | undefined => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        if (date) {
            if ([...newData].filter((item: IFilterByColumn) => item.id == props.column?.key).length > 0) {
                newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: { ...item.value, to: date } } : item)
            } else {
                newData = [...newData, { id: props.column?.key, value: { from: '', to: date }, type: '3_date' }]
            }
            props?.setFilterByColumn(newData);
            handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
            // handleFilterByColumn(newData);
        }
    }

    const onClearTo = () => {
        let newData: IFilterByColumn[] = props.filterByColumn;
        if (!!!newData.find((item: IFilterByColumn) => item.id == props.column?.key)?.value.from) {
            newData = newData.filter((item: IFilterByColumn) => item.id !== props.column?.key);
        } else {
            newData = newData.map((item: IFilterByColumn) => item.id == props.column?.key ? { ...item, value: { ...item.value, to: '' } } : item);
        }
        props?.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn })
        // handleFilterByColumn(newData);
    }



    return (
        <Stack>
            <Stack style={{ marginBottom: '10px' }}>
                <Text>From</Text>
                <DatePickerBasic
                    onClear={onClearFrom}
                    onSelectDate={onChangeFrom}
                    // value={props?.filterItem?.value?.from}
                    maxDate={props?.filterItem?.value?.to && addDays(props.filterItem?.value?.to, -1)}
                />
            </Stack>
            <Stack>
                <Text>To</Text>
                <DatePickerBasic
                    onClear={onClearTo}
                    onSelectDate={onChangeTo}
                    // value={props?.filterItem?.value?.to}
                    minDate={props?.filterItem?.value?.from && addDays(props.filterItem?.value?.from, 1)}
                />
            </Stack>
        </Stack>
    )
}

const SettingByColumn: React.FC<any> = (props: { instance: IInstance, tooltipHostProps: ITooltipHostProps | any, filterByColumn: IFilterByColumn[], setFilterByColumn: Function, tagCategories: ITagCategory[], members: IPersonaProps[], owners: IPersonaProps[], handleFilterByColumn: Function | any, columnHeaderElement: IColumn | undefined, setState: Function, isOpenCalloutFilterByColumn: boolean, user: IPersonaProps }) => {
    // console.log(props);
    const instance: IInstance = props?.instance;
    const tooltipHostProps = props.tooltipHostProps;
    /**
     * Actually we have defined each column that display on Ticket, But we have one column "Toggle selection for all items" not have column information because we use the element by default from fluent UI
     */
    const column: IColumn = tooltipHostProps.column ? tooltipHostProps.column : undefined;
    const columnHeaderElement: IColumn = props.columnHeaderElement;
    const isColumnActive: boolean = (columnHeaderElement?.key == column?.key);
    const isOpen: boolean = props.isOpenCalloutFilterByColumn;
    const text = React.useContext(LangContext);

    // const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);
    const [isShow, setIsShow] = useState<boolean>(true);
    const [tagCategoriesOption, setTagCategoriesOption] = useState<IDropdownOption[]>([]);
    const [peoples, setPeoples] = useState<IPersonaProps[]>([]);

    const caretSolidDown: IIconProps = { iconName: 'FilterSettings', styles: { root: { fontSize: 'smaller' } } };
    const filterSolid: IIconProps = { iconName: 'FilterSolid', styles: { root: { fontSize: 'smaller', color: '#0078d4' } } };
    const buttonId = `column-header-${column?.key}`;
    let iconProps: IIconProps = caretSolidDown;

    let customFields: ICustomField[] = [...instance?.customFieldsLeft, ...instance?.customFieldsRight];
    let columnCustomField: ICustomField = customFields?.find((item: ICustomField) => item.id == column?.key);

    // List type
    let columnStatusType: string[] = ['column8'];
    let columnTagType: string[] = ['column0'];
    let columnPriorityType: string[] = ['column7'];
    let columnPeoplePickerType: string[] = ['column4', 'column5', "column12", "column13", ...customFields?.filter((item: ICustomField) => item.type.key == '6_peoplepicker').map((item: ICustomField) => item.id)];
    let columnListType: string[] = [...customFields?.filter((item: ICustomField) => (item.type.key == '5_list')).map((item: ICustomField) => item.id)];

    // Date type
    let columnDateType: string[] = ['column6', 'column11', 'column15', ...customFields?.filter((item: ICustomField) => (item.type.key == '3_date')).map((item: ICustomField) => item.id)];

    // Text type
    let columnTextType: string[] = ['column1', 'column2', "column14", "column16", ...customFields?.filter((item: ICustomField) => (item.type.key == '1_text' || item.type.key == '2_textarea')).map((item: ICustomField) => item.id)];

    // Set icon
    let filterItem = props?.filterByColumn?.find((item: IFilterByColumn) => item.id == column?.key);
    if (filterItem) {
        if (columnTextType.includes(column?.key)) {
            if (filterItem.value) iconProps = filterSolid;
        }
        if (columnDateType.includes(column?.key)) {
            if ((filterItem.value?.from !== '') || (filterItem.value?.to !== '')) iconProps = filterSolid;
        }
        if (columnTagType.includes(column?.key)) {
            if (filterItem.value.length > 0) iconProps = filterSolid;
        }
        if (columnPriorityType.includes(column?.key)) {
            if (filterItem.value) iconProps = filterSolid;
        }
        if (columnStatusType.includes(column?.key)) {
            if (filterItem.value) iconProps = filterSolid;
        }
        if (columnPeoplePickerType.includes(column?.key)) {
            if (filterItem.value.length > 0) iconProps = filterSolid;
        }
        if (columnListType.includes(column?.key)) {
            if (filterItem.value.length > 0) iconProps = filterSolid;
        }
    }

    function resetFilterByColumn() {
        let newData = props.filterByColumn.filter((item: IFilterByColumn) => item.id !== column?.key);
        props.setFilterByColumn(newData);
        handleFilterByColumn({ newData: newData, handleFilterByColumn: props.handleFilterByColumn });
        // handleFilterByColumn(newData);
    }

    const CaretDown: React.FunctionComponent = () => {
        return (
            <Stack horizontal verticalAlign={"center"}>
                {(filterItem?.value.length > 0) &&
                    <Icon
                        iconName={"Cancel"}
                        styles={{
                            root: {
                                color: "rgb(96, 94, 92)",
                                paddingRight: ".7em",
                                "&:hover": {
                                    fontWeight: 800
                                }
                            }
                        }}
                        onClick={resetFilterByColumn}
                    />
                }
                <Icon
                    iconName={"ChevronDown"}
                    styles={{
                        root: {
                            color: "rgb(96, 94, 92)",
                            "&:hover": {
                                fontWeight: 800
                            }
                        }
                    }}
                    onClick={(event: any) => event.currentTarget.parentNode.onClick}
                />
            </Stack>)
    }


    useEffect(() => {
        // check column that does not have a filter column
        if (column?.key) {
            if (['column3', 'column9', 'column10', "column14", 'column17', 'column18', ...customFields.filter((item: ICustomField) => (item.type.key == '4_toggle')).map((item: ICustomField) => item.id)].includes(column?.key)) setIsShow(false);
        } else {
            setIsShow(false);
        }

        // set tag categories option
        if (props.tagCategories.length > 0) {
            let tempArr: { key: string, text: string, data: { color: string } }[] = [];
            props.tagCategories.map((item: ITagCategory) => {
                item.tags.map((tag) => {
                    tempArr.push({
                        key: `${item.id}_${tag.text}`,
                        text: tag.text,
                        data: {
                            color: item.color
                        }
                    })
                })
            })
            setTagCategoriesOption(tempArr);
        }

        // set people for column people picker type
        switch (column?.key) {
            case "column4"://column requestor
                setPeoples(props.members);
                break;
            case "column5"://column assignee
                if (instance?.assignees?.type == "teamsOwner") setPeoples(props.owners)
                else return setPeoples(instance?.assignees?.peoples ?? [])
                break;
            default:
                if (columnCustomField?.choosePeopleFrom?.key == '1_owners') setPeoples(props.owners);
                else return setPeoples(props.members);
                break;
        }

    }, [columnHeaderElement]);

    return (
        <div>
            {/* if column header element this column is active & there is a filter by this column */}
            {(isShow && ((isColumnActive) || (props.filterByColumn?.find((item) => item.id == column?.key)))) &&
                <ActionButton
                    iconProps={iconProps}
                    allowDisabledFocus
                    id={buttonId}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setState({
                            columnHeaderElement: columnHeaderElement,
                            isOpenCalloutFilterByColumn: true
                        });
                        // toggleIsOpen();
                    }}
                    styles={{
                        root: {
                            padding: 0
                        },
                        icon: {
                            margin: "0px 6px 0px 0px"
                        }
                    }}
                />}
            {/* if callout is open & column header element this column is active */}
            {(isOpen && (isColumnActive)) &&
                <Callout
                    className={columnDateType.includes(column?.key) ? 'column-filter' : 'column-filter-text'}
                    role="dialog"
                    gapSpace={0}
                    target={`#${buttonId}`}
                    onDismiss={() => { props.setState({ isOpenCalloutFilterByColumn: false }) }}
                    setInitialFocus
                >
                    <Stack horizontalAlign='end'>
                        <ActionButton
                            iconProps={{ iconName: "Clear" }}
                            onClick={() => {
                                props.setState({
                                    isOpenCalloutFilterByColumn: false,
                                    columnHeaderElement: undefined
                                })
                            }}
                        />
                    </Stack>
                    <Stack verticalAlign="space-between">
                        <div style={{ marginBottom: 10 }}>
                            <Label style={{ marginBottom: 5 }}>{text.container.Landing.filterColumnBy} {column?.name}</Label>

                            <DateType
                                filterByColumn={props.filterByColumn}
                                setFilterByColumn={props.setFilterByColumn}
                                column={column}
                                handleFilterByColumn={props.handleFilterByColumn}
                                filterItem={filterItem}
                                text={text}
                                CaretDown={CaretDown} />
                        </div>
                    </Stack>
                </Callout>}

        </div>
    );
};

export default SettingByColumn;