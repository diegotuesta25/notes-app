import { useEffect, useState } from "react";
import type { Category } from "../libs/definitions";
import { getCategories, deleteCategory } from "../libs/notes.api";

export function useCategories() {
	const [allCategories, setAllCategories] = useState<Category[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null,
	);

	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await getCategories();
				setAllCategories(data);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};

		fetch();
	}, []);

	const handleDeleteCategory = async (id: number) => {
		try {
			await deleteCategory(id);
			setAllCategories(prev => prev.filter(cat => cat.id !== id));
		} catch (error) {
			console.error("Failed to delete category:", error);
		}
	};

	const handleSetAllCategories = (category: Category) => {
		setAllCategories(prev =>
			prev.some(cat => cat.id === category.id) ? prev : [...prev, category],
		);
	};

	return {
		allCategories,
		setAllCategories,
		handleSetAllCategories,
		selectedCategoryId,
		setSelectedCategoryId,
		handleDeleteCategory,
	};
}
