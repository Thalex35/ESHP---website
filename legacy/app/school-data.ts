import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

/**
 * Data access layer for the dashboards.
 * Business/data logic lives here so UI components stay presentational.
 * Every query runs through the browser client, so RLS decides what is visible.
 */

async function countRows(table: "students" | "teachers" | "classes" | "profiles"): Promise<number> {
  const { count, error } = await supabase.from(table).select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

export interface StudentRecord {
  id: string;
  student_number: string;
  status: string;
  date_of_birth: string | null;
  class_id: string | null;
  classes: { name: string; academic_year: string } | null;
}

export function useStudentRecord(userId: string | undefined) {
  return useQuery({
    queryKey: ["student-record", userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<StudentRecord | null> => {
      const { data, error } = await supabase
        .from("students")
        .select("id, student_number, status, date_of_birth, class_id, classes(name, academic_year)")
        .eq("user_id", userId!)
        .maybeSingle();
      if (error) throw error;
      return (data as StudentRecord | null) ?? null;
    },
  });
}

export interface TeacherRecord {
  id: string;
  employee_number: string;
  status: string;
  specialization: string | null;
}

export function useTeacherRecord(userId: string | undefined) {
  return useQuery({
    queryKey: ["teacher-record", userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<TeacherRecord | null> => {
      const { data, error } = await supabase
        .from("teachers")
        .select("id, employee_number, status, specialization")
        .eq("user_id", userId!)
        .maybeSingle();
      if (error) throw error;
      return (data as TeacherRecord | null) ?? null;
    },
  });
}

export function useTeacherClasses(teacherId: string | undefined) {
  return useQuery({
    queryKey: ["teacher-classes", teacherId],
    enabled: Boolean(teacherId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("id, name, academic_year, level, status")
        .eq("main_teacher_id", teacherId!)
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useStudentsInClasses(classIds: string[]) {
  return useQuery({
    queryKey: ["students-in-classes", classIds],
    enabled: classIds.length > 0,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("students")
        .select("id", { count: "exact", head: true })
        .in("class_id", classIds);
      if (error) throw error;
      return count ?? 0;
    },
  });
}

export interface SchoolCounts {
  students: number;
  teachers: number;
  classes: number;
}

export function useSchoolCounts() {
  return useQuery({
    queryKey: ["school-counts"],
    queryFn: async (): Promise<SchoolCounts> => {
      const [students, teachers, classes] = await Promise.all([
        countRows("students"),
        countRows("teachers"),
        countRows("classes"),
      ]);
      return { students, teachers, classes };
    },
  });
}

export function useClassList() {
  return useQuery({
    queryKey: ["class-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("id, name, academic_year, level, capacity, status")
        .order("academic_year", { ascending: false })
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export interface DirectoryRow {
  id: string;
  reference: string;
  status: string;
  name: string;
  email: string | null;
}

/** Student or teacher directory joined with the person's profile. */
export function useDirectory(kind: "students" | "teachers") {
  return useQuery({
    queryKey: ["directory", kind],
    queryFn: async (): Promise<DirectoryRow[]> => {
      const query =
        kind === "students"
          ? supabase.from("students").select("id, user_id, status, student_number")
          : supabase.from("teachers").select("id, user_id, status, employee_number");
      const { data, error } = await query.order("created_at", { ascending: false }).limit(100);
      if (error) throw error;

      const rows = (data ?? []) as unknown as Record<string, string>[];
      if (rows.length === 0) return [];


      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("user_id, first_name, last_name, email")
        .in(
          "user_id",
          rows.map((row) => row["user_id"]!),
        );
      if (profileError) throw profileError;

      const byUser = new Map(
        (profiles ?? []).map((profile) => [profile.user_id, profile] as const),
      );

      return rows.map((row) => {
        const profile = byUser.get(row["user_id"]!);
        const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
        return {
          id: row["id"]!,
          reference: row[kind === "students" ? "student_number" : "employee_number"] ?? "—",
          status: row["status"] ?? "unknown",
          name: name || "Unnamed member",
          email: profile?.email ?? null,
        };
      });
    },
  });
}

export interface PlatformStats {
  users: number;
  students: number;
  teachers: number;
  classes: number;
  auditEvents: number;
}

/** Technical statistics for the system administration dashboard. */
export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: async (): Promise<PlatformStats> => {
      const [users, students, teachers, classes] = await Promise.all([
        countRows("profiles"),
        countRows("students"),
        countRows("teachers"),
        countRows("classes"),
      ]);
      const { count, error } = await supabase
        .from("audit_logs")
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return { users, students, teachers, classes, auditEvents: count ?? 0 };
    },
  });
}
