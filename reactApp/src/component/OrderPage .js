import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Card, Radio, InputNumber, Modal, Divider } from 'antd';
import { CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';

//import de l'accordion de la librairie MATERIEL UI
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Typography } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import NavBar from './NavBar'


function OrderPage(props) {

  //Déclaration des ETATS
  const [food, setFood] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [tabOrderFood, setTabOrderFood] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [place, setPlace] = useState("En Chambre");
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Au chargement de la page récupérer le détail du petit déj sélectionné
  useEffect(() => {
    var getFood = async () => {
      var response = await fetch(`/restauration/${props.match.params.route}/${props.match.params.id}`);
      var data = await response.json();
      setFood(data.food);
      setFoodDetails(data.food.detail)
    }
    getFood();
  }, []);

  //Fonction qui affiche le PopUp et exécute la fonction de confirmation handleSubmit
  const showModal = () => {
    setIsModalVisible(true);
    handleSubmit()
  };

  //Fonction qui gère l'affichage du popup
  const handleOk = () => {
    setIsModalVisible(false);
    setVisible(true)
  };


  //Conversion du tableau d'objet en string pour l'envoyer au back
  var details = JSON.stringify({ tabOrderFood })

  //Création dune copier du tableau tabOrderFood en pushant le type et la quantité du choix
  function onChange(value, entry) {

    var alreadyExist = false;

  //Vérifier si tableau est vide et créer une copie du tableau en insérant l'objet du type et de la quantité
    if(tabOrderFood.length === 0){
      setTabOrderFood([...tabOrderFood,{type:entry,quantity:value}])

  // si tableau n'est pas vide, on parcours le tableau pour éviter de créer des doublons
    }else{
      tabOrderFood.map((order,i)=>{

      //Si le type est déjà existant,mettre à jour juste la quantité
        if(order.type === entry && order.quantity != value){
            alreadyExist = true;
            tabOrderFood.splice(i, 1, {type:entry,quantity:value});
        }
      })

      if(alreadyExist == false){
        setTabOrderFood([...tabOrderFood,{type:entry,quantity:value}])
      }
    }
  }

  //Enregistrement de la commande dans le back//  
  var handleSubmit = async () => {
    const data = fetch(`/orderConfirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `details=${details}&token=${props.token}&foodID=${food._id}&lieu=${place}&quantity=${quantity}&price=${food.prix * quantity}`,
    });
  };

  //Redirection vers Home au click sur ok du popup//
  if (visible) {
    return <Redirect to='/home' />
  }

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page */}
        <Card
          style={{ width: 550, height: '60%' }}
          cover={<img alt="example" src={food.image} />} >
          <CardTitle tag="h2">

            {/*Champ input de la quantité du petit dej */}
            <InputNumber min={1} max={10} defaultValue={1} onChange={e => setQuantity(e)} style={{ width: 50 }} /> x {food.nameArticle}</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">{food.prix} €</CardSubtitle>
          <CardText>{food.description}</CardText>

          <Divider />

          <CardText>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              {/*Radio Boutton et enregistrement de lieu dans setplace */}
              <Radio.Group onChange={e => { e.target.value == 1 ? setPlace("En Chambre") : setPlace("Sur Place") }} name="radiogroup" defaultValue={1} >
                <Radio value={1}>En chambre</Radio>
                <Radio value={2}>Sur Place</Radio>
              </Radio.Group>

              {/*Button confirmation de la commande et affichage du popup */}
              <Button onClick={showModal}>Confirmer ma commande</Button>
            </div>
            <Divider />
          </CardText>
          <CardText>Faites votre Choix :</CardText>
          {foodDetails.map(objectName => {
            return Object.keys(objectName).map(category => {
              return (
                
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: '#AADEC0', opacity: 0.4 }}
                  >
                    <Typography >{category}</Typography>
                  </AccordionSummary>

                  {/*affichage des choix et de la quantité dans inputNumber*/}
                  {objectName[category].map(entry => {
                    return (<AccordionDetails style={{ borderWidth: 3, borderColor: 'white', borderStyle: 'solid', backgroundColor: '#F8F8F8' }}>
                      <Typography>

                        {/*Execution de la fonction Onchange et la récupération du choix et quantité comme paramètre*/}
                        <InputNumber min={1} max={10} placeholder={1} onChange={(e) => { onChange(e, entry) }} style={{ width: 50 }} /> x  {entry}</Typography>
                    </AccordionDetails>
                    )
                  })}
                </Accordion>
              )
            })
          })}

        </Card>

        {/*Popup*/}
        <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} >
          <p>Votre Confirmation a été pris en compte !!</p>
        </Modal>
      </div>

    </>

  )
}

function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(OrderPage);
