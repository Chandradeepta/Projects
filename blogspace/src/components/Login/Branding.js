export default function Branding(props) {
    

    return (
        <section style={brandingContainer}>
            <p style={brandingHeader}>Welcome to BlogSpace</p>
            <p style={brandTagline}> A Directory Of Wonderful Blogs</p>
        </section>
    )
}

const brandingContainer = {
    display: 'flex',
    flexDirection:'column',
    flex: 2.5,
    background: '#2250d9',
    zIndex: 1,
    boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
    height: '70vh',
    justifyContent: 'center',
    alignItems: 'flex-start'
}

const brandingHeader = {
    color: 'white',
    display:'flex',
    flex:1, 
    paddingTop: 70,
    paddingLeft:25,
    fontSize: 25,
    fontFamily:'Montserrat',
    flexDirection:'column',
    width:'auto',
    justifyContent:'space-around'
}

const brandTagline = {
    color:'white',
    paddingTop:40,
    display:'flex',
    flex:1,
    fontSize:15,
    fontFamily:'Montserrat',
    width:'100%',
    justifyContent:'space-around'
}