import { useLocation } from "react-router-dom";

import getSearchParams from "./getSearchParams";

const useSearchParams = () => {
  const { search } = useLocation();
  return getSearchParams(search);
};

export default useSearchParams;
