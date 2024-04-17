import React, { useEffect } from "react";

export const Attachments: React.FunctionComponent = (props) => {

    useEffect(() => {
        let ticketId = "123";
        let data = {
            "111": {
                url: [
                    {
                        url: "haha",
                    },
                    {
                        url: "1212",
                    }
                ],
                expTime: 122443,
            },
            "456": {
                url: [
                    {
                        url: "hihi",
                    },
                    {
                        url: "hoho",
                    }
                ],
                expTime: 234667586,
            }
        }

        localStorage.setItem("attachments", JSON.stringify(data));

        const attachments = localStorage.getItem("attachments") ? JSON.parse(localStorage.getItem("attachments")) : {};
        if (Object.keys(attachments).length > 0) {
            if (attachments[ticketId]) {
                const ticketAttachment = attachments[ticketId];
            
            } else {
                // getTicketAttachment()
            }
        }

    }, []);
    return (<></>);
}