import { getAddress } from "@/app/_action/Address.action";
import AddressClient from "@/app/_components/AddressClient";

export default async function AddressServer() {
  const addresses = await getAddress();
  return <AddressClient addresses={addresses} />;
}
