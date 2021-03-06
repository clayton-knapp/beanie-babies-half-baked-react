import { useEffect, useState } from 'react';
import './App.css';
import { getBeanieBabies, getBeanieBabiesNoRange } from './services/fetch-utils';
import BeaniesList from './BeaniesList';
import { useParams, Link } from 'react-router-dom';

function App() {
  //STRETCH URL
  const params = useParams();
  // console.log(typeof parseInt(params.page));
  
  const [beanieBabies, setBeanieBabies] = useState([]);
  const [page, setPage] = useState(params.page ? parseInt(params.page) : 1);
  const perPage = 20;
  //STRETCH FILTER
  const [query, setQuery] = useState('');
  
  
  useEffect(() => {
    async function fetchAndSetBeanieBabies() {
      const start = (page * perPage) - perPage;
      const end = page * perPage - 1;
      const beanies = await getBeanieBabies(start, end);
  
      setBeanieBabies(beanies);
    }
  
    async function fetchAndSetBeanieBabiesNoRangeFilter() {
      const allBeanies = await getBeanieBabiesNoRange();
  
      const filteredBeanies = allBeanies.filter((beanie) => 
        beanie.title.includes(query)
      );
      // console.log(filteredBeanies);
      setBeanieBabies(filteredBeanies);
    }
    
      //STRETCH - FILTER
    if (query) {
      fetchAndSetBeanieBabiesNoRangeFilter();
    }
    else {
      fetchAndSetBeanieBabies();
    }
  }, [page, query]); // what can you do with this array to trigger a fetch every time the page changes?


  return (
    <>
      <h2>Current Page {page}</h2>
      <div className='buttons'>
        {/* on click, this button should decrement the page in state  */}
        {/* also, disable this button when you are on the first page */}
        <Link to={`/${page - 1}`}>
          <button 
            disabled={(page === 1)}
            onClick={()=> setPage(page - 1)}
          >Previous Page</button>
        </Link>
        {/* on click, this button should increment the page in state  */
        }
        {/* Disable button if the returned array is les than per page meaning we are at the end of the array - EDGE CASE IT IS EXACTLY AMOUNT LEFT */}
        <Link to={`/${page + 1}`}>
          <button 
            disabled={beanieBabies.length < perPage}
            onClick={()=> setPage(page + 1)}
          >Next Page</button>
        </Link>
        <br></br>
        <label> Search All BBs:
          <input
            onChange={(e)=> {
              setQuery(e.target.value);
              // window.location.replace(`/1/${e.target.value}`);
            }
            }
          ></input>
        </label>
      </div>
      {/* pass the beanie babies into the BeaniesList component */}
      <BeaniesList 
        beanieBabies={beanieBabies}
      />
    </>
  );
}

export default App;
