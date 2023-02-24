import styled from "styled-components";

type ModalContainerProps = {
    open: boolean;
};

export const ModalContainer = styled.div<ModalContainerProps>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    pointer-events: none;

    ${props => props.open && `
        pointer-events: all;
    `}
`;

type ModalContentProps = {
    open: boolean;
};

export const ModalContent = styled.div<ModalContentProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    max-width: 500px;
    background: #fff;
    border-radius: 20px;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
    overflow: hidden;
    z-index: 1;
    transition: all 300ms ease;

    ${props => props.open && `
        pointer-events: all;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    `}
`;

export const ModalHeader = styled.div`
    position: relative;
    padding: 40px 40px 15px;
`;

export const ModalBody = styled.div`
    padding: 30px 40px;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    background: #efefef;
    padding: 20px 40px;
`;

type ModalOverlayProps = {
    open: boolean;
};

export const ModalOverlay = styled.div<ModalOverlayProps>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
    cursor: pointer;
    pointer-events: none;
    opacity: 0;
    transition: all 300ms ease;

    ${props => props.open && `
        pointer-events: all;
        opacity: 1;
    `}
`;

export const ModalClose = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: #efefef;
    text-align: center;
    cursor: pointer;
    border-radius: 30px;
    transition: all 150ms ease;

    i {
        transition: all 150ms ease;
    }

    &:hover {
        background: #e53935;

        i {
            color: #fff;
        }
    }
`;