import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth-context";

const SecretRoutes = (props) => {
    let { user } = useAuth();
    if (!user && !props.hideIfLogged) {
        return <Navigate to="/home"></Navigate>
    }
    if (user && props.hideIfLogged) {
        return <Navigate to="/home"></Navigate>
    }
    return props.children;
}

export default SecretRoutes;