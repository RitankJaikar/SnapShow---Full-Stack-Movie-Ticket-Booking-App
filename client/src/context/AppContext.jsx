import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    const { user } = useUser();
    const { getToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get("/api/admin/is-admin", { headers: { Authorization: `Bearer ${await getToken()}` } });
            setIsAdmin(data.isAdmin);

            if (!data.isAdmin && location.pathname.startsWith("/admin")) {
                navigate("/");
                toast.error("You are not authorized to access admin dashboard")
            }
        } catch (error) {
            console.error("Error fetching isAdmin: ", error);
        }
    }

    const fetchShows = async () => {
        try {
            const { data } = await axios.get("/api/show/all");
            
            if (data.success) {
                setShows(data.shows);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching movies: ", error);
        }
    }

    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get("/api/user/favorites", { headers: { Authorization: `Bearer ${await getToken()}` } });

            if (data.success) {
                setFavoriteMovies(data.movies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching favorite movies: ", error);
        }
    }

    useEffect(() => {
        fetchShows();
    }, []);

    useEffect(() => {
        if (user) {
            fetchIsAdmin();
            fetchFavoriteMovies();
        }
    }, [user]);

    const value = {
        axios,
        user,
        isAdmin,
        shows,
        favoriteMovies,
        image_base_url,
        getToken,
        navigate,
        fetchIsAdmin,
        fetchShows,
        fetchFavoriteMovies
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);