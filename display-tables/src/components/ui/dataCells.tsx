import { Box, TableCell, Typography } from '@mui/material';
import { ReactNode } from 'react';

const numberFormat = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 2,
});

export const FormatNumber = (value: number | string) => {
  const numericValue = Number(value);
  if (value === '' || value === null || Number.isNaN(numericValue)) {
    return '—';
  }
  return numberFormat.format(numericValue);
};

export const numberCellSx = {
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 600,
  whiteSpace: 'nowrap' as const,
};

/** Первая колонка строки — название показателя. */
export const RowLabelCell = ({
  children,
  accent,
  colSpan,
}: {
  children: ReactNode;
  accent?: string;
  colSpan?: number;
}) => (
  <TableCell colSpan={colSpan} sx={{ minWidth: 220 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      {accent && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            flexShrink: 0,
            backgroundColor: accent,
          }}
        />
      )}
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {children}
      </Typography>
    </Box>
  </TableCell>
);

/** Числовая ячейка: моноширинные цифры, единица измерения приглушённая. */
export const ValueCell = ({
  value,
  unit,
  strong,
  colSpan,
}: {
  value: number | string;
  unit?: string;
  strong?: boolean;
  colSpan?: number;
}) => (
  <TableCell align="right" colSpan={colSpan} sx={numberCellSx}>
    <Typography
      component="span"
      sx={{
        fontSize: strong ? '1.05rem' : '0.95rem',
        fontWeight: strong ? 700 : 600,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {FormatNumber(value)}
    </Typography>
    {unit && (
      <Typography
        component="span"
        variant="caption"
        color="text.secondary"
        sx={{ ml: 0.75 }}
      >
        {unit}
      </Typography>
    )}
  </TableCell>
);

/** Текстовая ячейка (дата, время и т.п.). */
export const TextCell = ({
  children,
  align = 'right',
}: {
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
}) => (
  <TableCell align={align}>
    <Typography variant="body2" color="text.secondary" noWrap>
      {children || '—'}
    </Typography>
  </TableCell>
);
