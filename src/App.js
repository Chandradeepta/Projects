import logo from './logo.svg';
import './App.css';
import Texteditorcontainer from './components/TextEditorContainer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { CONSTANTS } from './utils/constants';
import { ThemeContextProvider } from './utils/ThemeContext';



function App() {
  const [isDark, setDark] = useState(false);
  const outerTheme = createMuiTheme({
    palette: {
      primary: {
        main: isDark ? CONSTANTS.DARK_MODE_BG : CONSTANTS.LIGHT_MODE_BG,
      },
    },
  });




  return (
    <div className="App" style={{ background: isDark ? CONSTANTS.DARK_MODE_BG : CONSTANTS.LIGHT_MODE_BG }}>
      <header className="App-header">
        <h2 >
          Skillsme Beta Text Editor
        </h2>
        <span class="material-icons" onClick={() => setDark(!isDark)}>{!isDark ? 'nights_stay' : 'wb_sunny'}</span>
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
