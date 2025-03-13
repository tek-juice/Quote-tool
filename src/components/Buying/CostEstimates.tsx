import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getClients, getPurchaseDetails } from "../../store/data";
import EstimateHeader from "./EstimateHeader";
import EstimateTable from "./EstimateTable";
import { PurchaseDetails } from "../../types";

const CostEstimate = () => {
  const clients = useSelector(getClients);
  const purchaseDetails: PurchaseDetails = useSelector(getPurchaseDetails) as PurchaseDetails || { 
    price: 0, 
    referenceNumber: 0, 
    people: [], 
    tenure: "", 
    address: "", 
    questions: [] 
  };

  const firstClient = clients[0] || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  return (
    <Box>
      <hr />
      <EstimateHeader
      email={firstClient.email || ""}
      name={`${firstClient.firstName} ${firstClient.lastName}`}
      phone_number={firstClient.phone || ""}
      purchase_price={purchaseDetails.price || 0}
      reference_number={Math.floor(10000000 + Math.random() * 90000000)}
      />
      <br />
      <EstimateTable />
    </Box>
  );
};

export default CostEstimate;
