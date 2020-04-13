import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FreaturedRoom from '../components/FeaturedRooms';
export default function Home() {
    return (
        <>
        <Hero>
            <Banner title="Luxurious room" subtitle="deluxe room starting at $300">
                <Link to="/rooms" className="btn-primary">
                    Our rooms
                </Link>
            </Banner>
           
        </Hero>
        <Services />
        <FreaturedRoom />
        </>
    )
}
