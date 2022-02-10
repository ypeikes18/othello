import angelList from '../images/angel_list.png';
import github from '../images/github.png';
import linkedin from '../images/linkedin.png';


const Links = () => {
    return (
     <div id='credits'>
         <p>This site was created by Yisrael Peikes</p>
         <ul id="links">
            <li><a target="_blank" href="https://angel.co/u/yisrael-peikes-2" >
                <img src={angelList}/>
            </a></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/yisrael-peikes-16b87356/">
                <img src={linkedin} />
            </a></li>
            <li><a target="_blank" href="https://github.com/ypeikes18">
                <img src={github} />
            </a></li>
        </ul>
     </div>       
    )
}

export default Links;