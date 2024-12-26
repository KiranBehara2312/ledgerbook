import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import IconWrapper from "../../../components/custom/IconWrapper";
import { useForm } from "react-hook-form";
import { Box, Button, InputAdornment, useTheme } from "@mui/material";
import { FaCalendarCheck, FaExpand, FaHistory } from "react-icons/fa";
import { postData } from "../../../helpers/http";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_TimeSelect from "../../../components/custom/form/F_TimeSelect";
import F_Input from "../../../components/custom/form/F_Input";

const DEFAULT_VAL = {};

const GenerateSlots = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedRow = null,
  action = null,
}) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VAL,
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();

  const onSubmit = async (formData) => {
    const payload = {
      doctor: selectedRow?.userName,
      ...formData,
    };
    const response = await postData("/appointment/daySlotGeneration", payload);
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };

  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarCheck size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <Box sx={{ display: "flex", gap: 1, pt: "40px" }}>
        <GlassBG cardStyles={{ width: "100%", m: 2, height: "auto" }}>
          {/* <MyHeading
            alignCenter
            text="Vital Information"
            variant="h6"
            sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
          /> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <F_TimeSelect
              name="fromTime"
              control={control}
              errors={errors}
              rules={{
                required: "From Time is required",
              }}
              maxWidth="100%"
              label="From Time"
            />
            <F_TimeSelect
              name="toTime"
              control={control}
              errors={errors}
              rules={{
                required: "To Time is required",
              }}
              maxWidth="100%"
              label="To Time"
            />
            <F_Input
              name="slotDuration"
              control={control}
              errors={errors}
              rules={{}}
              maxWidth="100%"
              label="Slot Duration"
              readOnly
              defaultValue={selectedRow?.slotTime}
              isDisabled
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  Min
                </InputAdornment>
              }
            />
            <F_Input
              name="timeGap"
              control={control}
              errors={errors}
              rules={{}}
              maxWidth="100%"
              label="Time Gap"
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  Min
                </InputAdornment>
              }
            />
            <Button
              variant="contained"
              size="small"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </GlassBG>
      </Box>
    </>
  );
};

export default GenerateSlots;
