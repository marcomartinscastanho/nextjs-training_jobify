import CreateJobForm from "@/components/CreateJobForm";
import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const AddJobPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
  );
};

export default AddJobPage;
