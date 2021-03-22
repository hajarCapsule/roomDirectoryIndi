import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Typography, Divider, Image, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMap,faGlobe } from '@fortawesome/free-solid-svg-icons'
import NavBar from './NavBar'

const { Link } = Typography;
const { Meta } = Card;


export default function RecommandationDetailsPage(props) {

  //Déclaration de l'ETAT DETAILRECOMMANDATION
  const [detailRecommandation, setDetailRecommandation] = useState([])

  //Au chargement de la page récupération des recommandation sélectionné selon le type et l'ID du back
  useEffect(() => {
    var recommandation = async () => {
      var rawResponse = await fetch(`/recommandation/${props.match.params.typeRecommandation}/${props.match.params.nameRecommandation}`)
      var response = await rawResponse.json();
      setDetailRecommandation(response.recommandationDetails[0])
    }
    recommandation()
  }, []);


  return (
    <>
      <NavBar />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>


        {/*Card de la page avec l'image de la recommandation inséré dans le cover*/}
        <Card
          style={{ width: '65%' }}
          cover={<img alt="example" src={detailRecommandation.visuel} />}
        >

        {/*Affichage des info name et description de la recommandation et du logo*/}
          <Meta
            title={detailRecommandation.nameRecommandation}
            description={detailRecommandation.description}
            avatar={<Image
              src={detailRecommandation.logo}
              width={150}
              heigh
            />}
          />

          <Divider />

        {/*Affichage de l'image de la map*/}
          <p><FontAwesomeIcon icon={faPhone} color='#AADEC0' /> Téléphone: {detailRecommandation.telephone}</p>
          <p><FontAwesomeIcon icon={faGlobe} color='#AADEC0' /> Site Web: <Link href={detailRecommandation.urlSiteWeb} target="_blank">{detailRecommandation.urlSiteWeb}</Link></p>
          <p><FontAwesomeIcon icon={faMap} color='#AADEC0' />  Adresse: {detailRecommandation.adresse}</p>
          <Divider />

        {/*Affichage de l'image de la map*/}
          <Image
            src={detailRecommandation.mapView}
            width={'100%'}
          />


        </Card>
      </div>

    </>



  );
}
