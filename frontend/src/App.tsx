import Header from "./components/header";
import NoteSidenav from "./components/note-sidenav";
import NoteEditor from "./components/note-editor";
import { useCategories } from "./hooks/useCategories";
import { useNotes } from "./hooks/useNotes";
import { useEffect } from "react";

function App() {
	const {
		allCategories,
		handleSetAllCategories,
		selectedCategoryId,
		setSelectedCategoryId,
		handleDeleteCategory,
	} = useCategories();

	const {
		notes,
		selectedNote,
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
	} = useNotes(selectedCategoryId, handleSetAllCategories);

	useEffect(() => {
		setSelectedCategoryId(null);
	}, [view]);

	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Header
				note={selectedNote}
				view={view}
				onSetView={setView}
				onCreateNote={handleCreateNote}
				onToggleArchive={handleToggleArchive}
				onDeleteNote={handleDeleteNote}
				showBack={mobileView === "editor"}
				onBack={() => setMobileView("list")}
			/>
			<div className="flex flex-1 overflow-hidden">
				<div
					className={`border-r border-gray-700 flex flex-col overflow-hidden w-full md:w-64 ${mobileView === "editor" ? "hidden md:flex" : "flex"}`}
				>
					{isLoading ? (
						<p className="px-5">Loading...</p>
					) : (
						<NoteSidenav
							notes={notes}
							onSelectNoteId={handleSelectNoteId}
							onSelectCategoryId={setSelectedCategoryId}
							onToggleArchive={handleToggleArchive}
							selectedCategoryId={selectedCategoryId}
							selectedNote={selectedNote}
							categories={allCategories}
						/>
					)}
				</div>

				<div
					className={`flex-1 overflow-y-auto ${mobileView === "list" ? "hidden md:block" : "block"}`}
				>
					<NoteEditor
						note={selectedNote}
						onDeleteCategory={handleDeleteCategory}
						onCreateNote={handleCreateNote}
						onAddCategory={handleAddCategory}
						allCategories={allCategories}
						onRemoveCategory={handleRemoveCategory}
						onUpdateNote={handleUpdateNote}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
