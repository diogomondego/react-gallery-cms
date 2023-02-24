import * as React from "react";
import { MediasContextProvider } from "./contexts/app.context";
import MediaList from "./components/MediaList/MediaList";
import Upload from "./components/Upload/Upload";

const midiasApp = document.querySelector('#midias__app');

const Gallery: React.FC = () => {
    return (
        <MediasContextProvider>
            {
                midiasApp?.getAttribute('disabled') === null &&
                <Upload />
            }
            <MediaList />
        </MediasContextProvider>
    )
}

export default Gallery;