import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

import { fetchCoinHistory } from "../api";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartContext {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartContext>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv"],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            stroke: { curve: "smooth", width: 4 },
            grid: {
              show: false,
            },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
