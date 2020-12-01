import Tooltip from '@material-ui/core/Tooltip';
import { useContext } from 'react';
import { CONSTANTS } from '../utils/constants';
import { ThemeContext } from '../utils/ThemeContext';

export default function Counter(props) {
    const isDark = useContext(ThemeContext);
    const neuromorphic = {
        boxShadow: !isDark ?
            `-10px -10px 30px 0 ${CONSTANTS.LIGHT_MODE_BS_LIGHT_COLOR}, 10px 10px 30px 0 ${CONSTANTS.LIGHT_MODE_BS_DARK_COLOR}` :
            `4px 4px 8px 0 ${CONSTANTS.DARK_MODE_BS_DARK_COLOR}, -4px -4px 8px 0 ${CONSTANTS.DARK_MODE_BS_LIGHT_COLOR}`,
        background: isDark ? `${CONSTANTS.DARK_MODE_BG}` : `${CONSTANTS.LIGHT_MODE_BG}`,
        color: isDark ? `${CONSTANTS.LIGHT_MODE_BG}` : `${CONSTANTS.DARK_MODE_BG}`
    }

    return (
        <div style={counterContainer}>
            <Tooltip title={"Decrease font size (px)"} aria-label={"Decrease font size"} placement="top">
                <div>
                    <span className="material-icons" style={{ ...iconButton, ...neuromorphic }} onClick={() => {
                        props.setFontSize(props.type, props.value - 1)
                    }}>remove</span>
                </div>
            </Tooltip>
            <Tooltip title={"Font size (px)"} aria-label={"Font size"} placement="top">
                <input type="tel" style={{
                    ...input,
                    ...neuromorphic
                }}
                    value={props.value}
                    readOnly
                    onChange={(e) => {
                        props.setFontSize(props.type, Number(e.target.value))
                    }} />
            </Tooltip>
            <Tooltip title={"Increase font size (px)"} aria-label={"Increase font size"} placement="top">
                <div>
                    <span className="material-icons" style={{ ...iconButton, ...neuromorphic }} onClick={() => {
                        props.setFontSize(props.type, Number(props.value) + 1)
                    }}>add</span>
                </div>
            </Tooltip>
        </div>
    )
}

const counterContainer = {
    display: 'flex',
    userSelect: 'none',
    justifyContent: 'center'
}

const iconButton = {
    borderRadius: '50%',
    border: 'none',
    marginLeft: '6px',
    marginRight: '6px',

}

const input = {
    width: '30%',
    height: '20px',
    textAlign: 'center',
    border: 'none'
}
