import React from 'react';
import { Link} from 'react-router-dom';
import './NavBar.css';


const Navbar = ({text, children}) => {
    return (
        <div className='navi'>
        <nav id="sidebar">
        <ul className="list-unstyled components">
            <li className="active">
                
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <Link to = "/">
                        Dashboard
                    </Link>
                    <Link to = "/questionnaire" >
                      Questionnaires
                    </Link>
                    <Link to = "/create">
                        Create
                    </Link>
                    <Link to = "/questionwrapper">
                        QuestionsAddedForm
                    </Link>
                </ul>
            </li>
        </ul> 

        </nav>

        <div  className='menu'>

           {text} 
           {children}
        </div>
      
        </div>
    
    );
};

export default Navbar;