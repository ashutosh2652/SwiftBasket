import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isEditable = true,
}) {
  const types = {
    INPUT: "input",
    TEXTAREA: "textarea",
    SELECT: "select",
  };
  function renderInputsByComponentType(getcontrolItem) {
    let element = null;
    const value = formData[getcontrolItem.name] || "";
    switch (getcontrolItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={getcontrolItem.name}
            type={getcontrolItem.type}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getcontrolItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
      case types.TEXTAREA:
        element = (
          <Textarea
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getcontrolItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
      case types.SELECT:
        element = (
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData({ ...formData, [getcontrolItem.name]: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getcontrolItem.options && getcontrolItem.options.length > 0
                ? getcontrolItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.label}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      default:
        element = (
          <Input
            name={getcontrolItem.name}
            type={getcontrolItem.type}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getcontrolItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
    }
    return element;
  }
  // console.log("isEditable", isEditable);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((controlItem) => (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <Label className="mb-1">{controlItem.label}</Label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className={`mt-2 w-full cursor-pointer ${
            !isEditable
              ? "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
              : ""
          }`}
          disabled={!isEditable}
        >
          {buttonText || "Submit"}
        </Button>
      </form>
    </div>
  );
}
export default CommonForm;
