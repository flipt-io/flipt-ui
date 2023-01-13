import { CalendarIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import {
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useNavigate
} from 'react-router-dom';
import DeleteFlagPanel from '~/components/flags/DeleteFlagPanel';
import Modal from '~/components/Modal';
import { getFlag } from '~/data/api';
import useError from '~/data/hooks/errors';
import { IFlag } from '~/types/Flag';

export async function flagLoader({
  params
}: LoaderFunctionArgs): Promise<IFlag> {
  if (params.flagKey) {
    return getFlag(params.flagKey);
  }
  return Promise.reject(new Error('No flag key provided'));
}

export default function Flag() {
  const initialFlag = useLoaderData() as IFlag;
  const [flag, setFlag] = useState<IFlag>(initialFlag);
  const [flagVersion, setFlagVersion] = useState(0);

  const { setError, clearError } = useError();
  const navigate = useNavigate();

  const [showDeleteFlagModal, setShowDeleteFlagModal] =
    useState<boolean>(false);

  const fetchFlag = useCallback(() => {
    getFlag(flag.key)
      .then((flag) => {
        setFlag(flag);
        clearError();
      })
      .catch((err) => {
        setError(err);
      });
  }, [clearError, flag.key, setError]);

  const incrementFlagVersion = () => {
    setFlagVersion(flagVersion + 1);
  };

  useEffect(() => {
    fetchFlag();
  }, [flagVersion, fetchFlag]);

  return (
    <>
      {/* flag delete modal */}
      <Modal open={showDeleteFlagModal} setOpen={setShowDeleteFlagModal}>
        <DeleteFlagPanel
          flagKey={flag.key}
          setOpen={setShowDeleteFlagModal}
          onSuccess={() => {
            setShowDeleteFlagModal(false);
            navigate('/');
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
              Created{' '}
              {formatDistanceToNowStrict(parseISO(flag.createdAt), {
                addSuffix: true
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
      <Outlet context={{ flag, onFlagChange: incrementFlagVersion }} />
    </>
  );
}
