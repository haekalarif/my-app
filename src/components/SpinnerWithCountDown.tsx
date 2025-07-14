import { mergeStyleSets } from "@fluentui/react";
import React, { FunctionComponent, useEffect, useState } from "react";

interface ISpinnerWithCountdown {
    initialTime: number,
    onCountdownEnd: Function,
    onTimeUpdate?: Function
}
const styles = mergeStyleSets({
    container: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    spinner: {
        width: "8vw",
        height: "8vw",
        border: "3px solid rgba(0, 0, 0, 0.1)",
        borderTop: "3px solid #3498db",
        /* border-right: 3px solid #3498db; */
        /* border-bottom: 3px solid #3498db; */
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        '@media (min-width: 480px)': {
            width: "5vw",
            height: "5vw",
        },
        '@media (min-width: 640px)': {
            width: "3vw",
            height: "3vw",
        },
        "@media(min-width: 1024px)": {
            width: "2vw",
            height: "2vw",
        }
    },
    countdown: {
        position: "absolute",
        fontSize: "3vw",
        fontWeight: "bold",
        color: "#333",
        '@media (min-width: 480px)': {
            fontSize: "2vw",
        },
        '@media (min-width: 640px)': {
            fontSize: "1.2vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "0.8vw",
        }
    }
})
const SpinnerWithCountdown: React.FunctionComponent<ISpinnerWithCountdown> = ({
    initialTime = 10,
    onCountdownEnd,
    onTimeUpdate
}) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onCountdownEnd) onCountdownEnd(); // Trigger callback when countdown ends
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                if (onTimeUpdate) onTimeUpdate(newTime); // Send updated time to parent
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onCountdownEnd, onTimeUpdate]);

    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
            <div className={styles.countdown}>{timeLeft}</div>
        </div>
    );
};

export default SpinnerWithCountdown;
