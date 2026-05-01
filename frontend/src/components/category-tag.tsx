import { XIcon } from "lucide-react";
import type { Category } from "../libs/definitions";

type CategoryTagProps = {
	category: Category;
	onRemoveCategory: (id: number) => void;
};

export default function CategoryTag({
	category,
	onRemoveCategory,
}: CategoryTagProps) {
	return (
		<div className="flex gap-1 px-2 py-1 text-sm items-center bg-darkgray border text-gray-400 font-medium border-gray-600 rounded-2xl">
			<p className="leading-none">{category.name}</p>
			<button
				type="button"
				aria-label="Remove category from the note"
				onClick={() => onRemoveCategory(category.id)}
			>
				<XIcon size={12} />
			</button>
		</div>
	);
}
