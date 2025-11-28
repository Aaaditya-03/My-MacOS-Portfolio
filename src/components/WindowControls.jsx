import React from 'react'
import useWindowStore from "#store/window.js";

const WindowControls = ({target}) => {
    const {closeWindow} = useWindowStore();
    return (
        <div id='window-controls'>
            <button
                type ='button'
                className='close'
                onClick={() => closeWindow(target)}
                aria-label='Close window' />
            <button
                type='button'
                className='minimize'  />
            <button
                type='button'
                className='maximize'  />

        </div>
    )
}
export default WindowControls
