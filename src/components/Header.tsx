import { Menu, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { classNames } from '../utils/helpers';

type HeaderProps = {
  setSidebarOpen: (sidebarOpen: boolean) => void;
};

const userNavigation = [{ name: 'Sign Out', href: '#' }];

export default function Header(props: HeaderProps) {
  const { setSidebarOpen } = props;
  // const [notifications, setNotifications] = useState(false);

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

          <Menu as="div" className="relative ml-3">
            {/* This is where the user profile will go */}
            {/* RIP Tim Apple */}
            {/* <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div> */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
