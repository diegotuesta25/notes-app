import { useEffect, useState } from "react";

export default function useDebounce<T>(inputValue: T, delay: number) {
	const [debouncedInput, setDebouncedInput] = useState(inputValue);
	useEffect(() => {
		const timer = setTimeout(() => setDebouncedInput(inputValue), delay);

		return () => clearTimeout(timer);
	}, [inputValue, delay]);

	return debouncedInput;
}
