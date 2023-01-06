import { PlusIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import EmptyState from "~/components/EmptyState";
import ErrorNotification from "~/components/ErrorNotification";
import DeleteVariantPanel from "~/components/flags/DeleteVariantPanel";
import FlagForm from "~/components/flags/FlagForm";
import FlagHeader from "~/components/flags/FlagHeader";
import VariantForm from "~/components/flags/VariantForm";
import Button from "~/components/forms/Button";
import Modal from "~/components/Modal";
import MoreInfo from "~/components/MoreInfo";
import Slideover from "~/components/Slideover";
import { getFlag } from "~/data/api";
import { IFlag } from "~/types/Flag";
import { IVariant } from "~/types/Variant";

export async function flagLoader({ params }): Promise<IFlag> {
  return getFlag(params.flagKey);
}

export default function Flag() {
  const [flag, setFlag] = useState<IFlag>(useLoaderData() as IFlag);
  const [flagVersion, setFlagVersion] = useState(0);

  const [showVariantForm, setShowVariantForm] = useState<boolean>(false);
  const [editingVariant, setEditingVariant] = useState<IVariant | null>(null);
  const [showDeleteVariantModal, setShowDeleteVariantModal] =
    useState<boolean>(false);
  const [deletingVariant, setDeletingVariant] = useState<IVariant | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const fetchFlag = useCallback(() => {
    getFlag(flag.key)
      .then((flag) => {
        setFlag(flag);
        setError(null);
        setShowError(false);
      })
      .catch((err) => {
        setError(err);
        setShowError(true);
      });
  }, [flagVersion]);

  const incrementFlagVersion = () => {
    setFlagVersion(flagVersion + 1);
  };

  useEffect(() => {
    fetchFlag();
  }, [flagVersion, fetchFlag]);

  if (error || !flag) {
    return (
      <ErrorNotification open={showError} setOpen={setShowError}>
        {error?.message}
      </ErrorNotification>
    );
  }

  return (
    <>
      {/* variant edit form */}
      <Slideover open={showVariantForm} setOpen={setShowVariantForm}>
        <VariantForm
          flagKey={flag.key}
          variant={editingVariant || undefined}
          setOpen={setShowVariantForm}
          onSuccess={() => {
            setError(null);
            setShowError(false);
            setShowVariantForm(false);
            incrementFlagVersion();
          }}
          onError={(err) => {
            setError(err);
            setShowError(true);
          }}
        />
      </Slideover>

      {/* variant delete modal */}
      <Modal open={showDeleteVariantModal} setOpen={setShowDeleteVariantModal}>
        <DeleteVariantPanel
          flagKey={flag.key}
          variant={deletingVariant}
          setOpen={setShowDeleteVariantModal}
          onSuccess={() => {
            setError(null);
            setShowError(false);
            incrementFlagVersion();
            setShowDeleteVariantModal(false);
          }}
          onError={(err) => {
            setError(err);
            setShowError(true);
          }}
        />
      </Modal>

      <FlagHeader
        flag={flag}
        tab={"details"}
        setError={setError}
        setShowError={setShowError}
      />

      <div className="flex flex-col">
        {/* flag details */}
        <div className="my-10">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <p className="mt-1 text-sm text-gray-500">
                Basic information about the flag and its status.
              </p>
              <MoreInfo
                className="mt-5"
                href="https://www.flipt.io/docs/concepts#flags"
              >
                Learn more about flags
              </MoreInfo>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <FlagForm
                flag={flag}
                flagChanged={incrementFlagVersion}
                onSuccess={() => {
                  setError(null);
                  setShowError(false);
                }}
                onError={(err) => {
                  setError(err);
                  setShowError(true);
                }}
              />
            </div>
          </div>
        </div>

        {/* variants */}
        <div className="mt-10">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                Variants
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Return different values based on rules you define
              </p>
            </div>
            {flag.variants && flag.variants.length > 0 && (
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Button
                  primary
                  type="button"
                  onClick={() => {
                    setEditingVariant(null);
                    setShowVariantForm(true);
                  }}
                >
                  <PlusIcon
                    className="-ml-1.5 mr-1 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span>New Variant</span>
                </Button>
              </div>
            )}
          </div>

          <div className="my-10">
            {flag.variants && flag.variants.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="pb-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Key
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 pb-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 pb-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="relative pb-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {flag.variants.map((variant) => (
                    <tr key={variant.key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 sm:pl-6">
                        {variant.key}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {variant.name}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {variant.description}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="pr-2 text-violet-600 hover:text-violet-900"
                          onClick={() => {
                            setEditingVariant(variant);
                            setShowVariantForm(true);
                          }}
                        >
                          Edit
                          <span className="sr-only">, {variant.key}</span>
                        </a>
                        |
                        <a
                          href="#"
                          className="pl-2 text-violet-600 hover:text-violet-900"
                          onClick={() => {
                            setDeletingVariant(variant);
                            setShowDeleteVariantModal(true);
                          }}
                        >
                          Delete
                          <span className="sr-only">, {variant.key}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState
                text="Add Variant"
                onClick={() => {
                  setEditingVariant(null);
                  setShowVariantForm(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
