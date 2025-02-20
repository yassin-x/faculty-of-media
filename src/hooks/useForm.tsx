import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const signinFields = (): IFormField[] => [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@example.com",
      autoFocus: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinFields();
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
