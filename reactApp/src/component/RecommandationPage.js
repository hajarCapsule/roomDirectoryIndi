import React, { useState, useEffect } from 'react';

//import de l'accordion de la librairie MATERIEL UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Typography, Card } from 'antd';
import NavBar from './NavBar'


export default function RecommandationPage() {

  //Déclaration de l'ETAT RECOMMANDATION
  const [recommandations, setRecommandations] = useState([]);

  //Au chargement de la page récupération des recommendation du back
  useEffect(() => {
    async function getAllRecommendation() {
      const response = await fetch(`/recommandation`);
      const data = await response.json();
      setRecommandations(data.recommandations)
    }
    getAllRecommendation();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page */}
        <Card
          style={{ width: '65%', height: '100%' }}
          cover={
            <img
              alt="recommandation"
              src="https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106689/ROOM%20DIRECTORY/HOME%20PAGE/recommandation_er90sg.jpg" />}>

          {/*Affichage des types de recommandations */}
          {recommandations.map((e, i) => {
            return (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#AADEC0', opacity: 0.4 }}
                >
                  <Typography >{e.typeRecommandation}</Typography>
                </AccordionSummary>

                {/*Affichage des noms des recommandations */}
                {e.recommandationDetails.map((item, j) => {
                  return (
                    <AccordionDetails key={j} style={{ borderWidth: 3, borderColor: 'white', borderStyle: 'solid', backgroundColor: '#F8F8F8' }}><Link to={`/recommandation/${e.typeRecommandation}/${item.nameRecommandation}`}>
                      <Typography  >
                        {item.nameRecommandation}
                      </Typography></Link>
                    </AccordionDetails>
                  )
                })}
              </Accordion>
            )
          })}
        </Card>
      </div>

    </>
  );
}