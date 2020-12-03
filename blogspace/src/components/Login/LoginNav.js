export default function LoginNav(props) {


    return (
        <section style={navConatiner}>
            <section style={logoStyle}>
                <span class="material-icons">local_florist</span>
                <span style={{ letterSpacing: 4 }}>BlogSpace</span>
            </section>
            <nav style={navStyles}>
                <div style={navButtonStyles}>
                    <div style={{ textAlign: 'center' }}>
                        <span class="material-icons">person</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        Sign up
                    </div>
                </div>
                <div style={navButtonStyles}>
                    <div style={{ textAlign: 'center' }}>
                        <span class="material-icons">person</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        Sign in
                    </div>
                </div>
            </nav>
        </section>
    )
}

const navConatiner = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '60vh',
    background: 'white',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    zIndex: 0,
    margin: 'auto'
}

const logoStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

const navStyles = {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}

const navButtonStyles = {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}
