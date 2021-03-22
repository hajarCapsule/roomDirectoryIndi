import React from 'react';

//import de l'accordion de la librairie MATERIEL UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Typography, Card } from 'antd';
import NavBar from './NavBar'


function RestaurationPage(props) {

  //Déclaration Du repas

  var menuType = [{ type: 'Petit Déjeuner', route: 'PetitDejeuner' }]

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page avec cover image de  restauration */}
        <Card
          style={{ width: '65%', height: '100%' }}
          cover={
            <img
              alt="example"
              src="https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106673/ROOM%20DIRECTORY/HOME%20PAGE/New_Project_1_zomg0z.jpg"
            />
          }

        >

        {/*affichage du type dans l'accordion */}
          {menuType.map((type, i) => {
            return (
              <Link to={`/restauration/${type.route}`}>
                <Accordion key={i}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: '#AADEC0', opacity: 0.4 }}
                  >
                    <Typography >{type.type}</Typography>
                  </AccordionSummary>
                </Accordion></Link>
            )
          })}
        </Card>


      </div>
    </>
  )
}
export default RestaurationPage;
