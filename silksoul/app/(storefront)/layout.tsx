import { StorefrontFrame } from "@/components/StorefrontFrame";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StorefrontFrame>{children}</StorefrontFrame>
      <CartDrawer />
    </>
  );
}