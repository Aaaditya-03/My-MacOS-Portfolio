import {Draggable} from 'gsap/Draggable'
import gsap from 'gsap';

import {NavBar , Welcome , Dock} from '#components';
import {Terminal, Safari, Resume, Finder, Text, ImageContent , Contact} from '#windows'


gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <NavBar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <ImageContent />
            <Contact />
        </main>
    )
}
export default App
