import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function RestaurationMenuPage(props) {

  //Déclaration des ETATS
  const [foodDatas, setFoodDatas] = useState([]);

  //Au chargement de la page récupérer les petits déjeuner
  useEffect(() => {
    var getFood = async () => {
      var response = await fetch(`/restauration/${props.match.params.route}`);
      var data = await response.json();
      setFoodDatas(data.food);
    }
    getFood();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page avec cover image de  restauration */}
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

            {foodDatas.map((food, i) => {
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>

        {/*Card qui affiche les différents petit déjeuner */}
                  <Card style={{
                    width: 450,
                    margin: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <CardImg top width="100%" height="250px" src={food.image} alt="Card image cap" />

                    <CardBody>
                      <CardTitle tag="h2">{food.nameArticle}</CardTitle>
                      <CardSubtitle tag="h3" className="mb-2 text-muted">{food.prix} €</CardSubtitle>
                      <CardText>{food.miniDescription}</CardText>
                      <Link to={`/restauration/${food.type}/${food._id}`}> <Button style={{ backgroundColor: '#AADEC0' }}> Commander</Button></Link>
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
export default RestaurationMenuPage;

const contentStyle = {
  height: '60px',
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#364d79',
};