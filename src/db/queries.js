import { supabase } from "./supabaseClient";
import { useEffect } from "react";

export const fetchAllNotes = async (currentUserID) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", currentUserID)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
  }
  return data;
};

export const getAllTags = async (currentUserID) => {
  const { data, error } = await supabase
    .from("notes")
    .select("tags")
    .eq("user_id", currentUserID);

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  const allTags = data
    .filter((row) => Array.isArray(row.tags)) // only include rows with array tags
    .flatMap((row) => row.tags); // flatten arrays

  const uniqueTags = [...new Set(allTags)]; // remove duplicates

  return uniqueTags;
};

async function addNote() {
  if (note.trim() === "") return;

  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        user_id: user.id,
        content: note,
      },
    ])
    .select();
  console.log("Insert result:", { data, error });
  if (error) console.error(error);
  else {
    setNotes([data[0], ...notes]);
    setNote("");
  }
}
