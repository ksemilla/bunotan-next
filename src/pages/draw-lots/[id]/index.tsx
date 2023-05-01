import { DrawLotLayout } from "@/layouts";
import { NextPageWithLayout } from "@/types/utils";

const DrawLot: NextPageWithLayout = () => {
  return <div>draw lot</div>;
};

DrawLot.getLayout = function getLayout(page: React.ReactNode) {
  return <DrawLotLayout>{page}</DrawLotLayout>;
};

export default DrawLot;
