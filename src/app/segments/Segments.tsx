import { PlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import EmptyState from "~/components/EmptyState";
import Button from "~/components/forms/Button";
import SegmentTable from "~/components/segments/SegmentTable";
import { ISegmentList } from "~/types/Segment";

export default function Segments() {
  const { data } = useSWR<ISegmentList>("/segments");
  const segments = data?.segments;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-row justify-between pb-5 sm:flex sm:items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Segments
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Segments enable request targeting based on defined criteria
          </p>
        </div>
        <div className="mt-4">
          <Link to="/segments/new">
            <Button primary>
              <PlusIcon
                className="-ml-1.5 mr-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span>New Segment</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        {segments && segments.length > 0 ? (
          <SegmentTable segments={segments} />
        ) : (
          <EmptyState
            text="Create Segment"
            onClick={() => navigate("/segments/new")}
          />
        )}
      </div>
    </>
  );
}
