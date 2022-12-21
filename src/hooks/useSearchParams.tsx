import { useLocation } from "react-router-dom";
import getSearchParams from "../utils/getSearchParams";

const useSearchParams = () => {
  const { search } = useLocation();
  return getSearchParams(search);
};

export default useSearchParams;
