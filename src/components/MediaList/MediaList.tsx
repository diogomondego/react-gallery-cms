import React, { useContext, FormEvent } from 'react';
import MediasContext, { initialState, MediaType } from '../../contexts/app.context';
import { getVideoId } from '../../utils';
import { useMedias } from '../../hooks/useMedias';
import {
    MediaImage,
    MediaImageWrap,
    MediaItem,
    MediaListContainer,
    MediaRemove,
    MediaVideo
} from './MediaList.styles';

const midiasApp = document.querySelector('#midias__app');
const isViewOnly = midiasApp?.getAttribute('data-view-only') || ''

const MediaList = () => {
    const { state } = useContext(MediasContext);
    const { changeOrder, remove } = useMedias();

    const orderHandler = (e: FormEvent<HTMLInputElement>, i: number) => {
        const newOrder = parseInt((e.target as HTMLInputElement).value);

        if (Number.isInteger(newOrder))
            changeOrder(i, newOrder);
    }

    const removeMedia = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number, media: MediaType) => {
        e.preventDefault();

        remove(i, media)
    }

    return (
        <MediaListContainer className="px-3">
            {
                JSON.stringify(state) !== initialState &&
                <div className="alert w-100 mb-9 alert-custom alert-light-info">
                    O upload da mídia é feito automaticamente.
                </div>
            }
            {isViewOnly && !state.length && (
                <div className="alert w-100 mb-9 alert-custom alert-light-info">
                    Nenhuma mídia adicionada.
                </div>
            )}
            {state.map((media, i) => (
                <MediaItem key={media.renderId}>
                    <input type="hidden" name={`medias[${i}][arquivo_id]`} value={`${media.id}`} />
                    <MediaImageWrap loading={media.loading ? 1 : 0}>
                        {media.loading ?
                            <div className="spinner spinner-primary spinner-lg"></div>
                            :
                            media.type === 'image' ?
                                <MediaImage src={media.url} />
                                :
                                media.type === 'document' ? 
                                    <a href={media.url} download><MediaImage src={media.url} /></a>
                                    :
                                    <MediaVideo>
                                        <iframe typeof="text/html" width="640" height="300"
                                            src={`https://www.youtube.com/embed/${getVideoId(media.url)}`} />
                                    </MediaVideo>
                        }
                    </MediaImageWrap>
                    {/* <div className="form-group w-100 mt-3">
                        <label htmlFor={`ordenacao_${i}`}>Ordenação</label>
                        <input
                            type={midiasApp?.getAttribute('disabled') !== null ? 'text' : 'number'}
                            min="1"
                            max={state.length}
                            id={`ordenacao_${i}`}
                            className="form-control"
                            name={`medias[${i}][ordenacao]`}
                            onInput={(e) => orderHandler(e, i)}
                            value={media.order}
                            disabled={midiasApp?.getAttribute('disabled') !== null}
                        />
                    </div> */}
                    {
                        !isViewOnly && !media.loading &&
                        midiasApp?.getAttribute('disabled') === null &&
                        <MediaRemove onClick={(e) => removeMedia(e, i, media)}>
                            <i className="fas fa-times"></i>
                        </MediaRemove>
                    }
                </MediaItem>
            ))}
        </MediaListContainer>
    )
}

export default MediaList;