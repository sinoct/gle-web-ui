import { FunctionComponent } from "react";
import DropDownMenu from "./DropdownMenu";
import Image from "next/image";

interface TooltipComponentProps {
  text: string;
}

const TooltipComponent: FunctionComponent<TooltipComponentProps> = ({
  text,
}) => {
  return (
    <div>
      <DropDownMenu
        dropDownButton={
          <Image
            src="/assets/help.png"
            alt="generated image"
            width={20}
            height={20}
          />
        }
      >
        {text}
      </DropDownMenu>
    </div>
  );
};

export default TooltipComponent;
