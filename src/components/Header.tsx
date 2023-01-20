import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { useSession } from '~/data/hooks/session';
import UserProfile from './UserProfile';

type HeaderProps = {
  setSidebarOpen: (sidebarOpen: boolean) => void;
};

export default function Header(props: HeaderProps) {
  const { setSidebarOpen } = props;
  // const [notifications, setNotifications] = useState(false);
  const { session } = useSession();

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-violet-400">
      <button
        type="button"
        className="without-ring px-4 text-white md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1" />
        <div className="ml-4 flex items-center md:ml-6">
          {/* TODO: Add back notifications when we support them */}
          {/* <button
            type="button"
            className="without-ring relative rounded-full p-1 text-white"
          > */}
          {/* TODO: Add a pulse animation to this button when there are new notifications */}
          {/* {notifications && (
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-300"></span>
              </span>
            )}
            <span className="sr-only">View notifications</span>
            <BellIcon
              className="h-8 w-6 hover:fill-violet-300"
              aria-hidden="true"
            /> */}
          {/* </button> */}

          {/* Profile dropdown */}
          {session && session.self && (
            <UserProfile
              name={session.self.metadata['io.flipt.auth.oidc.name']}
              imgURL={session.self.metadata['io.flipt.auth.oidc.picture']}
            />
          )}
        </div>
      </div>
    </div>
  );
}
