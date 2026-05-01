import { useEffect, useState } from "react";
import type { Category } from "../libs/definitions";
import { XIcon } from "lucide-react";

type CategorySelectorProps = {
	categories: Category[];
	onAddCategory: (name: string) => void;
	onDeleteCategory: (id: number) => void;
};

export default function CategorySelector({
	categories,
	onAddCategory,
	onDeleteCategory,
}: CategorySelectorProps) {
	const [category, setCategory] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		if (categories.some(cat => cat.name === category) || category === "")
			setIsCreating(false);
		else setIsCreating(true);
	}, [category, categories]);

	return (
		<div className="w-56 rounded-lg absolute bg-darkgray right-9 top-15 md:right-auto md:top-auto ">
			<div className="border-b border-gray-500 flex items-start">
				<input
					type="text"
					value={category}
					onChange={e => setCategory(e.target.value)}
					className="outline-none py-2 px-3 text-sm w-full"
					onKeyDown={e => {
						if (e.key === "Enter" && category !== "") {
							onAddCategory(category);
							setCategory("");
						}
					}}
					placeholder="Search for an option..."
				/>
			</div>
			<div className="flex flex-col py-2 items-start">
				<p className="text-xs font-semibold px-3 py-1">
					Select an option or create one
				</p>
				{categories.map(cat => (
					<div key={cat.id} className="w-full relative hover:bg-gray-500/25">
						<button
							type="button"
							key={cat.id}
							onClick={() => onAddCategory(cat.name)}
							className=" px-3 py-0.5 transition truncate text-sm w-full text-start cursor-pointer"
						>
							{cat.name}
						</button>
						<button
							type="button"
							aria-label="Remove category from the note"
							onClick={() => onDeleteCategory(cat.id)}
							className="absolute right-3 top-1.5 cursor-pointer"
						>
							<XIcon size={12} />
						</button>
					</div>
				))}
			</div>
			{isCreating && (
				<div className="flex px-3 text-sm pb-2 gap-2 items-center">
					<p className="text-gray-50 font-medium">Create</p>
					<button
						type="button"
						onClick={() => onAddCategory(category)}
						className={`${category !== "" ? "hover:bg-gray-500/25 cursor-pointer" : ""} font-semibold  px-3 py-0.5 transition truncate text-sm w-full text-start`}
					>
						{category}
					</button>
				</div>
			)}
		</div>
	);
}
