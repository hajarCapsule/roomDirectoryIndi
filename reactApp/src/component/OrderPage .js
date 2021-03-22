import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Card, Radio, InputNumber, Modal, Divider } from 'antd';
import {CardText,CardTitle, CardSubtitle, Button} from 'reactstrap';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import NavBar from './NavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function OrderPage(props) {
  const classes = useStyles();
  //ETATS

  const [food, setFood] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [tabOrderFood, setTabOrderFood] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [place, setPlace] = useState("En Chambre");
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //USE EFFECT
  useEffect(() => {
    var getFood = async () => {
      var response = await fetch(`/restauration/${props.match.params.route}/${props.match.params.id}`);
      var data = await response.json();
      console.log('rouuuuuuuuute', props.match.params.route)
      setFood(data.food);
      setFoodDetails(data.food.detail)
    }
    getFood();
  }, []);


  const showModal = () => {
    setIsModalVisible(true);
    handleSubmit()

  };
  const handleOk = () => {
    setIsModalVisible(false);
    setVisible(true)
  };
  console.log('foodDatas', foodDetails)
  console.log('food', food.detail)
  foodDetails.map(category => { return Object.keys(category).map(cat => { return console.log(cat) }) })

var details = JSON.stringify({tabOrderFood})

  // RADIO FUNCTION
  function onChange(value,entry) {
    console.log('changed', value);
    console.log('changed entry', entry);
    setTabOrderFood([...tabOrderFood,{type:entry,quantity:value}])
  }
console.log(tabOrderFood,"tableau")
console.log('quantity',quantity)
console.log('place',place)

var handleSubmit = async () => {
  const data = fetch(`/orderConfirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `details=${details}&token=${props.token}&foodID=${food._id}&lieu=${place}&quantity=${quantity}&price=${food.prix*quantity}`,
  });
};

if(visible){
   
  return <Redirect to='/home' />

}
  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>


        <Card
          style={{ width: 550, height: '60%' }}
          cover={<img alt="example" src={food.image} />} >

          <CardTitle tag="h2"> <InputNumber min={1} max={10} defaultValue={1} onChange={e=>setQuantity(e)} style={{ width: 50 }} /> x {food.nameArticle}</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">{food.prix} €</CardSubtitle>
          <CardText>{food.description}</CardText>
          <Divider />
          <CardText>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Radio.Group onChange={e=>{e.target.value==1 ?setPlace("En Chambre"):setPlace("Sur Place")}} name="radiogroup" defaultValue={1} >
                <Radio value={1}>En chambre</Radio>
                <Radio value={2}>Sur Place</Radio>
              </Radio.Group>
              <Button onClick={showModal}>Confirmer ma commande</Button>
            </div>
            <Divider /> </CardText>
          <CardText>Faites votre Choix :</CardText>
          {foodDetails.map(objectName => {
            return Object.keys(objectName).map(category => {
              return (
                <ExpansionPanel >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: '#AADEC0', opacity: 0.4 }}
                  >
                    <Typography className={classes.heading}>{category}</Typography>
                  </ExpansionPanelSummary>
                  {objectName[category].map(entry => {
                    return (<ExpansionPanelDetails style={{ borderWidth: 3, borderColor: 'white', borderStyle: 'solid', backgroundColor: '#F8F8F8' }}>
                      <Typography>
                        <InputNumber min={1} max={10} defaultValue={0} onChange={(e)=>{onChange(e,entry)}} style={{ width: 50 }} /> x  {entry}</Typography>
                        

                    </ExpansionPanelDetails>
                    )
                  })}

                </ExpansionPanel>
              )
            })
          })}

        </Card>
        <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} >
        <p>Votre Confirmation a été pris en compte !!</p>

      </Modal>
      </div>

    </>

  )
}

function mapStateToProps(state) {
  console.log(state.token)
  return { token: state.token };
}
export default connect(mapStateToProps, null)(OrderPage);
