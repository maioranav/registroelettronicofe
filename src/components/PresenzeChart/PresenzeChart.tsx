import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./PresenzeChart.scss";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

export const PresenzeChart = () => {
  const lezioni = useAppSelector((state) => state.lezioni);
  const [data, setData] = useState([] as DataGraph[]);

  interface DataGraph {
    name: Date | string;
    Presenze: number;
  }

  const gestioneChart = () => {
    const array = [] as DataGraph[];
    lezioni.lezioni.forEach((el) => {
      array.push({
        name: (el.data + "").substring(el.data.toString().lastIndexOf("-") + 1),
        Presenze: el.presenze.length,
      });
    });
    return array;
  };

  useEffect(() => {
    setData(gestioneChart());
  }, [lezioni.lezioni]);

  return (
    <ResponsiveContainer width="100%" height={270}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="Presenze" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
