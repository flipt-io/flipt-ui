import {
  BookOpenIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  FlagIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { classNames } from '../utils/helpers';

type Icon = (props: React.SVGProps<SVGSVGElement>) => any;

type NavItemProps = {
  to: string;
  name: string;
  Icon: Icon;
  external?: boolean;
  onClick?: () => void;
};

function NavItem(props: NavItemProps) {
  const { to, name, Icon, external, onClick } = props;

  return external ? (
    <a
      key={name}
      href={to}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-violet-400 md:text-gray-600 md:hover:bg-gray-50"
    >
      <Icon
        className="text-wite mr-3 h-6 w-6 flex-shrink-0 hover:bg-gray-50 md:text-gray-500"
        aria-hidden="true"
      />
      {name}
    </a>
  ) : (
    <NavLink
      key={name}
      to={to}
      className={({ isActive }) =>
        classNames(
          isActive
            ? 'bg-violet-100 text-gray-600 md:bg-gray-50'
            : 'text-white hover:bg-violet-400 md:text-gray-600 md:hover:bg-gray-50',
          'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
        )
      }
      onClick={onClick}
    >
      <Icon
        className="text-wite mr-3 h-6 w-6 flex-shrink-0 hover:bg-gray-50 md:text-gray-500"
        aria-hidden="true"
      />
      {name}
    </NavLink>
  );
}

type NavProps = {
  className?: string;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
};

export default function Nav(props: NavProps) {
  const { className, sidebarOpen, setSidebarOpen } = props;

  const navigation = [
    {
      name: 'Flags',
      to: '/',
      Icon: FlagIcon
    },
    {
      name: 'Segments',
      to: 'segments',
      Icon: UsersIcon
    },
    {
      name: 'Console',
      to: 'console',
      Icon: CodeBracketIcon
    }
  ];

  const secondaryNavigation = [
    {
      name: 'Settings',
      to: 'settings',
      Icon: Cog6ToothIcon
    },
    {
      name: 'Documentation',
      to: 'https://flipt.io/docs?utm_source=app',
      Icon: BookOpenIcon,
      external: true
    }
  ];

  return (
    <nav
      className={`${className} flex flex-grow flex-col overflow-y-auto`}
      aria-label="Sidebar"
    >
      <div className="flex flex-grow flex-col space-y-1 px-2">
        {navigation.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            onClick={() => {
              if (sidebarOpen && setSidebarOpen) {
                setSidebarOpen(false);
              }
            }}
          />
        ))}
      </div>
      <div className="flex-shrink-0 space-y-1 px-2">
        {secondaryNavigation.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            onClick={() => {
              if (sidebarOpen && setSidebarOpen) {
                setSidebarOpen(false);
              }
            }}
          />
        ))}
      </div>
    </nav>
  );
}
