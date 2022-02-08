import { useEffect, useState } from 'react';
import './App.css';
import { getBeanieBabies, getBeanieBabiesNoRange } from './services/fetch-utils';
import BeaniesList from './BeaniesList';

function App() {
  const [beanieBabies, setBeanieBabies] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  //STRETCH FILTER
  const [query, setQuery] = useState('');
  
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

  useEffect(() => {
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
        <button 
          disabled={(page === 1)}
          onClick={()=> setPage(page - 1)}
        >Previous Page</button>
        {/* on click, this button should increment the page in state  */
        }
        {/* Disable button if the returned array is les than per page meaning we are at the end of the array - EDGE CASE IT IS EXACTLY AMOUNT LEFT */}
        <button 
          disabled={beanieBabies.length < perPage}
          onClick={()=> setPage(page + 1)}
        >Next Page</button>
        <br></br>
        <label> Search All BBs:
          <input
            onChange={(e)=> 
              setQuery(e.target.value)
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
