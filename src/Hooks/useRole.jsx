import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (!loading && user?.email) {
            axios.get(`https://eco-track-server-orcin.vercel.app/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setRoleLoading(false);
                });
        }
    }, [user, loading]);

    return [role, roleLoading];
};

export default useRole;