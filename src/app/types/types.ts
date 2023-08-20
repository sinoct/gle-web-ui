import { Dispatch, SetStateAction } from "react";
import { templateType } from "../../../public/graphTemplate";

export interface TemplateSetterProps {
  template: templateType;
  templateSetter: Dispatch<SetStateAction<templateType>>;
}

export interface colorType {
  [key: string]: string;
}
