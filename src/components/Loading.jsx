import { Spinner } from "@heroui/react";

function Loading() {
  return <Spinner classNames={{ label: "text-foreground mt-4" }} label="spinner" variant="spinner" />
    ;
}

export default Loading;
