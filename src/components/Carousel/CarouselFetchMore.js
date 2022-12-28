import { useNasaApod } from '../../hooks/useNasaApod';
import { Card } from './Card'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react';
import { ImageWithLoader } from '../ImageWithLoader';

export const CarouselFetchMore = ({count}) =>{
    const {data, loading, fetchMore} = useNasaApod({count});
    const cardsRef = useRef([]);
    const loaderRef = useRef(null);

    const [visibleRange, setVisibleRange] = useState([])

    const style = {
        container: {
            paddingTop: "50px"
        },
        contentContainer: {
            display: "flex",
            flexDirection: "row",
            background: "linear-gradient(180deg, rgba(200,200,200,1) 0%, rgba(160,160,160,1) 100%)",
            xAlignItems: "stretch",
        },
        contents: {
            display: "flex",
            height: 320,
            flexGrow: 1,
            maxWidth: "100%",
            overflowY: "scroll",
            overflowX: "hide",
            paddingTop: "15px",
            paddingBottom: "20px",
            scrollBarColor: "#333 #CCC"
        },
        buttons: {
            flex: "0 0 150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        icons: {
            fontSize: 100,
            color: "#DDD",
        }
    }
    
    useEffect(()=>{
        cardsRef.current = cardsRef.current.slice(0, data.length);
        
        const range = new Array(data.length).fill(false) 

        setVisibleRange((prevRange)=>{
            return [...prevRange, ...range.slice(prevRange.length, data.length)]
        })
    }, [data]);

    const handleScroll = (direction) => {
        if(direction > 0){
            const nextIndex = visibleRange.lastIndexOf(true)+1;
            cardsRef.current[nextIndex]?.scrollIntoView({behavior: "smooth"})
        }else{
            const prevIndex = visibleRange.indexOf(true)-1;
            cardsRef.current[prevIndex]?.scrollIntoView({behavior: "smooth"})
        }
    }

    const handleVisible = (index, visible) => {
        setVisibleRange((prev)=>{
            const newRange = [...prev];
            newRange[index] = visible;

            return newRange;
        })
    }

    useEffect(()=>{
        if(visibleRange[visibleRange.length-1]){
            !loading && fetchMore()
        }
    }, [visibleRange, loading, fetchMore])

    const Cards = data.map((entry, index)=> 
        <Card 
            key={entry.date} 
            ref={el => cardsRef.current[index] = el } 
            data={entry} 
            index={index}
            onVisible={handleVisible}
        />
    )
    
    return (
        <div style={style.container}>
            <h4>
                NIKE x NASA's <a target="_blank" rel="noreferrer" href="https://apod.nasa.gov/apod/astropix.html">Astronomy Picture of the Day </a> Carousel
            </h4>
            <div style={style.contentContainer}>
                <div style={style.buttons}>
                    <LeftOutlined 
                        style={style.icons} 
                        onClick={()=>handleScroll(-1)}
                    />
                </div>
                <div style={style.contents}>
                    { Cards }
                    <ImageWithLoader ref={loaderRef} url="" />
                </div>
                <div style={style.buttons}>
                    <RightOutlined 
                        style={style.icons} 
                        onClick={()=>handleScroll(1)}
                    />
                </div>
            </div>
        </div>
        
    );
}