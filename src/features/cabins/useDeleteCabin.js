import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  //to delete cabin
  const { isLoading: isDeleteing, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      //toast to show awesome propt
      toast.success("Cabin successfully deleted");
      // to invalidateQueries immediately
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleteing, deleteCabin };
}
