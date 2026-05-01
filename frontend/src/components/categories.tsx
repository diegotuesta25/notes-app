import { useEffect, useRef, useState } from "react";
import type { Category } from "../libs/definitions";
import AddCategory from "./add-category";
import CategoryTag from "./category-tag";
import CategorySelector from "./category-selector";

type CategoriesProps = {
	categories: Category[];
	allCategories: Category[];
	onRemoveCategory: (id: number) => void;
	onAddCategory: (name: string) => void;
	onDeleteCategory: (id: number) => void;
};

export default function Categories({
	categories,
	allCategories,
	onRemoveCategory,
	onAddCategory,
	onDeleteCategory,
}: CategoriesProps) {
	const [isSelectorOpen, setIsSelectorOpen] = useState(false);
	const selectorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectorRef.current &&
				!selectorRef.current.contains(event.target as Node)
			) {
				setIsSelectorOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const availableCategories = allCategories.filter(
		category => !categories.some(cat => category.id === cat.id),
	);

	const handleAddCategory = (name: string) => {
		onAddCategory(name);
		setIsSelectorOpen(false);
	};

	return (
		<div className="relative border-b border-gray-600 mb-4 flex flex-col gap-2 pb-4">
			<p className="text-gray-500 text-start text-sm">CATEGORIES</p>
			<div className="flex flex-wrap gap-1">
				{categories.map(category => (
					<CategoryTag
						key={category.id}
						category={category}
						onRemoveCategory={onRemoveCategory}
					/>
				))}
				<AddCategory onOpenSelector={() => setIsSelectorOpen(prev => !prev)} />
				<div ref={selectorRef}>
					{isSelectorOpen && (
						<CategorySelector
							onAddCategory={handleAddCategory}
							onDeleteCategory={onDeleteCategory}
							categories={availableCategories}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
