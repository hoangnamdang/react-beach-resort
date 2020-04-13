import React, { Component } from 'react';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';
import Title from './Title';
export default class Services extends Component {
    state = {
        services : [
            {
                icon: <FaCocktail/>,
                title: "free cooktails",
                info:"the European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.",
            },
            {
                icon: <FaHiking/>,
                title: "endless hiking",
                info:"the European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.",
            },
            {
                icon: <FaShuttleVan/>,
                title: "free shuttle",
                info:"the European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.",
            },
            {
                icon: <FaBeer/>,
                title: "stronger beer",
                info:"the European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.",
            },

        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item,index) => {
                        return (
                            <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
