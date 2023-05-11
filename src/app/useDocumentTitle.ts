import { useRef, useEffect } from "react";

export function useDocumentTitle(title: string, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = process.env.REACT_APP_TITLE + " - " + title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
}

export default useDocumentTitle;
