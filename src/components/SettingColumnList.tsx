import { CommandButton, FontIcon, IContextualMenuItem, IContextualMenuProps, IIconProps, IRenderFunction, Stack, Toggle, TooltipHost } from '@fluentui/react'
import axios from 'axios';
import { el } from 'date-fns/locale';
import { duration } from 'moment';
import React, { useEffect, useState } from 'react'

const settingIcon: IIconProps = { iconName: 'Settings' };

export const handleRenderSetting: IRenderFunction<{}> = () => {
    return (<TooltipHost
        content="Configuration"
        // This id is used on the tooltip itself, not the host
        // (so an element with this id only exists when the tooltip is shown)
        calloutProps={{ gapSpace: 0 }}
        styles={{ root: { display: 'inline-block' } }}>
        <FontIcon iconName='Settings' />
    </TooltipHost>)
};

export const ColumnItemsSetting = (props: any) => {
    // console.log(props);
    return (
        <Stack horizontal horizontalAlign="space-between" style={{ padding: '8px 15px' }} tokens={{ childrenGap: 10 }}>
            <Stack>
                {props.text}
            </Stack>
            <Stack>
                <Toggle
                    onText={'On'}
                    offText={'Off'}
                    checked={props.isVisible}
                    onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                        // props.columnsVisibility[props.properties] = checked;
                        props.onChange({ col: props.col, checked: checked });

                    }}
                />
            </Stack>
        </Stack>
    );
}

interface IUser {
    id: number,
    automaticTicketReload?: {
        [key: string]: {
            enable: boolean,
            durationInMinutes: number
        }
    }
}
const SettingColumnList: React.FC<any> = (props) => {
    const instanceId = "123";
    const [user, setUser] = useState<IUser>();
    const columns = [
        {
            "key": "column8",
            "sorted": "none",
            "width": 75,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column1",
            "sorted": "none",
            "width": 35,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column2",
            "sorted": "asc",
            "width": 225,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column3",
            "sorted": "none",
            "width": 60,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column4",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column17",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column5",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column18",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column6",
            "sorted": "none",
            "width": 80,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column11",
            "sorted": "none",
            "width": 80,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column7",
            "sorted": "none",
            "width": 80,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column0",
            "sorted": "none",
            "width": 50,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column12",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column15",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column13",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column16",
            "sorted": "none",
            "width": 100,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column14",
            "sorted": "none",
            "width": 120,
            "isVisible": true,
            "isRender": true
        },
        {
            "key": "column9",
            "sorted": "none",
            "width": 160,
            "isVisible": false,
            "isRender": true
        },
        {
            "key": "column10",
            "sorted": "none",
            "width": 160,
            "isVisible": false,
            "isRender": true
        }
    ];
    const columnText = {
        "column8": "a",
        "column1": "text.components.CaseList.colId",
        "column2": "text.components.CaseList.colTitle",
        "column3": "text.components.CaseList.colAction",
        "column4": "text.components.CaseList.colRequestor",
        "column5": "text.components.CaseList.colAssignee",
        "column6": "text.components.CaseList.colDate",
        "column7": "text.components.CaseList.colPriority",
        "column0": "text.components.CaseList.colTag",
        "column9": "text.container.Settings.firstResponseTime",
        "column10": "text.container.Settings.resolutionTime",
        "column11": "text.components.CaseList.colCreatedDate",
        "column12": "text.components.CaseList.colCreatedBy",
        "column13": "text.components.CaseList.colUpdatedBy",
        "column14": "text.components.CaseList.colLastResolutionComment",
        "column15": "text.components.CaseList.colUpdateDate",
        "column16": "text.components.CaseList.colLastResolution",
        "column17": "text.components.CaseList.colRequestorEmail",
        "column18": "text.components.CaseList.colAssigneeEmail"
    }

    let data = {
        enable: true,
        durationInMinutes: 3
    }

    function onChange(checked: boolean) {
        let newUser = { ...user };
        newUser.automaticTicketReload[instanceId] = {
            durationInMinutes: 3,
            enable: checked
        }
        console.log(newUser);
        setUser(newUser);
    }

    useEffect(() => {
        setUser({
            id: 1,
            automaticTicketReload: {
                [instanceId]: { enable: false, durationInMinutes: 0 }
            }
        })
    }, []);
    return (
        <div>
            {console.log(user)}
            {/* {console.log(user?.automaticTicketReload["123"] ??)} */}
            <CommandButton
                iconProps={settingIcon}
                menuProps={{
                    items: [user?.automaticTicketReload?.[instanceId] ?? {}, ...columns].map((item: any) => {
                        if (!!!item?.key) {
                            item.onRender = (propsCol: any) => {
                                console.log(propsCol)
                                return (<>
                                    <Stack
                                        horizontal
                                        horizontalAlign="space-between"
                                        style={{
                                            padding: '8px 15px'
                                        }}
                                        tokens={{
                                            childrenGap: 10
                                        }}>
                                        <Stack>
                                            Automatically Refresh list
                                        </Stack>
                                        <Stack>
                                            <Toggle
                                                // onText={`${user?.automaticTicketReload["123"]?.durationInMinutes} min`}
                                                // offText={'Off'}
                                                // checked={user?.automaticTicketReload["123"].enable}
                                                onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                                                    console.log(checked);
                                                    onChange(checked);

                                                }}
                                            />
                                        </Stack>
                                    </Stack>
                                    <hr />
                                </>
                                )
                            }

                            return item;
                        } else {
                            item.onRender = item.isRender ? (propsCol: any) => {
                                // console.log(propsCol);
                                return (
                                    <ColumnItemsSetting
                                        text={columnText[propsCol?.key]}
                                        col={propsCol.key}
                                        isVisible={propsCol.isVisible}
                                        onChange={props.setColumnsSetting}
                                    />
                                )
                            } : () => { return (<></>) }
                            return item;

                        }
                    })
                }}
                onRenderIcon={handleRenderSetting}
            />
        </div>
    )
}

export default SettingColumnList;