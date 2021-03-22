import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function LoginPage(props) {

  //DECLARATION DES ETATS DE SIGNUP//
  const [emailSignUp, setEmailSignUp] = useState();
  const [lastNameSignUp, setLastNameSignUp] = useState();
  const [roomNumberSignUp, setRoomNumberSignUp] = useState();

  //DECLARATION DES ETATS DE SIGNIN//
  const [emailSignIn, setEmailSignIn] = useState('')
  const [lastNameSignIn, setLastNameSignIn] = useState("")
  const [roomNumberSignIn, setRoomNumberSignIn] = useState("")

  //DECLARATION DES ETATS DE MESSAGE D'ERREUR//
  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  //DECLARATION de l'Etat pour vérification de l'existence du User pour la redirection vers HOME//
  const [userExists, setUserExists] = useState(false)

  //FONCTION SIGNUP//
  var handleSubmitSignup = async () => {

    //ENVOIE DES INFOS AU BACK POUR INSCRIPTION D'UN USER//
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `lastnameFromFront=${lastNameSignUp}&emailFromFront=${emailSignUp}&roomNumberFromFront=${roomNumberSignUp}`
    })

    const body = await data.json()

    if (body.result === true) {

      //ENREGISTREMENT DU TOKEN DANS UN REDUCER//
      props.addToken(body.token)
      setUserExists(true)
    } else {

      //MESSAGE D'ERREU SIGNUP//
      setErrorsSignup(body.error)
    }
  }

  //FONCTION SIGNIN//
  var handleSubmitSignin = async () => {
    //ENVOIE DES INFOS AU BACK POUR VERIFICATION SI USER EXISTE DEJA //

    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `emailFromFront=${emailSignIn}&lastnameFromFront=${lastNameSignIn}&roomNumberFromFront=${roomNumberSignIn}`
    })

    const body = await data.json()


    if (body.result === true) {
      //ENREGISTREMENT DU TOKEN DANS UN REDUCER//
      props.addToken(body.token)
      setUserExists(true)

    } else {
      //MESSAGE D'ERREUR SIGNUP//
      setErrorsSignin(body.error)
    }
  }

  //Redirection vers HOME
  if(userExists){
    return <Redirect to='/home' />
  }

 // affichage de l'ensemble des messages Signin
  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<p>{error}</p>)
  })

   // affichage de l'ensemble des messages Signup
  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  return (
    
    
    <div className='ImgBackGround'>
      {/* Input SIGN-IN et exécution de la fonction handleSubmitSignin*/}

      <div className="Sign">
        <h1>SignIn</h1>
        <Input onChange={(e) => setLastNameSignIn(e.target.value)} className="Login-input" placeholder="LastName" />
        <Input onChange={(e) => setEmailSignIn(e.target.value)} className="Login-input" placeholder="email@email.com" />
        <Input onChange={(e) => setRoomNumberSignIn(e.target.value)} className="Login-input" placeholder="N° Chambre" />

        {/* Affichage des messages d'erreur SignIN*/}
        {tabErrorsSignin}

        <Button onClick={() => handleSubmitSignin()} type="primary">Sign-in</Button>
      </div>

      {/* Input SIGN-UP et exécution de la fonction handleSubmitSignup*/}

      <div className="Sign">
        <h1>SignUp</h1>
        <Input onChange={(e) => setLastNameSignUp(e.target.value)} className="Login-input" placeholder="LastName" />
        <Input onChange={(e) => setEmailSignUp(e.target.value)} className="Login-input" placeholder="email@email.com" />
        <Input onChange={(e) => setRoomNumberSignUp(e.target.value)} className="Login-input" placeholder="N° Chambre" />

        {/* Affichage des messages d'erreur SignUP*/}
        {tabErrorsSignup}

        <Button onClick={() => handleSubmitSignup()} style={{ width: '80px' }} type="primary">Sign-up</Button>
      </div>
    </div>

  );
}
function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginPage)