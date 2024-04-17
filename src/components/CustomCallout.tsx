import * as React from 'react';
import { Callout, Link, mergeStyleSets, Text, FontWeights, Separator, Stack, FontIcon } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';



const styles = mergeStyleSets({
    button: {
        width: 130,
    },
    callout: {
        width: 320,
        maxWidth: '90%',
        padding: '20px 24px',
    },
    title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
    },
    link: {
        display: 'block',
        marginTop: 20,
    },
    textHeader: {
        textAlign: "center",
        color: "#0078d4",
        fontSize: 14
    },
    menuItem: {
        padding: "0px 4px",
        selector: {
            "&:hover": {
                backgroundColor: "#ededed",
                cursor: "pointer"
            }
        }
    }
});

interface IViewList<T> {
    onChange: Function,
    onEdit: Function,
    onDelete: Function,
    items: T[],
    headerText: string
}
function ViewList(props: IViewList<any>) {
    const { items, headerText, onChange, onEdit, onDelete } = props;
    return (
        <div>
            <div>
                <Text className={styles.textHeader}>
                    <strong>{headerText}</strong>
                </Text>
            </div>
            <div style={{ minHeight: 25 }}>
                {items?.map((item) => {
                    return (
                        <Stack
                            horizontal
                            horizontalAlign="space-between"
                            verticalAlign="center" style={{ width: '100%' }}
                            className={styles.menuItem}
                            onClick={() => {
                                onChange();
                            }}
                        >
                            <Stack
                                horizontal
                                verticalAlign="center"
                                tokens={{ childrenGap: 4 }}
                            >
                                <FontIcon
                                    iconName={item.visibility == "personal" ? "SingleBookmark" : "SingleBookmarkSolid"}
                                    style={{ color: "#0078d4" }}
                                />
                                <span>{item.name}</span>
                            </Stack>
                            <Stack horizontal>
                                <IconButton
                                    iconProps={{ iconName: "Edit" }}
                                    onClick={(e) => {
                                        onEdit();
                                    }}
                                />
                                <IconButton
                                    iconProps={{ iconName: "Delete" }}
                                    onClick={(e) => {
                                        onDelete();
                                    }}
                                />
                                {/* </>} */}
                            </Stack>
                        </Stack>
                    )
                })}
            </div>
        </div>
    )
}

export const CustomCallout: React.FunctionComponent = () => {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const buttonId = useId('callout-button');
    const labelId = useId('callout-label');
    const descriptionId = useId('callout-description');

    const data: any = [
        {
            "id": "52e2eb0d-6956-4458-bd7f-e3c059684cc7",
            "creatorId": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
            "name": "Tes",
            "visibility": "personal",
            "filter": {
                "search": "",
                "priority": "",
                "tags": [],
                "orderBy": "",
                "order": "none",
                "statusFilterKey": "",
                "status": "",
                "assigneeId": "",
                "unassigned": false,
                "column": []
            },
            "columnsSetting": [
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
                    "sorted": "none",
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
                },
                {
                    "key": "81f9ff07-1b48-4cf2-b8ec-2c94d23103ff",
                    "isVisible": true,
                    "sorted": "none",
                    "width": 75,
                    "isRender": true
                }
            ]
        },
        {
            "id": "4e73db59-5251-46a1-9360-696123437be4",
            "creatorId": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
            "name": "Tes 2",
            "visibility": "shared",
            "filter": {
                "search": "",
                "priority": "",
                "tags": [],
                "orderBy": "",
                "order": "none",
                "statusFilterKey": "",
                "status": "",
                "assigneeId": "",
                "unassigned": false,
                "column": []
            },
            "columnsSetting": [
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
                    "sorted": "none",
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
                },
                {
                    "key": "81f9ff07-1b48-4cf2-b8ec-2c94d23103ff",
                    "isVisible": true,
                    "sorted": "none",
                    "width": 75,
                    "isRender": true
                }
            ]
        },
        {
            "id": "4e73db59-5251-46a1-9360-696123437be4",
            "creatorId": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
            "name": "Tes 2",
            "visibility": "shared",
            "filter": {
                "search": "",
                "priority": "",
                "tags": [],
                "orderBy": "",
                "order": "none",
                "statusFilterKey": "",
                "status": "",
                "assigneeId": "",
                "unassigned": false,
                "column": []
            },
            "columnsSetting": [
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
                    "sorted": "none",
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
                },
                {
                    "key": "81f9ff07-1b48-4cf2-b8ec-2c94d23103ff",
                    "isVisible": true,
                    "sorted": "none",
                    "width": 75,
                    "isRender": true
                }
            ]
        },
        {
            "id": "4e73db59-5251-46a1-9360-696123437be4",
            "creatorId": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
            "name": "Tes 2",
            "visibility": "shared",
            "filter": {
                "search": "",
                "priority": "",
                "tags": [],
                "orderBy": "",
                "order": "none",
                "statusFilterKey": "",
                "status": "",
                "assigneeId": "",
                "unassigned": false,
                "column": []
            },
            "columnsSetting": [
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
                    "sorted": "none",
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
                },
                {
                    "key": "81f9ff07-1b48-4cf2-b8ec-2c94d23103ff",
                    "isVisible": true,
                    "sorted": "none",
                    "width": 75,
                    "isRender": true
                }
            ]
        },
    ]


    return (
        <>
            <DefaultButton
                id={buttonId}
                onClick={toggleIsCalloutVisible}
                text={isCalloutVisible ? 'Hide callout' : 'Show callout'}
                className={styles.button}
            />
            {isCalloutVisible && (
                <Callout
                    className={styles.callout}
                    ariaLabelledBy={labelId}
                    ariaDescribedBy={descriptionId}
                    role="dialog"
                    gapSpace={0}
                    target={`#${buttonId}`}
                    onDismiss={toggleIsCalloutVisible}
                    setInitialFocus
                >
                    <div>
                        <div>
                            hahahahah
                            <Separator></Separator>
                        </div>
                        <div style={{ maxHeight: 140, overflow: "hidden auto" }}>
                            <ViewList
                                onChange={() => { }}
                                onEdit={() => { }}
                                onDelete={() => { }}
                                // items={data.filter((item) => item.visibility == "personal")}
                                items={[]}
                                headerText={'My View(s)'}
                            />
                            <ViewList
                                onChange={() => { }}
                                onEdit={() => { }}
                                onDelete={() => { }}
                                // items={data.filter((item) => item.visibility == "shared")}
                                items={[]}
                                headerText={'Shared View(s)'}
                            />
                            {/* <div>
                                <div>
                                    <Text className={styles.textHeader}>
                                        <strong>My View(s)</strong>
                                    </Text>
                                </div>
                                <div style={{ minHeight: 10 }}>
                                    {data.filter((item) => item.visibility == "personal")?.map((item) => {
                                        return (
                                            <Stack
                                                horizontal
                                                horizontalAlign="space-between"
                                                verticalAlign="center" style={{ width: '100%' }}

                                                className={styles.menuItem}
                                            >
                                                <Stack
                                                    horizontal
                                                    verticalAlign="center"
                                                    tokens={{ childrenGap: 4 }}
                                                >
                                                    <FontIcon
                                                        iconName={item.visibility == "personal" ? "SingleBookmark" : "SingleBookmarkSolid"}
                                                        style={{ color: "#0078d4" }}
                                                    />
                                                    <span>{item.name}</span>
                                                </Stack>
                                                <Stack horizontal>

                                                    <IconButton
                                                        iconProps={{ iconName: "Edit" }}
                                                        onClick={(e) => {

                                                        }}
                                                    />
                                                    <IconButton
                                                        iconProps={{ iconName: "Delete" }}
                                                        onClick={(e) => {

                                                        }}
                                                    />

                                                </Stack>
                                            </Stack>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Text className={styles.textHeader}>
                                        <strong>Shared View(s)</strong>
                                    </Text>
                                </div>
                                <div style={{ minHeight: 10 }}>
                                    {data.filter((item) => item.visibility == "shared")?.map((item) => {
                                        return (
                                            <Stack
                                                horizontal
                                                horizontalAlign="space-between"
                                                verticalAlign="center" style={{ width: '100%' }}
                                                className={styles.menuItem}

                                            >
                                                <Stack
                                                    horizontal
                                                    verticalAlign="center"
                                                    tokens={{ childrenGap: 4 }}
                                                >
                                                    <FontIcon
                                                        iconName={item.visibility == "personal" ? "SingleBookmark" : "SingleBookmarkSolid"}
                                                        style={{ color: "#0078d4" }}
                                                    />
                                                    <span>{item.name}</span>
                                                </Stack>
                                                <Stack horizontal>

                                                    <IconButton
                                                        iconProps={{ iconName: "Edit" }}
                                                        onClick={(e) => {

                                                        }}
                                                    />
                                                    <IconButton
                                                        iconProps={{ iconName: "Delete" }}
                                                        onClick={(e) => {

                                                        }}
                                                    />

                                                </Stack>
                                            </Stack>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </Callout>
            )}
        </>
    );
};

