import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

export default function RecommandationPage() {
  const classes = useStyles();

  const [recommandations, setRecommandations] = useState([]);
  useEffect(() => {
    async function getAllRecommendation() {
  const response = await fetch(`/recommandation`);
  const data = await response.json();
console.log('data',data.recommandations)
setRecommandations(data.recommandations)

}
  getAllRecommendation();
}, []);

  return (

<>
<NavBar/>
<div style={{display:'flex',justifyContent:'center',marginTop:40}}>

<Card
style={{ width:'65%',height: '100%' }}
cover={
  <img
    alt="example"
    src="https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106689/ROOM%20DIRECTORY/HOME%20PAGE/recommandation_er90sg.jpg"
  />
}

>

      {recommandations.map(e=>{return(
 <ExpansionPanel>
 <ExpansionPanelSummary
   expandIcon={<ExpandMoreIcon />}
   aria-controls="panel1a-content"
   id="panel1a-header"
   style={{backgroundColor:'#AADEC0',opacity:0.4}}
 >
   <Typography className={classes.heading}>{e.typeRecommandation}</Typography>
 </ExpansionPanelSummary>
 
 {e.recommandationDetails.map(item=>{return(
   <ExpansionPanelDetails style={{borderWidth:3,borderColor:'white',borderStyle:'solid',backgroundColor:'#F8F8F8'}}><Link to={`/recommandation/${e.typeRecommandation}/${item.nameRecommandation}`}>
   <Typography  >
  {item.nameRecommandation} 
   </Typography></Link>


   </ExpansionPanelDetails>
 )})}
   
</ExpansionPanel>

      )})}   


</Card>
</div>

</>
  );
}