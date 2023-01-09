import { PlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import EmptyState from "~/components/EmptyState";
import FlagTable from "~/components/flags/FlagTable";
import Button from "~/components/forms/Button";
import { IFlagList } from "~/types/Flag";

export default function Flags() {
  const { data } = useSWR<IFlagList>("/flags");
  const flags = data?.flags;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-row justify-between pb-5 sm:flex sm:items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Flags
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Flags represent features that you can easily enable or disable
          </p>
        </div>
        <div className="mt-4">
          <Link to="/flags/new">
            <Button primary>
              <PlusIcon
                className="-ml-1.5 mr-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span>New Flag</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        {flags && flags.length > 0 ? (
          <FlagTable flags={flags} />
        ) : (
          <EmptyState
            text="Create Flag"
            onClick={() => navigate("/flags/new")}
          />
        )}
      </div>
    </>
  );
}
