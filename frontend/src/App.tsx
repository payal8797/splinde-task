import { useEffect, useState } from "react";
import { fetchSectionData } from "./api/dataService";
import type { Section } from "./types";
import { TreeView } from "./components/TreeView";
import { Spin } from "antd";

const App = () => {
  const [data, setData] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSectionData()
      .then(setData)
      .catch((err) => {
        console.error("Failed to fetch data", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      />
    );

  return data ? (
    <TreeView data={data} setData={setData} />
  ) : (
    <p>Failed to load data</p>
  );
};

export default App;
