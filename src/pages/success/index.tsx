import { CountdownTimer } from "@/components";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Success = () => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLogged) {
      timeout = setTimeout(() => {
        router.push("/draw-lots");
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isLogged]);

  return (
    <div>
      success <br />
      {isLogged && (
        <>
          Redirecting in
          <CountdownTimer
            initialHour={0}
            initialMinute={0}
            initialSeconds={5}
          />
        </>
      )}
    </div>
  );
};

export default Success;
