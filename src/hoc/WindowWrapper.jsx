import {useLayoutEffect, useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";

import useWindowStore from "#store/window.jsx";

const WindowWrapper = (Component , windowKey) => {

    const Wrapped=(props) =>{
        const {focusWindow , windows} = useWindowStore();
        const {isOpen , zIndex} = windows[windowKey];
        const ref = useRef(null);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            if (isOpen) {
                el.style.display = "block";
                gsap.fromTo(el,
                    {scale: 0.8, y: 40, opacity: 0},
                    {scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power3.out'})
            } else {
                // Only run the closing animation if the element has been opened
                if (el.style.display === "block") {
                    gsap.to(el, {
                        scale: 0.8, y: 40, opacity: 0, duration: 0.3, ease: 'power3.in', onComplete: () => {
                            el.style.display = "none";
                        }
                    })
                }
            }
        }, [isOpen]);

        useGSAP(() =>{
            const el = ref.current;
            if(!el) return;

           const [draggable] = Draggable.create(el ,
                {
                    type : "x,y" ,
                    edgeResistance:0.9,
                    onPress : () => focusWindow(windowKey)
                })

            return draggable.kill();
        },[])

        return(
            <section
                id={windowKey}
                ref={ref}
                style={{zIndex , display:"none"}}
                className='absolute'
                >
                <Component {...props} />
            </section>
        )
    }
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`
    return Wrapped;
};
export default WindowWrapper;
