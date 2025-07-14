
import { PrimaryButton } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useInterval } from "../helper/helper";

interface IUser {
    automatic: boolean
}
export default function AutomaticReload() {
    const [user, setUser] = useState<IUser>();

    // function useInterval(callback, delay, isActive) {
    //     useEffect(() => {
    //         console.log("use interval is running");
    //         if (!!!isActive) return;
    //         console.log("interval di mount")
    //         const intervalId = setInterval(callback, delay);

    //         //Clean up the interval
    //         return () => {
    //             console.log("interval di unmount")
    //             clearInterval(intervalId);
    //         }
    //     }, [callback, delay, isActive]);
    // }

    function sayHello() {
        console.log("hellooo");
    }

    useEffect(() => {
        setUser({ automatic: false });
    }, []);

    useInterval(sayHello, 1000, user?.automatic);

    return (

        <div className="App">
            {console.log(user)}
            {/* <h1>Number of seconds is {seconds}</h1> */}
            <PrimaryButton
                text={!!!user?.automatic ? "enable interval" : "disable interval"}
                onClick={() => {
                    if (user?.automatic) setUser({ automatic: false })
                    else setUser({ automatic: true })
                }}
            />
        </div>
    );
}