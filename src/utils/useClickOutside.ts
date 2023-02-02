import React, { useCallback, useEffect } from 'react';

/**
 * @description Runs callback on click outside provided ref
 */
export const useClickOutside = (
	ref: React.RefObject<HTMLElement>,
	callback: () => void,
	skip?: boolean
) => {
	const watchClickOutside = useCallback(
		(event: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(event.target as Node)) callback();
		},
		[ref.current, callback]
	);

	useEffect(() => {
		if (skip) return;
		document.addEventListener('mouseup', watchClickOutside);
		return () => {
			document.removeEventListener('mouseup', watchClickOutside);
		};
	}, [watchClickOutside, skip]);
};
