import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import "./PresenzeChart.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { presenzeFetch } from "../../app/reducers/presenzeSlice";
import { Alert, Spinner } from "react-bootstrap";
import { IoIosPeople } from "react-icons/io";

export const PresenzeChart = () => {
  const presenze = useAppSelector((state) => state.presenze);
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile);
  const [data, setData] = useState([] as DataGraph[]);

  interface DataGraph {
    name: Date | string;
    Presenze: number;
    data: Date | string;
  }

  const gestioneChart = () => {
    let array = [] as any;
    array = [...presenze.lezioni?.map((el) => ({ Name: el.corso.name, Presenze: el.presenze.length, Data: el.data }))];
    console.log(array);
    return array;
  };

  useEffect(() => {
    dispatch(presenzeFetch({ accessToken: loginToken.token?.accessToken }));
  }, []);

  useEffect(() => {
    setData(gestioneChart());
  }, [presenze.lezioni]);

  return (
    <>
      {presenze.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}
      {presenze.status === "loading" && <Spinner variant={"primary"} />}
      {presenze.status === "idle" && presenze.lezioni.length < 1 && <Alert variant={"primary"}>Dati non sufficienti</Alert>}
      {presenze.status === "idle" && presenze.lezioni.length > 0 && (
        <>
          {" "}
          <h5 className="titoloGrafico">
            <IoIosPeople />
            Grafico presenze
          </h5>
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={data} margin={{ top: 0, right: 30, left: -60, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7280ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7280ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="Data" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="Presenze" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
};
