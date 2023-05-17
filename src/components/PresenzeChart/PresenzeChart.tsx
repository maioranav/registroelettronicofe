import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./PresenzeChart.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { presenzeFetch } from "../../app/reducers/presenzeSlice";
import { Alert, Spinner } from "react-bootstrap";

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
        <ResponsiveContainer width="100%" height={270}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="Data" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="Presenze" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
