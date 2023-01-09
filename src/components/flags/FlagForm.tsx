import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "~/components/forms/Button";
import Input from "~/components/forms/Input";
import Toggle from "~/components/forms/Toggle";
import { createFlag, updateFlag } from "~/data/api";
import { keyValidation, requiredValidation } from "~/data/validations";
import { IFlag, IFlagBase } from "~/types/Flag";
import { stringAsKey } from "~/utils/helpers";

type FlagFormProps = {
  flag?: IFlag;
  flagChanged?: () => void;
};

export default function FlagForm(props: FlagFormProps) {
  const { flag, flagChanged } = props;
  const isNew = flag === undefined;
  const navigate = useNavigate();

  const handleSubmit = (values: IFlagBase) => {
    if (isNew) {
      return createFlag(values);
    }
    return updateFlag(flag?.key, values);
  };

  const initialValues: IFlagBase = {
    key: flag?.key || "",
    name: flag?.name || "",
    description: flag?.description || "",
    enabled: flag?.enabled || false,
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values).then(() => {
            if (isNew) {
              navigate("/flags/" + values.key);
              return;
            }

            flagChanged && flagChanged();
          });
        }}
        validationSchema={Yup.object({
          key: keyValidation,
          name: requiredValidation,
        })}
      >
        {(formik) => {
          const enabled = formik.values.enabled;
          return (
            <Form className="px-1 sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 md:col-span-2">
                    <Toggle
                      id="enabled"
                      name="enabled"
                      label="Enabled"
                      enabled={enabled}
                      handleChange={(e) => {
                        formik.setFieldValue("enabled", e);
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input
                      className="mt-1"
                      name="name"
                      id="name"
                      handleChange={(e) => {
                        // remove the character that was just added before comparing
                        const previousName = formik.values.name.slice(0, -1);

                        // check if the name and key are currently in sync
                        // we do this so we don't override a custom key value
                        if (
                          formik.values.key === "" ||
                          formik.values.key === stringAsKey(previousName)
                        ) {
                          formik.setFieldValue(
                            "key",
                            stringAsKey(e.target.value)
                          );
                        }
                        formik.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="key"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Key
                    </label>
                    <Input
                      className="mt-1"
                      name="key"
                      id="key"
                      disabled={!isNew}
                      handleChange={(e) => {
                        const formatted = stringAsKey(e.target.value);
                        formik.setFieldValue("key", formatted);
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <span
                        className="text-xs text-gray-500"
                        id="description-optional"
                      >
                        Optional
                      </span>
                    </div>
                    <Input
                      className="mt-1"
                      name="description"
                      id="description"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button
                    primary
                    className="ml-3"
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    {isNew ? "Create" : "Update"}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
