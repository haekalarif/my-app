import React, { useState } from "react";
import { Text, Stack, PrimaryButton } from "@fluentui/react";
import AntdDropdownBasic from "./AntdDropdownBasic";
import { DefaultOptionType } from "antd/lib/select";

interface IStartTrial { }

const dropdownStyles: React.CSSProperties = {
    width: 200,
    border: "1px solid #605e5c"
};
const options: DefaultOptionType[] = [
    { value: '1_usa', label: 'USA' },
    { value: '2_germany', label: 'Germany (GDPR Compliant)' },
    { value: '3_australia', label: 'Australia' },
    { value: '4_singapore', label: 'Singapore' }
];

const StartTrial: React.FunctionComponent<IStartTrial> = (props: IStartTrial) => {

    const [employeeRange, setEmployeeRange] = useState<string>("");

    return (
        // <div className="wrapper" style={{ width: 800 }}>
        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row" style={{ marginBottom: 40 }}>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <Stack tokens={{ childrenGap: 10 }}>
                        <Text variant="medium">
                            Welcome! We’d love to understand a bit more about you to make the most out of your App trial. Please answer a few questions to help us tailor your experience.
                        </Text>
                        <Text variant="smallPlus">
                            <i>
                                As mentioned in our <span style={{ textDecoration: "underline" }}>Privacy Policy</span>, we don’t share any information we collect. Your responses are solely used to enhance your experience within the app.
                            </i>
                        </Text>
                    </Stack>
                </div>
            </div>
            <div className="ms-Grid-row" style={{ marginBottom: 14 }}>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg8">
                    <Text
                        variant="medium"
                        style={{ paddingTop: 5 }}
                    >
                        How many people are in your organization?
                    </Text>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                    <AntdDropdownBasic
                        onChange={function (value: string, option: DefaultOptionType[]): void {
                            console.log(value);
                            console.log(option);
                            // throw new Error("Function not implemented.");
                        }}
                        placeholder={"Select range"}
                        options={options}
                        style={dropdownStyles}
                        className={"region-deployment-dropdown"}
                        value={employeeRange ? employeeRange : undefined}
                    />
                </div>
            </div>
            <div className="ms-Grid-row" style={{ marginBottom: 14 }}>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg8">
                    <Text
                        variant="medium"
                        style={{ paddingTop: 5 }}
                    >
                        What is your primary role or function in the company?
                    </Text>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                    <AntdDropdownBasic
                        onChange={function (value: string, option: DefaultOptionType[]): void {
                            console.log(value);
                            console.log(option);
                            // throw new Error("Function not implemented.");
                        }}
                        placeholder={"Select role"}
                        options={options}
                        style={dropdownStyles}
                        className={"region-deployment-dropdown"}
                    />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg8">
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
                    <PrimaryButton
                        text="Start Trial"
                    />
                </div>
            </div>
        </div>
        // </div>
    )
}

export default StartTrial;