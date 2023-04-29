import { createDrawLot } from "@/api";
import { logError } from "@/utils";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

const DrawLots = () => {
  const router = useRouter();
  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await createDrawLot();
      router.push(res.data.url);
    } catch (e) {
      logError(e);
    }
  };

  return (
    <div>
      draw lots
      <Button onClick={handleClick}>Create new session</Button>
    </div>
  );
};

export default DrawLots;
