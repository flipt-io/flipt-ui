import { createContext, useEffect, useMemo } from 'react';
import { getAuthSelf, getInfo } from '~/data/api';
import { useStorage } from '~/data/hooks/storage';
import { AuthMethodOIDCSelf } from '~/types/Auth';
import { Info } from '~/types/Meta';

type Session = {
  info: Info;
  self: AuthMethodOIDCSelf;
};

interface SessionContextType {
  session?: Session;
  setSession: (data: any) => void;
}

export const SessionContext = createContext({} as SessionContextType);

export default function SessionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useStorage('flipt', null);

  useEffect(() => {
    const loadSession = async () => {
      let data = null;

      try {
        const info = await getInfo();
        data = {
          info: info
        };
      } catch (err) {
        // if we can't get the info, we're not logged in
        // or there was an error, either way, clear the session so we redirect
        // to the login page
        setSession(null);
        return;
      }

      try {
        const self = await getAuthSelf();
        data = {
          ...data,
          self: self
        };
      } catch (err) {
        // if we can't get the self info and we got here then auth is likely not enabled
        // so we can just return
        return;
      } finally {
        setSession(data);
      }
    };
    loadSession();
  }, [setSession]);

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
