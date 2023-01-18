import { createContext, useEffect, useMemo, useState } from 'react';
import { getInfo } from '~/data/api';
import { AuthMethodOIDCSession } from '~/types/Auth';

interface AuthContextType {
  // authRequired: boolean;
  session?: AuthMethodOIDCSession;
  setSession: (data: any) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<AuthMethodOIDCSession | undefined>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: store this in context
        const userData = await getInfo();
        setSession(userData);
      } catch (err) {}
    };
    checkAuth();
  }, [session, setSession]);

  const value = useMemo(
    () => ({
      // authRequired,
      session,
      setSession
    }),
    [session, setSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
