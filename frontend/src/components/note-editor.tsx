import { useState, useEffect } from "react";
import type { Category, Note } from "../libs/definitions";
import Categories from "./categories";
import { updateNote } from "../libs/notes.api";
import useDebounce from "../hooks/useDebounce";
import { SquarePenIcon } from "lucide-react";

type NoteEditorProps = {
	note: Note | null;
	allCategories: Category[];
	onRemoveCategory: (id: number) => void;
	onCreateNote: () => void;
	onDeleteCategory: (id: number) => void;
	onAddCategory: (name: string) => void;
	onUpdateNote: (note: Note) => void;
};

export default function NoteEditor({
	note,
	onRemoveCategory,
	onCreateNote,
	allCategories,
	onAddCategory,
	onUpdateNote,
	onDeleteCategory,
}: NoteEditorProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [showCreatedDate, setShowCreatedDate] = useState(false);

	const debouncedNote = useDebounce({ title, content }, 500);

	useEffect(() => {
		if (note) {
			setTitle(note.title);
			setContent(note.content);
		} else {
			setTitle("");
			setContent("");
		}
	}, [note?.id]);

	useEffect(() => {
		if (!note) return;
		if (
			debouncedNote.content === note.content &&
			debouncedNote.title === note.title
		)
			return;
		const editNote = async () => {
			try {
				const updatedNote = await updateNote(note.id, {
					title: debouncedNote.title,
					content: debouncedNote.content,
				});
				onUpdateNote(updatedNote);
			} catch (error) {
				console.error("Failed to update a note: ", error);
			}
		};

		editNote();
	}, [debouncedNote.title, debouncedNote.content]);

	if (!note) {
		return (
			<div className="h-full flex items-center justify-center">
				<p className="text-gray-500">Select a note to view it</p>
			</div>
		);
	}
	return (
		<div className="py-2 px-4 md:py-4 md:px-8 flex flex-col h-full">
			<button
				type="button"
				onClick={() => setShowCreatedDate(prev => !prev)}
				className="text-gray-400 text-xs mb-2"
			>
				{showCreatedDate ? (
					<p> Created: {new Date(note.createdAt).toLocaleString()}</p>
				) : (
					<p>Edited: {new Date(note.updatedAt).toLocaleString()}</p>
				)}
			</button>
			<Categories
				categories={note.categories}
				allCategories={allCategories}
				onRemoveCategory={onRemoveCategory}
				onAddCategory={onAddCategory}
				onDeleteCategory={onDeleteCategory}
			/>
			<input
				type="text"
				value={title}
				onChange={e => setTitle(e.target.value)}
				className="bg-transparent text-white font-bold text-xl outline-none mb-2 placeholder:text-gray-600"
				placeholder="Title"
			/>

			<textarea
				value={content}
				onChange={e => setContent(e.target.value)}
				className="flex-1 bg-transparent text-gray-300 resize-none outline-none text-base leading-relaxed placeholder:text-gray-600"
				placeholder="Note"
				spellCheck={false}
			/>
			<button
				type="button"
				aria-label="New note"
				onClick={onCreateNote}
				className="flex md:hidden absolute bottom-4 right-4 bg-darkgray border border-gray-100/20 rounded-full py-2 px-2 transition"
			>
				<SquarePenIcon size={24} />
			</button>
		</div>
	);
}
