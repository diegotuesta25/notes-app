import { PlusIcon } from "lucide-react";

type AddCategoryProps = {
	onOpenSelector: () => void;
};

export default function AddCategory({ onOpenSelector }: AddCategoryProps) {
	return (
		<button
			type="button"
			onClick={onOpenSelector}
			aria-label="Add a category"
			className="flex gap-1 px-2 py-1 text-sm items-center border border-dashed text-purple-600 font-medium border-purple-600 rounded-2xl"
		>
			<PlusIcon size={12} />
			<p className="leading-none">add</p>{" "}
		</button>
	);
}
