import { createClient } from "polkadot-api";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getSmProvider } from "polkadot-api/sm-provider";
import { wnd } from "@polkadot-api/descriptors";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import { useTokenFormatter } from "./formatter";

const chainSpec = import("polkadot-api/chains/westend2").then(
  (m) => m.chainSpec
);

const worker = new Worker(
  new URL("polkadot-api/smoldot/worker", import.meta.url)
);

const smoldot = startFromWorker(worker);
const client = createClient(
  getSmProvider(chainSpec.then((chainSpec) => smoldot.addChain({ chainSpec })))
);

const typedApi = client.getTypedApi(wnd);

typedApi.query.Balances.TotalIssuance.getValue().then((res) =>
  console.log("total issuance", res)
);

const useIssuance = () => {
  const [issuance, setIssuance] = useState<null | bigint>(null);

  useEffect(() => {
    const subscription =
      typedApi.query.Balances.TotalIssuance.watchValue().subscribe(setIssuance);
    return () => subscription.unsubscribe();
  }, []);

  return issuance;
};

const ShowIssuance = () => {
  const issuance = useIssuance();
  const tokenFormatter = useTokenFormatter(chainSpec);

  if (issuance == null) {
    return <div>Loading...</div>;
  }

  return <div>Total issuance: {tokenFormatter(issuance)}</div>;
};

createRoot(document.getElementById("app")).render(
  <>
    <h1>Webpack + react + typescript + smoldot + papi</h1>
    <ShowIssuance />
  </>
);
