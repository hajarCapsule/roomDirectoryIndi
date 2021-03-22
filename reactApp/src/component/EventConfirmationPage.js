import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Divider, Card, Checkbox, Button } from 'antd';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

import NavBar from './NavBar'

const { Meta } = Card;


function EventConfirmationPage(props) {

  //Déclaration des ETATS
  const [detailEvent, setDetailEvent] = useState([])
  const [visible, setVisible] = useState(false);
  const [isComing, setIsComing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Déclaration de la liste des cases à cocher//
  var checkBoxList = ["Oui, je viens", "Dommage ! Une prochaine fois"];

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

  //Au chargement de la page récupérer l'événement sélectionné du back grace à son ID
  useEffect(() => {
    var eventsFunction = async () => {
      var rawResponse = await fetch(`/events/${props.match.params._id}`)
      var response = await rawResponse.json();
      setDetailEvent(response.event)
    }
    eventsFunction()
  }, []);


  //Function qui gère le changement de l'état en true or false selon le choix de l'utilisateur
  function onChange(checkedValues) {
    if (checkedValues.target.value === "Oui, je viens" && checkedValues.target.checked === true) {
      setIsComing(true)
    }
    else if (checkedValues.target.value === "Dommage ! Une prochaine fois" && checkedValues.target.checked === true) {
      setIsComing(false);
    }
  }

  //ENVOIE DE LA CONFIRMATION + TOKEN et ID de l'événement AU BACK//
  var handleSubmit = async () => {
    const data = fetch(`/confirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `isComing=${isComing}&token=${props.token}&eventId=${props.match.params._id}`,
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
          style={{ width: '65%', justifyContent: 'center' }}
          cover={
            <img
              alt="Caroussel"
              src={detailEvent.image}
            />
          }
        >

          <Meta
            title={detailEvent.nameEvents}
            description={detailEvent.description}
          />
          <Divider />

          {/*affichage des CHECKBOX */}    
          {checkBoxList.map((option, i) => {
            return (<Checkbox style={{ marginLeft: '21%', fontSize: 16, fontWeight: 'bold' }} onChange={onChange} value={option}>{option}</Checkbox>)
          })}

          <Divider />

          {/*Bouton confirmation qui déclenche le popup */} 
          <Button style={{ backgroundColor: '#AADEC0', borderColor: '#AADEC0', color: 'black', fontWeight: 'bold', marginLeft: '35%', width: '25vh' }} type="primary" onClick={showModal}>Confirmer</Button>

        </Card>
        {/*Popup de confirmation */} 
        <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} >
          <p>Votre Confirmation a été pris en compte !!</p>

        </Modal>
      </div>

    </>



  );
}

function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(EventConfirmationPage);
