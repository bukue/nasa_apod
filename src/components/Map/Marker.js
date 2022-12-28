import { Nike } from "../Icons/Nike";

export const Marker = ({ text }) => {
    const style = {
        container: {
            borderRadius: "10px",
            backgroundColor: "white",
            border: "2px solid black",
            width: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10
        },
        text: {
            fontWeight: 600
        }
    }

    return (
        <div className='animateRotate' style={style.container}>
            <Nike width={100} height={100}/>
            <div style={style.text}>
                {text}
            </div>
        </div>
    );
};