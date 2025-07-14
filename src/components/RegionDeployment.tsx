import React from "react"
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles, mergeStyleSets, Stack, Text } from "@fluentui/react"
import { Select } from "antd";

interface IRegionDeployment {

}

const RegionDeployment: React.FunctionComponent<IRegionDeployment> = (props: IRegionDeployment) => {
    return (
        <div className="wrapper" style={{ width: 450, height: 412 }}>
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Stack tokens={{ childrenGap: 20 }}>
                            <Text variant="mediumPlus">
                                In which region would you like Ticketing As A Service App to be deployed?
                            </Text>
                            <Text variant="mediumPlus">
                                <b>
                                    <i>Please note, once selected, this cannot be changed for your organization.</i>
                                </b>
                            </Text>
                            <Stack horizontalAlign="center">
                                {/* <Dropdown
                                    placeholder="Select region"
                                    label=""
                                    options={options}
                                    styles={dropdownStyles}
                                /> */}
                                <Select
                                    className={"region-deployment-dropdown"}
                                    options={[{ label: "1", value: "1" }]}
                                />
                            </Stack>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegionDeployment;