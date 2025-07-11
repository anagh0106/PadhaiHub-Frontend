import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2, Video } from "lucide-react";

const Joinclassbutton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [liveClass, setLiveClass] = useState(null);
    const [error, setError] = useState(null);

    // Simulate fetching live class info on mount
    useEffect(() => {
        const fetchLiveClass = async () => {
            try {
                const res = await fetch("/api/classes/current-live");
                const data = await res.json();

                if (data?.link && data?.startTime && data?.endTime) {
                    const now = new Date();
                    const start = new Date(data.startTime);
                    const end = new Date(data.endTime);

                    if (now >= start && now <= end) {
                        setLiveClass(data);
                    } else {
                        setError("No class is live right now.");
                    }
                } else {
                    setError("No live class found.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch live class.");
            }
        };

        fetchLiveClass();
    }, []);

    const handleJoin = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.open(liveClass.link, "_blank", "noopener,noreferrer");
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="mt-4">
            {liveClass ? (
                <Button onClick={handleJoin} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Video className="w-4 h-4" />}
                    {isLoading ? "Joining..." : "Join Live Class"}
                </Button>
            ) : (
                <div className="text-sm text-yellow-400">{error || "Checking for live class..."}</div>
            )}
        </div>
    );
};

export default Joinclassbutton;
