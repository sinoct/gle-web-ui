import { FunctionComponent, useState } from "react";
import Image from "next/image";

interface DropDownMenuProps {
  children: any;
}

const DropDownMenu: FunctionComponent<DropDownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="bg-white rounded flex justify-center items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          width={32}
          height={32}
          src={"/assets/hamburger_menu.png"}
          alt={""}
        ></Image>
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
