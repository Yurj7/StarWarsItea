import 'grommet/scss/vanilla/index.scss';
import 'whatwg-fetch';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Films from './screens/Films';
import Home from './screens/Home';
import People from './screens/People';
import Person from './screens/Person';

import Planets from './screens/Planets';
import Species from './screens/Species';
import Starships from './screens/Starships';
import Vehicles from './screens/Vehicles';
import Search from './screens/Search';


import SearchHeader from './components/SearchHeader';
import GrommetFooter from './components/Footer';

class App extends React.PureComponent {
  render() {
    return (

      <BrowserRouter>
        <div>
          <SearchHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search/:type/:query" component={Search} />
            <Route path="/films" component={Films} />
            <Route path="/people/:id" component={Person} />

            <Route path="/people" component={People} />
            <Route path="/planets" component={Planets} />
            <Route path="/species" component={Species} />
            <Route path="/starships" component={Starships} />
            <Route path="/vehicles" component={Vehicles} />
          </Switch>
          <GrommetFooter />
        </div>


      </BrowserRouter>
    );
  }
}

export default App;
