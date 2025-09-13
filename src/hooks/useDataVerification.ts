import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DataVerification {
  id: string;
  section: string;
  data_key: string;
  value: string;
  is_verified: boolean;
  source_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useDataVerification = () => {
  const [verifications, setVerifications] = useState<DataVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("data_verification")
        .select("*")
        .order("section", { ascending: true });

      if (error) throw error;
      setVerifications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data verifications");
    } finally {
      setLoading(false);
    }
  };

  const getVerificationStatus = (section: string, dataKey: string): boolean | null => {
    const verification = verifications.find(
      v => v.section === section && v.data_key === dataKey
    );
    return verification?.is_verified ?? null;
  };

  const updateVerification = async (
    section: string, 
    dataKey: string, 
    updates: Partial<DataVerification>
  ) => {
    try {
      setError(null);
      
      const { error } = await supabase
        .from("data_verification")
        .upsert({
          section,
          data_key: dataKey,
          value: updates.value || "",
          is_verified: updates.is_verified ?? false,
          source_url: updates.source_url,
          notes: updates.notes,
        });

      if (error) throw error;
      await fetchVerifications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update verification");
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  return {
    verifications,
    loading,
    error,
    getVerificationStatus,
    updateVerification,
    refetch: fetchVerifications,
  };
};