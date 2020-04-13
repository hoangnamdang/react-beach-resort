import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';
//get all unique value
const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value]))]
}
export default function RoomFilter({rooms}) {
    // biến rooms là lấy bảng rooms
    const context = useContext(RoomContext);
    // biến context này là giá toàn bộ biến state bên context.js trong hàm handlechange. giá trị khi chọn filter room để gán giá trị cho form  search rooms
    const {
        handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
    } = context;
    //get unique type
    let types = getUnique(rooms,'type');
    // add all
    types = ['all', ...types];
    // map to jsx
    types = types.map((item,index) => {
    return <option value={item} key={index}>{item}</option>
    })

    // get unique people
    let people = getUnique(rooms,'capacity');
    people = people.map((item,index) => {
    return <option value={item} key={index} >{item}</option>
    })
    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* end select type */}
                
                {/* guest  */}
                <div className="form-group">
                    <label htmlFor="capacity">guest</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* end guest  */}

                   {/* room price  */}
                   <div className="form-group">
    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
                </div>
                {/* end room price  */}

                   {/* room size  */}
                   <div className="form-group">
    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" className="size-input" name="minSize" id="minSize" value={minSize} onChange={handleChange}/>
                        <input type="number" className="size-input" name="maxSize" id="maxSize" value={maxSize} onChange={handleChange}/>
                    </div>
                </div>
                {/* end room size  */}

                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" onChange={handleChange} ckecked={breakfast}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
        
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end of extras */}

            </form>
        </section>
    )
}
