import React, { useState, useEffect } from 'react';
import '../App.css'
import 'antd/dist/antd.css';
import { Card, Carousel, Image } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function HomePage(props) {

  //Déclaration des ETATS
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);

  //Au chargement de la page récupération des events et des images de la home
  useEffect(() => {
    var eventsFunction = async () => {
      var rawResponse = await fetch(`/events`);
      var response = await rawResponse.json();
      setEvents(response.events);
    };

    var imageFunction = async () => {
      var rawResponse = await fetch(`/image`);
      var response = await rawResponse.json();
      setImages(response.images);
    };
    imageFunction();
    eventsFunction();

  }, []);

  return (

    <>
      <NavBar />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>

        {/*Card de la page avec un caroussel intégré dans le cover qui liste tous les events*/}
        <Card
          style={{ width: '65%', height: '100%' }}
          cover={
            <Carousel autoplay style={{ width: '100%' }} >
              {events.map((e, i) => {
                return (
                  <Link key={i} to={`/events/${e._id}`}><Image preview="false" src={e.image}>
                  </Image></Link>)
              })
              }
            </Carousel>
          }

        >

          {/*Image des différents services proposé par l'hotel*/}
          <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {images.map((e, i) => {
              return (
                <Link key={i} to={`/${e.serviceName}`}><Card

                  style={{ width: 260, marginTop: 10, border: 'none' }}
                  cover={<img alt="example" src={e.url} />}
                >
                </Card></Link>)
            })
            }
          </div >
        </Card>
      </div>
    </>

  )
}
function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(HomePage);
