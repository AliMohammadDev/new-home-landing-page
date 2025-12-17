import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import axios from "axios";
import { useNavigate } from "react-router";
const Logout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    useEffect(() => {
        queryClient.setQueryData(["profile"], null);
        queryClient.clear();
        Cookie().remove("token");
        axios.defaults.headers.common.Authorization = "";
        navigate("/");
    }, [navigate, queryClient]);
    return null;
};

export default Logout;
