import { useEffect, useState } from 'react';
import { getInfo } from '~/data/api';
import { Info } from '~/types/Meta';

export default function Footer() {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    getInfo()
      .then((info: Info) => {
        setInfo(info);
      })
      .catch(() => {
        // nothing to do, component will degrade gracefully
      });
  }, []);

  const ref = () => {
    if (info?.isRelease && info?.version) {
      return `v${info.version}`;
    }
    if (info?.commit) {
      return info.commit.substring(0, 7);
    }
    return '';
  };

  const refURL = () => {
    if (info?.isRelease && info?.version) {
      return `https://github.com/flipt-io/flipt/releases/tag/${info.version}`;
    }
    if (info?.commit) {
      return `https://github.com/flipt-io/flipt/commit/${info?.commit}`;
    }
    return 'https://github.com/flipt-io/flipt';
  };

  const social = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/flipt_io',
      // Disabling eslint due to props / attributes being potentially a large number of things
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/flipt-io/flipt',
      // Disabling eslint due to props / attributes being potentially a large number of things
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'Discord',
      href: 'https://www.flipt.io/discord',
      // Disabling eslint due to props / attributes being potentially a large number of things
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M9.555 9.23c-.74 0-1.324.624-1.324 1.385S8.827 12 9.555 12c.739 0 1.323-.624 1.323-1.385.013-.761-.584-1.385-1.323-1.385Zm4.737 0c-.74 0-1.324.624-1.324 1.385S13.564 12 14.292 12c.74 0 1.324-.624 1.324-1.385s-.584-1.385-1.324-1.385Z" />
          <path d="M20.404 0H3.442c-.342 0-.68.065-.995.19a2.614 2.614 0 0 0-.843.536 2.46 2.46 0 0 0-.562.801c-.13.3-.197.62-.196.944v16.225c0 .324.066.645.196.944.13.3.321.572.562.801.241.23.527.412.843.537.315.124.653.189.995.19h14.354l-.67-2.22 1.62 1.428 1.532 1.344L23 24V2.472c0-.324-.066-.644-.196-.944a2.46 2.46 0 0 0-.562-.8A2.614 2.614 0 0 0 21.4.19a2.726 2.726 0 0 0-.995-.19V0Zm-4.886 15.672s-.456-.516-.836-.972c1.659-.444 2.292-1.428 2.292-1.428a7.38 7.38 0 0 1-1.456.707 8.67 8.67 0 0 1-1.836.517 9.347 9.347 0 0 1-3.279-.012 11.074 11.074 0 0 1-1.86-.516 7.621 7.621 0 0 1-.924-.409c-.039-.023-.076-.035-.113-.06-.027-.011-.04-.023-.052-.035-.228-.12-.354-.204-.354-.204s.608.96 2.215 1.416c-.38.456-.848.996-.848.996-2.797-.084-3.86-1.824-3.86-1.824 0-3.864 1.822-6.996 1.822-6.996 1.823-1.296 3.557-1.26 3.557-1.26l.127.145c-2.278.623-3.33 1.57-3.33 1.57s.279-.143.747-.347c1.355-.564 2.43-.72 2.873-.756.077-.012.14-.024.216-.024a10.804 10.804 0 0 1 6.368 1.129s-1.001-.9-3.153-1.526l.178-.19s1.735-.037 3.557 1.259c0 0 1.823 3.133 1.823 6.996 0 0-1.076 1.74-3.874 1.824Z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="body-font sticky top-[100vh] text-gray-700">
      <div className="container mx-auto flex max-w-7xl flex-col items-center px-8 py-4 sm:flex-row">
        <p className="mt-4 text-xs text-gray-500 sm:mt-0">
          <span className="hidden sm:inline">
            {ref() && (
              <>
                <a href={refURL()} className="text-violet-500">
                  {ref()}
                </a>
                &nbsp;|&nbsp;
              </>
            )}
          </span>
          <span className="block sm:inline">
            &copy; {new Date().getFullYear()} Flipt Software Inc. All rights
            reserved.
          </span>
        </p>
        <span className="mt-4 inline-flex justify-center space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
