
import { forwardRef, useState } from "react"
import { Loader } from './Icons/Loader';

export const ImageWithLoader = forwardRef(({url}, ref) =>{
    const [loaded, setLoaded] = useState(false);

    const style = {
        container: {
            height: "100%",
            position: "relative", 
            minWidth: "350px",


            borderRadius: "25px",
            border: "2px solid #333",
            overflow: "hidden",
        },
        img: {
            height: "100%",
        }
    }

    return (
        <div ref={ref} style={style.container}>
            <img
                style={style.img}
                src={url} 
                onLoad={()=>setLoaded(true)}
                alt={url}
            /> 
            {
                !loaded && <Loader size={150}/>
            }
        </div>
    );
})