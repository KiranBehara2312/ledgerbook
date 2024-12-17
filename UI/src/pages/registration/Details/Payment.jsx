import React from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import { PAYMENT_TYPES } from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";

const Payment = ({ control, errors }) => {
  return (
    <>
      <GlassBG cardStyles={{ width: "240px", m: 1, height: "auto" }}>
        <MyHeading
          alignCenter
          text="Payment Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Select
          control={control}
          name={"paymentType"}
          label={"Payment Type"}
          list={PAYMENT_TYPES}
          rules={{ required: "Payment Type is required" }}
          isRequired={true}
          errors={errors}
        />

        <F_Input
          name="payeeName"
          control={control}
          errors={errors}
          rules={{ required: "Payee Name is required" }}
          label="Payee Name"
          isRequired={true}
        />

        <F_Input
          name="transactionId"
          control={control}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Transaction ID is required",
            },
          }}
          label="Transaction ID"
          isRequired={true}
        />
      </GlassBG>
    </>
  );
};

export default Payment;
