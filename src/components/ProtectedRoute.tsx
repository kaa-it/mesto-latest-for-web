import React from 'react';
import { Navigate } from "react-router-dom";
import Preloader from './Preloader';
import { useSelector } from "react-redux";

import { getIsAuth, getIsAuthChecking } from "../store/auth/selectors";

type TProtectedRouteProps = {
  children: React.ReactNode
}


const ProtectedRoute = ({children}: TProtectedRouteProps): React.JSX.Element => {
  const isLoggedIn = useSelector(getIsAuth);
  const isChecking = useSelector(getIsAuthChecking);

  return (
    <>
      { isChecking ? (
        <main className='content'>
          <Preloader />
        </main>
      ) : (
        isLoggedIn ? children : <Navigate to="/signin" />
      )}
    </>
)}

export default ProtectedRoute;