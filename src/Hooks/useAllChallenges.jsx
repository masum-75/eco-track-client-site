import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useAllChallenges = (filters = {}) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterString = JSON.stringify(filters);

  const fetchFilteredData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://eco-track-server-orcin.vercel.app/challenges');
      let data = res.data;


      if (filters && Object.keys(filters).length > 0) {
        if (filters.participantsMin) {
          data = data.filter(c => (c.participants || 0) >= Number(filters.participantsMin));
        }
        if (filters.participantsMax) {
          data = data.filter(c => (c.participants || 0) <= Number(filters.participantsMax));
        }
        if (filters.category && filters.category !== "All") {
          data = data.filter(c => c.category === filters.category);
        }
        if (filters.startDateFrom) {
          data = data.filter(c => new Date(c.startDate) >= new Date(filters.startDateFrom));
        }
        if (filters.startDateTo) {
          data = data.filter(c => new Date(c.startDate) <= new Date(filters.startDateTo));
        }
       
        if (filters.search) {
          data = data.filter(c => 
            c.title.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
      }

      setChallenges(data);
      setError(null);
    } catch (err) {
      console.error("Filter Hook Error:", err);
      setError("Failed to sync environmental data.");
    } finally {
      setLoading(false);
    }
  }, [filterString]); 
  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  return { challenges, loading, error, refetch: fetchFilteredData };
};

export default useAllChallenges;