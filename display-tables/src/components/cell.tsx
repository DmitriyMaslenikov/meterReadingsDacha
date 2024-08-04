import { Typography, TextField, TableCell } from '@mui/material';
import { useState } from 'react';

export const Cell = ({
  initialValue,
  setValue,
}: {
  initialValue: number;
  setValue: any;
}) => {
  const [inputValue, setInputValue] = useState(false);

  let valueVorSave = 0;

  if (inputValue) {
    return (
      <TableCell
        align="center"
        padding="none"
        sx={{
          border: 2,
          '&:hover': {
            backgroundColor: 'gray',
            cursor: 'pointer',
          },
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (
              Number(event.target.value) >= 0 &&
              Number(event.target.value) <= 1000000
            ) {
              valueVorSave = Number(event.target.value);
            }
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              setValue(valueVorSave);
              setInputValue(false);
            }
          }}
          onBlur={() => {
            setInputValue(false);
          }}
          autoFocus
        />
      </TableCell>
    );
  } else {
    return (
      <TableCell
        align="center"
        padding="none"
        onClick={() => {
          setInputValue(true);
        }}
        sx={{
          border: 2,
          // '&:hover': {
          //   backgroundColor: 'gray',
          //   cursor: 'pointer',
          // },
        }}
      >
        <Typography sx={{ height: '100%' }} variant="h6">
          {initialValue === 0 ? '-' : initialValue}
        </Typography>
      </TableCell>
    );
  }
};
