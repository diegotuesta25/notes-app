import type { Category } from "../libs/definitions";
import CategoryFilterTag from "./category-filter-tag";

type CategoryFiltersProps = {
	categories: Category[];
	onSelectCategoryId: (id: number | null) => void;
	selectedCategoryId: number | null;
};

export default function CategoryFilters({
	categories,
	onSelectCategoryId,
	selectedCategoryId,
}: CategoryFiltersProps) {
	return (
		<div className="flex h-16 gap-2 px-2 py-3 border border-darkgray overflow-x-auto overflow-y-hidden items-center shrink-0">
			<CategoryFilterTag
				isAll
				isSelected={selectedCategoryId === null}
				onSelectCategoryId={onSelectCategoryId}
			/>
			{categories.map(category => (
				<CategoryFilterTag
					key={category.id}
					category={category}
					isSelected={category.id === selectedCategoryId}
					onSelectCategoryId={onSelectCategoryId}
				/>
			))}
		</div>
	);
}
