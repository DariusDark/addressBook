import { BrowserRouter as Router, Switch, Route, Redirect, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, setFetch } from './store/actions/Actions';
import './App.css';
import Home from './components/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Search from './components/search/Search';
import AddContact from './components/addContact/AddContact';
import Contact from './components/contact/Contact';

function App() {
  const dispatch = useDispatch();
  const params = useSelector(state => state.params);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await fetch('https://jsonplaceholder.typicode.com/users');
        let res = await data.json();
        dispatch(addContacts(res));
      } catch (e) {
        dispatch(setFetch());
        console.log(e);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="container">
        <Sidebar />
        <div className="main-content active">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={`/user/${params}`} component={Contact} />
            <Route path="/search" component={Search} />
            <Route path="/addUser" component={AddContact} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
