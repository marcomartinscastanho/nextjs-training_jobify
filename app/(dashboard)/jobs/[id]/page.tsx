import EditJobForm from "@/components/EditJobForm";
import { getJobAction } from "@/utils/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React, { FC } from "react";

interface Props {
  params: { id: string };
}

const JobPage: FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["job", params.id],
    queryFn: () => getJobAction(params.id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm id={params.id} />
    </HydrationBoundary>
  );
};

export default JobPage;
