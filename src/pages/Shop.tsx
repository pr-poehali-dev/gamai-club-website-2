import Layout from "@/components/Layout";
import ShopSection from "@/components/ShopSection";
import { useServer } from "@/context/ServerContext";

export default function Shop() {
  const { server, addToCart } = useServer();
  const displayServer = server || "anarchy";

  return (
    <Layout>
      <ShopSection server={displayServer} onAddToCart={addToCart} />
    </Layout>
  );
}
