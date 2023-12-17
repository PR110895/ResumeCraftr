import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

export const ModalComponent = ({
    defaultModalOpen,
    children,
    showOverLay,
    title,
    modalbodyBoderTop,
    onClose: onCloseFromProps,
    className,
    ...restProps
}) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: defaultModalOpen });

    const onModalClose = () => {
        onClose();
        onCloseFromProps();
    };

    return (
        <ChakraModal isOpen={isOpen} onClose={onModalClose} {...restProps}>
            {showOverLay && <ModalOverlay />}
            <ModalContent className={className}>
                    <ModalCloseButton data-testid='modal-onclose-btn'/>
                    {title && <ModalHeader>{title} </ModalHeader>}
                    <ModalBody borderTop={modalbodyBoderTop}>{children}</ModalBody>
            </ModalContent>
        </ChakraModal>
    );
};