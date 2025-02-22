import { useFormContext } from "react-hook-form";

type InputTextProps = {
  type: "text" | "password" | "email" | "number";
  fieldName: string;
  placeholder?: string;
};

const InputText = ({ type, fieldName, placeholder }: InputTextProps) => {
  const { register } = useFormContext();
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(fieldName)}
      className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white-500 border border-gray-300 px-4 py-2 rounded-[10px] text-black"
      autoFocus={true}
    />
  );
};

export default InputText;