import { useCallback, useEffect, useRef, useState } from 'react';
import type { Skatefield } from '../types/SkatefieldTypes';
import { isSkatefield, toSkatefield } from '../utils/RawToSkatefield';

export function useSkatefield() {
  const [skatefields, setSkatefields] = useState<Skatefield[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchMaintenance = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const url = `https://oulu.fluentprogress.fi/outdoors/api/public/venue/list`

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) {
        throw new Error(`Network response error: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      
      /*
        Suodatetaan palautuksesta luistelukentät, data sisältää myös ladut ja 
        mapataan Skatefield typeen.
      */
      const fields = data.features
        .filter(isSkatefield)
        .map(toSkatefield);
      
      setSkatefields(fields);
      
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      
      setError(err);
      console.error(`Failed to fetch data: `, { url, error: err });
    }
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaintenance();
  }, [fetchMaintenance]);

  // Siivous hookin poistuessa käytöstä
  useEffect(() => {
    return () => { controllerRef.current?.abort(); };
  }, []);

  return { skatefields, loading, error } as const;
}