import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  FlagIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../utils/helpers";

type NavProps = {
  className?: string;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
};

export default function Nav(props: NavProps) {
  const { className, sidebarOpen, setSidebarOpen } = props;
  //   const router = useRouter();

  const navigation = [
    {
      name: "Flags",
      href: "/",
      Icon: FlagIcon,
      //   current: router.pathname === "/" || router.pathname.startsWith("/flags"),
      external: false,
    },
    {
      name: "Segments",
      href: "/segments  ",
      Icon: UsersIcon,
      //   current: router.pathname.startsWith("/segments"),
      external: false,
    },
    {
      name: "Console",
      href: "/console",
      Icon: CodeBracketIcon,
      //   current: router.pathname.startsWith("/console"),
      external: false,
    },
  ];

  const secondaryNavigation = [
    // {
    //   name: "Settings",
    //   href: "#",
    //   Icon: Cog6ToothIcon,
    //   current: router.pathname.startsWith("/settings"),
    // },
    {
      name: "Documentation",
      href: "https://flipt.io/docs?utm_source=app",
      Icon: QuestionMarkCircleIcon,
      external: true,
    },
  ];

  return (
    <>
      <nav
        className={`${className} divide-y divide-gray-300`}
        aria-label="Sidebar"
      >
        <div className="space-y-1 px-2">
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
        <div className="mt-4 space-y-1 px-2 pt-4">
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
    </>
  );
}

type Icon = (props: React.ComponentProps<"svg">) => JSX.Element;

type NavItemProps = {
  href: string;
  name: string;
  Icon: Icon;
  current?: boolean;
  external?: boolean;
  onClick?: () => void;
};

function NavItem(props: NavItemProps) {
  const { href, name, Icon, current, external, onClick } = props;

  return external ? (
    <a
      key={name}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classNames(
        current
          ? "bg-violet-100 text-gray-600 md:bg-gray-50"
          : "text-white hover:bg-violet-400 md:text-gray-600 md:hover:bg-gray-50",
        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
      )}
    >
      <Icon
        className={classNames(
          current
            ? "bg-violet-100 text-gray-500 md:bg-gray-50"
            : "text-wite hover:bg-gray-50 md:text-gray-500",
          "mr-3 h-6 w-6 flex-shrink-0"
        )}
        aria-hidden="true"
      />
      {name}
      <ArrowTopRightOnSquareIcon
        className={classNames(
          current
            ? "bg-violet-100 text-gray-500 md:bg-gray-50"
            : "text-wite hover:bg-gray-50 md:text-gray-400",
          "ml-2 h-4 w-4"
        )}
        aria-hidden="true"
      />
    </a>
  ) : (
    <></>
    // <Link
    //   key={name}
    //   href={href}
    //   className={classNames(
    //     current
    //       ? "bg-violet-100 text-gray-600 md:bg-gray-50"
    //       : "text-white hover:bg-violet-400 md:text-gray-600 md:hover:bg-gray-50",
    //     "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
    //   )}
    //   onClick={onClick}
    // >
    //   <Icon
    //     className={classNames(
    //       current
    //         ? "bg-violet-100 text-gray-500 md:bg-gray-50"
    //         : "text-wite hover:bg-gray-50 md:text-gray-500",
    //       "mr-3 h-6 w-6 flex-shrink-0"
    //     )}
    //     aria-hidden="true"
    //   />
    //   {name}
    // </Link>
  );
}
