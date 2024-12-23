import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MASTERS_ITEMS } from "../../constants/Menu/MastersItems";
import { GlassBG, MyHeading } from "../../components/custom";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { postData } from "../../helpers/http";
import MyTable from "../../components/custom/MyTable";
import IconWrapper from "../../components/custom/IconWrapper";

const Masters = () => {
  const theme = useTheme();
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });

  useEffect(() => {
    if (!Array.isArray(selectedMenuCard?.collection)) {
      fetchMastersData({
        page: 1,
        limit: 10,
      });
    } else {
      const oneObj = selectedMenuCard?.collection?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            id: x,
            label: x,
            minWidth: 170,
          };
        }),
        data: selectedMenuCard?.collection ?? [],
        totalCount: selectedMenuCard?.collection?.length || 0,
        defaultPage: 0,
      });
    }
  }, [selectedMenuCard]);

  const fetchMastersData = async (paginationObj) => {
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
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          justifyContent: "space-between",
        }}
      >
        {MASTERS_ITEMS.map((x, i) => {
          return (
            <Box
              onClick={() => setSelectedMenuCard(x)}
              sx={{
                // flexBasis: "47.4%",
                ml: 1,
                mr: 1,
              }}
              key={i}
            >
              <GlassBG
                cardStyles={{
                  height: "40px",
                  cursor: "pointer",
                  minWidth: "100px",
                  maxWidth: "100px",
                }}
              >
                <MyHeading
                  text={
                    <IconWrapper
                      icon={x.icon}
                      color={
                        selectedMenuCard === x
                          ? theme.palette.primary.main
                          : null
                      }
                    />
                  }
                  alignCenter
                  variant="body1"
                />
                <MyHeading
                  text={x.label}
                  alignCenter
                  variant="caption"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
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
          <HeaderWithSearch
            headerText={selectedMenuCard.label}
            headerIcon={
              <IconWrapper
                icon={selectedMenuCard.icon}
                color={theme.palette.primary.main}
              />
            }
          />
          <MyTable
            {...tableObj}
            changedPage={(newPage) => {
              fetchMastersData({
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
