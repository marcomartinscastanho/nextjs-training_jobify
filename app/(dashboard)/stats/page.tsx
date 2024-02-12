import { getStatsAction } from "@/utils/actions";
import React from "react";

const StatsPage = async () => {
  const stats = await getStatsAction();
  return <h1 className="text-4xl">StatsPage</h1>;
};

export default StatsPage;
