// eslint-disable-next-line jsx-a11y/alt-text
import React, { useEffect, useState } from "react";
import { FontWeights, Modal, Stack, getTheme, mergeStyleSets, Text, ActionButton, IButtonStyles, PrimaryButton, FontIcon, classNamesFunction, IStyleFunctionOrObject, IModalStyleProps, IModalStyles, mergeStyles, NormalPeoplePicker, IPersonaProps, DetailsList, DefaultButton } from "@fluentui/react";
import { Collapse } from 'antd';
import { useBoolean } from "@fluentui/react-hooks";
import partyPopper from "../images/Icons/fluent_emoji_party_popper.png";
import medalIcon from "../images/Icons/fluent_emoji_military_medal.png";
import noteIcon from "../images/Icons/fluent_emoji_memo.png"
import intuitive from "../images/gifs/Intuitive_Ticketing.gif";
import chabot from "../images/gifs/chatbot_feature_ticketing.gif";
import supportDevice from "../images/gifs/DesktopAndApp_ticketing.gif";
import faceIcon from "../images/Icons/fluent_emoji_man_beard_light.png"
import { PeoplePickerNormalExample } from "./PeoplePickerNormalExample";

const theme = getTheme();
const { Panel } = Collapse;

const containerStyles: any = {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    // maxWidth: 750,
    // minHeight: 400,
    padding: 30,
    borderRadius: 20,
    // transition: "width 1s, height 1s, maxWidth 1s",
    // transitionTimingFunction: "linear"
    // transition: "opacity 0.5s ease"
}
const headerStyles = {
    marginBottom: 20
}
const contentStyles = {
    marginBottom: 20
}
const titleIconStyles = {
    width: 45,
    height: 45
}
const gifStyles = {
    maxHeight: 250,
    maxWidth: 250,
    borderRadius: 20,
}
const gifControlStyles = {
    textAlign: "center",
    alignItems: "center",
    gap: 20
}
// const modalTransition = mergeStyles({
//     transition: 'width 1s, height 1s'
// })
const contentStylesStepOne = mergeStyleSets({
    // container: { ...containerStyles, maxWidth: 750, transition: "linear" },
    headerSection: headerStyles,
    contentSection: contentStyles,
    titleIcon: titleIconStyles,
    // modalTransition: modalTransition,
    // modalTransitionShow: modalTransitionShow,
});
const contentStylesStepTwo = mergeStyleSets({
    // container: { ...containerStyles, width: "auto", maxWidth: "", minWidth: 1000, transition: "linear" },
    headerSection: headerStyles,
    contentSection: contentStyles,
    titleIcon: titleIconStyles,
    gif: gifStyles,
    gifWrapper: gifControlStyles,
    // modalTransition: modalTransition,
    // modalTransitionShow: modalTransitionShow,
});
const contentStylesStepThree = mergeStyleSets({
    // container: { ...containerStyles, minWidth: 800, minHeight: "" },
    headerSection: { ...headerStyles, marginBottom: 35 },
    contentSection: { ...contentStyles, alignItems: "center" },
    titleIcon: titleIconStyles,
});
const contentStylesStepFour = mergeStyleSets({
    container: { ...containerStyles, minWidth: 780 },
    headerSection: headerStyles,
    contentSection: contentStyles,
    titleIcon: titleIconStyles,
});
const contentStylesStepFive = mergeStyleSets({
    container: { ...containerStyles, minWidth: 780 },
    headerSection: headerStyles,
    contentSection: { ...contentStyles, gap: 10 },
    titleIcon: titleIconStyles,
    link: { textDecoration: "underline", fontSize: 18 }
});
const contentStylesStepSix = mergeStyleSets({
    // container: { ...containerStyles, minWidth: 780 },
    headerSection: headerStyles,
    contentSection: contentStyles,
    titleIcon: titleIconStyles,
});

const cancelButtonStyles: IButtonStyles = {
    icon: {
        fontSize: 24,
        color: "#000000",
    },
}
const ctaButtonStyles: IButtonStyles = {
    root: {
        padding: 20,
        height: "auto",
        borderRadius: 10,
    },
    flexContainer: {
        display: "flex",
        gap: 5
    },
    label: {
        fontWeight: 400,
        fontSize: 18
    }
}
const Wizard: React.FC = (props) => {
    const [isModalOpen, { setTrue: openModal, setFalse: dismissModal }] = useBoolean(true);
    const [currentStep, setCurrentStep] = useState<number>(6);
    const [wizardClassName, setWizardClassName] = useState<any>("step-1");
    const accordionHeader = (text: string) => (
        <Text variant={"large"}>{text}</Text>
    );
    const onNextClick = () => {
        let step = currentStep + 1;
        setCurrentStep(step);
        setTimeout(() => setWizardClassName(`step-${step}`), 100)
    };
    // useEffect(() => {
    // }, []);
    return (
        <div>

            {/* One */}
            {/* {currentStep == 1 && */}
            <Modal
                isOpen={true}
                onDismiss={dismissModal}
                isBlocking={true}
                styles={{ main: { borderRadius: 20, padding: 30 } }}
            >
                {currentStep == 1 &&
                    <div className={`modal-wrapper ${wizardClassName}`} >
                        <Stack horizontal horizontalAlign="space-between" className={contentStylesStepOne.headerSection}>
                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                                <img src={partyPopper} className={contentStylesStepOne.titleIcon} />
                                <Text variant={"xxLargePlus"}><strong>Congratulations!</strong></Text>
                            </Stack>
                            <Stack>
                                <ActionButton
                                    iconProps={{ iconName: "Cancel" }}
                                    styles={cancelButtonStyles}
                                />
                            </Stack>
                        </Stack>
                        <Stack tokens={{ childrenGap: 18 }} className={contentStylesStepOne.contentSection}>
                            <Text variant={"large"}>Thanks for your interest in Ticketing App.</Text>
                            <Text variant={"large"}>You are a few steps away to empower your team to deliver great service to all your internal & eksternal customers and provide a real-time monitoring tool for Managers.</Text>
                            <Text variant={"large"}>This wizard will help you Get Started by going through some Ticketing App key features.</Text>
                        </Stack>
                        <Stack horizontalAlign="end">
                            <PrimaryButton
                                styles={ctaButtonStyles}
                                text="Next"
                                onClick={onNextClick}
                            >

                                <FontIcon iconName="Forward" />
                            </PrimaryButton>
                        </Stack>
                    </div>
                }
                {currentStep == 2 &&
                    <div className={`modal-wrapper ${wizardClassName}`}>
                        <Stack horizontal horizontalAlign="space-between" className={contentStylesStepTwo.headerSection}>
                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                                <img src={medalIcon} className={contentStylesStepTwo.titleIcon} />
                                <Text variant={"xxLargePlus"}><strong>Our Key Features!</strong></Text>
                            </Stack>
                            <Stack>
                                <ActionButton
                                    iconProps={{ iconName: "Cancel" }}
                                    styles={cancelButtonStyles}
                                />
                            </Stack>
                        </Stack>
                        <Stack className={contentStylesStepTwo.contentSection}>
                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
                                        <Stack className={contentStylesStepTwo.gifWrapper}>
                                            <img src={intuitive} className={contentStylesStepTwo.gif} />
                                            <Text variant={"xxLarge"}><strong>Intuitive</strong></Text>
                                        </Stack>
                                    </div>
                                    <div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
                                        <Stack className={contentStylesStepTwo.gifWrapper}>
                                            <img src={chabot} className={contentStylesStepTwo.gif} />
                                            <Text variant={"xxLarge"}><strong>Chatbot Notifications</strong></Text>
                                        </Stack>
                                    </div>
                                    <div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
                                        <Stack className={contentStylesStepTwo.gifWrapper}>
                                            <img src={supportDevice} className={contentStylesStepTwo.gif} />
                                            <Text variant={"xxLarge"}><strong>Web, Desktop, & <br></br> Mobile Ready</strong></Text>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </Stack>
                        <Stack horizontalAlign="end">
                            <PrimaryButton
                                styles={ctaButtonStyles}
                                text="Next"
                                onClick={onNextClick}
                            >

                                <FontIcon iconName="Forward" />
                            </PrimaryButton>
                        </Stack>
                    </div>}
                {currentStep == 3 &&
                    <div className={`modal-wrapper ${wizardClassName}`}>
                        <Stack horizontal horizontalAlign="space-between" className={contentStylesStepThree.headerSection}>
                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                                <img src={noteIcon} className={contentStylesStepThree.titleIcon} />
                                <Text variant={"xxLargePlus"}><strong>Let's Create First Your Ticket!</strong></Text>
                            </Stack>
                            <Stack>
                                <ActionButton
                                    iconProps={{ iconName: "Cancel" }}
                                    styles={cancelButtonStyles}
                                />
                            </Stack>
                        </Stack>
                        <Stack className={contentStylesStepThree.contentSection}>
                            <div>
                                <PrimaryButton
                                    styles={ctaButtonStyles}
                                    text="Create My First Ticket"
                                    iconProps={{ iconName: "add" }}
                                    onClick={onNextClick}
                                />
                            </div>
                        </Stack>
                        <Stack horizontalAlign="center" >
                            <Text variant={"large"}>Now that you have added your members in, Let's try creating a new ticket!</Text>
                            <br></br>
                        </Stack>
                    </div>
                }
                {currentStep == 4 &&
                    <div className={`modal-wrapper ${wizardClassName}`}>
                        <Stack horizontal horizontalAlign="space-between" className={contentStylesStepFour.headerSection}>
                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                                <img src={partyPopper} className={contentStylesStepFour.titleIcon} />
                                <Text variant={"xxLargePlus"}><strong>Nice, You Created a Ticket!</strong></Text>
                            </Stack>
                            <Stack>
                                <ActionButton
                                    iconProps={{ iconName: "Cancel" }}
                                    styles={cancelButtonStyles}
                                />
                            </Stack>
                        </Stack>
                        <Stack className={contentStylesStepFour.contentSection}>
                            <div>
                                <Text variant={"large"}>You will be able to see your ticket in the dashboard now, Just click on continue.</Text>
                            </div>
                        </Stack>
                        <Stack horizontalAlign="end" >
                            <PrimaryButton
                                styles={ctaButtonStyles}
                                text="Continue"
                                onClick={onNextClick}
                            >

                                <FontIcon iconName="Forward" />
                            </PrimaryButton>
                        </Stack>
                    </div>
                }
                {currentStep == 5 &&
                    <div className={`modal-wrapper ${wizardClassName}`}>
                        <Stack horizontal horizontalAlign="space-between" className={contentStylesStepFive.headerSection}>
                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                                <img src={noteIcon} className={contentStylesStepFive.titleIcon} />
                                <Text variant={"xxLargePlus"}><strong>Frequently Asked Questions</strong></Text>
                            </Stack>
                            <Stack>
                                <ActionButton
                                    iconProps={{ iconName: "Cancel" }}
                                    styles={cancelButtonStyles}
                                />
                            </Stack>
                        </Stack>
                        <Stack className={contentStylesStepFive.contentSection}>
                            <Stack>
                                <Collapse
                                    // defaultActiveKey={['1']}
                                    // expandIconPosition={"end"}
                                    accordion
                                >
                                    <Panel
                                        key="1"
                                        header={accordionHeader("What is an Instance?")}
                                    >
                                    </Panel>
                                    <Panel
                                        key="2"
                                        header={accordionHeader("How does it work?")}
                                    >
                                    </Panel>
                                    <Panel
                                        key="3"
                                        header={accordionHeader("When will I be charged?")}
                                    >
                                    </Panel>
                                    <Panel
                                        key="4"
                                        header={accordionHeader("I don't receive notification?")}
                                    >
                                    </Panel>
                                    <Panel
                                        key="5"
                                        header={accordionHeader("How do I custom my assignee list?")}
                                    >
                                    </Panel>
                                </Collapse>
                            </Stack>
                            <Stack>
                                <strong><a href="" className={contentStylesStepFive.link}>+ Learn more about Ticketing App</a></strong>
                            </Stack>
                        </Stack>
                        <Stack horizontalAlign="end" >
                            <PrimaryButton
                                styles={ctaButtonStyles}
                                text="Okay, Got it!"
                                onClick={onNextClick}
                            >

                                <FontIcon iconName="Forward" />
                            </PrimaryButton>
                        </Stack>
                    </div>
                }
                {currentStep == 6 &&
                    <div className={`modal-wrapper ${wizardClassName}`}>
                        <Stack horizontal horizontalAlign="space-between" className={contentStylesStepSix.headerSection}>
                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                                <img src={faceIcon} className={contentStylesStepSix.titleIcon} />
                                <Text variant={"xxLargePlus"}><strong>Let's invite our colleagues!</strong></Text>
                            </Stack>
                            <Stack>
                                <ActionButton
                                    iconProps={{ iconName: "Cancel" }}
                                    styles={cancelButtonStyles}
                                />
                            </Stack>
                        </Stack>
                        <Stack className={contentStylesStepSix.contentSection}>
                            <Stack horizontal horizontalAlign="space-between" tokens={{ childrenGap: 10 }}>
                                <PeoplePickerNormalExample />
                                <PrimaryButton
                                    // disabled={users.length == 0}
                                    // onClick={addMember}
                                    onRenderText={() => {
                                        return (
                                            <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 10 }}>
                                                <strong><Text>Add</Text></strong>
                                            </Stack>
                                        )
                                    }}
                                />
                            </Stack>
                            <Stack style={{ height: 250, overflowX: 'auto' }}>
                                <DetailsList
                                    // items={newMembers}
                                    // columns={columns}
                                    // onRenderItemColumn={handleMemberRenderItemColumn}
                                    compact={true}
                                    selectionMode={0}
                                    isHeaderVisible={false}
                                    items={[]}
                                />
                            </Stack>
                        </Stack>
                        <Stack horizontalAlign="end" >
                            <Stack>
                                <DefaultButton
                                    text="Back"
                                />
                                <PrimaryButton
                                    styles={ctaButtonStyles}
                                    text="Next"
                                    onClick={onNextClick}
                                >
                                    <FontIcon iconName="Forward" />
                                </PrimaryButton>
                            </Stack>
                        </Stack>
                    </div>
                }
            </Modal>
            {/* } */}
            {/* Two */}
            {/* {currentStep == 2 &&
                <Modal
                    isOpen={isModalOpen}
                    onDismiss={dismissModal}
                    isBlocking={true}
                    // containerClassName={`${contentStylesStepTwo.container}`}
                    containerClassName={wizardClassName}
                >
                    <Stack horizontal horizontalAlign="space-between" className={contentStylesStepTwo.headerSection}>
                        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                            <img src={medalIcon} className={contentStylesStepTwo.titleIcon} />
                            <Text variant={"xxLargePlus"}><strong>Our Key Features!</strong></Text>
                        </Stack>
                        <Stack>
                            <ActionButton
                                iconProps={{ iconName: "Cancel" }}
                                styles={cancelButtonStyles}
                            />
                        </Stack>
                    </Stack>
                    <Stack className={contentStylesStepTwo.contentSection}>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
                                    <Stack className={contentStylesStepTwo.gifWrapper}>
                                        <img src={intuitive} className={contentStylesStepTwo.gif} />
                                        <Text variant={"xxLarge"}><strong>Intuitive</strong></Text>
                                    </Stack>
                                </div>
                                <div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
                                    <Stack className={contentStylesStepTwo.gifWrapper}>
                                        <img src={chabot} className={contentStylesStepTwo.gif} />
                                        <Text variant={"xxLarge"}><strong>Chatbot Notifications</strong></Text>
                                    </Stack>
                                </div>
                                <div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
                                    <Stack className={contentStylesStepTwo.gifWrapper}>
                                        <img src={supportDevice} className={contentStylesStepTwo.gif} />
                                        <Text variant={"xxLarge"}><strong>Web, Desktop, & <br></br> Mobile Ready</strong></Text>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </Stack>
                    <Stack horizontalAlign="end">
                        <PrimaryButton
                            styles={ctaButtonStyles}
                            text="Next"
                            onClick={onNextClick}
                        >

                            <FontIcon iconName="Forward" />
                        </PrimaryButton>
                    </Stack>
                </Modal>
            } */}
            {/* Three */}
            {/* {currentStep == 3 &&
                <Modal
                    isOpen={isModalOpen}
                    onDismiss={dismissModal}
                    isBlocking={true}
                    containerClassName={contentStylesStepThree.container}
                    styles={containerStyles}
                >
                    <Stack horizontal horizontalAlign="space-between" className={contentStylesStepThree.headerSection}>
                        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                            <img src={noteIcon} className={contentStylesStepThree.titleIcon} />
                            <Text variant={"xxLargePlus"}><strong>Let's Create First Your Ticket!</strong></Text>
                        </Stack>
                        <Stack>
                            <ActionButton
                                iconProps={{ iconName: "Cancel" }}
                                styles={cancelButtonStyles}
                            />
                        </Stack>
                    </Stack>
                    <Stack className={contentStylesStepThree.contentSection}>
                        <div>
                            <PrimaryButton
                                styles={ctaButtonStyles}
                                text="Create My First Ticket"
                                iconProps={{ iconName: "add" }}
                                onClick={onNextClick}
                            />
                        </div>
                    </Stack>
                    <Stack horizontalAlign="center" >
                        <Text variant={"large"}>Now that you have added your members in, Let's try creating a new ticket!</Text>
                        <br></br>
                    </Stack>
                </Modal>
            } */}
            {/* Four */}
            {/* {currentStep == 4 &&
                <Modal
                    isOpen={isModalOpen}
                    onDismiss={dismissModal}
                    isBlocking={true}
                    containerClassName={contentStylesStepFour.container}
                    styles={containerStyles}
                >
                    <Stack horizontal horizontalAlign="space-between" className={contentStylesStepFour.headerSection}>
                        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                            <img src={partyPopper} className={contentStylesStepFour.titleIcon} />
                            <Text variant={"xxLargePlus"}><strong>Nice, You Created a Ticket!</strong></Text>
                        </Stack>
                        <Stack>
                            <ActionButton
                                iconProps={{ iconName: "Cancel" }}
                                styles={cancelButtonStyles}
                            />
                        </Stack>
                    </Stack>
                    <Stack className={contentStylesStepFour.contentSection}>
                        <div>
                            <Text variant={"large"}>You will be able to see your ticket in the dashboard now, Just click on continue.</Text>
                        </div>
                    </Stack>
                    <Stack horizontalAlign="end" >
                        <PrimaryButton
                            styles={ctaButtonStyles}
                            text="Continue"
                            onClick={onNextClick}
                        >

                            <FontIcon iconName="Forward" />
                        </PrimaryButton>
                    </Stack>
                </Modal>
            } */}
            {/* Five */}
            {/* {currentStep == 5 &&
                <Modal
                    isOpen={isModalOpen}
                    onDismiss={dismissModal}
                    isBlocking={true}
                    containerClassName={contentStylesStepFive.container}
                    styles={containerStyles}
                >
                    <Stack horizontal horizontalAlign="space-between" className={contentStylesStepFive.headerSection}>
                        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                            <img src={noteIcon} className={contentStylesStepFive.titleIcon} />
                            <Text variant={"xxLargePlus"}><strong>Frequently Asked Questions</strong></Text>
                        </Stack>
                        <Stack>
                            <ActionButton
                                iconProps={{ iconName: "Cancel" }}
                                styles={cancelButtonStyles}
                            />
                        </Stack>
                    </Stack>
                    <Stack className={contentStylesStepFive.contentSection}>
                        <Stack>
                            <Collapse
                                // defaultActiveKey={['1']}
                                expandIconPosition={"end"}
                                accordion
                            >
                                <Panel
                                    key="1"
                                    header={accordionHeader("What is an Instance?")}
                                >
                                </Panel>
                                <Panel
                                    key="2"
                                    header={accordionHeader("How does it work?")}
                                >
                                </Panel>
                                <Panel
                                    key="3"
                                    header={accordionHeader("When will I be charged?")}
                                >
                                </Panel>
                                <Panel
                                    key="4"
                                    header={accordionHeader("I don't receive notification?")}
                                >
                                </Panel>
                                <Panel
                                    key="5"
                                    header={accordionHeader("How do I custom my assignee list?")}
                                >
                                </Panel>
                            </Collapse>
                        </Stack>
                        <Stack>
                            <strong><a href="" className={contentStylesStepFive.link}>+ Learn more about Ticketing App</a></strong>
                        </Stack>
                    </Stack>
                    <Stack horizontalAlign="end" >
                        <PrimaryButton
                            styles={ctaButtonStyles}
                            text="Okay, Got it!"
                            onClick={onNextClick}
                        >

                            <FontIcon iconName="Forward" />
                        </PrimaryButton>
                    </Stack>
                </Modal>
            } */}
        </div>
    );
}
export default Wizard;