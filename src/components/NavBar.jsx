import dayjs from "dayjs";

import {navIcons, navLinks} from "#constants/index.js";

const NavBar = () => {
    return (
        <nav>
            <div>
                <img src='/images/logo.svg' alt='Logo' />
                <p className='font-bold'>Aditya's Portfolio</p>

                <ul>
                    {
                        navLinks.map(({id , name}) => (
                            <li key={id}>
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
