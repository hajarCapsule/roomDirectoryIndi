import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Typography, Card } from 'antd';
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

function RestaurationPage(props) {
  const classes = useStyles();

  var menuType = [{type:'Petit Déjeuner',route:'PetitDejeuner'}]



  return (
<>
<NavBar/>
<div style={{display:'flex',justifyContent:'center',marginTop:40}}>

<Card
style={{ width:'65%',height: '100%' }}
cover={
  <img
    alt="example"
    src="https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106673/ROOM%20DIRECTORY/HOME%20PAGE/New_Project_1_zomg0z.jpg"
  />
}

>

      {menuType.map((type,i)=>{return(
 <ExpansionPanel key={i}>
 <ExpansionPanelSummary
   aria-controls="panel1a-content"
   id="panel1a-header"
   style={{backgroundColor:'#AADEC0',opacity:0.4}}
 >  
   <Link to={`/restauration/${type.route}`}><Typography className={classes.heading}>{type.type}</Typography></Link>
 </ExpansionPanelSummary>  
</ExpansionPanel>
      )})}   
</Card>


</div>
</>
)}
export default RestaurationPage;
