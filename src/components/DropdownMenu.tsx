import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { JsxElement } from "typescript";

interface DropDownMenuProps {
  children: any;
  dropDownButton?: any;
}

const DropDownMenu: FunctionComponent<DropDownMenuProps> = ({
  children,
  dropDownButton = (
    <Image
      className="bg-white rounded flex justify-center items-center cursor-pointer"
      width={32}
      height={32}
      src={"/assets/hamburger_menu.png"}
      alt={""}
    ></Image>
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="flex justify-center" onClick={() => setIsOpen(!isOpen)}>
        {dropDownButton}
      </div>
      <div
        className={`transition-all duration-500 bg-gray-500 absolute right-0 rounded ${
          isOpen ? "max-h-96 p-4" : "max-h-0"
        } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDownMenu;
