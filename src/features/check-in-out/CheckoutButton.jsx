import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  function handleClick() {
    checkout(bookingId);
  }

  return (
    <Button
      variation="primary"
      onClick={handleClick}
      size="small"
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
