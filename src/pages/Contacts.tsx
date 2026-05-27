import Layout from "@/components/Layout";
import ContactsSection from "@/components/ContactsSection";
import { useServer } from "@/context/ServerContext";

export default function Contacts() {
  const { server } = useServer();
  const displayServer = server || "anarchy";

  return (
    <Layout>
      <ContactsSection server={displayServer} />
    </Layout>
  );
}
