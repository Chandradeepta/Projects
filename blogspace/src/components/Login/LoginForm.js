export default function LoginForm(props) {
    

    return (
        <section style={formContainer}>
            <form style={formStyle}>
                <label style={{textAlign:'left',fontFamily:'Montserrat'}}>User Name</label>
                <input style={{marginTop:10}}type="text"/>
                <label style={{textAlign:'left',fontFamily:'Montserrat',marginTop:20}} >Password</label>
                <input style={{marginTop:10}} type="password"/>
                <div style={loginBtnContainer}>
                <button type="submit" style={loginBtnStyle}>Login</button>
                </div>
                <p style={{fontFamily:'Montserrat'}}>Or</p>
                <div style={googleLoginBtnStyle}>
                    {/* Google button here */}
                </div>
            </form>
        </section>
    )
}

const formContainer = {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    height: '60vh',
    background: 'white',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    zIndex: 0,
    margin: 'auto'
}

const formStyle = {
    display:'flex',
    flexDirection:'column',
    padding:20,
    justifyContent:'flex-start'
}
const loginBtnStyle = {
    width:70,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2250d9',
    height:40,
    marginTop:20,
    color:'white',
    fontFamily:'Montserrat'
}

const loginBtnContainer = {
    width:'100%',
    display:'flex',
    height:60,
    justifyContent:'center',
    alignItems:'center'
}

const googleLoginBtnStyle = {
    height:40,
    width:'auto',
    display:'flex',
    flexDirection:'row',
    backgroundColor:'green'
}
