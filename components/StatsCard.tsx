import React, { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props {
  title: string;
  value: number;
}

const StatsCard: FC<Props> = ({ title, value }) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center gap-4">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
