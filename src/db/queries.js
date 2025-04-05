import { supabase } from "./supabaseClient";

export const fetchAllNotes = async (currentUserID) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", currentUserID)
    .eq("isArchived", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
  }
  return data;
};
export const searchNotes = async (currentUserID, searchQuery = "") => {
  let query = supabase
    .from("notes")
    .select("*")
    .eq("user_id", currentUserID)
    .eq("isArchived", false)
    .order("created_at", { ascending: false });

  if (searchQuery.trim()) {
    query = query.or(
      `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,tags.ilike.%${searchQuery}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
  }

  return data;
};

export const addNote = async (note, user) => {
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        user_id: user.id,
        title: note.title,
        content: note.content,
        tags: note.tags,
        created_at: new Date().toISOString(),
        updatedat: new Date().toISOString(),
        isArchived: false,
      },
    ])
    .select();

  console.log("Insert result:", { data, error });

  if (error) {
    console.error(error);
  } else {
    return data[0];
  }
};

export const fetchNoteById = async (noteId, currentUserID) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", currentUserID)
    .eq("id", noteId)
    .single();

  if (error) {
    console.error("Error fetching note by ID:", error);
    return null;
  }

  return data;
};

export const searchArchivedNotes = async (currentUserID, searchQuery = "") => {
  let query = supabase
    .from("notes")
    .select("*")
    .eq("user_id", currentUserID)
    .eq("isArchived", true)
    .order("created_at", { ascending: false });

  if (searchQuery.trim()) {
    query = query.or(
      `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,tags.ilike.%${searchQuery}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
  }

  return data;
};

export const fetchAllArchivedNotes = async (currentUserID) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", currentUserID)
    .eq("isArchived", true)
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
    .eq("isArchived", false)
    .eq("user_id", currentUserID);

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  const allTags = data
    .filter((row) => row.tags)
    .flatMap((row) => row.tags.split(",").map((tag) => tag.trim()));

  const uniqueTags = [...new Set(allTags)];

  return uniqueTags;
};
