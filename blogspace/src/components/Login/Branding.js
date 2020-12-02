export default function Branding(props) {
    

    return (
        <section style={brandingContainer}>
            <p style={{color: 'white', paddingTop: 70, fontSize: 25}}>Welcome to ZAKI</p>
        </section>
    )
}

const brandingContainer = {
    display: 'flex',
    flex: 2.5,
    background: '#2250d9',
    zIndex: 1,
    boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
    height: '70vh',
    justifyContent: 'center',
    alignItems: 'flex-start'
}