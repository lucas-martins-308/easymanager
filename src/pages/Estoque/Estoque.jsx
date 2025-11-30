import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Estoque() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/stock"); 
    }, [navigate]);

    return null;
}

export default Estoque;
