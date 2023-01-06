import { useField } from "formik";
import { classNames } from "~/utils/helpers";

type InputProps = {
  id: string;
  name: string;
  type?: string;
  className?: string;
  autocomplete?: boolean;
  disabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  const {
    id,
    type = "text",
    className,
    handleChange,
    autocomplete = false,
    disabled = false,
  } = props;

  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <>
      <input
        className={classNames(
          hasError ? "border-red-400" : "border-gray-300",
          `${className} block w-full rounded-md shadow-sm focus:border-violet-300 focus:ring-violet-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm`
        )}
        id={id}
        type={type}
        {...field}
        onChange={(e) => {
          field.onChange(e);
          handleChange && handleChange(e);
        }}
        autoComplete={autocomplete ? "on" : "off"}
        disabled={disabled}
      />
      {meta.touched && meta.error ? (
        <div className="mt-1 text-sm text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
}
