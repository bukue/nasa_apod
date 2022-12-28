import {LoadingOutlined} from '@ant-design/icons'

export const Loader = ({size})=>{
    const style = {
        container: {
            backgroundColor: "rgba(0,0,0,0.2)",
            width: "100%",
            height: "100%",

            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            color: 'white',
            fontSize: size
        },
    }

    return (
        <div style={style.container}>
            <LoadingOutlined style={style.icon} />
        </div>
        
    )
}