import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";

type ErrorNotificationProps = {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ErrorNotification(props: ErrorNotificationProps) {
  const { className, title = "Error", children, open, setOpen } = props;

  return (
    <Transition show={open}>
      <div className="max-w-s absolute bottom-0 right-0 z-10 m-4">
        <div
          className={`${className} rounded-md bg-red-50 p-4 shadow-sm`}
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{title}</h3>
              {children && (
                <div className="mt-2 text-sm text-red-700">{children}</div>
              )}
            </div>
            <div className="ml-auto pl-10">
              <div className="-mx-1 -my-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
