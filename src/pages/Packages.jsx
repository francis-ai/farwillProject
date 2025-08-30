import Packages from '../component/OurPackages';
import { Container } from '@mui/material';

export default function Package() {
    return(
        <Container sx={{mt: 12, display: 'flex', justifyContent: 'space-around'}}>  
            <Packages />
        </Container>
    )
}