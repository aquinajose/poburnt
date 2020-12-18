import {React,useState,useRef,useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';

import './dropdown.styles.scss';

const DropDown =({menu,options,value,history})=>{
    const [isOpen,setIsOpen]= useState(false);
    const node = useRef();
    useEffect(()=>{
        document.addEventListener("mousedown",handleClick);
        return ()=>{
            document.removeEventListener("mousedown",handleClick)
        }
    },[]);

    const handleClick =(e)=>{
        if(node.current.contains(e.target)){
            return false;
        }
        setIsOpen(false)
    }
    return (
        <div ref={node} className={`${menu?'menu':''} dropdown-wrapper`}>
        <div className="dropdown-header" onClick={()=>setIsOpen(!isOpen)}>
                {value}<span className={`${isOpen?'icon-up':'icon-down'} icon icon-arrow`}></span>
        </div>
        {isOpen && <ul className={`${menu?'menu-content ':''}dropdown-content`}>
            {
                options.map(option=><li className="dropdown-item" key={option.id}>
                    {menu?(<p  onClick={()=>{
                        history.push(option.link);
                        setIsOpen(false);
                    }} >{option.title}</p>):
                    (<Link to="/">{option.title}</Link>)    
                    }
                </li>)
            }
			<li ></li>
		</ul>}
        </div>


)}

export default withRouter(DropDown);