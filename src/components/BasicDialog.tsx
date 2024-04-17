import { DefaultButton, Dialog, DialogFooter, DialogType, IDialogStyleProps, IDialogStyles, IStyleFunctionOrObject, PrimaryButton } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import React from 'react'

export default function BasicDialog(props: any) {
    console.log(props);
    const labelId: string = useId('dialogLabel');
    const subTextId: string = useId('subTextLabel');
    const isFooterAtBottom: boolean = props.isFooterAtBottom;
    const onRenderFooter: JSX.Element = props.onRenderFooter;
    const dialogStyles = { main: { minWidth: 400 } };

    const dialogContentProps: any = {
        type: DialogType.normal,
        title: props.title,
        closeButtonAriaLabel: 'Close',
        // subText: <div dangerouslySetInnerHTML={{__html: props.subText}}></div>,
        subText: props.subText,
    };

    const modalProps = React.useMemo(
        () => ({
            titleAriaId: labelId,
            subtitleAriaId: subTextId,
            isBlocking: true,
            // styles: dialogStyles,
        }),
        [labelId, subTextId],
    );
    const styles: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles> = {
        main: {
            width: '700px !Important',
            maxWidth: ""
        },
    }


    return (
        <>
            <Dialog
                hidden={props.hideDialogBasic}
                onDismiss={props.onCancelDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                styles={styles}

            >
                {isFooterAtBottom ?
                    onRenderFooter
                    :
                    <DialogFooter>
                        <PrimaryButton onClick={props.onApproveDialog} text={props.approveDialogText} />
                        <DefaultButton onClick={props.onCancelDialog} text={props.cancelDialogText} />
                    </DialogFooter>
                }
            </Dialog>
        </>
    )
}
