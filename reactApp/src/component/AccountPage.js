import React,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';
import { Card, } from 'antd';
import { connect } from "react-redux";
import NavBar from './NavBar'
import { CardBody,CardText } from 'reactstrap';

function AccountPage(props) {
  //Déclaration des ETATS
  const [isCommande, setIsCommande] = useState(false);
  const [isEvenement, setisEvenement] = useState(false);
  const [account, setAccount] = useState([])
  const [event, setEvent] = useState([])
  const [order, setOrder] = useState([])


  //Recupération de l'évent et commande et infos USER DU BACK 
useEffect(  () => { var accountFunction = async() =>{
  const data = await fetch(`/account`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=GOhQ7VpMkoPjG6h9iF5gztj904Frncof`
    })
    const body = await data.json()
    setAccount(body.saveUser)
    setEvent(body.saveEvents)
    setOrder(body.saveOrder)
    console.log('body',body)
  }
  accountFunction()       
  
  }, []); 
  console.log('token account',props.token)


  
  return (
    


<>
<NavBar/>

<div style={{display:'flex',justifyContent:'center',marginTop:40}}>
<Card style={{ width:'65%',height: '100%' }}
cover={<img alt="example" src="https://res.cloudinary.com/dgv5agwfj/image/upload/v1614590356/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/3W8A7073_hotel_des_deux_iles_bd_gqbwwd.jpg" />}
>
<CardBody style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>

  <CardText >Bonjour HAJAR !!{props.token}</CardText> 
  <CardText >Numéro de chambre : {account.roomNumber}</CardText>  
  <CardText > Centre d'intérets :{account.motivation==='undefined'?"auncun centre d'intêret":account.motivation}</CardText>  
  <CardText >Récapitulatif:</CardText> 
</CardBody>

  </Card>

</div>
 </>

)}
function mapStateToProps(state) {
  return { token: state.token};
}
export default connect(mapStateToProps, null)(AccountPage);
