"use client";

import { useState, useEffect } from "react";
import axiosSecure from "../lib/axios";
import { HeroData } from "../types/dataTypes";

export const useHero = () => {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    axiosSecure
      .get("/api/hero")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Function to PATCH / update hero data
  const updateHero = async (updatedData: HeroData) => {
  if (!updatedData._id) throw new Error("Hero ID is missing");

  const { _id, ...payload } = updatedData;

  try {
    const res = await axiosSecure.patch(`/api/hero/${_id}`, payload);
    setData(res.data);
    return res.data;
  } catch (err: any) {
    console.error("Hero update failed:", err.response?.data || err.message);
    setError(err.message || "Failed to update hero");
    throw err;
  }
};



  return { data, loading, error, updateHero };
};
