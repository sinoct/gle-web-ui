import { FunctionComponent } from "react";
import Image from "next/image";

interface HistoryElementsProps {
  code: string;
  image: string;
}

const HistoryElements: FunctionComponent<HistoryElementsProps> = ({
  code,
  image,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      {code && (
        <div className="md:basis-1/2 w-full justify-center">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
      {image && (
        <div className="flex md:basis-1/2 w-full justify-center">
          <Image src={image} alt="generated image" width={500} height={500} />
        </div>
      )}
    </div>
  );
};

export default HistoryElements;
