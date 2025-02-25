import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface ChartContext {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartContext>();
  const { isLoading, data } = useQuery({
    queryKey: ["ohlcv"],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return <></>;
}

export default Chart;
