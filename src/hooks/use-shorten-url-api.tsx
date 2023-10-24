import { useCallback, useEffect, useReducer } from 'react';
import { ActionTypes, urlReducer } from '../reducer/url-reducer';
import { VITE_API } from '../constants';

interface useShortenUrlApiProps {
  url: string;
}

export const useShortenUrlApi = ({ url }: useShortenUrlApiProps) => {
  const [{ shortUrl, message, loading }, dispatch] = useReducer(urlReducer, {
    loading: false,
    url: '',
    shortUrl: '',
    message: '',
  });
  const handleClick = useCallback(async () => {
    dispatch({ type: ActionTypes.apiCall });
    try {
      if (!url) {
        dispatch({
          type: ActionTypes.setMessage,
          payload: { message: 'Please set a URL' },
        });
        return;
      }

      const res = await fetch(`${VITE_API}/url-shortener`, {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const { message } = await res.json();
        dispatch({
          type: ActionTypes.setMessage,
          payload: { message: message },
        });
        return;
      }
      const { shortUrl } = await res.json();
      if (!shortUrl) {
        dispatch({
          type: ActionTypes.setMessage,
          payload: { message: 'something went wrong.' },
        });
        return;
      }
      dispatch({ type: ActionTypes.setShortenUrl, payload: { shortUrl } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionTypes.setMessage,
          payload: { message: JSON.stringify(error.message) },
        });
        return;
      }
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: 'Something went wrong' },
      });
    }
  }, [url]);

  useEffect(() => {
    dispatch({ type: ActionTypes.setUrl, payload: { url } });
  }, [url]);
  return { shortUrl, message, loading, handleClick };
};
