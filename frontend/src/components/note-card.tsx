import { ArchiveIcon, ChevronDown } from "lucide-react";
import type { Note } from "../libs/definitions";
import { useEffect, useRef, useState } from "react";

type NoteCardProps = {
	note: Note;
	onSelectNoteId: (id: number) => void;
	onToggleArchive: (archived: boolean) => void;
	isSelected: boolean;
};

export default function NoteCard({
	note,
	onSelectNoteId,
	onToggleArchive,
	isSelected,
}: NoteCardProps) {
	const [isOpened, setIsOpened] = useState(false);
	const selectorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectorRef.current &&
				!selectorRef.current.contains(event.target as Node)
			) {
				setIsOpened(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative group" ref={selectorRef}>
			<button
				type="button"
				aria-label="Open config to archive a note"
				onClick={() => {
					onSelectNoteId(note.id);
					setIsOpened(prev => !prev);
				}}
				className="absolute opacity-0 group-hover:opacity-100 right-4 top-4 bg-gray-700 rounded-md p-0.5 cursor-pointer"
			>
				<ChevronDown size={12} />
			</button>
			{isOpened && (
				<button
					type="button"
					aria-label="Archive a note"
					onClick={() => onToggleArchive(!note.archived)}
					className="flex gap-1 cursor-pointer bg-gray-700 items-center absolute top-8 right-4 px-2 py-1 rounded-md hover:bg-darkgray/80"
				>
					<ArchiveIcon size={12} />

					<span className="text-xs">
						{note.archived ? "Unarchive" : "Archive"}
					</span>
				</button>
			)}

			<button
				type="button"
				onClick={() => onSelectNoteId(note.id)}
				className={`flex flex-col w-full py-3 px-4 border-b border-gray-700 rounded-xl items-start cursor-pointer ${isSelected ? "md:bg-purple-500/30" : ""}`}
			>
				<p className="font-bold text-white text-sm">
					{note.title || (
						<span className="text-gray-500/80 italic">New note</span>
					)}
				</p>
				<div className="flex items-center gap-2 w-full overflow-hidden">
					<p className="text-gray-100 text-xs">
						{new Date(note.createdAt).toLocaleDateString()}
					</p>
					<p className="text-gray-400 text-xs truncate">
						{note.content || <span className="italic">No content</span>}
					</p>
				</div>
			</button>
		</div>
	);
}
