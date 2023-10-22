import { useCallback, useEffect, useReducer } from "react";
import { ActionTypes, urlReducer } from "../reducer/url-reducer";

interface useShortenUrlApiProps {
  url: string;
}

export const useShortenUrlApi = ({ url }: useShortenUrlApiProps) => {
  const [{ shortUrl, message, loading }, dispatch] = useReducer(urlReducer, {
    loading: false,
    url: "",
    shortUrl: "",
    message: "",
  });
  const handleClick = useCallback(async () => {
    dispatch({ type: ActionTypes.apiCall });
    if (!url) {
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: "Please set a URL" },
      });
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API}/url-shortener`, {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const { message } = await res.json();
      console.log();
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: message },
      });
      return;
    }
    const { shortUrl } = (await res.json()) || {};
    if (!shortUrl) {
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: "something went wrong." },
      });
      return;
    }
    dispatch({ type: ActionTypes.setShortenUrl, payload: { shortUrl } });
  }, [url]);

  useEffect(() => {
    dispatch({ type: ActionTypes.setUrl, payload: { url } });
  }, [url]);
  return { shortUrl, message, loading, handleClick };
};
