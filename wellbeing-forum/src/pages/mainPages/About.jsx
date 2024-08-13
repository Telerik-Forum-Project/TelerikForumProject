import './About.css';
import maninImage from '../../img/maninImage.webp';
import viktorImage from '../../img/viktorImage.jpg';
import trayanImage from '../../img/trayanImage.jpg';

export default function About() {


    return (
        <>
        <div className='main-container'>
        <h1>This is a group project created by students of Telerik Academy</h1>
        <h1>Meet the creators:</h1>
        <div id="creator-container">
            <div>
            <img src={maninImage} alt="manin" className="creator-image" />
            <h3>Victor Manin</h3>
            </div>
            <div>
            <img src={viktorImage} alt="leharov" className="creator-image" />
            <h3>Viktor Leharov</h3>
            </div>
            <div>
            <img src={trayanImage} alt="trufev" className="creator-image" />
            <h3>Trayan Trufev</h3>
            </div>
        </div>
        </div>
        </>
    )
}