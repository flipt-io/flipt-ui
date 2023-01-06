import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "~/components/forms/Button";
import { deleteConstraint } from "~/data/api";
import { IConstraint } from "~/types/Constraint";

type DeleteConstraintPanelProps = {
  setOpen: (open: boolean) => void;
  segmentKey: string;
  constraint: IConstraint | null;
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export default function DeleteConstraintPanel(
  props: DeleteConstraintPanelProps
) {
  const { setOpen, segmentKey, constraint, onSuccess, onError } = props;

  const handleSubmit = () => {
    if (constraint) {
      return deleteConstraint(segmentKey, constraint.id);
    }
  };

  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Delete Constraint
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the constraint for{" "}
              <span className="font-medium text-violet-500">
                {constraint?.property}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse space-x-2 space-x-reverse sm:mt-4">
        <Button
          primary
          type="button"
          onClick={() => {
            handleSubmit()
              ?.then(() => {
                onSuccess();
              })
              .catch((err) => {
                onError(err);
              });
          }}
        >
          Delete
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </>
  );
}
