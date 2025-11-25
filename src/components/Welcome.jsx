import {useRef} from "react";
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'

const FONT_WEIGHTS = {
    subtitle: {min: 100, max: 400, default: 100},
    title: {min: 400, max: 900, default: 400}
}
const HOVER_FALLOFF_RATE = 20000;  //Controls the Spread of the hover effect

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{fontVariationSettings: `'wght' ${baseWeight}`}}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ))
}

const setTextHover = (container, type) => {
    if (!container) return () => {
    };

    const letters = container.querySelectorAll('span');//Target the span because each span is actually a letter
    const {min, max, default: base} = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`,
        })
    }

    let rafId = null;

    const handleMouseMove = (e) => {
        if (rafId) return;

        rafId = requestAnimationFrames(() => {

            const {left} = container.getBoundingClientRect();
            const mouseX = e.clientX - left;

            letters.forEach((letter) => {
                const {left: l, width: w} = letter.getBoundingClientRect();
                const distance = Math.abs(mouseX - (l - left + w / 2));
                const intensity = Math.exp(-(distance ** 2) / HOVER_FALLOFF_RATE);

                animateLetter(letter, min + (max - min) * intensity)
            })
            rafId = null;
        })
    }
    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, base))
    }
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        if (rafId) cancelAnimationFrames(rafId);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    }
}

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    useGSAP(() => {
        const titleCleanup = setTextHover(titleRef.current, "title");
        const subtitleCleanup = setTextHover(subtitleRef.current, "subtitle");

        return () => {
            subtitleCleanup();
            titleCleanup();
        }
    }, []);

    return (
        <section id='welcome' aria-label='Welcome-Section'>
            <p ref={subtitleRef} aria-label='Introduction'>
                {renderText("Hey, I'm Aditya Welcome to my",
                    'text-3xl font-georama', 100)}
            </p>
            <h1 ref={titleRef} className='mt-7' aria-label='Portfolio title'>
                {renderText("portfolio", 'text-9xl italic font-georama')} </h1>
            <div className='small-screen' role='alert'>
                This portfolio is designed for tablets/desktop screens only.
            </div>
        </section>
    )
}
export default Welcome
