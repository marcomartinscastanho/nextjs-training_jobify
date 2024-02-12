"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FC } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { getJobAction, updateJobAction } from "@/utils/actions";
import {
  CreateAndEditJobType,
  JobMode,
  JobStatus,
  createAndEditJobSchema,
} from "@/types/job";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Button } from "./ui/button";

interface Props {
  id: string;
}

const EditJobForm: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobAction(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => updateJobAction(id, values),
    onSuccess: (data) => {
      toast({ description: "job updated" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", id] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/jobs");
    },
    onError: () => toast({ description: "there was an error" }),
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  // 2. Define a submit handler
  const handleSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-muted p-8 rounded">
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 mf:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job mode */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          {/* button */}
          <Button type="submit" className="self-end capitalize" disabled={isPending}>
            {isPending ? "adding..." : "submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditJobForm;
