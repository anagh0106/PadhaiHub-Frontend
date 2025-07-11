import { useEffect, useState } from "react";
import axios from "axios";

const FetchMockTest = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMockTest = async () => {
            try {
                const res = await axios.get(
                    "https://opentdb.com/api.php?amount=10&category=19&type=multiple"
                );
                setQuestions(res.data.results);
            } catch (error) {
                console.error("Error fetching mock test questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMockTest();
    }, []);

    return { questions, loading };
};

export default FetchMockTest;
