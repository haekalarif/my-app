import React, { useState } from "react";
import { Select } from "antd";
import { Stack, TextField, Text } from "@fluentui/react";

const EmailFields: React.FunctionComponent<any> = (props: any) => {

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [cc, setCc] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleChange = (value: string[]) => {
        console.log(value);
        if (value.some((item) => !!!item.match(mailFormat))) {
            setErrorMessage("Mail address invalid");
            setTimeout(() => setErrorMessage(""), 5000);
            return;
        }
        setCc(value);
    };

    return (
        <>
            <Stack tokens={{ childrenGap: 10 }}>
                {/* To Field */}
                <Stack horizontal verticalAlign="center">
                    <div style={{ minWidth: 50 }}>To:</div>
                    <div>
                        <TextField value="haekal.rozikin@kitameraki.com" disabled style={{ width: 300 }} />
                    </div>
                </Stack>

                {/* Cc Field */}
                <Stack horizontal verticalAlign="center">
                    <div style={{ minWidth: 50 }}>Cc:</div>
                    <div>
                        <Select
                            mode="tags"
                            style={{ width: 300 }}
                            placeholder="Cc"
                            value={cc}
                            dropdownStyle={{ display: "none" }}
                            onChange={handleChange}
                            onSearch={(value) => {
                                console.log(value);
                            }}
                        />
                    </div>
                </Stack>

            </Stack>
            {/* Error Message */}
            <Stack horizontal>
                <div style={{ minWidth: 50 }}></div>
                <Text variant="small" color="red">
                    {errorMessage}
                </Text>
            </Stack>
        </>
    )
}

export default EmailFields;