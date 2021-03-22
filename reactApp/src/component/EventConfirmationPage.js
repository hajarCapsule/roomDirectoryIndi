import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {Modal,Divider, Card, Checkbox, Button } from 'antd';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

import NavBar from './NavBar'

const { Meta } = Card;


function EventConfirmationPage(props) {
  const [detailEvent, setDetailEvent] = useState([])
  const [visible, setVisible] = useState(false);
  const [isComing, setIsComing] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    handleSubmit()

  };
  const handleOk = () => {
    setIsModalVisible(false);
    setVisible(true)
  };


  useEffect(() => {
    var eventsFunction = async () => {
      var rawResponse = await fetch(`/events/${props.match.params._id}`)
      var response = await rawResponse.json();
      setDetailEvent(response.event)
    }
    eventsFunction()
  }, []);

  // liste des choix de la check Box//
  var checkBoxList = ["Oui, je viens", "Dommage ! Une prochaine fois"];

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    setIsComing(false)
    if (checkedValues.target.value === "Oui, je viens" && checkedValues.target.checked === true) {
      setIsComing(true)
    }
    else if (checkedValues.target.value === "Dommage ! Une prochaine fois" && checkedValues.target.checked === true) {
      setIsComing(false);
    }
    console.log('console.logisComing', isComing)
  }

  //ENVOIE DE LA CONFIRMATION AU BACK//
  var handleSubmit = async () => {
    const data = fetch(`/confirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `isComing=${isComing}&token=${props.token}&eventId=${props.match.params._id}`,
    });
  };


  console.log('props.token event', props.token)
  if(visible){
   
      return <Redirect to='/home' />
    
  }
  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

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

          {checkBoxList.map((option, i) => {
            return (<Checkbox style={{ marginLeft: '21%', fontSize: 16, fontWeight: 'bold' }} onChange={onChange} value={option}>{option}</Checkbox>)
          })}
          <Divider />
          <Button style={{ backgroundColor: '#AADEC0', borderColor: '#AADEC0', color: 'black', fontWeight: 'bold', marginLeft: '35%', width: '25vh' }} type="primary" onClick={showModal}>Confirmer</Button>

        </Card>
        <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} >
        <p>Votre Confirmation a été pris en compte !!</p>

      </Modal>
      </div>

    </>



  );
}

function mapStateToProps(state) {
  console.log(state.token)
  return { token: state.token };
}
export default connect(mapStateToProps, null)(EventConfirmationPage);
