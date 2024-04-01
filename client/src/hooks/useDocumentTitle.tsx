import { useEffect, useRef } from 'react';

const useDocumentTitle = (title: string, prevailOnMount = false) => {
	const defaultTitle = useRef(document.title);

	useEffect(() => {
		document.title = `${title} | WebSocket Practice`;
	}, [title]);

	useEffect(() => {
		if (!prevailOnMount) {
			document.title = defaultTitle.current;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useDocumentTitle;
