import { Link } from 'react-router-dom';

export default function BeanieBaby({ beanieBaby }) {
  return (
    // this should contain a react-router-dom Link to the detail page for this particular beanie baby.
    // it should also render the beanie baby's image and show the beanie baby's name
    // null
    <Link to={`/Detail/${beanieBaby.id}`}>
      <div className='beanie-baby'>
        <h4>{beanieBaby.title}</h4>
        <img className='beanie-img' src={beanieBaby.image}/>
      </div>
    </Link>
  );
}
