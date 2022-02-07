import { useEffect, useState } from 'react';
import './App.css';
import { getBeanieBabies } from './services/fetch-utils';
import BeaniesList from './BeaniesList';

function App() {
  const [beanieBabies, setBeanieBabies] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 50;
  
  useEffect(() => {
    async function fetch() {
      const start = (page * perPage) - perPage;
      const end = page * perPage - 1;
      const beanies = await getBeanieBabies(start, end);

      setBeanieBabies(beanies);
    }

    fetch();
  }, [page]); // what can you do with this array to trigger a fetch every time the page changes?


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
      </div>
      {/* pass the beanie babies into the BeaniesList component */}
      <BeaniesList 
        beanieBabies={beanieBabies}
      />
    </>
  );
}

export default App;
