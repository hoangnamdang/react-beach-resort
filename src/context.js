import React, { Component } from "react";
// import items from "./data";
import Client from './Contentful';

// khai báo Context Api
const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,

    //sorted room
      //
      type: 'all',
      capacity: 1,
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pets: false
  };

  getData = async () => {
    try {
      let response = await Client.getEntries({ 
        content_type: 'beachResortRoomExample', 
        // order: 'sys.createdAt',
        order: 'fields.price'
      });
    
      let rooms = this.formatData(response.items);

      // lấy data featuredRooms
      let featuredRooms = rooms.filter(room => room.featured === true);
 
      // lấy giá lớn nhất
      let maxPrice = Math.max(...rooms.map(item => item.price));
      // lấy giá nhỏ nhất
      let maxSize = Math.max(...rooms.map(item => item.size))
      this.setState({
        //room
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,

        //sorted room
        //
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  // get data room khi trang load xong
  componentDidMount() {
    this.getData();
    // lấy data room
   /*  let rooms = this.formatData(items);

    // lấy data featuredRooms
    let featuredRooms = rooms.filter(room => room.featured === true);

      // lấy giá lớn nhất
    let maxPrice = Math.max(...rooms.map(item => item.price));
    // lấy giá nhỏ nhất
    let maxSize = Math.max(...rooms.map(item => item.size))
    this.setState({
      //room
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,

      //sorted room
      //
      price : maxPrice,
      maxPrice,
      maxSize
    }); */
  }

  // format data room 
  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  // lấy đường dẫn room và trả về dữ liệu phòng đós
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  // hàm click lấy dữ liệu
  handleChange = event => {
    const target = event.target;
    const value = event.target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;

    // khi set state thì chay ham filterRoom luon
    this.setState({
      [name] : value
    },
    this.filterRoom
    );
    
  }

  filterRoom = () => {
      let {rooms, type, capacity,price, minSize, maxSize, breakfast, pets} = this.state
      console.log(this.state);
    //get all room
    let tempRooms = [...rooms];
    //transform value
    capacity = parseInt(capacity);

    //filter by type
    if(type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type)
    }

    // filter by capacity
    if(capacity !== 1){
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    // filter by price
     tempRooms = tempRooms.filter(room => room.price <= price);

     // filter by size
     tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
     // filter bt breakfast
     if(breakfast) {
       tempRooms = tempRooms.filter(room => room.breakfast === true)
     }
     // filter bt pets
     if(pets) {
       tempRooms = tempRooms.filter(room => room.pets === true)
     }
       //change state
    this.setState({
      sortedRooms : tempRooms
    });
    };
    
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

/* hàm này là higher order component*/
export function withRoomConsumer(Component){
  return function ConsumerWapper(props){
    return <RoomConsumer>
      {value => <Component {...props} context={value}/>}
    </RoomConsumer>
  }
}
