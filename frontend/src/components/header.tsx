import {
	ArchiveIcon,
	ChevronLeft,
	EllipsisIcon,
	ListIcon,
	SquarePenIcon,
	Trash2Icon,
} from "lucide-react";
import type { Note, View } from "../libs/definitions";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
	note: Note | null;
	view: View;
	onSetView: (view: View) => void;
	onCreateNote: () => void;
	onDeleteNote: () => void;
	onToggleArchive: (archived: boolean) => void;
	showBack: boolean;
	onBack: () => void;
};

export default function Header({
	note,
	view,
	onSetView,
	onCreateNote,
	onToggleArchive,
	onDeleteNote,
	showBack,
	onBack,
}: HeaderProps) {
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const selectorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectorRef.current &&
				!selectorRef.current.contains(event.target as Node)
			) {
				setIsConfigOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className=" h-12 bg-darkgray border-b border-black flex items-center px-2 gap-2">
			<div className="flex gap-2 justify-between w-full md:w-62 md:border-r md:border-gray-600">
				{showBack && (
					<button
						type="button"
						aria-label="Go back to list of notes"
						onClick={onBack}
						className="md:hidden py-1 px-2 rounded-md hover:bg-gray-300/25 transition"
					>
						<ChevronLeft size={24} />
					</button>
				)}

				<div
					className={`flex gap-2 items-center ${showBack ? "hidden md:flex" : "flex"}`}
				>
					<button
						type="button"
						aria-label="List of active notes"
						onClick={() => onSetView("active")}
						className={`py-1 px-2 rounded-md hover:bg-gray-300/25 transition ${view === "active" ? "bg-gray-500/30" : ""}`}
					>
						<ListIcon size={24} />
					</button>
					<button
						type="button"
						aria-label="List of archived notes"
						onClick={() => onSetView("archived")}
						className={`py-1 px-2 rounded-md hover:bg-gray-300/25 transition ${view === "archived" ? "bg-gray-500/30" : ""}`}
					>
						<ArchiveIcon size={24} />
					</button>
				</div>
				{note && (
					<button
						type="button"
						aria-label="Delete note"
						onClick={onDeleteNote}
						className="hidden md:flex py-1 px-2 rounded-md hover:bg-gray-300/25 transition"
					>
						<Trash2Icon size={24} />
					</button>
				)}
			</div>

			{view === "active" && (
				<button
					type="button"
					aria-label="New note"
					onClick={onCreateNote}
					className={`${showBack ? "hidden" : "flex"} md:flex py-1 px-2 rounded-md hover:bg-gray-300/25 transition`}
				>
					<SquarePenIcon size={24} />
				</button>
			)}
			{showBack && (
				<div className="relative md:hidden">
					<button
						type="button"
						onClick={() => setIsConfigOpen(prev => !prev)}
						className="py-1 px-2 rounded-md hover:bg-gray-300/25 transition"
					>
						<EllipsisIcon size={24} />
					</button>

					{isConfigOpen && note && (
						<div
							ref={selectorRef}
							className="absolute right-0 top-6 bg-darkgray rounded-md z-50 min-w-32"
						>
							<button
								type="button"
								onClick={() => {
									onToggleArchive(!note.archived);
									setIsConfigOpen(false);
								}}
								className="flex gap-2 items-center w-full px-4 py-2 text-sm hover:bg-gray-600 rounded-md"
							>
								<ArchiveIcon size={14} />
								<span>{note.archived ? "Unarchive" : "Archive"}</span>
							</button>
							<button
								type="button"
								onClick={() => {
									onDeleteNote();
									setIsConfigOpen(false);
								}}
								className="flex gap-2 items-center w-full px-4 py-2 text-sm hover:bg-gray-600 rounded-md text-red-400"
							>
								<Trash2Icon size={14} />
								<span>Delete</span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
