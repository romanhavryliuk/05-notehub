type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type { Note, NoteTag };
