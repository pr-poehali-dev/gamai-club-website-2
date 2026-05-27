import Layout from "@/components/Layout";
import RulesSection from "@/components/RulesSection";
import { useServer } from "@/context/ServerContext";

export default function Rules() {
  const { server } = useServer();
  const displayServer = server || "anarchy";

  return (
    <Layout>
      <RulesSection server={displayServer} />
    </Layout>
  );
}
