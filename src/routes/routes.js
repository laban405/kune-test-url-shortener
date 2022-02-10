
import Home from "../pages/Home";
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import NotFound from "../components/NotFound";

const createRoutes = () => {
    const user = true;
    return (
        <Routes>
           
                <Route element={<ProtectedRoute isAllowed={user} />}>
                    <Route exact path="/" element={<Home />} />
                                     
                </Route>
                <Route path="*" element={<NotFound/>} />
           
        </Routes>
    )
}

export default createRoutes