import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { SelectProps } from "antd";
import "./MyFormSelect.css";
import { cn } from "@/lib/utils";

interface MyFormSelectProps {
  label?: string;
  labelClassName?: string;
  name: string;
  options?: SelectProps["options"];
  disabled?: boolean;
  mode?: "multiple" | "tags";
  placeHolder: string;
  className?: string;
  isSearch?: boolean;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange?: (val: any) => void;
}

const MyFormSelect = ({
  label,
  labelClassName,
  name,
  options,
  disabled,
  defaultValue,
  mode,
  placeHolder,
  className,
  isSearch = false,
  onValueChange,
}: MyFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col justify-center gap-1">
          {/* Label */}
          {label && (
            <p
              className={cn(
                "ps-1 mb-2 text-[#101828] text-base font-normal leading-6",
                labelClassName
              )}
            >
              {label}
            </p>
          )}

          {/* Ant Design Select */}
          <Form.Item style={{ marginBottom: "0px" }}>
            <Select
              mode={mode}
              style={{ width: "100%" }}
              className={cn(className)}
              {...field}
              ref={null}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              options={options}
              size="large"
              defaultValue={defaultValue}
              disabled={disabled}
              placeholder={placeHolder}
              showSearch={isSearch}
              filterOption={
                isSearch
                  ? (input, option) =>
                      (option?.label ?? "")
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                  : undefined
              }
            />

            {/* Error Message */}
            {error && (
              <small
                className="!font-poppins text-[13px]"
                style={{ color: "red" }}
              >
                {error.message}
              </small>
            )}
          </Form.Item>
        </div>
      )}
    />
  );
};

export default MyFormSelect;
