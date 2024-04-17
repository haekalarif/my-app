import react, { useState } from "react";
import { Select } from "antd";
import { Text, Stack } from "@fluentui/react";

const AntdTag: React.FunctionComponent = () => {

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [cc, setCc] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleChange = (value: string[]) => {

        if (value.some((item) => !!!item.match(mailFormat))) {
            setErrorMessage("Mail address invalid");
            setTimeout(() => setErrorMessage(""), 5000);
            return;
        }
        setCc(value);
    };

    return (
        <>
            <Stack>
                <Select
                    mode="tags"
                    style={{
                        width: 300
                    }}
                    placeholder="Cc"
                    value={cc}
                    dropdownStyle={{ display: "none" }}
                    onChange={handleChange}
                />
                <Text variant="small">{errorMessage}</Text>
            </Stack>
        </>
    )
}

export default AntdTag;