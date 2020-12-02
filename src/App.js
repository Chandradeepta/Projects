import logo from './logo.svg';
import './App.css';
import Texteditorcontainer from './components/TextEditorContainer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { CONSTANTS } from './utils/constants';
import { ThemeContextProvider } from './utils/ThemeContext';

window.onload = function () {
  document.getElementById("textarea").focus();
};

function App() {
  const [isDark, setDark] = useState(true);
  const neuromorphic = {
    boxShadow: !isDark ?
      `-10px -10px 20px 0 ${CONSTANTS.LIGHT_MODE_BS_LIGHT_COLOR}, 10px 10px 20px 0 ${CONSTANTS.LIGHT_MODE_BS_DARK_COLOR}` :
      `4px 4px 8px 0 ${CONSTANTS.DARK_MODE_BS_DARK_COLOR}, -4px -4px 8px 0 ${CONSTANTS.DARK_MODE_BS_LIGHT_COLOR}`,
    background: isDark ? `${CONSTANTS.DARK_MODE_BG}` : `${CONSTANTS.LIGHT_MODE_BG}`,
    color: isDark ? `${CONSTANTS.LIGHT_MODE_BG}` : `${CONSTANTS.DARK_MODE_BG}`
  }
  const outerTheme = createMuiTheme({
    palette: {
      primary: {
        main: isDark ? CONSTANTS.DARK_MODE_BG : CONSTANTS.LIGHT_MODE_BG,
      },
    },
  });


  return (
    <div className="App" style={{ background: isDark ? CONSTANTS.DARK_MODE_BG : CONSTANTS.LIGHT_MODE_BG }}>
      <header style={{...neuromorphic,backgroundColor: 'white',borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px', padding: '8px'}}>
        <div className={`App-header ${!isDark && 'anime'} `}>
          <h3>Ez <span id="docs">Docs</span></h3>
          <span
            className="material-icons"
            style={{ color: isDark ? 'yellow' : CONSTANTS.DARK_MODE_BG }}
            onClick={() => setDark(!isDark)}>
            {!isDark ? 'nights_stay' : 'wb_sunny'}
          </span>
        </div>
      </header>
      <ThemeProvider theme={outerTheme}>
        <ThemeContextProvider value={isDark}>
          <Texteditorcontainer />
        </ThemeContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
