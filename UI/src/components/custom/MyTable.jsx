import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { Pagination, TableRow, useTheme } from "@mui/material";
import { camelToTitle, convertMongoDBDate } from "../../helpers";
import { alpha } from "@mui/material/styles";

export default function ({
  columns,
  data,
  totalCount,
  defaultPage,
  changedPage,
}) {
  const theme = useTheme();
  const paginationChangeHandler = (event, value) => {
    changedPage(value);
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
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.type === "date"
                          ? convertMongoDBDate(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ m: 1, float: "right" }}
        variant="outlined"
        color="primary"
        shape="rounded"
        count={totalCount}
        page={defaultPage}
        onChange={paginationChangeHandler}
      />
    </Paper>
  );
}
