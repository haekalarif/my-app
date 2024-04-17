import { DefaultButton, FontWeights, IButtonStyles, IIconProps, IconButton, Modal, getTheme, mergeStyleSets, Text, Stack, ProgressIndicator, Spinner, SpinnerSize } from "@fluentui/react";
import React from "react";
import { useId, useBoolean } from '@fluentui/react-hooks';
import regularTab from "../images/regularTab.webp";

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        height: 412,
        width: 536,
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
            // '& *': {
            //     marginBottom: 14
            // }
        },
    },
    content: {
        display: "flex",
        flexFlow: "column",
        width: "auto",
        height: "auto",
        boxSizing: "border-box",
        selectors: {
            ' & > :first-child': {
                marginBottom: 20
            },
            ' & > :not(:first-child)': {
                marginBottom: 14
            }
        }
    }
});
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };


const CreationTab: React.FunctionComponent = (props) => {

    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)
    const titleId = useId('title');

    return (
        <div>
            <DefaultButton onClick={showModal} text="Open Modal" />
            <Modal
                titleAriaId={titleId}
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    {/* <h2 className={contentStyles.heading} id={titleId}>
                        Lorem Ipsum
                    </h2> */}
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={hideModal}
                    />
                </div>
                <div className={contentStyles.body}>
                    <div className={contentStyles.content}>
                        <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="baseline">
                            <Text><strong>Your new Ticketing Instance is being initialized...</strong></Text>
                            <Spinner size={SpinnerSize.small} />
                        </Stack>

                        <Text>
                            In case you don't see your new tabulation immediately, try refreshing the page in your web browser or navigate to another channel and return.
                        </Text>

                        <img src={regularTab} />
                        {/* <Stack> */}
                        <Text>
                            If the tabulation is still not visible, you can resolve this by logging out and then logging back into Teams. We appreciate your patience!
                        </Text>
                        {/* </Stack> */}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreationTab;