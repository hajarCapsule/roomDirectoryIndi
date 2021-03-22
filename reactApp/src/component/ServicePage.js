import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardImg, CardBody, CardSubtitle, } from 'reactstrap';
import { Card } from 'antd';
import NavBar from './NavBar'


function ServicePage(props) {

  //Déclaration des services

  var box = [{
    content: 'Petit-déjeuner à la parisienne, servi de 7h30 à 11h00 en salle voûtée ou en chambre - 15,00€',
    url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700845/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/1_Picto_PtitDej_p0emw3.png'
  }, {
    content: 'Honesty Bar à Vins - à partir de 07,00€', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700846/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/2_Picto_Bar_mj8lou.png'
  }, {
    content: 'Goûter de l’après-midi et Thé de soirée - offerts', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700845/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/3_Picto_Gouthe_jvnfw1.png'
  }, {
    content: 'Bibliothèque - en confiance', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700844/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/4_Picto_Bibli_np7tqm.png'
  }, {
    content: 'Conseils de promenades et réservations - à discrétion', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700844/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/5_Picto_Conseils_rgghet.png'
  }, {
    content: 'Réception - à votre disposition 24/7', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700846/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/14_Picto_Reception_jyqa3t.png'
  }, {
    content: 'Accueil multilingue : français, anglais, espagnol', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700845/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/15_Picto_Multilingue_vrvy74.png'
  }, {
    content: 'Wifi offert', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700845/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/16_Picto_Wifi_mh8lrb.png'
  }, {
    content: 'Bagagerie', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700845/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/17_Picto_Bagagerie_gvt4jt.png'
  }, {
    content: 'Ascenseur', url: 'https://res.cloudinary.com/dgv5agwfj/image/upload/v1614700846/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/PICTOS/18_Picto_Ascenseur_m6b1ca.png'
  }]

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page */}
        <Card
          style={{ width: "65%", height: '100%' }}
          cover={
            <img
              alt="example"
              src="https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106649/ROOM%20DIRECTORY/HOME%20PAGE/services_mnum6p.jpg"
            />
          }
        >

          <div className="Card">

            {/*affichage des Services Cards  */}
            {box.map((image, i) => {
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card style={{
                    width: 300,
                    margin: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <CardImg style={{ marginBottom: 15 }} top width="60%" height="100px" src={image.url} alt="Card image cap" />
                    <CardBody>
                      <CardSubtitle tag="h5" className="mb-2 text-muted">{image.content} </CardSubtitle>
                    </CardBody>
                  </Card>
                </div>
              )
            })
            }
          </div>
        </Card>
      </div>
    </>





  )
}
export default ServicePage;
