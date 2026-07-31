import { Box, TableCell, TextField, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { FormatNumber } from './ui/dataCells';

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 20h4L20 8l-4-4L4 16v4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cell = ({
  initialValue,
  setValue,
  colSpan,
  unit,
}: {
  initialValue: number;
  setValue: any;
  colSpan: number;
  unit?: string;
}) => {
  const [inputValue, setInputValue] = useState(false);

  let valueVorSave = 0;

  if (inputValue) {
    return (
      <TableCell align="right" colSpan={colSpan} sx={{ py: 1 }}>
        <TextField
          fullWidth
          size="small"
          type="number"
          autoFocus
          inputProps={{ style: { textAlign: 'right', fontWeight: 600 } }}
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
        />
      </TableCell>
    );
  }

  return (
    <Tooltip title="Нажмите, чтобы изменить" placement="top" arrow>
      <TableCell
        align="right"
        colSpan={colSpan}
        onClick={() => {
          setInputValue(true);
        }}
        sx={{
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: (t) => alpha(t.palette.primary.main, 0.06),
          },
          '&:hover .cell-edit-icon': { opacity: 1 },
        }}
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 0.75 }}>
          <Box
            className="cell-edit-icon"
            component="span"
            sx={{
              opacity: 0,
              transition: 'opacity 0.15s ease',
              color: 'primary.main',
              alignSelf: 'center',
              display: 'inline-flex',
            }}
          >
            <PencilIcon />
          </Box>
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              borderBottom: '1px dashed',
              borderColor: 'divider',
            }}
          >
            {initialValue === 0 ? '—' : FormatNumber(initialValue)}
          </Typography>
          {unit && (
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
            >
              {unit}
            </Typography>
          )}
        </Box>
      </TableCell>
    </Tooltip>
  );
};
