import type { Category } from "../libs/definitions";

type CategoryFilterTagProps = {
	category?: Category;
	isAll?: boolean;
	isSelected: boolean;
	onSelectCategoryId: (id: number | null) => void;
};

export default function CategoryFilterTag({
	category,
	isAll = false,
	isSelected,
	onSelectCategoryId,
}: CategoryFilterTagProps) {
	return (
		<button
			type="button"
			onClick={() => onSelectCategoryId(category ? category.id : null)}
			aria-label={isAll ? "Filter all notes" : `Filter by ${category.name}`}
			className={`flex gap-1 cursor-pointer px-2.5 py-1 text-sm items-center border  font-medium border-gray-600 rounded-2xl ${isSelected ? "bg-purple-600 text-white" : "bg-darkgray text-gray-400 "}`}
		>
			{isAll ? <span>All</span> : <span>{category.name}</span>}
		</button>
	);
}
