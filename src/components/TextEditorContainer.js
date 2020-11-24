import React, { useEffect, useRef } from 'react';
import { Button, Menu, MenuItem, TextField, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import Counter from './Counter';
import './TextEditorContainer.css';

const initialState = {
    mouseX: null,
    mouseY: null,
};
export default function Texteditorcontainer(props) {
    const [styleObject, setStyleObject] = useState({
        textAlign: 'left',
        fontSize: 16,
        isBold: false,
        decoration: 'none',
        color: '#000000',
        addLinkPressed: false
    });

    const [anchorEl, setAnchorEl] = React.useState(null);

    // Menu Selection Index
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    // To set the selected Text
    const [selectedTextObject, setSelectedTextObject] = React.useState({
        range: null,
        selection: null,
        selectedText: ''
    });

    const [linkText, setLinkText] = useState('')

    const [state, setState] = React.useState(initialState);

    const linkValueRef = useRef();

    // Font options
    const options = [
        "Times New Roman, Times, serif",
        "Arial, Helvetica, sans-serif",
        "Lucida Console, Courier, monospace"
    ];

    // const handleLinkShow = (event) => {
    //     event.preventDefault();
    //     setState({
    //         mouseX: event.clientX - 2,
    //         mouseY: event.clientY - 4,
    //     });
    // };

    // const handleLinkHide = () => {
    //     setState(initialState);
    // };

    const handleSelection = () => {
        setSelectedTextObject({
            selection: window.getSelection(),
            range: window.getSelection().getRangeAt(0),
            selectedText: window.getSelection().toString()
        })
    }

    //TODO Selection based formatting
    // const handleSelectedStyle = (type, value) => {

    //     if (window.getSelection().anchorNode.parentElement.className === 'selectable-textarea') {
    //         window.getSelection().modify('move', 'backward', 'line');
    //         window.getSelection().modify('extend', 'forward', 'paragraph');
    //         let el = document.createElement('div');
    //         el.setAttribute('style', `${type}: ${value};`)
    //         window.getSelection().getRangeAt(0).surroundContents(el);
    //     } else {
    //         window.getSelection().focusNode.children[0].style.textAlign = value
    //     }
    //     console.log(window.getSelection().anchorNode.parentElement.className)
    // }

    const handleMenuClick = (event, type) => {
        setAnchorEl({
            [type]: event.currentTarget
        });
    };

    const handleClose = (type) => {
        setAnchorEl({
            [type]: null
        });
    };

    // font family menu handle
    const handleMenuItemClick = (event, index, type) => {
        textAreaStyle.fontFamily = options[index]
        setSelectedIndex(index);
        setAnchorEl({
            [type]: null
        });
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

    const handleAddLink = () => {
        try {
            var url = new URL(linkValueRef.current.value);
        } catch (e) {
            return alert('Enter valid url')
        }
        if (selectedTextObject.range) {
            let element = document.createElement("a");
            element.setAttribute('href', url);
            element.setAttribute('target', '_blank');
            try {
                selectedTextObject.range.surroundContents(element);
            } catch (e) {
                let start = selectedTextObject.selection.anchorOffset;
                let end = selectedTextObject.selection.focusOffset;
                selectedTextObject.selection.modify('extend', 'forward', 'line');
            }
            handleClose('link');
            linkValueRef.current.value = ""
        }
    }

    // const isLink = () => {
    //     const selection = selectedTextObject.selection
    //     const startA = selection?.anchorNode.parentNode.tagName === 'A'
    //     const endA = selection?.focusNode.parentNode.tagName === 'A'
    //     return startA || endA
    // }

    return (
        <section style={container}>
            <section style={styleBar} className="styleBar">
                <div style={alignItems}>
                    <Tooltip title="Left align" aria-label="Left align" placement="top">
                        <span className="material-icons" onClick={() => {
                            textAreaStyle.textAlign = 'left';
                            setStyle('textAlign', textAreaStyle.textAlign)
                        }} style={styleObject.textAlign === 'left' ? { ...selected } : { ...icons, userSelect: 'none' }}>format_align_left</span>
                    </Tooltip>

                    <Tooltip title="Center align" aria-label="Center align" placement="top">
                        <span className="material-icons" onClick={() => {
                            textAreaStyle.textAlign = 'center';
                            // handleSelectedStyle('text-align', 'center')

                            setStyle('textAlign', textAreaStyle.textAlign)
                        }} style={styleObject.textAlign === 'center' ? { ...selected } : { ...icons, userSelect: 'none' }}>format_align_center</span>
                    </Tooltip>

                    <Tooltip title="Right align" aria-label="Right align" placement="top">
                        <span className="material-icons" onClick={() => {
                            textAreaStyle.textAlign = 'right';
                            setStyle('textAlign', textAreaStyle.textAlign)
                        }} style={styleObject.textAlign === 'right' ? { ...selected } : { ...icons, userSelect: 'none' }}>format_align_right</span>
                    </Tooltip>
                </div>
                <div className={{ ...alignItems, flex: 1 }}>
                    <Tooltip title="Change font style" aria-label="Change font style" placement="top">
                        <Button variant="outlined" aria-controls="font-menu" id="font-menu" aria-haspopup="true" onClick={(e) => handleMenuClick(e, 'font')} style={{ fontSize: '10px', ...neuromorphic }}>
                            {options[selectedIndex] || "Open Menu"}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="font-menu"
                        anchorEl={anchorEl?.font}
                        keepMounted
                        open={Boolean(anchorEl?.font)}
                        onClose={() => handleClose('font')}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => {
                                    handleMenuItemClick(event, index, 'font')
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div style={{ ...alignItems, width: '40%' }}>
                    <Counter setDropdownStyle={setDropdownStyle} type={'fontSize'} value={styleObject.fontSize} neuromorphic={neuromorphic} />
                    <Tooltip title="Bold" aria-label="Bold" placement="top">
                        <div>
                            <span
                                class="material-icons"
                                style={textAreaStyle.fontWeight === 700 ? { ...selected } : { ...icons }}
                                onClick={() => {
                                    textAreaStyle.fontWeight = textAreaStyle.fontWeight === 700 ? 100 : 700
                                    setStyle('isBold', !styleObject.isBold)
                                }}>format_bold</span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Underline" aria-label="Underline" placement="top">
                        <div>
                            <span className="material-icons" onClick={() => {
                                textAreaStyle.textDecoration = textAreaStyle.textDecoration === 'none' ? 'underline' : 'none'
                                setStyle('textDecoration', textAreaStyle.textDecoration)
                            }} style={textAreaStyle.textDecoration === 'underline' ? { ...selected } : { ...icons }}>format_underlined</span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Add link" aria-label="Add link" placement="top">
                        <div>
                            <span
                                className="material-icons"
                                aria-controls="simple-menu"
                                id="font-menu"
                                aria-haspopup="true"
                                onClick={(e) => {
                                    setStyle('addLinkPressed', !styleObject.addLinkPressed);
                                    handleMenuClick(e, 'link');
                                    setLinkText(selectedTextObject.selectedText)
                                }} style={styleObject.addLinkPressed ? { ...selected } : { ...icons }}>link</span>
                        </div>
                    </Tooltip>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl?.link}
                        keepMounted
                        open={Boolean(anchorEl?.link)}
                        onClose={() => handleClose('link')}

                    >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                id="linkText"
                                label="Text"
                                size="small"
                                variant="outlined"
                                style={{ margin: 10 }}
                                value={linkText}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <TextField
                                    id="linkValue"
                                    label="Link"
                                    size="small"
                                    variant="outlined"
                                    inputRef={linkValueRef}
                                    style={{ margin: 10 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    size="small"
                                    style={{ margin: 10 }}
                                    onClick={handleAddLink}
                                    {...!selectedTextObject.selectedText && { disabled: true }}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </Menu>
                    {/* {TODO} */}
                    {/* <Tooltip title="Highlight color" aria-label="Highlight color" placement="top">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="color"
                                id="color-picker"
                                style={colorPicker}
                                onChange={(e) => {
                                    document.getElementById('color-dropper').style.color = e.target.value
                                    openColorPicker()
                                    setStyleObject({ ...styleObject, color: e.target.value })
                                }} />

                            <i className="fas fa-eye-dropper" id="color-dropper" ></i>
                        </div>
                    </Tooltip> */}
                </div>
            </section>
            <div
                style={{ ...textAreaStyle }}
                contentEditable="true"
                id="textarea"
                className="selectable-textarea"
                placeholder='Please write here'
                onSelect={() => {
                    handleSelection();
                }}
            ></div>
        </section>
    )
}

const neuromorphic = {
    boxShadow: '-10px -10px 30px 0 #ffffff, 10px 10px 30px 0 #aeaec090',
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
    padding: '10px',
    borderRadius: 10,
    overflow: 'auto',
    ...neuromorphic
}

const styleBar = {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    width: '100%',
    cursor: 'pointer',
    margin: '3px',
    borderRadius: 10,
    marginBottom: '2%',
    ...neuromorphic
}

const colorPicker = {
    opacity: '0.1',
    position: 'relative',
    left: '50%'
}

const alignItems = {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '15%',
    alignItems: 'center'
}

const selected = {
    backgroundColor: 'inherit',
    borderRadius: '50%',
    padding: '8px 9px',
    boxShadow: 'inset -10px -10px 30px 0 #ffffff, inset 10px 10px 30px 0 #aeaec090',
    color: 'dodgerblue'
}

const icons = {
    borderRadius: '50%',
    padding: '8px 9px',
    ...neuromorphic
}


