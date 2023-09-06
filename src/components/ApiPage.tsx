import axios from "axios";
import React, { useEffect } from "react";

const ApiPage: React.FC = (props) => {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2NWQ3ZGY0YWMyMmU4MmYzMmI3YTciLCJ1c2VybmFtZSI6ImFkbWluIiwiYXVkIjoiaHR0cHM6Ly9jb250YWN0LWF6dXJlLnZlcmNlbC5hcHAiLCJpYXQiOjE2OTI4NjY1NjIsImV4cCI6MTY5Mjg3MDE2Mn0.m3TKbbQpvYzHq9Yg4ih6HUV6GKhTGSKduJ29j_f94Wo';
    async function getData() {
        try {
            const res = await axios.get(`https://contact-azure.vercel.app/api/contact`, {
                headers: {
                    accessToken: accessToken,
                },
                timeout: 100
            });
            console.log(res)
        } catch (error) {
            console.log(error);
            console.log(error.message.includes("timeout"))
            // console.log(error.code)
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (<div></div>)
}
export default ApiPage;