import dayjs from "dayjs";

import {navIcons, navLinks} from "#constants/index.js";
import useWindowStore from "#store/window.js";

const NavBar = () => {
    const {openWindow , closeWindow , windows} = useWindowStore();
    const toggle = (type) =>{
        if(!type) return;
        if(!windows[type]) return;
        const window = windows[type];
        if(window.isOpen) {
            closeWindow(type);
        } else {
            openWindow(type);
        }

    }
    return (
        <nav>
            <div>
                <img src='/images/logo.svg' alt='Logo' />
                <p className='font-bold'>Aditya's Portfolio</p>

                <ul>
                    {
                        navLinks.map(({id , name,type}) => (
                            <li key={id} onClick={() => toggle(type)}>
                                <p>{name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <ul>
                    {
                        navIcons.map(({id , img}) => (
                            <li key={id}>
                                <img src={img} alt={`icon-${name}`} />
                            </li>
                        ))
                    }
                </ul>
                <time>{dayjs().format("ddd MMM D h:mm ")}</time>
            </div>
        </nav>
    )
}
export default NavBar
