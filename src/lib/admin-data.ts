import { supabase } from "@/integrations/supabase/client";

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "replied" | "archived";
}

function fromRow(row: Record<string, string>): MessageRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at,
    status: row.status as MessageRecord["status"],
  };
}

export async function getMessages(): Promise<MessageRecord[]> {
  const { data, error } = await (supabase as any)
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export async function addMessage(input: Omit<MessageRecord, "id" | "createdAt" | "status">): Promise<MessageRecord> {
  const { data, error } = await (supabase as any)
    .from("contact_messages")
    .insert({ name: input.name, email: input.email, phone: input.phone, subject: input.subject, message: input.message })
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updateMessageStatus(id: string, status: MessageRecord["status"]): Promise<MessageRecord[]> {
  const { error } = await (supabase as any)
    .from("contact_messages")
    .update({ status, replied_at: status === "replied" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
  return getMessages();
}
