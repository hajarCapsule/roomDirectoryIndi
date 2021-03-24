import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, } from 'antd';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from "react-redux";
import NavBar from './NavBar'
import { CardBody, CardText } from 'reactstrap';

function AccountPage(props) {

  //Déclaration des ETATS
  const [account, setAccount] = useState([])
  const [event, setEvent] = useState([])
  const [order, setOrder] = useState([])


  //Recupération des événements de l'utilisateur du Backend
  useEffect(() => {
    var accountFunction = async () => {
      const data = await fetch(`/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.token}`
      })
      const body = await data.json()
      setAccount(body.saveUser)
      setEvent(body.saveEvents)
      setOrder(body.saveOrder)
    }
    accountFunction()

  }, []);

  return (
    <>
      <NavBar />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page */}

        <Card style={{ width: '65%', height: '100%' }}
          cover={<img alt="example" src="https://res.cloudinary.com/dgv5agwfj/image/upload/v1614590356/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/3W8A7073_hotel_des_deux_iles_bd_gqbwwd.jpg" />}
          >
          <CardBody >

            <CardText style={{ display: 'flex', justifyContent: 'center',fontSize:20,fontWeight:'bold'}} >Bonjour {account.lastName} !!</CardText>
            <CardText style={{ display: 'flex', justifyContent: 'center',fontSize:20}}>Numéro de chambre : {account.roomNumber}</CardText>
            <CardText style={{ display: 'flex', justifyContent: 'center',fontSize:20}}>Récapitulatif:</CardText>

            {/*LISTE DES EVENEMENTS*/}
            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ marginBottom: 8, backgroundColor: '#AADEC0', opacity: 0.7 }} >
                <Typography > Mes Evénements</Typography>
              </AccordionSummary>
              {event.map((evenement, i) => {
                return (
                  <AccordionDetails style={{ borderWidth: 3, borderColor: 'white', borderStyle: 'solid', backgroundColor: '#F8F8F8' }}>
                    <Typography>
                      {evenement.event.nameEvents}
                    </Typography>
                  </AccordionDetails>
                )
              })}
            </Accordion>

            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ marginBottom: 8, backgroundColor: '#AADEC0', opacity: 0.7 }} >
                <Typography > Mes Commandes</Typography>
              </AccordionSummary>
              {order.map((myOrder, i) => {
                return (
                  <AccordionDetails style={{ borderWidth: 3, borderColor: 'white', borderStyle: 'solid', backgroundColor: '#F8F8F8' }}>
                    <Typography>
                    {myOrder.quantity} X {myOrder.foodID.nameArticle}  au prix de {myOrder.total} €
                    </Typography>
                  </AccordionDetails>
                )
              })}
            </Accordion>

          </CardBody>
        </Card>
      </div>
    </>

  )
}
function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(AccountPage);
