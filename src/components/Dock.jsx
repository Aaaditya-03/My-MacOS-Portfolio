import {useRef} from 'react';
import {dockApps} from "#constants/index.js";
import {Tooltip} from "react-tooltip";
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import useWindowStore from "#store/window.jsx";

const Dock = () => {

    const{openWindow , closeWindow , windows} = useWindowStore();

    const dockRef = useRef(null);
    useGSAP(() =>{
        const dock = dockRef.current;
        if(!dock) return;

        const icons = dock.querySelectorAll(".dock-icon")

        const animateIcons=(mouseX) =>{
            const {left} = dock.getBoundingClientRect();

            icons.forEach((icon) =>{
                const {left: iconLeft, width} = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX  - center );
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon , {
                    scale : 1 + 0.25 * intensity,
                    duration : 0.2,
                    y: -15 * intensity,
                    ease : 'power1.out',
                })
            })
        }


        const handleMouseMove =(e) =>{
            const {left} = dock.getBoundingClientRect();
            const mouseX = e.clientX - left;
            animateIcons(mouseX);
        }

        const resetIcons=() =>{
            icons.forEach((icon) =>{
                gsap.to(icon , {
                    scale : 1,
                    y: 0,
                    ease : 'power1.out',
                    duration : 0.2
                })
            })
        }
        dock.addEventListener('mousemove' , handleMouseMove)
        dock.addEventListener('mouseleave' , resetIcons)

        return () => {
            dock.removeEventListener('mousemove' , handleMouseMove);
            dock.removeEventListener('mouseleave' , resetIcons);
        }
    },[])


    const toggle = (app) =>{
        // TODO : Implement Open Window Logic
        if(!app.canOpen) return;

        const window = windows[app.id];

        if(!window) {
            console.log(`Window not found for app : ${app.id}`);
            return;
        }
        if(window.isOpen){
            closeWindow(app.id)
        }
        else{
            openWindow(app.id)
        }
    }

    return (
        <section id='dock' aria-label='Dock'>
            <div className='dock-container' ref={dockRef}>
                {dockApps.map(({id , name , icon , canOpen}) => (
                    <div className='relative flex justify-center' key={id}>
                        <button
                            type='button'
                            className='dock-icon'
                            aria-label={name}
                            data-tooltip-id='dock-tooltip'
                            data-tooltip-delay-show={150}
                            data-tooltip-content={name}
                            disabled={!canOpen}
                            onClick={() => toggle({id , canOpen})}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading='lazy'
                                className={canOpen ? '' : 'opacity-60'}
                            />
                        </button>
                    </div>
                ))}

                <Tooltip id='dock-tooltip' place='top' className='tooltip' />
            </div>
        </section>
    )
}
export default Dock
