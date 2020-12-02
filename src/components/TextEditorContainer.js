import React, { useContext, useRef, useState } from 'react';
import {
    Button,
    ClickAwayListener,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Popper,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

import Counter from './Counter';
import { ThemeContext } from '../utils/ThemeContext';
import { CONSTANTS } from '../utils/constants';

import './TextEditorContainer.css';


// const CONSTANTS.fontNames = [
//     "Times New Roman, Times, serif",
//     "Arial, Helvetica, sans-serif",
//     "Lucida Console, Courier, monospace",
//     "Courier New",
//     "Verdana",
//     "Georgia",
//     "Palatino",
//     "Garamond",
//     "Bookman",
//     "Tahoma",
//     "Trebuchet MS",
//     "Impact",
//     "Comic Sans MS",
// ];



export default function Texteditorcontainer(props) {
    const isDark = useContext(ThemeContext);
    const neuromorphic = {
        boxShadow: !isDark ?
            `-10px -10px 20px 0 ${CONSTANTS.LIGHT_MODE_BS_LIGHT_COLOR}, 10px 10px 20px 0 ${CONSTANTS.LIGHT_MODE_BS_DARK_COLOR}` :
            `4px 4px 8px 0 ${CONSTANTS.DARK_MODE_BS_DARK_COLOR}, -4px -4px 8px 0 ${CONSTANTS.DARK_MODE_BS_LIGHT_COLOR}`,
        background: isDark ? `${CONSTANTS.DARK_MODE_BG}` : `${CONSTANTS.LIGHT_MODE_BG}`,
        color: isDark ? `${CONSTANTS.LIGHT_MODE_BG}` : `${CONSTANTS.DARK_MODE_BG}`
    }

    const [styleObject, setStyleObject] = useState({
        fontSize: 3,
        fontName: CONSTANTS.fontNames[1]
    });

    // Menu state
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Menu Selection Index
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    // To set the selected Text
    const [selectedTextObject, setSelectedTextObject] = React.useState({
        range: null,
        selection: null,
        selectedText: ''
    });

    // Add Link : Selected Text
    const [linkText, setLinkText] = useState('');

    // Popper ID
    const id = Boolean(anchorEl?.link) ? 'simple-popper' : undefined;

    // Add link textfield refs
    const linkValueRef = useRef();

    // Image url
    const [imgUrl, setImgUrl] = useState({
        url: '',
        isValid: false
    })

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
        setSelectedIndex(index);
        document.execCommand('fontName', false, CONSTANTS.fontNames[index]);
        setAnchorEl({
            [type]: null
        });
    };

    const setStyle = (type, value) => {
        setStyleObject({ ...styleObject, [type]: value })
    }

    const setFontSize = (type, value) => {
        if (value < 8 && value) {
            document.execCommand(type, false, value)
            setStyleObject({ ...styleObject, [type]: value })
        }
    }

    const handleAddLink = () => {
        try {
            var url = new URL(linkValueRef.current.value);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectedTextObject.range);
            document.execCommand('createLink', false, url);
            handleClose('link');
            linkValueRef.current.value = '';
        } catch (e) {
            return alert('Enter valid url')
        }
    }

    const handleSelection = () => {
        setSelectedTextObject({
            selection: window.getSelection(),
            range: window.getSelection().getRangeAt(0),
            selectedText: window.getSelection().toString()
        })
    }

    const handleLocalImageFile = (e) => {
        handleClose('imageMenu');
        document.getElementById("textarea").focus();
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("textarea").focus();
            document.execCommand('insertImage', false, e.target.result);
            document.execCommand('enableObjectResizing')
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <section style={container}>
            <section style={{ ...styleBar, ...neuromorphic }} className="styleBar">

                <div style={{ flex: 1, ...alignItems }}>
                    <Tooltip title="Left align" aria-label="Left align" placement="top">
                        <span className="material-icons" onClick={() => {
                            document.execCommand('justifyLeft', false, '')
                        }} style={{ ...icons, ...neuromorphic, userSelect: 'none' }}>format_align_left</span>
                    </Tooltip>

                    <Tooltip title="Center align" aria-label="Center align" placement="top">
                        <span className="material-icons" onClick={() => {
                            document.execCommand('justifyCenter', false, '')
                        }} style={{ ...icons, ...neuromorphic, userSelect: 'none' }}>format_align_center</span>
                    </Tooltip>

                    <Tooltip title="Right align" aria-label="Right align" placement="top">
                        <span className="material-icons" onClick={() => {
                            document.execCommand('justifyRight', false, '')
                        }} style={{ ...icons, ...neuromorphic, userSelect: 'none' }}>format_align_right</span>
                    </Tooltip>
                </div>

                <div className={{ ...alignItems, flex: 1 }}>
                    <Tooltip title="Change font style" aria-label="Change font style" placement="top">
                        <Button variant="outlined" aria-controls="font-menu" id="font-menu" aria-haspopup="true" onClick={(e) => handleMenuClick(e, 'fontName')} style={{ fontSize: '10px', ...neuromorphic, width: '252px' }}>
                            {CONSTANTS.fontNames[selectedIndex]}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="font-menu"
                        anchorEl={anchorEl?.fontName}
                        keepMounted
                        open={Boolean(anchorEl?.fontName)}
                        onClose={() => handleClose('fontName')}
                    >
                        {CONSTANTS.fontNames.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => {
                                    handleMenuItemClick(event, index, 'fontName')
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>

                <div style={{ ...alignItems, flex: 3 }}>
                    <Counter setFontSize={setFontSize} type={'fontSize'} value={styleObject.fontSize} neuromorphic={neuromorphic} />

                    <Tooltip title="Bold" aria-label="Bold" placement="top">
                        <div>
                            <span
                                className="material-icons"
                                style={{ ...icons, ...neuromorphic }}
                                onClick={() => {
                                    document.execCommand('bold')
                                }}>format_bold</span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Underline" aria-label="Underline" placement="top">
                        <div>
                            <span className="material-icons" onClick={() => {
                                document.execCommand('underline');
                            }} style={{ ...icons, ...neuromorphic }}>format_underlined</span>
                        </div>
                    </Tooltip>

                    {/* Add Image Section Start*/}

                    <Tooltip title="Add photo" aria-label="addphoto" placement="top">
                        <div>
                            <span
                                className="material-icons"
                                aria-controls="image-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleMenuClick(e, 'imageMenu')}
                                style={{ ...icons, ...neuromorphic }}>add_photo_alternate</span>
                        </div>
                    </Tooltip>
                    <Menu
                        id="image-menu"
                        anchorEl={anchorEl?.imageMenu}
                        keepMounted
                        open={Boolean(anchorEl?.imageMenu)}
                        onClose={() => handleClose('imageMenu')}
                    >
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="file-input"
                            type="file"
                            onChange={handleLocalImageFile}
                        />
                        <label htmlFor="file-input">
                            <MenuItem onClick={() => handleClose('imageMenu')}>
                                <ListItemIcon>
                                    <i className="fas fa-upload " style={{ paddingLeft: '7%' }}></i>
                                </ListItemIcon>
                                <Typography variant="subtitle2">Upload form computer</Typography>
                            </MenuItem>
                        </label>
                        <MenuItem onClick={(e) => handleMenuClick(e, 'dialog')}>
                            <ListItemIcon>
                                <InsertLinkIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="subtitle2">By URL</Typography>
                        </MenuItem>
                    </Menu>

                    <Dialog
                        open={Boolean(anchorEl?.dialog)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="image-dialog"
                    >
                        <DialogTitle id="alert-dialog-title" style={{ ...imgUrl.isValid && { display: "none" } }}>
                            {"Insert image"}
                        </DialogTitle>
                        <DialogContent style={{ ...imgUrl.isValid && { padding: 0 } }}>
                            <DialogContentText id="alert-dialog-description" style={{ position: 'relative' }}>
                                {imgUrl.isValid ?
                                    <>
                                        <span className="material-icons" style={imageCloseIcon} onClick={() => setImgUrl({ url: '', isValid: false })}>close</span>
                                        <img src={imgUrl.url} />
                                    </>
                                    :
                                    <TextField
                                        id="add-image-url"
                                        type="url"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        onInput={(e) => {
                                            let img = new Image();
                                            img.src = e.target.value;
                                            img.onload = () => {
                                                setImgUrl({ url: img.src, isValid: true })
                                            }
                                            img.onerror = () => {
                                                setImgUrl({ url: img.src, isValid: false })
                                            };
                                            setImgUrl({ ...imgUrl, url: e.target.value })
                                        }}
                                    />}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ padding: '25px' }}>
                            <Button
                                onClick={
                                    () => {
                                        handleClose('dialog');
                                        setImgUrl({ url: '', isValid: false })
                                    }}
                                style={{ color: 'dodgerblue' }}>Cancel</Button>
                            <Button
                                onClick={() => {
                                    document.getElementById('textarea').focus();
                                    document.execCommand('insertImage', false, imgUrl.url)
                                    handleClose('dialog');

                                }}
                                autoFocus
                                style={{ color: 'dodgerblue' }} {...!imgUrl.isValid && { disabled: true }}>
                                Insert
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Add Image Section End*/}

                    {/* Add Link Section Start*/}

                    <Tooltip title="Add link" aria-label="Add link" placement="top">
                        <div>
                            <span
                                className="material-icons"
                                aria-controls="link-menu"
                                id="link-menu"
                                aria-haspopup="true"
                                onClick={(e) => {
                                    setStyle('addLinkPressed', !styleObject.addLinkPressed);
                                    Boolean(anchorEl?.link) ? handleClose('link') : handleMenuClick(e, 'link');
                                    setLinkText(selectedTextObject.selectedText)
                                }} style={{ ...icons, ...neuromorphic }}>link</span>
                        </div>
                    </Tooltip>

                    <Popper
                        id={id}
                        open={Boolean(anchorEl?.link)}
                        anchorEl={anchorEl?.link}
                        modifiers={{
                            flip: {
                                enabled: true,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'viewport',
                            },
                            offset: {
                                enabled: true,
                                offset: '0,20'
                            }

                        }}>
                        <ClickAwayListener onClickAway={() => handleClose('link')}>
                            <Paper className="link-panel" style={{ width: '400px', boxShadow: 'rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', background: 'white' }}>
                                    <TextField
                                        id="linkValue"
                                        label="Link"
                                        size="small"
                                        variant="outlined"
                                        inputRef={linkValueRef}
                                        style={{ margin: 10, userSelect: 'none', flex: 1 }}
                                        placeholder="Paste a link"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        size="small"
                                        style={{ margin: 10, userSelect: 'none', }}
                                        id="link-button"
                                        onClick={handleAddLink}
                                    >
                                        Apply
                                </Button>
                                </div>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>

                    {/* Add Link Section End*/}

                    <Tooltip title="Text color" aria-label="Text color" placement="top">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="color"
                                id="color-picker"
                                style={colorPicker}
                                onChange={(e) => {
                                    document.getElementById('color-dropper').style.color = e.target.value
                                    document.execCommand('foreColor', false, e.target.value)
                                }} />

                            <span className="material-icons" id="color-dropper" style={{ ...icons, ...neuromorphic }}>text_format</span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Highlight color" aria-label="Highlight color" placement="top">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="color"
                                id="color-picker"
                                style={colorPicker}
                                onChange={(e) => {
                                    document.getElementById('color-dropper').style.color = e.target.value
                                    document.execCommand('hiliteColor', false, e.target.value)
                                }} />

                            <span className="material-icons" id="color-dropper" style={{ ...icons, ...neuromorphic }}>colorize</span>
                        </div>
                    </Tooltip>

                </div>
            </section>
            <div style={{ ...textareaContainer, ...neuromorphic }} id="textareaContainer">
                <div
                    style={textAreaStyle}
                    contentEditable="true"
                    id="textarea"
                    className="selectable-textarea"
                    placeholder='Please write here'
                    onClick={() => setStyleObject({ ...styleObject, fontSize: 3 })}
                    onSelect={() => handleSelection()}
                />
            </div>
        </section>
    )
}

const container = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '4%',
    marginTop: '1%',
    alignItems: 'center',
}

const textareaContainer = {
    minWidth: '100%',
    width: '100%',
    height: '100%',
    maxHeight: '350px',
    minHeight: '350px',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    overflow: 'hidden'
}

const textAreaStyle = {
    resize: 'none',
    padding: '10px',
    overflow: 'auto',
    backgroundColor: 'white',
    margin: 10,
    flex: 1,
    textAlign: 'left',
    color: 'black'
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
}

const colorPicker = {
    opacity: '0.1',
    position: 'relative',
    left: '50%'
}

const alignItems = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',

}

const icons = {
    borderRadius: '50%',
    padding: '8px 9px',
    userSelect: 'none',
}

const imageCloseIcon = {
    position: 'absolute',
    marginLeft: '88%',
    marginTop: '2%',
    padding: '8px',
    paddingInlineStart: '15px',
    paddingInlineEnd: '15px',
    background: 'white',
    borderRadius: '6px',
    cursor: 'pointer'
}


