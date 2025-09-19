import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GTMPhase {
  id: string;
  phase_number: number;
  name: string;
  timeline: string;
  description: string;
  status: string;
  revenue_goal: string | null;
  users_goal: string | null;
  features_goal: string | null;
  created_at: string;
  updated_at: string;
}

export interface GTMPhaseActivity {
  id: string;
  phase_id: string;
  title: string;
  description: string | null;
  order_index: number;
  due_date: string | null;
  status: string | null;
  priority: string | null;
  notes: string | null;
  owner: string | null;
}

export interface GTMPhaseCriteria {
  id: string;
  phase_id: string;
  criterion: string;
  status: string;
  order_index: number;
}

export interface GTMPhaseMetric {
  id: string;
  phase_id: string;
  metric_name: string;
  target_value: string;
  current_value: string | null;
  unit: string | null;
  order_index: number;
}

export const useGTMPhases = () => {
  const [phases, setPhases] = useState<GTMPhase[]>([]);
  const [activities, setActivities] = useState<GTMPhaseActivity[]>([]);
  const [criteria, setCriteria] = useState<GTMPhaseCriteria[]>([]);
  const [metrics, setMetrics] = useState<GTMPhaseMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [phasesResult, activitiesResult, criteriaResult, metricsResult] = await Promise.all([
        supabase.from("gtm_phases").select("*").order("phase_number"),
        supabase.from("gtm_phase_activities").select("*").order("order_index"),
        supabase.from("gtm_phase_criteria").select("*").order("order_index"),
        supabase.from("gtm_phase_metrics").select("*").order("order_index"),
      ]);

      if (phasesResult.error) throw phasesResult.error;
      if (activitiesResult.error) throw activitiesResult.error;
      if (criteriaResult.error) throw criteriaResult.error;
      if (metricsResult.error) throw metricsResult.error;

      setPhases(phasesResult.data || []);
      setActivities((activitiesResult.data as unknown as GTMPhaseActivity[]) || []);
      setCriteria(criteriaResult.data || []);
      setMetrics(metricsResult.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch GTM phases data");
    } finally {
      setLoading(false);
    }
  };

  const addPhase = async (phase: Omit<GTMPhase, "id" | "created_at" | "updated_at">) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phases")
        .insert(phase);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add phase");
    }
  };

  const updatePhase = async (phaseId: string, updates: Partial<GTMPhase>) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phases")
        .update(updates)
        .eq("id", phaseId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update phase");
    }
  };

  const addActivity = async (phaseId: string, activity: Omit<GTMPhaseActivity, "id" | "phase_id">) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_activities")
        .insert({ ...activity, phase_id: phaseId });

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add activity");
    }
  };

  const updateActivity = async (activityId: string, updates: Partial<GTMPhaseActivity>) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_activities")
        .update(updates)
        .eq("id", activityId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update activity");
    }
  };

  const deleteActivity = async (activityId: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_activities")
        .delete()
        .eq("id", activityId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete activity");
    }
  };

  // Criteria CRUD operations
  const addCriterion = async (phaseId: string, criterion: Omit<GTMPhaseCriteria, "id" | "phase_id">) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_criteria")
        .insert({ ...criterion, phase_id: phaseId });

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add criterion");
    }
  };

  const updateCriterion = async (criterionId: string, updates: Partial<GTMPhaseCriteria>) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_criteria")
        .update(updates)
        .eq("id", criterionId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update criterion");
    }
  };

  const deleteCriterion = async (criterionId: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_criteria")
        .delete()
        .eq("id", criterionId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete criterion");
    }
  };

  // Metrics CRUD operations
  const addMetric = async (phaseId: string, metric: Omit<GTMPhaseMetric, "id" | "phase_id">) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_metrics")
        .insert({ ...metric, phase_id: phaseId });

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add metric");
    }
  };

  const updateMetric = async (metricId: string, updates: Partial<GTMPhaseMetric>) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_metrics")
        .update(updates)
        .eq("id", metricId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update metric");
    }
  };

  const deleteMetric = async (metricId: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("gtm_phase_metrics")
        .delete()
        .eq("id", metricId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete metric");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    phases,
    activities,
    criteria,
    metrics,
    loading,
    error,
    addPhase,
    updatePhase,
    addActivity,
    updateActivity,
    deleteActivity,
    addCriterion,
    updateCriterion,
    deleteCriterion,
    addMetric,
    updateMetric,
    deleteMetric,
    refetch: fetchData,
  };
};