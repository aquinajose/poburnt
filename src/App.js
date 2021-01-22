import React from 'react';
import {Route, Switch,BrowserRouter,withRouter} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';

import FileUpload from './pages/fileUploadpage/fileUpload.component';
import HomePage from './pages/homepage/homepage.component';
import LoginPage  from './pages/loginpage/LoginPage.component';
import OperationsPage from './pages/operations/operations.component';
import POBurntPage from './pages/poburntpage/poburntpage.component';
import SignUpPage from './pages/signuppage/signUpPage.component';
import WorkInProgressPage from './pages/workInProgress/workInProgress.component';

const Main = withRouter(({location})=>{
    let HideHeader = (location)=>{
      if(location.pathname==='/'){
        return null
      }
      else if(location.pathname==='/login'){
        return null
      }
      else if(location.pathname==='/signup'){
        return null;
      }
      return <Header/>
    }
  return (
  <div>
    {HideHeader(location)}
    <Switch>
     
      <Route exact path="/" component={LoginPage} />
      <Route path="/test" component={OperationsPage} />
      <Route path="/fileUploads" component={FileUpload} />
      <Route path="/poburnt" component={POBurntPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage}/>
      <Route path="/workInProgress" component={WorkInProgressPage}/>
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
