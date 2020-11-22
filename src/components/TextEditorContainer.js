import React, { useEffect } from 'react';
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import Counter from './Counter';
import './TextEditorContainer.css';

export default function Texteditorcontainer(props) {
    const [styleObject, setStyleObject] = useState({
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '100',
        decoration: 'none',
        color: '#000000'
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const options = [
        "Times New Roman, Times, serif",
        "Arial, Helvetica, sans-serif",
        "Lucida Console, Courier, monospace"
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // font family menu handle
    const handleMenuItemClick = (event, index) => {
        textAreaStyle.fontFamily = options[index]
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const setStyle = (type, value) => {
        setStyleObject({ ...styleObject, [type]: value })
    }

    const setDropdownStyle = (type, value) => {
        if (value) {
            textAreaStyle[type] = value;
            setStyleObject({ ...styleObject, [type]: value })
        }
    }

    //TODO
    // const openColorPicker = () => {
    //     document.getElementById('color-picker').click();
    // }

    // const handleTextAreaInput = (text) => {
    //     document.getElementById(textarea).append()
    // }

    return (
        <section style={container}>
            <section style={styleBar} className="styleBar">
                <div style={alignItems}>
                    <Tooltip title="Left align" aria-label="Left align" placement="top">
                        <i className="fas fa-align-left" onClick={() => {
                            textAreaStyle.textAlign = 'left';
                            setStyle('textAlign', textAreaStyle.textAlign)
                        }} style={styleObject.textAlign === 'left' ? { ...selected } : { ...icons }}></i>
                    </Tooltip>

                    <Tooltip title="Center align" aria-label="Center align" placement="top">
                        <i className="fas fa-align-center" onClick={() => {
                            textAreaStyle.textAlign = 'center';
                            setStyle('textAlign', textAreaStyle.textAlign)
                        }} style={styleObject.textAlign === 'center' ? { ...selected } : { ...icons }}></i>
                    </Tooltip>

                    <Tooltip title="Right align" aria-label="Right align" placement="top">
                        <i className="fas fa-align-right" onClick={() => {
                            textAreaStyle.textAlign = 'right';
                            setStyle('textAlign', textAreaStyle.textAlign)
                        }} style={styleObject.textAlign === 'right' ? { ...selected } : { ...icons }}></i>
                    </Tooltip>



                </div>
                <div className={{ ...alignItems, flex: 1 }}>
                    <Tooltip title="Change font style" aria-label="Change font style" placement="top">
                        <Button aria-controls="simple-menu" id="font-menu" aria-haspopup="true" onClick={handleClick} style={{ fontSize: '10px' }}>
                            {options[selectedIndex] || "Open Menu"}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => {
                                    handleMenuItemClick(event, index)
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div style={{ ...alignItems, width: '40%' }}>
                    <Counter setDropdownStyle={setDropdownStyle} type={'fontSize'} value={styleObject.fontSize} />
                    <Counter setDropdownStyle={setDropdownStyle} type={'fontWeight'} value={styleObject.fontWeight} />
                    <Tooltip title="Underline" aria-label="Underline" placement="top">
                        <div>
                            <span class="material-icons" onClick={() => {
                                textAreaStyle.textDecoration = textAreaStyle.textDecoration === 'none' ? 'underline' : 'none'
                                setStyle('textDecoration', textAreaStyle.textDecoration)
                            }} style={textAreaStyle.textDecoration === 'underline'  ? { ...selected } : { ...icons }}>format_underlined</span>
                        </div>
                    </Tooltip>
                    {/* {TODO} */}
                    {/* <Tooltip title="Highlight color" aria-label="Highlight color" placement="top">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="color"
                                id="color-picker"
                                style={colorPicker}
                                onInput={(e) => {
                                    document.getElementById('color-dropper').style.color = e.target.value
                                    setStyleObject({ ...styleObject, color: e.target.value })
                                }} />

                            <i className="fas fa-eye-dropper" id="color-dropper" onClick={() => openColorPicker()}></i>
                        </div>
                    </Tooltip> */}
                </div>
            </section>
            <div
                style={{ ...textAreaStyle }}
                contentEditable="true"
                id="textarea"
                className="selectable-textarea"
                // onInput = {(e) => handleTextAreaInput(e.target.value)}
            ></div>
        </section>
    )
}

const container = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '5%',
    alignItems: 'center',
    maxHeight: '60vh',
}

const textAreaStyle = {
    minWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    minHeight: '300px',
    textAlign: 'left',
    fontSize: '16',
    resize: 'none',
    fontWeight: '100',
    textDecoration: 'none',
    border: '1px solid black',
    padding: '10px'
}

const styleBar = {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    width: '100%',
    cursor: 'pointer'
}

// const colorPicker = {
//     opacity: '0.1',
//     position: 'relative',
//     left: '50%'
// }

const alignItems = {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '15%'
}

const selected = {
    backgroundColor: '#d5d1d1',
    borderRadius: '50%',
    padding: '5px 6px'
}

const icons = {
    padding: '5px 6px'
}
