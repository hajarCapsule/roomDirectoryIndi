import React from 'react';
import 'antd/dist/antd.css';
import { Carousel,Image,Card } from 'antd';
const { Meta } = Card;
import NavBar from './NavBar'


const MorningNewsPage = (props) => {
  var events = [{title:"petit-dej",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615109036/ROOM%20DIRECTORY/EVENTS/PDJ_d6u3nl_qcmjc1.jpg"
},{title:"aperitivo",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615109027/ROOM%20DIRECTORY/EVENTS/APERITIVO_ttfrg7_sl8rh2.jpg"
},{title:"cérémonie thé",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615109024/ROOM%20DIRECTORY/EVENTS/EVENT_TH%C3%89_cbxbn1_gspnzr.jpg"}]

  let services = [{title:"morning news",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106691/ROOM%20DIRECTORY/HOME%20PAGE/New_Project_3_zcpdin.jpg"},{title:"recommandations",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106689/ROOM%20DIRECTORY/HOME%20PAGE/recommandation_er90sg.jpg"},{title:"services",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106649/ROOM%20DIRECTORY/HOME%20PAGE/services_mnum6p.jpg"},{title:"restauration",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106673/ROOM%20DIRECTORY/HOME%20PAGE/New_Project_1_zomg0z.jpg"},{title:"room directory",url:"https://res.cloudinary.com/dkyfnkhqz/image/upload/v1615106685/ROOM%20DIRECTORY/HOME%20PAGE/roomDirectory_mv9kxu.jpg"},]
  return (

    <div style={{ borderColor:'black',border: '1px solid',display:'flex',justifyContent:'center'}}>
<div>
  <Carousel autoplay style={{ width: 550,margin:30}} >
    {events.map(e=>{

      return ( 
        
      <Image src={e.url}>
      </Image>)
    })  
    }
  </Carousel>
  </div>

 <div> 
  {services.map(e=>{
return(
  <Card
    hoverable
    style={{ width: 250 }}
    cover={<img alt="example" src={e.url} />}
  >
  </Card>)
})
}
</div>

</div>
 
)}
export default MorningNewsPage;

const contentStyle = {
  height: '60px',
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#364d79',
};