import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import Button from '~/components/forms/Button';
import Combobox, { ISelectable } from '~/components/forms/Combobox';
import MoreInfo from '~/components/MoreInfo';
import { updateDistribution } from '~/data/api';
import { useError } from '~/data/hooks/error';
import { useSuccess } from '~/data/hooks/success';
import { IEvaluatable } from '~/types/Evaluatable';
import { ISegment } from '~/types/Segment';
import { IVariant } from '~/types/Variant';

type RuleFormProps = {
  setOpen: (open: boolean) => void;
  rule: IEvaluatable;
  onSuccess: () => void;
};

const distTypes = [
  {
    id: 'single',
    name: 'Single Variant',
    description: 'Always returns the same variant'
  },
  {
    id: 'multi',
    name: 'Multi-Variant',
    description: 'Returns different variants based on percentages'
  }
];

type SelectableSegment = ISegment & ISelectable;

type SelectableVariant = IVariant & ISelectable;

export default function EditRuleForm(props: RuleFormProps) {
  const { setOpen, rule, onSuccess } = props;
  const { setError, clearError } = useError();
  const { setSuccess } = useSuccess();

  const [editingRule, setEditingRule] = useState<IEvaluatable>(cloneDeep(rule));

  const [ruleType, setRuleType] = useState(
    editingRule.rollouts.length > 1 ? 'multi' : 'single'
  );

  const handleSubmit = async () =>
    // update distributions that changed
    Promise.all(
      editingRule.rollouts.map((rollout) => {
        const found = rule.rollouts.find(
          (r) => r.distribution.id === rollout.distribution.id
        );
        if (
          found &&
          found.distribution.rollout !== rollout.distribution.rollout
        ) {
          return updateDistribution(
            rule.flag.key,
            rule.id,
            rollout.distribution.id,
            {
              variantId: rollout.distribution.variantId,
              rollout: rollout.distribution.rollout
            }
          );
        }
        return Promise.resolve();
      })
    );
  return (
    <Formik
      initialValues={{
        segmentKey: rule.segment.key || ''
      }}
      onSubmit={() => {
        handleSubmit()
          ?.then(() => {
            clearError();
            setSuccess('Successfully updated rule');
            onSuccess();
          })
          .catch((err) => {
            setError(err);
          });
      }}
    >
      {(_formik) => {
        return (
          <Form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1">
              <div className="bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Edit Rule
                    </Dialog.Title>
                    <MoreInfo href="https://www.flipt.io/docs/concepts#rules">
                      Learn more about rules
                    </MoreInfo>
                  </div>
                  <div className="flex h-7 items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                  <div>
                    <label
                      htmlFor="segmentKey"
                      className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                    >
                      Segment
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <Combobox<SelectableSegment>
                      id="segmentKey"
                      name="segmentKey"
                      disabled
                      selected={{
                        filterValue: rule.segment.key,
                        displayValue: rule.segment.key,
                        ...rule.segment
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                  <div>
                    <label
                      htmlFor="ruleType"
                      className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                    >
                      Type
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <fieldset>
                      <legend className="sr-only">Type</legend>
                      <div className="space-y-5">
                        {distTypes.map((dist) => (
                          <div
                            key={dist.id}
                            className="relative flex items-start"
                          >
                            <div className="flex h-5 items-center">
                              <input
                                id={dist.id}
                                aria-describedby={`${dist.id}-description`}
                                name="ruleType"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-violet-400 focus:ring-violet-400"
                                onChange={() => {
                                  setRuleType(dist.id);
                                }}
                                checked={dist.id === ruleType}
                                value={dist.id}
                                disabled
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor={dist.id}
                                className="font-medium text-gray-700"
                              >
                                {dist.name}
                              </label>
                              <p
                                id={`${dist.id}-description`}
                                className="text-gray-500"
                              >
                                {dist.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>

                {ruleType === 'single' && (
                  <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                      <label
                        htmlFor="variantKey"
                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                      >
                        Variant
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <Combobox<SelectableVariant>
                        id="variant"
                        name="variant"
                        selected={{
                          filterValue: editingRule.rollouts[0].variant.key,
                          displayValue: editingRule.rollouts[0].variant.key,
                          ...editingRule.rollouts[0].variant
                        }}
                      />
                    </div>
                  </div>
                )}

                {ruleType === 'multi' && (
                  <div>
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="variantKey"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          Variants
                        </label>
                      </div>
                    </div>
                    {editingRule.rollouts?.map((dist, index) => (
                      <div
                        className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-1"
                        key={dist.variant.id}
                      >
                        <div>
                          <label
                            htmlFor={dist.variant.key}
                            className="block truncate text-right text-sm text-gray-600 sm:mt-px sm:pt-2 sm:pr-2"
                          >
                            {dist.variant.key}
                          </label>
                        </div>
                        <div className="relative sm:col-span-1">
                          <input
                            type="number"
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 shadow-sm focus:border-violet-300 focus:ring-violet-300 sm:text-sm"
                            value={dist.distribution.rollout}
                            name={dist.variant.key}
                            // eslint-disable-next-line react/no-unknown-property
                            typeof="number"
                            step=".01"
                            min="0"
                            max="100"
                            onChange={(e) => {
                              const newRollouts = [...editingRule.rollouts];
                              newRollouts[index].distribution.rollout =
                                parseFloat(e.target.value);
                              setEditingRule({
                                ...editingRule,
                                rollouts: newRollouts
                              });
                            }}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span
                              className="text-gray-500 sm:text-sm"
                              id={`percentage-${dist.variant.key}`}
                            >
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="flex justify-end space-x-3">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button primary type="submit" className="min-w-[80px]">
                  Update
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
