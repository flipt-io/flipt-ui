import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import Button from '~/components/forms/Button';
import Combobox, { ISelectable } from '~/components/forms/Combobox';
import MoreInfo from '~/components/MoreInfo';
import { createDistribution, createRule } from '~/data/api';
import useError from '~/data/hooks/errors';
import { IFlag } from '~/types/Flag';
import { ISegment } from '~/types/Segment';
import { IVariant } from '~/types/Variant';

interface distribution {
  variantId: string;
  variantKey: string;
  rollout: number;
}

type RuleFormProps = {
  setOpen: (open: boolean) => void;
  rulesChanged: () => void;
  flag: IFlag;
  rank: number;
  segments: ISegment[];
};

const distTypes = [
  {
    id: 'single',
    name: 'Single Variant',
    description: 'Always returns the same variant',
  },
  {
    id: 'multi',
    name: 'Multi-Variant',
    description: 'Returns different variants based on percentages',
  },
];

type SelectableSegment = ISegment & ISelectable;

type SelectableVariant = IVariant & ISelectable;

export default function RuleForm(props: RuleFormProps) {
  const { setOpen, rulesChanged, flag, rank, segments } = props;
  const { setError, clearError } = useError();

  const [ruleType, setRuleType] = useState('single');

  const [selectedSegment, setSelectedSegment] =
    useState<SelectableSegment | null>(null);
  const [selectedVariant, setSelectedVariant] =
    useState<SelectableVariant | null>(null);

  const [distributions, setDistributions] = useState(() => {
    const percentages = computePercentages(flag.variants?.length || 0);

    return flag.variants?.map((variant, i) => ({
      variantId: variant.id,
      variantKey: variant.key,
      rollout: percentages[i],
    }));
  });

  const handleSubmit = async () => {
    if (!selectedSegment) throw new Error('No segment selected');
    const rule = await createRule(flag.key, {
      flagKey: flag.key,
      segmentKey: selectedSegment.key,
      rank,
    });

    if (ruleType === 'multi') {
      const distPromises = distributions?.map((dist: distribution) =>
        createDistribution(flag.key, rule.id, {
          variantId: dist.variantId,
          rollout: dist.rollout,
        })
      );
      if (distPromises) await Promise.all(distPromises);
    } else {
      if (!selectedVariant) throw new Error('No variant selected');

      await createDistribution(flag.key, rule.id, {
        variantId: selectedVariant.id,
        rollout: 100,
      });
    }

    rulesChanged();
    clearError();
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{
        segmentKey: selectedSegment?.key || '',
      }}
      onSubmit={() => {
        handleSubmit().catch((err) => {
          setError(err);
        });
      }}
    >
      <Form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1">
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between space-x-3">
              <div className="space-y-1">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  New Rule
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
                  placeholder="Select or search for a segment"
                  values={segments.map((s) => ({
                    ...s,
                    filterValue: s.key,
                    displayValue: s.name,
                  }))}
                  selected={selectedSegment}
                  setSelected={setSelectedSegment}
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
                      <div key={dist.id} className="relative flex items-start">
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
                    placeholder="Select or search for a variant"
                    values={
                      flag?.variants?.map((v) => ({
                        ...v,
                        filterValue: v.key,
                        displayValue: v.name,
                      })) || []
                    }
                    selected={selectedVariant}
                    setSelected={setSelectedVariant}
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
                {distributions?.map((dist, index) => (
                  <div
                    className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-1"
                    key={dist.variantId}
                  >
                    <div>
                      <label
                        htmlFor={dist.variantKey}
                        className="block truncate text-right text-sm text-gray-600 sm:mt-px sm:pt-2 sm:pr-2"
                      >
                        {dist.variantKey}
                      </label>
                    </div>
                    <div className="relative sm:col-span-1">
                      <input
                        type="number"
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 shadow-sm focus:border-violet-300 focus:ring-violet-300 sm:text-sm"
                        value={dist.rollout}
                        name={dist.variantKey}
                        typeof="number"
                        step=".01"
                        min="0"
                        max="100"
                        onChange={(e) => {
                          const newDistributions = [...distributions];
                          newDistributions[index].rollout = parseFloat(
                            e.target.value
                          );
                          setDistributions(newDistributions);
                        }}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id={`percentage-${dist.variantKey}`}
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
            <Button primary type="submit">
              Create
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

function computePercentages(n: number) {
  const sum = 100 * 100;

  const d = Math.floor(sum / n);
  const remainder = sum - d * n;

  const result = [];
  let i = 0;

  while (++i && i <= n) {
    result.push((i <= remainder ? d + 1 : d) / 100);
  }

  return result;
}
