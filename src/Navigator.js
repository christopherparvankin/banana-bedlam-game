import React from 'react';
import './Navigator.css';
import k_y from './killroy.svg';
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function Navigator({ handleShaun, s_bool }) {

  return (
    <div className="nav">
      <div className="left">
  
          <img src={k_y} alt="dd" />
        
      </div>
      <div className="middle">
        <div className='left1'> 
        <Link to="/"> Home</Link>
        <Link to="/about"> About</Link>
        </div>
        
        <div className='right1'>
        <Link to="/projects"> Projects</Link>
        <Link to="/fun"> Fun</Link>
        <Link to="/Game"> Nanner</Link>
         

        </div>
      </div>
      <div className='right'>
      <Link to="https://linkedin.com/in/chrisparvankin">
  <LinkedInIcon className="iconL" />
</Link>

<a href="mailto:christopher_parvankin@brown.edu">
    <EmailIcon className="iconE" />
  </a> 
<Link to="https://github.com/christopherparvankin">
<GitHubIcon className="iconG" />
</Link>
      </div>
    </div>
  );
}

export default Navigator;