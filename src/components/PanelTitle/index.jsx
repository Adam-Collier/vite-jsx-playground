import React from "react";
import s from "./paneltitle.module.css"

const PanelTitle = ({text}) => {
    return <div className={s.title}>{text}</div>
}

export default PanelTitle;