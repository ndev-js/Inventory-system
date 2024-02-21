"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { string } from "zod";
interface Props {
  params: {
    jwt: string;
  };
}
interface Result {
  message: string;
}
const ActivationAccountPage = ({ params }: Props) => {
  const [result, setResult] = useState<Result>({ message: "" });
  const handleActivation = async () => {
    const data = await axios.get(
      `http://localhost:3002/api/auth/activation/${params.jwt}`
    );
    console.log(data.data);
    setResult(data.data);
  };
  useEffect(() => {
    handleActivation();
  }, []);
  return (
    <>
      <div>ActivationAccountPage</div>
      <p>{result?.message}</p>
    </>
  );
};

export default ActivationAccountPage;
