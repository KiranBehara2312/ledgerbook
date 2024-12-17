import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Divider,
  Pagination,
  Popover,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { camelToTitle, convertMongoDBDate } from "../../helpers";
import { alpha } from "@mui/material/styles";

export default function ({
  columns,
  data,
  totalCount,
  defaultPage,
  changedPage,
  actions = [],
  helperNote = "",
  actionWithRecord = () => {},
  ...props
}) {
  const theme = useTheme();
  const [anchorPosition, setAnchorPosition] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const paginationChangeHandler = (event, value) => {
    changedPage(value);
  };

  const openActions = (event, row) => {
    if (actions?.length === 0) return;
    event.preventDefault();
    setSelectedRow(row);
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };

  const closeActions = () => {
    setAnchorPosition(null);
    setSelectedRow(null);
  };

  const actionClickHandler = (action) => {
    actionWithRecord(action, selectedRow);
    closeActions();
  };

  const convertDisplayValueBasedOnType = (val) => {
    if (typeof val === "boolean") {
      return val ? "Yes" : "No";
    } else {
      return val;
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead
            sx={{
              background: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {camelToTitle(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length === 0 && (
              <TableRow hover role="checkbox">
                <TableCell>No Data Found...!</TableCell>
              </TableRow>
            )}
            {data?.map((row, i) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                  onContextMenu={(event) => openActions(event, row)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.type === "date"
                          ? convertMongoDBDate(value)
                          : convertDisplayValueBasedOnType(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ pl: 1, color: "red", fontSize: "12px" }}
        >
          {helperNote ?? ""}
        </Typography>
        <Pagination
          sx={{ m: 1, float: "right" }}
          variant="outlined"
          color="primary"
          shape="rounded"
          count={totalCount}
          page={defaultPage}
          onChange={paginationChangeHandler}
        />
      </Box>

      <Popover
        open={Boolean(anchorPosition)}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        onClose={closeActions}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          {actions?.map((x, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "80px",
                  m: 1,
                  cursor: x.disabled ? 'no-drop' : 'pointer',
                  opacity: x.disabled ? 0.2 : 1,
                  pointerEvents: x.disabled ? "none" : "all",
                }}
                onClick={() => actionClickHandler(x.name)}
              >
                <span style={{ flexBasis: "25%" }}>{x.icon}</span>
                <Typography
                  variant="body2"
                  style={{ flexBasis: "75%", marginLeft: "8px" }}
                >
                  {x.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Popover>
    </Paper>
  );
}
