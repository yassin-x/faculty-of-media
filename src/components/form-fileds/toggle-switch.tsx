import { IFormField } from "@/types/app";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface Props {
  onClick?: () => void;
  checked?: boolean;
  label: IFormField["label"];
  name: IFormField["name"];
}

const ToggleSwitch = ({ label, name, checked, onClick }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
      <Switch
        id={name}
        name={name}
        onCheckedChange={onClick}
        checked={checked}
      />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default ToggleSwitch;
