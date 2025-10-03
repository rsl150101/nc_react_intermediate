import { draggable } from "@atlaskit/pragmatic-drag-and-drop/dist/types/adapter/element-adapter";
import { useEffect, useRef } from "react";

const Card = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    return draggable({
      element: ref.current,
    });
  }, []);
  return <div ref={ref}></div>;
};

export default Card;
