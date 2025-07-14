import { FontIcon } from '@fluentui/react';
import React from 'react';
import { Image } from "antd";

const IconWithBadge = ({ count }) => {
    const styles = {
        container: {
            display: 'flex',
        },
        icon: {
            fontSize: '34px',
            position: 'relative',
        },
        badge: {
            height: "100%",
            marginLeft: "-16px",
            marginTop: "10px",
            backgroundColor: '#FDE3CD',
            color: '#F56A00',
            borderRadius: '50%',
            padding: '2px 4px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 99999
        },
    };
    return (
        <div style={styles.container}>
            <div style={styles.icon}>
                <Image
                    src={"https://cdn-icons-png.flaticon.com/512/1092/1092095.png"}
                    width={34}
                />
            </div>
            {count > 0 && (
                <div style={styles.badge}>
                    +{count}
                </div>
            )}
        </div>
    );
};



export default IconWithBadge;