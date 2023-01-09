import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "~/components/forms/Button";
import { deleteRule } from "~/data/api";
import { IEvaluatable } from "~/types/Evaluatable";

type DeleteRulePanelProps = {
  setOpen: (open: boolean) => void;
  flagKey: string;
  rule: IEvaluatable | null;
  onSuccess: () => void;
};

export default function DeleteRulePanel(props: DeleteRulePanelProps) {
  const { setOpen, flagKey, rule, onSuccess } = props;

  const handleSubmit = () => {
    if (rule) {
      return deleteRule(flagKey, rule.id);
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
            Delete Rule
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this rule at
              <span className="font-medium text-violet-500">
                {" "}
                position {rule?.rank}{" "}
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
            handleSubmit()?.then(() => {
              onSuccess();
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
