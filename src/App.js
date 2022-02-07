import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import BeaniesPage from './BeaniesPage';
import BeanieDetail from './BeanieDetail';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <ul>
          <li>
            <Link to="/List">List</Link>
          </li>
          <li>
            <Link to="/Detail">Detail</Link>
          </li> 
        </ul>
        <Switch>
          <Route exact path="/List">
            <BeaniesPage />
            {/* this home page route should list all the beanies */}
          </Route>
          <Route exact path="/Detail"> 
            <BeanieDetail />
            {/* this route should point to a particular beanie baby by id and render that specific BeanieDetail page */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}