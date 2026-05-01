import api from "./api";
import type { Category, Note } from "./definitions";

export const getActiveNotes = async (categoryId?: number): Promise<Note[]> => {
	const { data } = await api.get(`/notes/active`, {
		params: categoryId ? { categoryId } : undefined,
	});
	return data;
};

export const getArchivedNotes = async (
	categoryId?: number,
): Promise<Note[]> => {
	const { data } = await api.get("/notes/archived", {
		params: categoryId ? { categoryId } : undefined,
	});
	return data;
};

export const createNote = async (note: {
	title: string;
	content: string;
}): Promise<Note> => {
	const { data } = await api.post("/notes", note);
	return data;
};

export const updateNote = async (
	id: number,
	note: { title?: string; content?: string },
): Promise<Note> => {
	const { data } = await api.put(`/notes/${id}`, note);
	return data;
};

export const deleteNote = async (id: number): Promise<void> => {
	await api.delete(`/notes/${id}`);
};

export const toggleArchive = async (
	id: number,
	archived: boolean,
): Promise<Note> => {
	const { data } = await api.put(`/notes/${id}/archive`, { archived });
	return data;
};

export const addCategory = async (
	noteId: number,
	categoryId: number,
): Promise<Note> => {
	const { data } = await api.post(`/notes/${noteId}/category/${categoryId}`);
	return data;
};

export const removeCategory = async (
	noteId: number,
	categoryId: number,
): Promise<Note> => {
	const { data } = await api.delete(`/notes/${noteId}/category/${categoryId}`);
	return data;
};

export const getCategories = async (): Promise<Category[]> => {
	const { data } = await api.get("/categories");
	return data;
};

export const findOrCreateCategory = async (name: string): Promise<Category> => {
	const { data } = await api.post("/categories", { name });
	return data;
};

export const deleteCategory = async (id: number): Promise<void> => {
	await api.delete(`/categories/${id}`);
};
