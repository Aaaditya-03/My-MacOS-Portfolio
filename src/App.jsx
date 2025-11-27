import {Draggable} from 'gsap/Draggable'
import gsap from 'gsap';

import {NavBar , Welcome , Dock} from '#components';
import {Terminal} from '#windows'

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <NavBar />
            <Welcome />
            <Dock />

            <Terminal />
        </main>
    )
}
export default App
