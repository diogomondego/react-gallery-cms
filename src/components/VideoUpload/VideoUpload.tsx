import React, { useState, useEffect, useContext } from "react";
import { useMedias } from "../../hooks/useMedias";
import { useModal } from "../../hooks/useModal";
import { getVideoId } from "../../utils";
import { VideoPreview, VideoUploadContainer } from "./VideoUpload.styles";
import axios from "axios";
import MediasContext from "../../contexts/app.context";
import toastr from 'toastr';

const midiasApp = document.querySelector('#midias__app');
const registroID = midiasApp?.getAttribute('data-id') || ''
const modelName = midiasApp?.getAttribute('data-model') || ''

const VideoUpload = () => {
    const { add, update } = useMedias();
    const [link, setLink] = useState('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const { Modal, toggle, open } = useModal();
    const { state } = useContext(MediasContext);

    useEffect(() => {
        const videoId = getVideoId(link);

        if (videoId) {
            setVideoId(videoId);
        } else {
            setVideoId(null);
        }
    }, [link]);

    useEffect(() => {
        setVideoId(null);
        setLink('');
    }, [open])

    const insertVideo = async () => {
        let index = state.length;
        const data = new FormData();
        data.append('arquivo', link);
        data.append('tipo', 'video');
        data.append('id', registroID);
        data.append('model', modelName);

        try {
            add({
                type: 'video',
                loading: true,
                url: '',
            });

            toggle(false);

            const response = await axios.post('/manager/midias', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const video = response.data.imagem;

            update(index++, {
                type: 'video',
                id: video.id,
                url: link,
                loading: false,
            });
        } catch (error) {
            console.log(error);
            toastr.error("Houve um problema ao salvar o link do vídeo, tente novamente mais tarde");
        }
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-sm btn-warning ml-5"
                onClick={() => toggle()}
            >
                <i className="fas fa-photo-video"></i> Inserir um novo vídeo
            </button>
            <Modal
                open={open}
                toggle={toggle}
                title="Inserir um novo vídeo"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => toggle(false)}
                            className="btn btn-white">
                            Cancelar
                        </button>
                        <button type="button" onClick={insertVideo} className="btn ml-3 btn-primary">Inserir</button>
                    </>
                }
            >
                <VideoUploadContainer>
                    <VideoPreview>
                        {
                            videoId ? (
                                <iframe typeof="text/html" width="640" height="300"
                                    src={`https://www.youtube.com/embed/${videoId}`} />
                            ) :
                            'Pré-visualização'
                        }
                    </VideoPreview>
                    <div className="form-group w-100 mt-5">
                        <label>Link do vídeo</label>
                        <input
                            type="text"
                            onChange={(e) => setLink(e.target.value)}
                            value={link}
                            className="form-control" />
                        <span className="text-muted font-size-sm">Somente são permitidos vídeos do YouTube</span>
                    </div>
                </VideoUploadContainer>
            </Modal>
        </>
    );
}

export default VideoUpload;