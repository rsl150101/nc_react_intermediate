import { BrowserRouter, Routes, Route } from "react-router-dom";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

interface IRouterProps {
  isDark: boolean;
  toggleDark: () => void;
}

function Router({ isDark, toggleDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":coinId" element={<Coin isDark={isDark} />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
