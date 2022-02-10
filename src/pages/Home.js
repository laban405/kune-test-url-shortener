import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../redux/slices/message";
import LandingSection from '../components/home/LandingSection'

const Home = () => {
  
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  

  

  

  return (
    
      <main>
        <LandingSection/>       
      </main>      
     
  );
};
export default Home;