import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {socials} from "#constants/index.js";
import {WindowControls} from "#components/index.jsx";

const Contact = () => {
    return (
        <>
            <div id='window-header'>
                <WindowControls target='contact' />
                <h2>Contact Me</h2>
            </div>

            <div className='p-5 space-y-5'>
                <div className='flex-col items-center text-center'>
                <img
                    src='/images/me.png'
                    alt='Aditya'
                    className='w-25 mx-auto rounded-bl-2xl rounded-tr-3xl'
                    />

                <h3>Let's Connect</h3>
                <p>Got an idea? A bug to squash? Or just wanna talk tech?
                I'm in.</p>
                </div>

                <ul>
                    {socials.map(({id , bg , link , icon , text}) =>(
                        <li key={id} style={{backgroundColor : bg}}>
                            <a
                                href={link}
                                target='_blank'
                                title={text}
                                rel='noopener noreferrer'
                            >
                                <img src={icon} alt={text} className='size-5' />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}

const ContactWindow = WindowWrapper(Contact , "contact");
export default ContactWindow;
