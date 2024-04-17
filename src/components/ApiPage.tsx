import { Toggle } from "@fluentui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import JoditRTE from "./JoditRTE";


export function initializeClarity(projectId: string) {
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r);
        t.async = 1;
        t.id = "clarity-script-" + projectId;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", projectId);
}
export function removeClarityScript(projectId: string) {
    const scriptId = "clarity-script-" + projectId;
    console.log(scriptId);
    const clarityScriptElement = document.getElementById(scriptId);
    // Check if the script element exists before attempting to remove it
    if (clarityScriptElement) {
        // Remove the script element
        clarityScriptElement.parentNode.removeChild(clarityScriptElement);
    } else {
        console.warn("Clarity script element not found for projectId: " + projectId);
    }
}
const ApiPage: React.FC = (props) => {
    const [checked, setChecked] = useState<boolean>(true);
    // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2NWQ3ZGY0YWMyMmU4MmYzMmI3YTciLCJ1c2VybmFtZSI6ImFkbWluIiwiYXVkIjoiaHR0cHM6Ly9jb250YWN0LWF6dXJlLnZlcmNlbC5hcHAiLCJpYXQiOjE2OTI4NjY1NjIsImV4cCI6MTY5Mjg3MDE2Mn0.m3TKbbQpvYzHq9Yg4ih6HUV6GKhTGSKduJ29j_f94Wo';
    // async function getData() {
    //     try {
    //         const res = await axios.get(`https://contact-azure.vercel.app/api/contact`, {
    //             headers: {
    //                 accessToken: accessToken,
    //             },
    //             timeout: 100
    //         });
    //         console.log(res)
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.message.includes("timeout"))
    //         // console.log(error.code)
    //     }
    // }

    async function loadData() {
        try {
            const item = await axios.get("https://jsonplaceholder.tyicode.com/posts");
            console.log(item);
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        initializeClarity("ajajja");
        loadData();
        removeClarityScript("ajajja");
    }, []);
    return (<div>

        <Toggle
            checked={checked}
            onChange={(_, checked?: boolean) => {
                setChecked(checked);
            }}
        />
        <JoditRTE
            disabled={checked}
        />
    </div>)
}
export default ApiPage;