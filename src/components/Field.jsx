import { classes } from "@utils/classes";
import { Field as TextField, ErrorMessage } from "formik";
const Field = ({ field, classNameLabel }) => (
    <label className={classes(["grid gap-2  relative pb-6 text-center ", classNameLabel])}>
        {field?.label && <span > {field.label}</span>}
        <TextField
            as={field.fieldsType}
            className="border p-2 w-full"
            label={field.placeholder}
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            rows={field.rows}
        />
        <ErrorMessage
            component="div"
            name={field.name}
            className="text-red-500 absolute bottom-0 left-2 text-xs"
        />
    </label>
);

export default Field;
