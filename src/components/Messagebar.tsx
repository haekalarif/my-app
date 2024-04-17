import { FontIcon, IDropdownOption, IDropdownStyleProps, IDropdownStyles, IStyleFunctionOrObject, Link, MessageBar, Stack, Text } from "@fluentui/react";
import React, { useState } from "react"
import IconPicker from "./IconPicker";


const DefaultExample = () => (
    <MessageBar>
        <Stack>
            <Text variant="smallPlus">
                Are you looking to incorporate an approval step or add a missing status? Easily tailor the default Ticketing process to meet your specific needs.
            </Text>
            <Text variant="smallPlus">
                You have the flexibility to update existing transitions and statuses, while also adding new ones, allowing you to create a personalized Ticketing workflow with just a few clicks.
            </Text>
            <Text variant="smallPlus" style={{ marginTop: 10 }}>
                For further guidance and access to a library of standard workflows,  <Link href="https://teamswork.app/ticketing-workflow" underline>navigate to this resource page <FontIcon iconName={"ArrowUpRight"} /></Link>.
            </Text>
        </Stack>
    </MessageBar>
);
const Messagebar: React.FunctionComponent = (props) => {

    const [transitionIcon, setTransitionIcon] = useState<any>("");
    /**
     * List options for transition icons
     */
    const iconOptions: IDropdownOption[] = [
        { key: 'Forward', text: "" },
        { key: 'CheckMark', text: "" },
        { key: 'Archive', text: "" },
        { key: 'Reply', text: "" },
        { key: 'Cancel', text: "" },
        { key: 'Clock', text: "" },
        { key: 'StatusCircleQuestionMark', text: "" },
        { key: 'Info2', text: "" },
        { key: 'Processing', text: "" },
        { key: 'RecycleBin', text: "" },
        { key: 'Back', text: "" },
        { key: 'Blocked', text: "" },
        { key: 'Warning', text: "" },
        { key: 'FavoriteStar', text: "" },
        { key: 'Up', text: "" },
        { key: 'Down', text: "" },
        { key: 'Pinned', text: "" },
        { key: 'View', text: "" },
        { key: 'Blocked12', text: "" }
    ]
    const onChange = (props: IDropdownOption) => {
        console.log(props);
        setTransitionIcon(props.key);
    }
    return (
        <>
            <DefaultExample />
            <div>
                <IconPicker
                    options={iconOptions}
                    onChange={onChange}
                    width={'15%'}
                    label="Transition Icon"
                    value={transitionIcon}
                />
            </div>
        </>
    );
}
export default Messagebar;