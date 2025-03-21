import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disable?: boolean }[] | undefined;
  disabled?: boolean;
};

const FormSelect = ({ label, name, options, disabled }: TFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            options={options}
            disabled={disabled}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default FormSelect;
