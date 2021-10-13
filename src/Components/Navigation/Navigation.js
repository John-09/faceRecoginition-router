import React from 'react';
import { useHistory } from 'react-router-dom';

const Navigation = () => {
    let history=useHistory();
            return(
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                    <p onClick={()=>{history.push('/');}} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
            );
        
    }
        


export default Navigation;