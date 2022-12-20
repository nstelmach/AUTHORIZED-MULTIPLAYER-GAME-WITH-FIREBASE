import { useRef, useEffect } from "react";

const useOutsideClick = <Element extends HTMLElement>(callback) => {
  const ref = useRef<Element>(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;
