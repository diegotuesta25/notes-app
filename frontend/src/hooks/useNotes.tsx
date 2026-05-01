import { useEffect, useState } from "react";
import type { Category, Note, View } from "../libs/definitions";
import {
	createNote,
	deleteNote,
	getActiveNotes,
	getArchivedNotes,
	toggleArchive,
	addCategory,
	removeCategory,
	findOrCreateCategory,
} from "../libs/notes.api";

export function useNotes(
	selectedCategoryId: number | null,
	onSetAllCategories: (category: Category) => void,
) {
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
	const [view, setView] = useState<View>("active");
	const [mobileView, setMobileView] = useState<"list" | "editor">("list");
	const [isLoading, setIsLoading] = useState(false);

	const selectedNote = notes.find(note => note.id === selectedNoteId);

	const visibleNotes = notes.filter(
		note =>
			!selectedCategoryId ||
			note.categories.some(category => category.id === selectedCategoryId),
	);

	useEffect(() => {
		const fetchNotes = async () => {
			setIsLoading(true);
			try {
				const data =
					view === "active" ? await getActiveNotes() : await getArchivedNotes();

				setNotes(data);
				setSelectedNoteId(null);
				setMobileView("list");
			} catch (error) {
				console.error("Failed to fetch notes:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNotes();
	}, [view]);

	const handleCreateNote = async () => {
		try {
			const newNote = await createNote({ title: "", content: "" });

			setNotes(prev => [newNote, ...prev]);
			setSelectedNoteId(newNote.id);
			setMobileView("editor");

			if (selectedCategoryId) {
				const updated = await addCategory(newNote.id, selectedCategoryId);

				setNotes(prev =>
					prev.map(note => (note.id === updated.id ? updated : note)),
				);
			}
		} catch (error) {
			console.error("Failed to create a note: ", error);
		}
	};

	const handleUpdateNote = (updatedNote: Note) => {
		setNotes(prev =>
			prev.map(note => (note.id === updatedNote.id ? updatedNote : note)),
		);
	};

	const handleSelectNoteId = (id: number) => {
		setSelectedNoteId(id);
		setMobileView("editor");
	};

	const handleDeleteNote = async () => {
		if (!selectedNoteId) return;
		try {
			await deleteNote(selectedNoteId);

			setNotes(prev => prev.filter(note => note.id !== selectedNoteId));
			setSelectedNoteId(null);
			setMobileView("list");
		} catch (error) {
			console.error("Failed to delete a note: ", error);
		}
	};

	const handleAddCategory = async (name: string) => {
		if (!selectedNoteId) return;

		try {
			const category = await findOrCreateCategory(name);
			const updated = await addCategory(selectedNoteId, category.id);
			onSetAllCategories(category);
			setNotes(prev =>
				prev.map(note => (note.id === updated.id ? updated : note)),
			);
		} catch (error) {
			console.error("Failed to add a category: ", error);
		}
	};

	const handleRemoveCategory = async (categoryId: number) => {
		if (!selectedNoteId) return;

		const updated = await removeCategory(selectedNoteId, categoryId);

		setNotes(prev =>
			prev.map(note => (note.id === updated.id ? updated : note)),
		);
	};

	const handleToggleArchive = async (archived: boolean) => {
		if (!selectedNoteId) return;

		try {
			const updated = await toggleArchive(selectedNoteId, archived);

			setNotes(prev => prev.filter(note => note.id !== updated.id));
			setSelectedNoteId(null);
			setMobileView("list");
		} catch (error) {
			console.error("Failed to toggle archive: ", error);
		}
	};

	return {
		notes: visibleNotes,
		selectedNote,
		selectedNoteId,
		handleSelectNoteId,
		view,
		setView,
		mobileView,
		setMobileView,
		isLoading,
		handleCreateNote,
		handleUpdateNote,
		handleDeleteNote,
		handleToggleArchive,
		handleAddCategory,
		handleRemoveCategory,
	};
}
