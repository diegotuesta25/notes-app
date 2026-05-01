export type Category = {
	id: number;
	name: string;
};

export type Note = {
	id: number;
	title: string;
	content: string;
	archived: boolean;
	categories: Category[];
	createdAt: string;
	updatedAt: string;
};

export type View = "active" | "archived";
