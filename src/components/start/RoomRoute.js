import React,{useEffect,useState} from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RoomRoute({ component: Component,computedMatch:Match, ...rest }) {
  const { isInClass } = useAuth();
  const [isIn, setIsIn] = useState(false);
  async function setInClass(id) {
      const result= await isInClass(id);
      setIsIn(result);
      console.log(result);
  }
  useEffect(() => {
      setInClass(Match.params.id);
      
  }, [])
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return isIn? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }}
      ></Route>
    </div>
  );
}
