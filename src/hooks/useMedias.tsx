import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import toastr from 'toastr';
import ImagesContext, { MediaType, getRenderId, addRenderId } from "../contexts/app.context";

type MediaData = {
    type: 'image'|'video'|'document'
    id?: number;
    url: string;
    loading?: boolean;
}

export const useMedias = () => {
    const { state, setState } = useContext(ImagesContext);
    const timeout = useRef(0);
    const orderChangedRef = useRef<number[]>();

    useEffect(() => {
        if(orderChangedRef.current) {
            const [index, newOrder] = orderChangedRef.current;

            clearTimeout(timeout.current);
            timeout.current = window.setTimeout(() => {
                setState(state => {
                    const newState = fixOrder(state, index, newOrder)

                    return newState
                });
                orderChangedRef.current = undefined;
            }, 500);
        }
    }, [state]);

    const add = (media: MediaData) => {
        const id = getRenderId();

        setState(state => {
            return [...state, {
                ...media,
                renderId: id,
                order: state.length + 1,
            }];
        });

        addRenderId();
        return id;
    }

    const update = (i: number, media: MediaData) => {
        setState(state => {
            const newState = [...state];

            newState[i] = {
                ...media,
                order: i + 1,
                renderId: addRenderId(),
            };

            return newState;
        });
    }

    const changeOrder = (i: number, newOrder: number) => {
        setState(state => {
            const newState = [...state];

            newState[i] = {
                ...newState[i],
                order: newOrder
            }

            return newState;
        });

        orderChangedRef.current = [i, newOrder];
    }

    const removeImage = async (i: number, image: MediaType) => {
        try {
            update(i, {
                ...image,
                loading: true,
            });

            setState(state => {
                return state.filter((media) => media.id !== image.id);
            });
            orderChangedRef.current = [];
        } catch (error) {
            console.log(error);
            toastr.error('Houve um problema ao remover a imagem, tente novamente mais tarde!');
        }
    }

    const removeDocument = async (i: number, document: MediaType) => {
        try {
            update(i, {
                ...document,
                loading: true,
            });

            await axios.delete(`/manager/documentos/${document.id}`);

            setState(state => {
                return state.filter((media) => media.id !== document.id);
            });
            orderChangedRef.current = [];
        } catch (error) {
            console.log(error);
            toastr.error('Houve um problema ao remover o documento, tente novamente mais tarde!');
        }
    }

    const removeVideo = (i: number) => {
        setState(state => state.filter((media, j) => j !== i));
        orderChangedRef.current = [];
    }

    const remove = async (i: number, media: MediaType) => {
        update(i, {
            ...media,
            loading: true,
        });

        try {
            await axios.delete(`/manager/midias/${media.id}`)
            toastr.success('Mídia removida com sucesso.', '', {
                positionClass: 'toast-top-center', 
                progressBar: true
            })

            setState(state => {
                return state.filter((stt) => stt.id !== media.id);
            });

            orderChangedRef.current = [];
        } catch (error: any) {
            const { message = 'Houve um problema ao remover a mídia, tente novamente mais tarde!' } = error.response.data
            toastr.error(message, '', {
                positionClass: 'toast-top-center', 
                progressBar: true
            })

            update(i, {
                ...media,
                loading: false,
            });
        }
    }

    const fixOrder = (state: MediaType[], i?: number, newOrder: number = 0) => {
        let order = 1;
        const newState = state.map((media, j) => {
            if(j !== i) {
                if(order === newOrder) {
                    order++;
                }

                return {
                    ...media,
                    order: order++
                }
            }

            return media;
        })


        return newState.sort(function (a, b) {
            return a.order - b.order;
        });
    };

    return {
        add,
        update,
        changeOrder,
        removeImage,
        removeDocument,
        removeVideo,
        remove
    }
};