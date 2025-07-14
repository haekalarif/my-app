import React from "react";
import { DefaultButton, IButtonStyles, mergeStyleSets, PrimaryButton, Stack, Text } from "@fluentui/react";
import bg_mobile from "../images/bg_mobile.webp";
import bg_tablet from "../images/bg_tablet.webp";
import bg_web from "../images/bg_web.webp";
import new_ticketing_instance_thumbnail from "../images/new_ticketing_instance_thumbnail.webp";
import { newWindowOpen } from "../helper/helper";
import { isMobile } from "react-device-detect";

const styles = mergeStyleSets({
    wrapper: {
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundSize: "100% 100%",
        selectors: {
            // mobile version
            '@media (min-width: 320px)': {
                backgroundImage: `url(${bg_mobile})`,
            },
            // tablet version
            '@media (min-width: 480px)': {
                backgroundImage: `url(${bg_tablet})`,
            },
            // tablet version
            '@media (min-width: 640px)': {
                backgroundImage: `url(${bg_web})`,
            },
        }
    },
    body: {
        display: 'flex', // Enables Flexbox
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        flexDirection: 'column', // Ensure content stacks vertically
        overflowX: "hidden",
    },
    title: {
        background: 'linear-gradient(to right, #558fee, #084f9b)', // Gradient colors
        backgroundClip: "text",
        color: "transparent",
        textAlign: "center",
        fontWeight: 600,
        lineHeight: "1.3",
        fontSize: "5vw",
        padding: "0px 20px",
        '@media (min-width: 480px)': {
            fontSize: "6.5vw",
            padding: "0px 20px"
        },
        '@media (min-width: 640px)': {
            fontSize: "4.5vw",
            padding: "0px 40px"
        },
        "@media(min-width: 1024px)": {
            fontSize: "2.2vw",
        }
    },
    subTitle: {
        backgroundClip: "text",
        display: "inline-block",
        textAlign: "center",
        fontSize: "4vw",
        marginBottom: 16,
        '@media (min-width: 480px)': {
            fontSize: "5vw",
        },
        "@media(min-width: 640px)": {
            fontSize: "3.5vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "1.8vw",
        }
    },
    wrapperContent: {
        height: "100vh",
        padding: 0
    },
    langSelectorWrapper: {
        marginTop: 4,
        marginRight: 10,
    },
    videoWrapper: {
        position: "relative",
        overflow: "hidden",
        minWidth: "85vw",
        minHeight: "25vh",
        border: "1px solid #dedede",
        backgroundClip: "content-box, border-box",
        backgroundOrigin: "border-box",
        display: "flex",
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        '@media (min-width: 480px)': {
            minWidth: "80vw",
            minHeight: "35vh",
        },
        '@media (min-width: 640px)': {
            minWidth: "70vw",
            minHeight: "35vh",
        },
        "@media(min-width: 1024px)": {
            minWidth: "35vw",
            minHeight: "42.5vh",
        }
    },
    thumbnail: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    gettingStuckContainer: {
        textAlign: "center",
        background: "linear-gradient(to right, #f4fafe, #eef6fc)",
        border: "2px solid #71b7ff",
        borderRadius: 12,
        margin: "2rem auto",
        boxShadow: "0 4px 10px rgba(0, 125, 255, 0.05)",
        padding: 10,
        width: "85%",
        '@media (min-width: 480px)': {
            padding: 20,
            width: "80%",
        },
        "@media(min-width: 640px)": {
            width: "75%",
            padding: 10,
        },
        "@media(min-width: 1024px)": {
            width: "85%",
        }
    },
    gettingStuckText: {
        fontSize: "5.5vw",
        fontWeight: 600,
        background: 'linear-gradient(to right, #558fee, #084f9b)', // Gradient colors
        backgroundClip: "text",
        color: "transparent",
        '@media (min-width: 480px)': {
            padding: 0,
            fontSize: "4.2vw",
        },
        "@media(min-width: 640px)": {
            fontSize: "3vw",
            marginBottom: "1vw"
        },
        "@media(min-width: 1024px)": {
            marginBottom: "0.5rem",
            fontSize: "1.8vw",
        }
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
    }
});

const primaryStyles: IButtonStyles = {
    label: {
        fontWeight: 600,
    },
    root: {
        borderRadius: 4,
        padding: "0.2vw 0.8vw",
        minHeight: "1vw",
        minWidth: "1vw",
        fontWeight: 700,
        '@media (min-width: 480px)': {
        },
        '@media (min-width: 640px)': {
        },
        "@media(min-width: 1024px)": {
            fontSize: "1vw",
            minHeight: "2.5vw",
            minWidth: "1vw",
        },
    }
}
const outlineStyles: IButtonStyles = {
    label: {
        fontWeight: 600,
    },
    root: {
        borderRadius: 4,
        border: "1px solid #0d6efd",
        color: "#0d6efd",
        padding: "0.2vw 0.8vw",
        minHeight: "1vw",
        minWidth: "1vw",
        fontWeight: 700,
        '@media (min-width: 480px)': {
        },
        '@media (min-width: 640px)': {
        },
        "@media(min-width: 1024px)": {
            fontSize: "1vw",
            minHeight: "2.5vw",
            minWidth: "1.5vw",
        },
    },
    rootHovered: {
        color: "#0d6efd",
    },
    rootPressed: {
        color: "#0d6efd",
    }
}

interface INewStaticPage {
    setState: Function
}
const NewStaticPage: React.FunctionComponent<INewStaticPage> = (props: INewStaticPage) => {

    const onClickThumbnailVideo = () => {
        handleClickVideoLink();
    }

    // const onChangeLanguage = (lang: string) => {
    //     const getLangModule = getLanguageModule(lang);
    //     props.setState({
    //         langJson: getLangModule,
    //     });
    // }

    const handleClickVideoLink = () => newWindowOpen("https://www.youtube.com/watch?v=pIULVvp9RvY");

    return (
        <div className={styles.wrapper}>
            <Stack horizontalAlign="end">
                <div className={styles.langSelectorWrapper}>
                    {/* <LanguageSelector
                        id={""}
                        setLanguage={onChangeLanguage}
                    /> */}
                </div>
            </Stack>
            <Stack
                verticalAlign="center"
                className={styles.wrapperContent}
            >
                <Stack>
                    <Text className={styles.title}>Let's finish your setup by adding Ticketing As A Service to a channel</Text>
                    <Text className={styles.subTitle}>Watch the tutorial video</Text>
                </Stack>
                <Stack className={styles.body}>
                    <div className={styles.videoWrapper}>
                        <img
                            src={new_ticketing_instance_thumbnail}
                            alt="new ticketing instance thumbnail"
                            className={styles.thumbnail}
                            onClick={onClickThumbnailVideo}
                        />
                    </div>
                </Stack>
                <Stack>
                    <div className={styles.gettingStuckContainer}>
                        <h2 className={styles.gettingStuckText}>Getting Stuck?</h2>
                        <div className={styles.buttonGroup}>
                            <PrimaryButton
                                styles={primaryStyles}
                                onClick={() => {
                                    newWindowOpen("mailto:marc@kitameraki.com");
                                }}
                            >
                                Contact Us
                            </PrimaryButton>
                            <DefaultButton
                                styles={outlineStyles}
                                onClick={() => {
                                    newWindowOpen("https://outlook.office.com/bookwithme/user/c6634a9627044dbe93bde3167680a118@teamswork.app?anonymous&ep=bwmEmailSignature");
                                }}
                            >
                                Book Demo
                            </DefaultButton>
                        </div>
                    </div>
                </Stack>
            </Stack>
        </div >
    )
}

export default NewStaticPage;