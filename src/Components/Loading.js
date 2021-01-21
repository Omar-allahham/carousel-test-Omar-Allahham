import React from "react"
import { createUseStyles } from "react-jss";



const useStyle = createUseStyles({
    ldsRipple: {
        display: "inline-block",
        position: "relative",
        width: "80px",
        height: "80px",
        "& div": {
            position: "absolute",
            border: "4px solid #000",
            opacity: 1,
            borderRadius: "50%",
            animation: "$ldsRipple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite"
        },
        "& div:nth-child(2)": { animationDelay: "-0.5s" }
    },
    "@keyframes ldsRipple": {
        "0%": { top: "36px", left: "36px", width: "0", height: "0", opacity: 1 },
        "100%": {
            top: "0px",
            left: "0px",
            width: "72px",
            height: "72px",
            opacity: 0
        }
    }
})

export default () => {
    const classes = useStyle()
    return <div className={classes.ldsRipple}><div></div><div></div></div>
}