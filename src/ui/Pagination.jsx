import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Page_Size } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const NumberOfPages = Math.ceil(count / Page_Size);

  function handlePreviousClick() {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  function handleNextClick() {
    const nextPage =
      currentPage === NumberOfPages ? currentPage : currentPage + 1;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  if (NumberOfPages <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * Page_Size + 1} </span> to
        <span>
          {" "}
          {currentPage === NumberOfPages ? count : currentPage * Page_Size}{" "}
        </span>
        of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={handleNextClick}
          disabled={currentPage === NumberOfPages}
        >
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
