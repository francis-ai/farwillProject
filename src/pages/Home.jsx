import React, { useRef } from 'react';
import Packages from '../component/OurPackages';
import OurMission from '../component/OurMission';
import Hero from '../component/Hero';
import Services from '../component/Services'
import { Box, Container } from '@mui/material';

export default function Home() {
    const packagesRef = useRef(null);

    const scrollToPackages = () => {
        if (packagesRef.current) {
            packagesRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'  // This ensures alignment at the top
            });
        }
    };

    return(
        <Container 
            maxWidth={false} 
            disableGutters 
            sx={{
                width: '100%',
                padding: 0,
                marginTop: 5,
                overflowX: 'hidden'  // Prevents horizontal scroll issues
            }}
        >  
            <Hero scrollToPackages={scrollToPackages}/>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
              <Packages ref={packagesRef}/>  
            </Box>
            <OurMission />
            <Services />
        </Container>
    )
}