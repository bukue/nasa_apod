import { forwardRef, useEffect, useRef, useState } from "react"
import { MEDIA_TYPE } from "../../../constants"
import { ImageWithLoader } from "../../ImageWithLoader"
import { Map } from "../../Map"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const Card = forwardRef(({data, index, onVisible}, ref) =>{
    const endRef = useRef(null);

    useEffect(()=>{
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }

        const intersectionDetected = (entries) => {
            const [entry] = entries;
    
            onVisible(index, entry.isIntersecting)
        }

        const observer = new IntersectionObserver(intersectionDetected, options)
        
        const currentRef =  endRef.current;

        if(currentRef){
            observer.observe(currentRef);
        }

        return ()=>{
            if(currentRef){
                observer.unobserve(currentRef)
            }
        }

    },[onVisible, index]);

    const isVideo = data.media_type === MEDIA_TYPE.VIDEO;

    const style = {
        container: {
            maxHeight: "100%",
            marginRight: "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end"
        },
        moreInfo: {
            width: 100,
            border: "3px solid white",
            borderRadius: "15px",
            color: "white",
            marginBottom: "15px",
            marginRight: "15px",
            zIndex: 10,
            marginLeft: "-120px",
            cursor: "pointer",
        }
    }

    const [open, setOpen] = useState(false);

    return (
        <div style={style.container} ref={ref}>
            <ImageWithLoader url={isVideo ? data.thumbnail_url : data.url} />
            <div style={style.moreInfo} onClick={() => setOpen(true)}>
                More info
            </div>
            <Popup open={open} closeOnDocumentClick onClose={()=> setOpen(false)}>
                <Map />
            </Popup>
            <div ref={endRef}>
            </div>
        </div>
    )
})