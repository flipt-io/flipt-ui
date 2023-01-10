import { Link } from 'react-router-dom';
import { IFlag } from '~/types/Flag';
import { classNames } from '~/utils/helpers';

type FlagMenuProps = {
  flag: IFlag;
  selected: 'details' | 'evaluation';
};

export default function FlagMenu(props: FlagMenuProps) {
  const { flag, selected } = props;

  const tabs = [
    {
      name: 'Details',
      to: `/flags/${flag.key}`,
      current: selected === 'details'
    },
    {
      name: 'Evaluation',
      to: `/flags/${flag.key}/evaluation`,
      current: selected === 'evaluation'
    }
  ];

  return (
    <div className="mt-3 flex flex-row sm:mt-5">
      <div className="border-b-2 border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.to}
              className={classNames(
                tab.current
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
