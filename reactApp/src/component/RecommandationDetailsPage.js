import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Typography, Divider,Image,Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faMap } from '@fortawesome/free-solid-svg-icons'
import NavBar from './NavBar'

const {  Link } = Typography;
const { Meta } = Card;


export default function RecommandationDetailsPage(props) {

const [detailRecommandation,setDetailRecommandation] = useState([])
        useEffect(  () => { var recommandation = async() =>{
        var rawResponse = await fetch(`/recommandation/${props.match.params.typeRecommandation}/${props.match.params.nameRecommandation}`)
        var response = await rawResponse.json();
        setDetailRecommandation(response.recommandationDetails[0])
       }
       recommandation()       
}, []);
    console.log('fggg',detailRecommandation)

  return (
    <>
    <NavBar/>
 <div style={{display:'flex',justifyContent:'center',marginTop:40}}>
 
    <Card
    style={{ width:'65%' }}
    cover={
      <img
        alt="example"
        src={detailRecommandation.visuel}
      />
    }
   
  >

    <Meta
      title={detailRecommandation.nameRecommandation}
      description={detailRecommandation.description}
      avatar={<Image
        src={detailRecommandation.logo}
        width={150}
        heigh
      />}
      
    />
<Divider/>
<p><FontAwesomeIcon icon={faPhone} color='#AADEC0' /> Téléphone: {detailRecommandation.telephone}</p>
<p>Site Web: <Link href={detailRecommandation.urlSiteWeb} target="_blank">{detailRecommandation.urlSiteWeb}</Link></p>
<p><FontAwesomeIcon icon={faMap} color ='#AADEC0'/>  Adresse: {detailRecommandation.adresse}</p>
<Divider/>
  
     <Image
        src={detailRecommandation.mapView}
        width={'100%'}
      />
      

  </Card>
  </div>

</>



  );
}
