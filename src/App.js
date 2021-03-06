import { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense } from "react/cjs/react.production.min";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login}></Route>
            <Route path={ROUTES.SIGN_UP} component={Signup}></Route>
            <Route path={ROUTES.NOT_FOUND} component={NotFound}></Route>
            <Route path={ROUTES.DASHBOARD} component={Dashboard}></Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
