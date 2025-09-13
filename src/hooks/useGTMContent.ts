import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GTMContent {
  id: string;
  section: string;
  content_type: string;
  content_value: any;
  updated_at: string;
}

export const useGTMContent = (section: string) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gtm_content")
        .select("*")
        .eq("section", section)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContent(typeof data.content_value === "string" ? data.content_value : JSON.stringify(data.content_value));
      } else {
        // Fallback to localStorage if no database content
        const localContent = localStorage.getItem(`gtm_${section}`);
        setContent(localContent || "");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch content");
      // Fallback to localStorage on error
      const localContent = localStorage.getItem(`gtm_${section}`);
      setContent(localContent || "");
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (newContent: string) => {
    try {
      setError(null);
      
      // Optimistic update
      setContent(newContent);
      
      // Save to localStorage immediately
      localStorage.setItem(`gtm_${section}`, newContent);

      // Update database
      const { error } = await supabase
        .from("gtm_content")
        .upsert({
          section,
          content_type: "text",
          content_value: newContent,
        });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update content");
      // Keep the optimistic update even if database fails
    }
  };

  useEffect(() => {
    fetchContent();
  }, [section]);

  return {
    content,
    loading,
    error,
    updateContent,
    refetch: fetchContent,
  };
};
