import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '~/data/hooks/localstorage';

export const AuthContext = createContext({
  session: null,
  login: (_data: any) => {},
  logout: () => {}
});

export const AuthProvider = (children: any, sessionData: any) => {
  const [session, setSession] = useLocalStorage('session', sessionData);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setSession(data);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setSession(null);
    navigate('/logout', { replace: true });
  };

  const value = useMemo(
    () => ({
      session,
      login,
      logout
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
