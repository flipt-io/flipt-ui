import { createContext, useEffect, useMemo } from 'react';
import { getInfo } from '~/data/api';
import { useStorage } from '~/data/hooks/storage';
import { AuthMethodOIDCSession } from '~/types/Auth';

interface SessionContextType {
  session?: AuthMethodOIDCSession;
  setSession: (data: any) => void;
}

export const SessionContext = createContext({} as SessionContextType);

export default function SessionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useStorage('session', null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const info = await getInfo();
        setSession({
          info: info
        });
      } catch (err) {
        // if we can't get the info, we're not logged in
        // or there was an error, either way, clear the session so we redirect
        // to the login page
        setSession(null);
      }
    };
    checkAuth();
  }, []);

  const value = useMemo(
    () => ({
      session,
      setSession
    }),
    [session, setSession]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
