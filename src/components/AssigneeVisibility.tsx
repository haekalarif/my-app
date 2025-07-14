import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption, Text, Stack, mergeStyleSets } from '@fluentui/react';

/**
 * seeAll: Represents the option to "see all tickets."
 * assignedToMe: Indicates "see tickets assigned to the user."
 * assignedAndUnassigned: Represents "see tickets assigned to the user and unassigned tickets."
 */

interface ICustomChoiceGroupOption extends IChoiceGroupOption {
    description?: string
}

const styles = mergeStyleSets({
    description: {
        marginLeft: 24,
        position: "relative",
        cursor: "pointer"
    }
})


const AssigneeVisibility: React.FunctionComponent = (props) => {

    const onRenderField = (props: any, render) => {
        return (
            <Stack>
                <strong>
                    {render!(props)}
                </strong>
                <label className={styles.description} htmlFor={props.id}>
                    <Text>{props?.description}</Text>
                </label>
            </Stack>
        );
    }

    const options: ICustomChoiceGroupOption[] = [
        {
            key: "1_seeAll",
            text: "See all tickets",
            description: "Assignee can view all tickets, including those assigned to him, unassigned tickets, and tickets assigned to others.",
            onRenderField: onRenderField,
            disabled: true
        },
        {
            key: '2_assignedToHim',
            text: "See tickets assigned to him",
            description: "Assignee can only view tickets that are directly assignedto him.",
            onRenderField: onRenderField,
            disabled: true
        },
        {
            key: "3_assignedAndUnassigned",
            text: "See tickets assigned to him and unassigned",
            description: "Assignee can view tickets assigned to him and unassigned tickets.",
            onRenderField: onRenderField,
            disabled: true
        },
    ];

    return (
        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <ChoiceGroup
                        defaultSelectedKey="B"
                        options={options}
                        onChange={_onChange}
                        label="Assignee visibility is:"
                    />
                </div>
            </div>
        </div>
    );
};

function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    console.dir(option);
}

export default AssigneeVisibility;