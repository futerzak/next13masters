/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends (...args: any) => any>(func: F, waitFor: number) => {
	let timeout: NodeJS.Timeout | undefined = undefined;

	const debounced = (...args: any) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), waitFor);
	};

	return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
