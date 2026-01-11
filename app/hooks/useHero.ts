"use client";

import { useState, useEffect } from "react";
import axiosSecure from "../lib/axios";
import { PortfolioData, HeroData } from "../types/dataTypes";

interface UseHeroReturn {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
  updateHero: (updatedData: PortfolioData) => Promise<PortfolioData>;
}

export const useHero = (): UseHeroReturn => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get<PortfolioData>("/api/hero");
        setData(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hero data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // PATCH / update hero data
  const updateHero = async (updatedData: HeroData) => {
    // Support both string _id and MongoId
    const id =
      typeof updatedData._id === "string" ? updatedData._id : updatedData._id.$oid;

    if (!id) throw new Error("Hero ID is missing");

    try {
      const { _id, ...payload } = updatedData;
      const res = await axiosSecure.patch<PortfolioData>(`/api/hero/${id}`, payload);
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
