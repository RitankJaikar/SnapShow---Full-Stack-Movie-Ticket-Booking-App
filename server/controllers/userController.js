import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// API controller function to get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth()?.userId;
    // 👇 check if userId is available
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized: Please login",
      });
    }

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API controller function to update favorite movie in clerk user metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;

    const userId = req.auth()?.userId;
    // 👇 check if userId is available
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized: Please login",
      });
    }
    
    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      // if not added
      user.privateMetadata.favorites.push(movieId);
    } else {
      // if already added then remove
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
        (item) => item !== movieId
      );
    }

    // user.privateMetadata.favorites = []; // empty existing fav
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata
    });

    res.json({ success: true, message: "Favorite updated successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API controller function to get favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.auth()?.userId;
    // 👇 check if userId is available
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized: Please login",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    const favorites = user.privateMetadata.favorites;

    // Getting movies from database
    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
