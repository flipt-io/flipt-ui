import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "~/components/forms/Button";
import { deleteVariant } from "~/data/api";
import useError from "~/data/hooks/errors";
import { IVariant } from "~/types/Variant";

type DeleteVariantPanelProps = {
  setOpen: (open: boolean) => void;
  flagKey: string;
  variant: IVariant | null;
  onSuccess: () => void;
};

export default function DeleteVariantPanel(props: DeleteVariantPanelProps) {
  const { setOpen, flagKey, variant, onSuccess } = props;
  const { setError } = useError();

  const handleSubmit = () => {
    if (variant) {
      return deleteVariant(flagKey, variant.id);
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
            Delete Variant
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the variant{" "}
              <span className="font-medium text-violet-500">
                {variant?.key}
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
                setError(err);
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
