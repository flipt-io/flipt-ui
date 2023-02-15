import { Outlet } from 'react-router-dom';

export default function Settings() {
  // TODO: Add tabs back in when we have more than one setting section
  // const tabs = [
  //   {
  //     name: 'API Tokens',
  //     to: '/settings/tokens'
  //   }
  // ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
          </h2>
        </div>
      </div>
      {/* <TabBar tabs={tabs} /> */}
      <Outlet />
    </>
  );
}
