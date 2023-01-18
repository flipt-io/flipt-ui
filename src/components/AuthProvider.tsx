import { createContext, useMemo, useState } from 'react';
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
  // const [authRequired, setAuthRequired] = useState(false);

  // const checkAuth = async () => {
  //   try {
  //     // TODO: store this in context
  //     await getInfo();
  //     setAuthRequired(false);
  //   } catch (err) {
  //     // if (err instanceof APIError) {
  //     //   // if we get a 401, we need to login
  //     //   if (err.status === 401) {
  //     //     setAuthRequired(true);
  //     //   }
  //     // }
  //     setAuthRequired(true);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

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
