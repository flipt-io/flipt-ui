type LoadingProps = {
  isButton?: boolean;
  isPrimary?: boolean;
};

export default function Loading(props: LoadingProps) {
  const { isButton, isPrimary } = props;

  return (
    <div
      className={`flex ${
        !isButton ? 'h-screen' : ''
      } items-center justify-center`}
    >
      <div
        className={`${isButton ? 'h-5 w-5' : 'h-10 w-10'} ${
          isPrimary ? 'border-white-300' : 'border-violet-300'
        } animate-spin rounded-full border-b-2`}
      ></div>
    </div>
  );
}
