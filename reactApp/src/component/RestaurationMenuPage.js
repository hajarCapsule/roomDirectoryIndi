import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import {  Card, Radio,InputNumber, Modal,Divider } from 'antd';
import {
  CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography} from 'antd';
import { Link } from 'react-router-dom'
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
function RestaurationPage (props){
  const classes = useStyles();
  //ETATS

  const [foodDatas, setFoodDatas] = useState([]);
//MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

//USE EFFECT
  useEffect(() => { var getFood = async () => {
      var response = await fetch(`/restauration/${props.match.params.route}`);
      var data = await response.json();
      console.log('rouuuuuuuuute',props.match.params.route)
      setFoodDatas(data.food);
    }
    getFood();
  }, []);

  console.log('foodDatas',foodDatas)



  // RADIO FUNCTION
  function onChange(value) {
    console.log('changed', value);
  }
  
  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>


                              <Card
          style={{ width: 1050, height: '100%' }}
          cover={
            <img
              alt="example"
              src="https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106673/ROOM%20DIRECTORY/HOME%20PAGE/New_Project_1_zomg0z.jpg"
            />
          }

        >
          <div className="Card">

          {foodDatas.map((food,i) => {
            return (
              <div key={i} style={{display:'flex',justifyContent:'center'}}>

              <Card   style={{ 
                    width: 450, 
                    margin:'20px', 
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent:'space-between' }}>
              <CardImg top width="100%" height="250px" src={food.image} alt="Card image cap" />

              <CardBody>
                <CardTitle tag="h2">{food.nameArticle}</CardTitle>
                <CardSubtitle tag="h3" className="mb-2 text-muted">{food.prix} €</CardSubtitle>
                <CardText>{food.miniDescription}</CardText>
                <Link to={`/restauration/${food.type}/${food._id}`}> <Button style ={{backgroundColor:'#AADEC0'}}> Commander</Button></Link>
                
                <Modal title={`Petit Déjeuner ${food.nameArticle}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

 
              <CardImg top width="100%" height="250px" src={food.image} alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h2">  <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} label="Qté:" style={{width:50}}/>  x {food.nameArticle}</CardTitle>
                <CardSubtitle tag="h3" className="mb-2 text-muted">{food.prix} €</CardSubtitle>
                <CardText>{food.miniDescription}</CardText>
                <Divider/>
                <CardText><Radio.Group name="radiogroup" defaultValue={1} >
            <Radio value={1}>En chambre</Radio>
            <Radio value={2}>Sur Place</Radio> 
          </Radio.Group> <Divider/> </CardText>
          {food.detail.map((food,i) => {return Object.keys(food).map((category, i) => { return (

 <ExpansionPanel key={i}>
 <ExpansionPanelSummary
   expandIcon={<ExpandMoreIcon />}
   aria-controls="panel1a-content"
   id="panel1a-header"
   style={{backgroundColor:'#AADEC0',opacity:0.4}}
 >
   <Typography className={classes.heading}>{category}</Typography>
 </ExpansionPanelSummary>

   <ExpansionPanelDetails style={{borderWidth:3,borderColor:'white',borderStyle:'solid',backgroundColor:'#F8F8F8'}}>
 <Typography  >
   </Typography>

   </ExpansionPanelDetails>
</ExpansionPanel>
)}

          )})}



                </CardBody>
      </Modal>
              </CardBody>
            </Card>
           </div>
            )
          })}
       </div>
        </Card>
      </div>
      
    </>

  )
}
export default RestaurationPage;

const contentStyle = {
  height: '60px',
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#364d79',
};