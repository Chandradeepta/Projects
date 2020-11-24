import { useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';

export default function Counter(props) {
    return (
        <div style={counterContainer}>
            <Tooltip title={"Decrease font size (px)"} aria-label={"Decrease font size"} placement="top">
                <div>
                    <span className="material-icons" style={iconButton} onClick={() => {
                        props.setDropdownStyle(props.type, props.value - 1)
                    }}>remove</span>
                </div>
            </Tooltip>
            <Tooltip title={"Font size (px)"} aria-label={"Font size"} placement="top">
                <input type="tel" style={{ width: '30%', height: '20px', textAlign: 'center' }} value={props.value}  onChange={(e) => {
                    props.setDropdownStyle(props.type, Number(e.target.value))
                }} />
            </Tooltip>
            <Tooltip title={"Increase font size (px)"} aria-label={"Increase font size"} placement="top">
                <div>
                    <span className="material-icons" style={iconButton} onClick={() => {
                        props.setDropdownStyle(props.type, Number(props.value) + 1)
                    }}>add</span>
                </div>
            </Tooltip>
        </div>
    )
}

const counterContainer = {
    display: 'flex',
}

const iconButton = {
    borderRadius: 5,
    border: 'none',
    marginLeft: '6px',
    marginRight: '6px',
    boxShadow: '-10px -10px 30px 0 #ffffff, 10px 10px 30px 0 #aeaec090',
}
