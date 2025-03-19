import { ErrorMessage, Field } from "formik";

const InputFile = ({ field }) => (
    <label className="p-2 grid gap-2 relative pb-6">
        {field.label}
        <Field name={field.name}>
            {({ form }) => (
                <input
                    name={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        form.setFieldValue("file", file);
                    }}
                    className="border p-2 rounded-2xl w-full"
                />
            )}
        </Field>
        <ErrorMessage
            component="div"
            name={field.name}
            className="text-red-500 absolute bottom-0 left-2 text-xs"
        />
    </label>
);

export default InputFile;
