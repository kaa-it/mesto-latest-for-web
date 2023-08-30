import React from "react";
import { Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { checkAuth } from "../store/auth/actions";
import { getIsAuth } from "../store/auth/selectors";
import ImagePopup from './ImagePopup';

function App() {
  const dispatch = useDispatch();
  const [tooltipStatus, setTooltipStatus] = React.useState();
  const closeInfoTooltip = () => setTooltipStatus();
  const isLoggedIn = useSelector(getIsAuth);
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const modal = location.state && location.state.background;

  return (
    <div className='page__content'>
      <Header />
      <Switch location={modal || location}>
        <ProtectedRoute path='/gallery'>
          <Main />
        </ProtectedRoute>
        <Route path='/signup' exact>
          {isLoggedIn && <Redirect to='/gallery' />}
          <Register setTooltip={setTooltipStatus} />
        </Route>
        <Route path='/signin' exact>
          {isLoggedIn && <Redirect to='/gallery' />}
          <Login setTooltip={setTooltipStatus} />
        </Route>
        <Route path='/card/:id'>
          <ImagePopup onClose={() => history.push('/')}/>
        </Route>
        <Route path='*'>
          {isLoggedIn ? <Redirect to='/gallery' /> : <Redirect to='/signin' />}
        </Route>
      </Switch>
      <Footer />
      <Route path='/(signup|signin)'>
        {!!tooltipStatus && (<InfoTooltip
          onClose={closeInfoTooltip}
          status={tooltipStatus}
        />)}
      </Route>
      {modal && (
        <Route path='/card/:id'>
          <ImagePopup onClose={() => history.goBack()}/>
        </Route>
      )}
    </div>
  );
}

export default App;
