import axios from "axios";
import type { Note } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string = "",
): Promise<FetchNotesResponse> => {
  const response = await noteApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage: 12,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await noteApi.post<Note>("/notes", noteData);
  return response.data;
};
