import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  //filter cabins
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);

  //sort cabin
  const sortValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

//v-1
// import styled from "styled-components";
// import CabinRow from "./CabinRow";
// import { useCabin } from "./useCabin";
// import Spinner from "../../ui/Spinner";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

// function CabinTable() {
//   const { cabins, isLoading } = useCabin();

//   if (isLoading) return <Spinner />;

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </TableHeader>
//       {cabins?.map((cabin) => (
//         <CabinRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   );
// }

// export default CabinTable;
