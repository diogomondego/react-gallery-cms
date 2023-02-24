import React, { createContext, useState } from "react";

export type MediaJson = {
    tipo: 'image' | 'video' |'document'
    caminho?: string;
    id?: string;
    ordenacao: number;
};

export type MediaType = {
    type: 'image' | 'video' |'document'
    id?: number;
    url: string;
    loading?: boolean;
    order: number;
    renderId: number;
};

type PropsMediasContext = {
    state: Array<MediaType>;
    setState: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

type MediasContextProviderProps = {
    children: React.ReactNode;
};

export const DEFAULT_VALUE = {
    state: [] as Array<MediaType>,
    setState: () => { },
};

export let renderId = 1;

export const addRenderId = () => {
    return renderId++;
}

export const getRenderId = () => {
    return renderId;
}

const midiasApp = document.querySelector('#midias__app');

if (midiasApp)
    try {
        const mediasJson = midiasApp.getAttribute('data-medias');
        const medias = JSON.parse(mediasJson || '[]');

        DEFAULT_VALUE.state = medias.map((media: MediaJson) => ({
            type: media.tipo,
            id: media.id || undefined,
            url: media.caminho,
            loading: media.tipo === 'image' || media.tipo === 'document' ? false : undefined,
            order: media.ordenacao,
            renderId: addRenderId()
        }));
        console.log(DEFAULT_VALUE.state);
    } catch {
        DEFAULT_VALUE.state = [];
    }

export const initialState = JSON.stringify(DEFAULT_VALUE.state);

const MediasContext = createContext<PropsMediasContext>(DEFAULT_VALUE as PropsMediasContext);

const MediasContextProvider: React.FC<MediasContextProviderProps> = ({ children }) => {
    const [state, setState] = useState(DEFAULT_VALUE.state);

    return (
        <MediasContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </MediasContext.Provider>
    );
}

export { MediasContextProvider };
export default MediasContext;