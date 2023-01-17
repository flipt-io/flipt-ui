import { faOpenid } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import logoFlag from '~/assets/logo-flag.png';
import { listAuthMethods } from '~/data/api';
import { useError } from '~/data/hooks/error';
import { AuthMethod, AuthMethodOIDC } from '~/types/Auth';

export async function loginLoader(): Promise<AuthMethodOIDC> {
  const resp = await listAuthMethods();
  // TODO: support alternative auth methods
  return resp.methods.find(
    (m: AuthMethod) => m.method === 'METHOD_OIDC' && m.enabled
  );
}

export default function Login() {
  const authOIDC = useLoaderData() as AuthMethodOIDC;
  const [providers, setProviders] = useState<
    {
      name: string;
      authorize_url: string;
      callback_url: string;
    }[]
  >([]);

  const { setError, clearError } = useError();

  const authorize = async (uri: string) => {
    const res = await fetch(uri, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok || res.status !== 200) {
      setError(new Error('Unable to authenticate: ' + res.text()));
      return;
    }

    clearError();
    const body = await res.json();
    window.location.href = body.authorizeUrl;
  };

  useEffect(() => {
    const loginProviders = Object.entries(authOIDC.metadata.providers).map(
      ([k, v]) => {
        return {
          name: k,
          authorize_url: v.authorize_url,
          callback_url: v.callback_url
        };
      }
    );
    setProviders(loginProviders);
  }, [authOIDC]);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center sm:px-6 lg:px-8">
        <main className="flex px-6 py-10">
          <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                src={logoFlag}
                alt="logo"
                width={512}
                height={512}
                className="m-auto h-20 w-auto"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login to Flipt
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="py-8 px-4 sm:px-10">
                <div className="mt-6 flex flex-col space-y-5">
                  {providers.map((provider) => (
                    <div key={provider.name}>
                      <a
                        href="#"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:text-violet-500 hover:shadow-violet-200"
                        onClick={(e) => {
                          e.preventDefault();
                          authorize(provider.authorize_url);
                        }}
                      >
                        <span className="sr-only">
                          Sign in with {provider.name}
                        </span>
                        <FontAwesomeIcon
                          icon={faOpenid}
                          className="text-gray h-5 w-5"
                          aria-hidden={true}
                        />
                        <span className="ml-2">With {provider.name}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}