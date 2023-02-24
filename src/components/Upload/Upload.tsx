import axios from "axios";
import React, { useRef, useContext, useCallback, MouseEvent, ChangeEvent } from "react";
import MediasContext from "../../contexts/app.context";
import { useMedias } from "../../hooks/useMedias";
import VideoUpload from "../VideoUpload/VideoUpload";
import { FileInput } from "./Upload.style";
import toastr from 'toastr';

const midiasApp = document.querySelector('#midias__app');

let useDoc = midiasApp?.getAttribute('data-document') as string
if (useDoc) useDoc = JSON.parse(useDoc)
const registroID = midiasApp?.getAttribute('data-id') || ''
const modelName = midiasApp?.getAttribute('data-model') || ''
const isViewOnly = midiasApp?.getAttribute('data-view-only') || ''

const Upload = () => {
    const { state } = useContext(MediasContext);
    const { add, update } = useMedias();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    const openFile = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fileInputRef.current?.click();
    }

    const openDoc = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        docInputRef.current?.click();
    }

    const uploadHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (!files) return;

        let index = state.length;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const data = new FormData();
            data.append('arquivo', file);
            data.append('tipo', 'image');
            data.append('id', registroID);
            data.append('model', modelName);

            try {
                add({
                    type: 'image',
                    loading: true,
                    url: '',
                });

                const response = await axios.post('/manager/midias', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const image = response.data.imagem;

                update(index++, {
                    type: 'image',
                    id: image.id,
                    url: image.url,
                    loading: false,
                });
            } catch (error) {
                console.log(error);
                toastr.error("Houve um problema ao salvar a imagem, tente novamente mais tarde");
            }
        }
    }, [state]);

    const docHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        let index = state.length;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const data = new FormData();
            data.append('documento', file);

            try {
                add({
                    type: 'document',
                    loading: true,
                    url: '',
                });

                const response = await axios.post('/manager/documentos', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const document = response.data.documento;

                update(index++, {
                    type: 'document',
                    id: document.id,
                    url: document.url,
                    loading: false,
                });
            } catch (error) {
                console.log(error);
                toastr.error("Houve um problema ao salvar o documento, tente novamente mais tarde");
            }
        }
    }, [state]);

    return (
        <>
            <FileInput ref={fileInputRef} onChange={uploadHandler} accept="image/png,image/jpeg" type="file" multiple />
            {useDoc && <FileInput ref={docInputRef} onChange={docHandler} accept="application/*" type="file" multiple />}
            <h2 className="px-3">
                Galeria
                {!isViewOnly && (
                    <>
                        <button
                            onClick={openFile}
                            className="btn btn-sm btn-info ml-5">
                            <i className="far fa-images"></i> Inserir uma nova imagem
                        </button>
                        <VideoUpload />
                        {useDoc && 
                            <button
                                onClick={openDoc}
                                className="btn btn-sm btn-primary ml-5">
                                <i className="far fa-file-alt" /> Inserir um novo documento
                            </button>}
                    </>
                )}
            </h2>
        </>
    );
}

export default Upload;