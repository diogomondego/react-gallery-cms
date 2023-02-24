import styled from 'styled-components';

export const MediaListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
`;

export const MediaItem = styled.div`
    position: relative;
    width: 100%;
    max-width: 300px;
    margin-right: 40px;
    margin-bottom: 40px;
`;

type MediaImageWrapProps = {
    loading?: number;
}

export const MediaImageWrap = styled.div<MediaImageWrapProps>`
    display: flex;
    width: 100%;
    height: 300px;
    justify-content: center;
    align-items: center;

    ${props => props.loading && `
        background: #ccc;
    `}

    .spinner {
        width: 30px;
        height: 30px;
    }
`;

export const MediaImage = styled.img`
    width: 100%;
    height: 100%;
    background: #efefef;
    object-fit: contain;
`;

export const MediaVideo = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 300px;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

export const MediaRemove = styled.button`
    position: absolute;
    top: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    background: #e53935;
    color: #fff;
    border: 0px;
    text-align: center;
    cursor: pointer;
    border-radius: 30px;
    transition: all 150ms ease;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        color: #fff;
        transition: all 150ms ease;
    }

    &:hover {
        background: #efefef;

        i {
            color: #e53935;
        }
    }
`;