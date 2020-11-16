import { useEffect, useState } from "react";
import { CONSTANTS } from '../utils/Constants';

export default function Kettle(props) {

    const [seconds, setSeconds] = useState(CONSTANTS.TIMER_MAX);
    const [temparature, setTemparature] = useState(CONSTANTS.TEMPARATURE_MIN);

    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
        setSeconds(CONSTANTS.TIMER_MAX);
        setTemparature(CONSTANTS.TEMPARATURE_MIN);
    }

    useEffect(() => {
        let intervalId = null;
        if (!seconds) {
            toggle();
        }

        if (isActive) {
            intervalId = setInterval(() => {
                setTemparature(temparature + 1)
                setSeconds(seconds - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, seconds]);

    return (
        <div style={container}>
            <div style={innerContainer}>
                <div style={{ ...header, ...items }}>
                    <i className="fas fa-chevron-left"></i>
                    <h2 style={{ marginTop: 10 }}>Kettle</h2>
                </div>
                <div style={{ ...measures, ...items }}>
                    <div>
                        <i className="fas fa-thermometer-half fa-2x" style={{ color: '#00000042' }}></i>
                    </div>
                    <div style={temparatureContainer}>
                        <span style={{ fontSize: 30, fontWeight: 400, color: '' }}>{temparature} <span>&#176;</span>C</span>
                        <span style={{ fontSize: 14, color: '#00000042' }}>current temp.</span>
                    </div>
                </div>
                <div style={{ ...items, ...measures }}>
                    <div>
                        <i className="fas fa-water fa-2x" style={{ color: '#00000042' }}></i>
                    </div>
                    <div style={{...temparatureContainer, paddingRight: '10px'}}>
                        <span style={{ fontSize: 30, fontWeight: 400 }}>1.6 L</span>
                        <span style={{ fontSize: 14, color: '#00000042' }}>water volume</span>
                    </div>
                </div>
                <div style={{ ...items, display: "flex", justifyContent: 'center' }}>
                    <div style={{
                        boxShadow:
                            `${isActive ? 'inset ' : ''} -10px -10px 30px 0 #ffffff, 
                        ${isActive ? 'inset ' : ''} 10px 10px 30px 0 #aeaec090`,
                        ...power
                    }}
                        onClick={() => {
                            toggle();
                        }}>
                        <i className="fas fa-power-off fa-3x" style={{ color: '#88eaef' }}></i>
                    </div>
                </div>
                <div style={{ color: '#00000042', ...items }}>{!isActive ? 'it takes 1 minute' : `00 : ${seconds}`}</div>
            </div>
        </div>
    )
}

const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f0f3',
    paddingTop: '2%',
    paddingBottom: '2%'
}

const innerContainer = {
    width: '22%',
    minWidth: '260px',
    height: '90vh',
    minHeight: '35vh',
    backgroundColor: '#f0f0f3',
    borderRadius: '30px',
    boxShadow: '-10px -10px 30px 0 #ffffff, 10px 10px 30px 0 #aeaec090',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '1%',
    paddingBottom: '4%',
}

const header = {
    textAlign: 'start',
    justifyContent: 'space-around',
}

const items = {
    padding: '8%',
}
const measures = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '17%',
    paddingRight: '17%',
    justifyContent: 'space-evenly',
    paddingBottom: '5%',
    paddingTop: 0
}

const temparatureContainer = { 
    display: 'flex', 
    flexDirection: 'column', 
    textAlign: 'start' 
}

const power = {
    display: "flex",
    height: '100px',
    width: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f3',
    borderRadius: '150px',
    padding: '10%'
}