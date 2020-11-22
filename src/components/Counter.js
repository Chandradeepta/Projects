import { useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';

export default function Counter(props) {
    const [readonly, setReadonly] = useState(true)
    var count = props.type === 'fontWeight' ? 100 : 1;
    var suffix = props.type === 'fontWeight' ? 'weight' : 'size';
    return (
        <div style={counterContainer}>
            <Tooltip title={`Decrease font ${suffix}`} aria-label={`Decrease font ${suffix}`} placement="top">
                <div>
                    <span class="material-icons" style={{ border: '1px solid black' }} onClick={() => {
                        props.setDropdownStyle(props.type, props.value - count)
                    }}>remove</span>
                </div>
            </Tooltip>
            <Tooltip title={`Font ${suffix}`} aria-label={`Font ${suffix}`} placement="top">
                <input type="tel" style={{ width: '30%', height: '20px', textAlign: 'center' }} {...props.type === 'fontWeight' && { disabled: true }} value={props.value} onFocus={() => setReadonly(false)} onBlur={() => setReadonly(true)} onInput={(e) => {
                    props.setDropdownStyle(props.type, e.target.value)
                }} />
            </Tooltip>
            <Tooltip title={`Increase font ${suffix}`} aria-label={`Increase font ${suffix}`} placement="top">
                <div>
                    <span class="material-icons" style={{ border: '1px solid black' }} onClick={() => {
                        props.setDropdownStyle(props.type, Number(props.value) + count)
                    }}>add</span>
                </div>
            </Tooltip>
        </div>
    )
}

const counterContainer = {
    display: 'flex',

}
