import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyleHero from '../components/StyledHero';
export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;

  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

      if(!room){
        return (
          <div className="error">
              <h3>no such room could be found</h3>
              <Link to="/rooms" className="btn-primary">Back to room</Link>
          </div>
        );   
      }
      const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
      const [mainImg, ...defaultImg] = images;
      
      return (
        <>
        <StyleHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} room`} >
          <Link to="/rooms" className="btn-primary">Back to room</Link>
          </Banner>
          </StyleHero>
          <section className="single-room">
          <div className="single-room-images">
              {defaultImg.map((value,index) => {
                return  <img key={index} src={value} alt={name}/>
              })}
          </div>
          <div className="single-room-info">
              <article className="desc">
                <h3>Title</h3>
                <p>{description}</p>
              </article>
              <acticle className="info">
                <h3>Info</h3>
                <h6>price ${price}</h6>
                <h6>size ${size} SQFT</h6>
                <h6>max capacity : {" "} 
                {
                  capacity > 1 ? `${capacity} people`: `${capacity} person`
                }</h6>
                <h6>{pets ? "pets allowed" : "no pets allows"}</h6>
                <h6>{breakfast && "free breakfast included"}</h6>
              </acticle>
          </div>
          </section>
          <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                  {extras.map((item,index) => {
                    return <li key={index} >- {item}</li>
                  })}
                </ul>
          </section>
          </>
     )
  }
}
