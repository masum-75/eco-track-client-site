import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://eco-track-server-orcin.vercel.app/challenges');
      setChallenges(res.data);
      setError(null);
    } catch (err) {
      console.error("Hook Error:", err);
      setError(err.message || "Failed to fetch challenges");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);


  return { challenges, loading, error, refetch: fetchChallenges };
};

export default useChallenges;