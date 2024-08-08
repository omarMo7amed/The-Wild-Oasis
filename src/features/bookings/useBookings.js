import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { Page_Size } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter Bookings
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //sort bookings
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortedBy = { field, direction: direction === "asc" ? true : false };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //the reason for why we insert filter into queryKey => queryKey as adependency array so it's not refresh untill it's value change

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortedBy, page],
    queryFn: () => getBookings({ filter, sortedBy, page }),
  });

  //Pre-Fetching
  const numberOfPages = Math.ceil(count / Page_Size);

  if (page < numberOfPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortedBy, page + 1],
      queryFn: () => getBookings({ filter, sortedBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortedBy, page - 1],
      queryFn: () => getBookings({ filter, sortedBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}

export default useBookings;
