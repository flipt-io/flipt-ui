import { CalendarIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "~/components/Modal";
import { IFlag } from "~/types/Flag";
import { classNames } from "~/utils/helpers";
import DeleteFlagPanel from "./DeleteFlagPanel";

type FlagHeaderProps = {
  flag: IFlag;
  tab: "details" | "evaluation";
  setError: (err: Error | null) => void;
  setShowError: (show: boolean) => void;
};

export default function FlagHeader(props: FlagHeaderProps) {
  const { flag, tab, setError, setShowError } = props;

  const [showDeleteFlagModal, setShowDeleteFlagModal] =
    useState<boolean>(false);

  const tabs = [
    {
      name: "Details",
      href: `/flags/${flag.key}`,
      current: tab === "details",
    },
    {
      name: "Evaluation",
      href: `/flags/${flag.key}/evaluation`,
      current: tab === "evaluation",
    },
  ];

  return (
    <>
      {/* flag delete modal */}
      <Modal open={showDeleteFlagModal} setOpen={setShowDeleteFlagModal}>
        <DeleteFlagPanel
          flagKey={flag.key}
          setOpen={setShowDeleteFlagModal}
          onSuccess={() => {
            setShowDeleteFlagModal(false);
            setError(null);
            setShowError(false);
          }}
          onError={(err) => {
            setError(err);
            setShowError(true);
          }}
        />
      </Modal>

      {/* flag header / delete button */}
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {flag.name}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Created{" "}
              {formatDistanceToNowStrict(parseISO(flag.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-none">
          <button
            type="button"
            className="mt-5 mb-1 inline-flex items-center justify-center rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-400 focus:outline-none enabled:hover:bg-red-50 sm:mt-0"
            onClick={() => setShowDeleteFlagModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-row sm:mt-5">
        <div className="border-b-2 border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "border-violet-500 text-violet-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
