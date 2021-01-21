import {React} from 'react';
import {Link} from 'react-router-dom';


import {ReactComponent as Logo} from '../../assets/images/crown.svg'
import ctsLogo from '../../assets/images/image.png';
import {removeUserSession} from '../../utils/common';
import DropDown from '../dropdown/dropdown.component';
import './header.styles.scss';

const Header =()=>{
    const actman=[{
        link:"/poburnt",
        id:1,
        title:"PO Burnt"
    },
    {
        link:"/",
        id:2,
        title:"Forecast"}
    ];

    const onClickHandler =()=>{
        removeUserSession();
    }
    return(

    <div className="header">
        <div className="section-content">
        <Link className="logo-container" to="/">
            <img className="cts-logo" src={ctsLogo} alt="Logo"/>

        </Link>
        <div className="header-menu">

            {/* <Link className="menu" to="/poburnt">
                PO Burnt
            </Link> */}
            <DropDown menu value="Actman" options={actman}/>
            <DropDown menu value="Operations" options={[{link:"/fileUploads",id:1,title:"File Upload"}]}/>
            <Link className="menu" to="/login" onClick={onClickHandler}>
                Logout
            </Link>

            {/* <ul>
                <li className="menu">PO Burnt</li>
                <li className="menu">Operations</li>
            </ul> */}
        </div>
        </div>
    </div>
)}

export default Header;