import React from 'react';
import {Route, Switch,BrowserRouter,withRouter} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';

import FileUpload from './pages/fileUploadpage/fileUpload.component';
import HomePage from './pages/homepage/homepage.component';
import LoginPage  from './pages/loginpage/LoginPage.component';
import OperationsPage from './pages/operations/operations.component';
import POBurntPage from './pages/poburntpage/poburntpage.component';
const Main = withRouter(({location})=>{

  return (

  <div>
    { location.pathname!=='/login' &&   <Header />}
 
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/test" component={OperationsPage} />
      <Route path="/fileUploads" component={FileUpload} />
      <Route path="/poburnt" component={POBurntPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>

  </div>

  );
});

export const App= ()=>(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>
)

export default App;
