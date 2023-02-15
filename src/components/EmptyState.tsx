type EmptyStateProps = {
  className?: string;
  text?: string;
  secondaryText?: string;
  children?: React.ReactNode;
};

export default function EmptyState(props: EmptyStateProps) {
  const { text, secondaryText, className = '', children } = props;

  return (
    <div
      className={`${className} relative block h-full w-full rounded-lg border border-dashed border-gray-300 p-12 text-center`}
    >
      {text && (
        <span className="mt-2 block text-sm font-medium text-gray-600">
          {text}
        </span>
      )}
      {secondaryText && (
        <span className="mt-2 block text-sm text-gray-400">
          {secondaryText}
        </span>
      )}
      {children}
    </div>
  );
}
