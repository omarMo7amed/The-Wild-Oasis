import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBY";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by name (A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort by name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by regularPrice (Low first)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by regularPrice (High first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by maxCapacity (Low first)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by maxCapacity (High first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
