import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MASTERS_ITEMS } from "../../constants/Menu/MastersItems";
import { GlassBG, MyHeading } from "../../components/custom";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { alpha } from "@mui/material/styles";
import { postData } from "../../helpers/http";
import MyTable from "../../components/custom/MyTable";

const Masters = () => {
  const theme = useTheme();
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [paginationObj, setPaginationObj] = useState({
    page: 0,
    limit: 10,
  });
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });

  useEffect(() => {
    if (selectedMenuCard) {
      fetchMastersData();
    }
  }, [selectedMenuCard, paginationObj.page]);

  const fetchMastersData = async () => {
    const response = await postData(
      `/masters/${selectedMenuCard.collection}`,
      paginationObj
    );
    if (response) {
      const oneObj = response?.data?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            id: x,
            label: x,
            minWidth: 170,
            type: x === "createdAt" || x === "updatedAt" ? "date" : "string",
          };
        }),
        data: response?.data ?? [],
        totalCount: response?.totalPages || 0,
        defaultPage: response?.page || 0,
      });
    } else {
      setTableObj({
        columns: [],
        data: [],
        totalCount: 0,
        defaultPage: 0,
      });
    }
  };

  const MasterItems = () => {
    return (
      <Stack direction={"row"} sx={{ display: "flex", flexWrap: "wrap" }}>
        {MASTERS_ITEMS.map((x, i) => {
          return (
            <Box
              onClick={() => setSelectedMenuCard(x)}
              sx={{
                flexBasis: "47.4%",
                m: 0.5,
              }}
              key={i}
            >
              <GlassBG
                cardStyles={{
                  height: "40px",
                  cursor: "pointer",
                  minWidth: "75px",
                }}
              >
                <MyHeading text={x.icon} alignCenter variant="body1" />
                <MyHeading text={x.label} alignCenter variant="caption" />
              </GlassBG>
            </Box>
          );
        })}
      </Stack>
    );
  };
  return (
    <Stack direction={"row"} sx={{ display: "flex" }}>
      <Box
        sx={{
          flexBasis: "21%",
          m: 0.5,
          height: "calc(100vh - 55px)",
          overflowY: "auto",
        }}
      >
        <MasterItems />
      </Box>
      {selectedMenuCard && (
        <Box sx={{ flexBasis: "80%", m: 0.5 }}>
          <HeaderWithSearch headerText={selectedMenuCard.label} />
          <MyTable
            {...tableObj}
            changedPage={(newPage) => {
              setPaginationObj({
                page: newPage,
                limit: 10,
              });
            }}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Masters;
