import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://eco-track-server-orcin.vercel.app', 
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;