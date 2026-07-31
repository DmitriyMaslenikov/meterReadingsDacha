import { Box, Paper, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const SectionCard = ({
  title,
  subtitle,
  actions,
  footer,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        boxShadow:
          '0 1px 2px rgba(15, 23, 42, 0.04), 0 18px 40px -28px rgba(15, 23, 42, 0.45)',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          px: 3,
          py: 2.25,
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
          background:
            'linear-gradient(180deg, rgba(248, 250, 252, 0.9), rgba(255, 255, 255, 0.9))',
        }}
      >
        <Box>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && (
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
          >
            {actions}
          </Stack>
        )}
      </Stack>

      <Box sx={{ overflowX: 'auto' }}>{children}</Box>

      {footer && (
        <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
          {footer}
        </Box>
      )}
    </Paper>
  );
};
