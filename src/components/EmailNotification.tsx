import { mergeStyleSets } from "@fluentui/react"
import React from "react"

let accent = "#c3e4ff";
let attention = "#ffcccc";
let warning = "#fffac3";
const styles = mergeStyleSets({

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        padding: '20px',
    },
    title: {
        marginBottom: "0px",
    },
    oldMessage: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderLeft: '4px solid #007bff',
        borderRadius: '4px',
    },
    newMessage: {
        marginTop: '20px',
        padding: '10px',
        borderLeft: '4px solid #007bff',
        borderRadius: '4px',
        backgroundColor: attention,
        // backgroundColor: '#ffcccc',
    },
    date: {
        fontSize: '14px',
        color: '#555',
    },
    comment: {
        marginTop: '10px',
        display: "inline-block"
    },
    gotoTicket: {
        border: "2px solid #0078d4",
        borderRadius: "6px",
        padding: "8px",
        fontWeight: "bold",
        color: "#ffffff !important",
        backgroundColor: "#0078d4",
        textDecoration: "none !important",
        cursor: "pointer"
    }
})

const EmailNotification: React.FunctionComponent = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Forty third ticket (ID: 43)</h2>
                <a href="" className={styles.gotoTicket}>Go to Ticket</a>
            </div>
            <div className={styles.newMessage}>
                <span>Christine Cline <strong>commented</strong> ticket.</span><br />
                <span className={styles.date}>Wednesday, March 27, 2024 06:32 (UTC)</span><br />
                <span className={styles.comment}>my comment formatted</span>
            </div>
            <div className={styles.oldMessage}>
                <span>MOD Administrator <strong>assigned</strong> ticket.</span><br />
                <span className={styles.date}>Wednesday, March 27, 2024 06:32 (UTC)</span><br />
            </div>
            <div className={styles.oldMessage}>
                <span>MOD Administrator <strong>commented</strong> ticket.</span><br />
                <span className={styles.date}>Wednesday, March 27, 2024 06:32 (UTC)</span><br />
                <span className={styles.comment}>How can I help you?</span>
            </div>
        </div>
    )
}

export default EmailNotification