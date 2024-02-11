import React, { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
}

const JobCardInfo: FC<Props> = ({ icon, text }) => {
  return (
    <div className="flex gap-x-2 items-center">
      {icon}
      {text}
    </div>
  );
};

export default JobCardInfo;
