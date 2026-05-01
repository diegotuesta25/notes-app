import type { Category, Note } from "../libs/definitions";
import CategoryFilters from "./category-filters";
import NoteCard from "./note-card";

type NoteSidenavProps = {
	notes: Note[];
	onSelectNoteId: (id: number) => void;
	onToggleArchive: (archived: boolean) => void;
	onSelectCategoryId: (id: number | null) => void;
	selectedCategoryId: number | null;
	selectedNote: Note | null;
	categories: Category[];
};

export default function NoteSidenav({
	notes,
	onSelectNoteId,
	onToggleArchive,
	onSelectCategoryId,
	selectedCategoryId,
	selectedNote,
	categories,
}: NoteSidenavProps) {
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<CategoryFilters
				categories={categories}
				onSelectCategoryId={onSelectCategoryId}
				selectedCategoryId={selectedCategoryId}
			/>

			<div className="flex-1 overflow-y-auto ">
				{notes.map(note => (
					<NoteCard
						key={note.id}
						note={note}
						onSelectNoteId={onSelectNoteId}
						onToggleArchive={onToggleArchive}
						isSelected={selectedNote?.id === note.id}
					/>
				))}
			</div>
		</div>
	);
}
