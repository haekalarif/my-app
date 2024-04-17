import React, { useState, useEffect } from "react";
import { Modal, Stack, Text, ActionButton, IButtonStyles, PrimaryButton, FontIcon } from "@fluentui/react";
// import "./Wizard.css"; // Import your CSS file for transitions

// ... (import your images and other dependencies)

const MultipleStep = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [className, setClassName] = useState("");

    const accordionHeader = (text) => (
        <Text variant={"large"}>{text}</Text>
    );

    const onNextClick = () => {
        let step = currentStep + 1;
        setCurrentStep(step);
        setTimeout(() => {
            setClassName(`step-${step}`)
        }, 100);
    }
    useEffect(() => {
        setClassName(`step-${currentStep}`)
    }, []);
    return (
        <div>
            {/* One */}

            <Modal
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                isBlocking={true}
                // className={`modal-transition`}
            >
                {/* ... (Modal content for step 1) */}
                {currentStep === 1 && (
                    <div className={`modal-transition ${className}`}>
                        <PrimaryButton
                            // styles={ctaButtonStyles}
                            text="Next"
                            onClick={onNextClick}
                        >

                            <FontIcon iconName="Forward" />
                        </PrimaryButton>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className={`modal-transition ${className}`}>
                        <PrimaryButton
                            // styles={ctaButtonStyles}
                            text="Next"
                            onClick={onNextClick}
                        >

                            <FontIcon iconName="Forward" />
                        </PrimaryButton>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className={`modal-transition ${className}`}>
                        <PrimaryButton
                            // styles={ctaButtonStyles}
                            text="Next"
                            onClick={onNextClick}
                        >

                            <FontIcon iconName="Forward" />
                        </PrimaryButton>
                    </div>
                )}
            </Modal>

            {/* Two */}
            {/* {currentStep === 2 && (
                <Modal
                    isOpen={isOpen}
                    onDismiss={() => setIsOpen(false)}
                    isBlocking={true}
                    className={`modal-transition step-${currentStep}`}
                >
                    ... (Modal content for step 2)
                    <PrimaryButton
                        styles={ctaButtonStyles}
                        text="Next"
                        onClick={onNextClick}
                    >

                        <FontIcon iconName="Forward" />
                    </PrimaryButton>
                </Modal>
            )} */}

            {/* Three */}
            {/* {currentStep === 3 && (
                <Modal
                    isOpen={isOpen}
                    onDismiss={() => setIsOpen(false)}
                    isBlocking={true}
                    className={`modal-transition step-${currentStep}`}
                >
                    ... (Modal content for step 3)
                    <PrimaryButton
                        styles={ctaButtonStyles}
                        text="Next"
                        onClick={onNextClick}
                    >

                        <FontIcon iconName="Forward" />
                    </PrimaryButton>
                </Modal>
            )} */}

            {/* ... Repeat the pattern for other steps */}
        </div>
    );
}

export default MultipleStep;