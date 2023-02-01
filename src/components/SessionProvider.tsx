import { createContext, useEffect, useMemo } from 'react';
import { getAuthSelf, getInfo } from '~/data/api';
import { useStorage } from '~/data/hooks/storage';
import { AuthMethodOIDCSelf } from '~/types/Auth';

type Session = {
  required: boolean;
  authenticated: boolean;
  self?: AuthMethodOIDCSelf;
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
  const [session, setSession, clearSession] = useStorage('flipt_session', null);

  useEffect(() => {
    const loadSession = async () => {
      let session = {
        required: true
      } as Session;

      try {
        await getInfo();
      } catch (err) {
        // if we can't get the info, we're not logged in
        // or there was an error, either way, clear the session so we redirect
        // to the login page
        clearSession();
        return;
      }

      try {
        const self = await getAuthSelf();
        session = {
          authenticated: true,
          required: true,
          self: self
        };
      } catch (err) {
        // if we can't get the self info and we got here then auth is likely not enabled
        // so we can just return
        session = {
          authenticated: false,
          required: false
        };
      } finally {
        if (session) {
          setSession(session);
        }
      }
    };
    if (!session) loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
