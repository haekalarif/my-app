import React from "react"
import { Tooltip } from "antd";
import { Text } from "@fluentui/react";

const AntdTooltips = () => {
    return (
        <div style={{ padding: 200 }}>
            {/* <Tooltip title={() => {
                return (
                    <Tooltip title={() => {

                        return (
                            <div style={{ color: "#000000" }} >
                                hoho
                            </div>
                        )
                    }} color="#fff">
                        <div style={{ color: "#000000" }}>
                            hehe
                        </div>
                    </Tooltip>
                )
            }} color="#fff">
                <p style={{ textAlign: "center", }}>
                    haha
                </p>
            </Tooltip> */}
            <Tooltip title={() => {
                return (
                    <Text color="#000000">hihi</Text>
                )
            }} color="#fff" className="hoho">
                <Text>
                    haha
                </Text>
            </Tooltip>
        </div>
    );
}

export default AntdTooltips;