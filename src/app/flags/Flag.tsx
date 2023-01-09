import { CalendarIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import DeleteFlagPanel from "~/components/flags/DeleteFlagPanel";
import Modal from "~/components/Modal";
import { getFlag } from "~/data/api";
import { IFlag } from "~/types/Flag";
import { classNames } from "~/utils/helpers";

export async function flagLoader({ params }): Promise<IFlag> {
  return getFlag(params.flagKey);
}

export default function Flag() {
  const initialFlag = useLoaderData() as IFlag;
  const [flag, setFlag] = useState<IFlag>(initialFlag);
  const [flagVersion, setFlagVersion] = useState(0);

  const fetchFlag = useCallback(() => {
    getFlag(flag.key).then((flag) => {
      setFlag(flag);
    });
  }, [flagVersion]);

  const incrementFlagVersion = () => {
    setFlagVersion(flagVersion + 1);
  };

  useEffect(() => {
    fetchFlag();
  }, [flagVersion, fetchFlag]);

  return (
    <>
      <FlagHeader flag={flag} />
      <Outlet context={{ flag, onFlagChange: incrementFlagVersion }} />
    </>
  );
}

type FlagHeaderProps = {
  flag: IFlag;
};

function FlagHeader(props: FlagHeaderProps) {
  const { flag } = props;
  const navigate = useNavigate();

  const [showDeleteFlagModal, setShowDeleteFlagModal] =
    useState<boolean>(false);

  return (
    <>
      {/* flag delete modal */}
      <Modal open={showDeleteFlagModal} setOpen={setShowDeleteFlagModal}>
        <DeleteFlagPanel
          flagKey={flag.key}
          setOpen={setShowDeleteFlagModal}
          onSuccess={() => {
            setShowDeleteFlagModal(false);
            navigate("/");
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
            <NavLink
              key="details"
              to=""
              className={({ isActive }) => {
                return classNames(
                  isActive
                    ? "border-violet-500 text-violet-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium"
                );
              }}
            >
              Details
            </NavLink>
            <NavLink
              key="evaluation"
              to="evaluation"
              className={({ isActive }) => {
                return classNames(
                  isActive
                    ? "border-violet-500 text-violet-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium"
                );
              }}
            >
              Evaluation
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
}
