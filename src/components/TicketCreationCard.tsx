import { Stack, mergeStyleSets, Text } from "@fluentui/react";
import React from "react";


const styles = mergeStyleSets({
    container: {
        width: "500px",
        padding: "10px",
        border: "1px solid #ededed",
        borderRadius: "8px",
        marginBottom: 20
    },
    header: {
        display: "flex",
        justifyContent: "space-between"
    },
    summaryItem: {
        display: "flex",
        justifyContent: "space-between"
    },
    description: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "10", /* Number of lines to show */
        WebkitBoxOrient: "vertical",
    },
    message: {
        backgroundColor: "#c3e4ff",
        padding: "20px",
        selectors: {
            'span': {
                display: 'block',
            },
            'p': {
                margin: 0
            }
        }
    },
    gotoTicket: {
        border: "2px solid #0078d4",
        borderRadius: "6px",
        padding: "8px",
        fontWeight: "bold",
        color: "#ffffff!important",
        backgroundColor: "#0078d4",
        textDecoration: "none!important",
        cursor: "pointer"
    },
    line: {
        height: "1px",
        border: 0,
        backgroundColor: "#eaeaea"
    },
    dateTime: {
        fontSize: 12,
        color: "#787878"
    },
    wrapper: {
        fontFamily: "'Segoe UI', 'Arial', 'sans-serif'",
    },
    name: {
        fontSize: 16,
        fontWeight: 500
    },
    company: {
        fontWeight: "lighter"
    },
    timestamp: {
        fontSize: 12,
        color: "#b1b1b1",
        marginBottom: 14
    },
    commentMsg: {
        fontSize: 14
    }
})

const TicketCreationCard: React.FunctionComponent = (props) => {
    return (
        <Stack horizontalAlign="center" style={{ margin: 20 }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2><b>Fivetieth ticket (ID: 50)</b></h2>
                    <a href="" className={styles.gotoTicket}>Go to Ticket</a>
                </div>
                <hr className={styles.line} />
                <div>
                    <div className={styles.summaryItem}>
                        <span>Requestor: MOD Administrator</span>
                        <span>Priority: Urgent</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Assignee: Alex Wilber</span>
                        <span>SLA First Response Time: 1 hour(s)</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span></span>
                        <span>SLA Resolution Time: 2 hour(s)</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span></span>
                        <span>Expected Date: 4 April 2024</span>
                    </div>
                </div>
                <hr className={styles.line} />
                <div className={styles.description}>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec porttitor odio. Donec porta quam sem, quis volutpat urna lobortis in. Cras quis dapibus elit, eget lobortis lorem. Praesent viverra ornare nisi at auctor. Pellentesque id consectetur neque, sagittis tempor nisi. Aliquam non odio vel felis interdum vulputate vel at orci. Quisque sodales aliquet ullamcorper. Duis convallis tristique odio. Ut congue ipsum quis lectus ullamcorper facilisis. Pellentesque dictum purus orci. Vestibulum consectetur efficitur nibh vel tempor. In risus sem, aliquet ut nunc in, condimentum tempor turpis. Cras vulputate vel mi sed auctor. Cras posuere enim nulla, lobortis dignissim arcu scelerisque a. Aenean in nulla vitae libero pellentesque aliquet. Morbi in ipsum elit. Quisque dignissim sem nec nibh finibus, vel mollis purus dapibus. Cras sit amet vulputate nisi. Proin sodales fermentum arcu, eu mollis mi euismod porttitor. Duis eu leo tincidunt, euismod dolor eu, semper lectus. Duis placerat risus ipsum, sed auctor arcu accumsan sit amet. Sed sollicitudin lacinia aliquet. Nullam ultrices bibendum dapibus. Vivamus purus velit, iaculis a leo sit amet, placerat imperdiet ante. Suspendisse ornare placerat nisl vel iaculis. Praesent lobortis, enim quis aliquam venenatis, libero lectus dignissim massa, sit amet interdum enim risus non mi. Sed efficitur diam non leo egestas, quis dictum elit posuere. Cras accumsan libero massa, a dapibus quam ullamcorper in. Donec mattis erat et hendrerit mollis. Duis odio est, porttitor in egestas faucibus, laoreet id ipsum. Quisque semper nulla fringilla est pretium fermentum. Duis id semper nisl. Vestibulum sagittis sit amet tortor at vulputate. Nunc ac nisi rhoncus, pellentesque erat scelerisque, ullamcorper odio. Nunc in feugiat massa, id iaculis turpis. Nulla egestas eleifend convallis. Nullam dui erat, maximus sit amet auctor ac, vulputate ac lectus. Vestibulum tempor pretium eros eget hendrerit.</span>
                </div>
                <hr className={styles.line} />
                <div className={styles.message}>
                    <span><p>MOD Administrator <b>created</b> ticket and assigned it to you</p></span>
                    <span className={styles.dateTime}>03 April 2024 17:21</span>
                </div>
            </div>

            <Stack className={styles.wrapper}>
                <span className={styles.name}>
                    Marc commented <span className={styles.company}>ticket</span>.
                </span>
                <span className={styles.timestamp}>
                    Wednesday, July 17, 2024 14:14 (UTC)
                </span>
                <span className={styles.commentMsg}>Bonjour Cristian,</span>
            </Stack>
        </Stack>
    )
}
export default TicketCreationCard;