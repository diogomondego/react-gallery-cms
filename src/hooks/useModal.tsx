import React, { useState, useMemo } from 'react';
import { 
    ModalBody,
    ModalClose,
    ModalContainer,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from './useModal.styles';

type ModalProps = {
    title: string;
    footer: React.ReactNode;
    open: boolean;
    toggle: (state?: boolean) => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, title, footer, open, toggle }) => {
    return (
        <ModalContainer open={open}>
            <ModalContent open={open}>
                <ModalHeader>
                    <h3>{title}</h3>
                    <ModalClose onClick={() => toggle(false)}>
                        <i className="fas fa-times"></i>
                    </ModalClose>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {footer}
                </ModalFooter>
            </ModalContent>
            <ModalOverlay onClick={() => toggle(false)} open={open}/>
        </ModalContainer>
    );
};

export const useModal = () => {
    const [open, setOpen] = useState(false);

    const toggle = (state?: boolean) => {
        if (state === undefined) {
            setOpen(open => !open);
            return;
        }

        setOpen(state);
    }

    return {
        open,
        toggle,
        Modal
    }
};