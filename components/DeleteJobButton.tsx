import React, { FC } from "react";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteJobAction } from "@/utils/actions";

interface Props {
  id: string;
}

const DeleteJobButton: FC<Props> = ({ id }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast({ description: "job removed" });
    },
    onError: () => toast({ description: "there was an error" }),
  });

  return (
    <Button size="sm" disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
};

export default DeleteJobButton;
