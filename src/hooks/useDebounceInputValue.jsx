import { useState, useEffect } from "react";

const useDebounceInputValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

export default useDebounceInputValue;
