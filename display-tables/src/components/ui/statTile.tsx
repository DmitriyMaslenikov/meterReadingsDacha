import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FormatNumber } from './dataCells';

export const StatTile = ({
  label,
  value,
  unit,
  caption,
  accent,
}: {
  label: string;
  value: number | string;
  unit?: string;
  caption?: string;
  accent: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      flex: 1,
      minWidth: 200,
      p: 2.5,
      position: 'relative',
      overflow: 'hidden',
      border: 1,
      borderColor: 'divider',
      boxShadow:
        '0 1px 2px rgba(15, 23, 42, 0.04), 0 18px 40px -30px rgba(15, 23, 42, 0.5)',
      '&::before': {
        content: '""',
        position: 'absolute',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: accent,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        right: -40,
        top: -40,
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: alpha(accent, 0.08),
      },
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mt: 0.75 }}>
      <Typography
        variant="h4"
        sx={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}
      >
        {FormatNumber(value)}
      </Typography>
      {unit && (
        <Typography variant="subtitle2" color="text.secondary">
          {unit}
        </Typography>
      )}
    </Box>
    {caption && (
      <Typography variant="caption" color="text.secondary">
        {caption}
      </Typography>
    )}
  </Paper>
);
