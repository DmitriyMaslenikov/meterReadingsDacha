import { createTheme, alpha } from '@mui/material/styles';

export const palette = {
  ink: '#0F172A',
  muted: '#64748B',
  line: '#E2E8F0',
  surface: '#FFFFFF',
  canvas: '#F1F5F9',
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  day: '#F59E0B',
  night: '#6366F1',
  success: '#10B981',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.primary, dark: palette.primaryDark },
    secondary: { main: palette.night },
    success: { main: palette.success },
    warning: { main: palette.day },
    background: { default: palette.canvas, paper: palette.surface },
    text: { primary: palette.ink, secondary: palette.muted },
    divider: palette.line,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.canvas,
          backgroundImage: `radial-gradient(1200px 600px at 100% -10%, ${alpha(
            palette.primary,
            0.1
          )}, transparent 60%), radial-gradient(900px 500px at -10% 0%, ${alpha(
            palette.night,
            0.1
          )}, transparent 55%)`,
          backgroundAttachment: 'fixed',
        },
        '@media print': {
          body: { backgroundImage: 'none', backgroundColor: '#fff' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 16 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 9,
        },
        outlined: {
          borderColor: palette.line,
          color: palette.ink,
          backgroundColor: palette.surface,
          '&:hover': {
            borderColor: alpha(palette.primary, 0.5),
            backgroundColor: alpha(palette.primary, 0.04),
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: { borderCollapse: 'separate', borderSpacing: 0 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.line}`,
          fontSize: '0.95rem',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#F8FAFC',
          color: palette.muted,
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-of-type td': { borderBottom: 'none' },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          border: `1px solid ${palette.line}`,
          boxShadow: '0 24px 60px -20px rgba(15, 23, 42, 0.35)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.15rem',
          fontWeight: 700,
          padding: '20px 24px 8px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 24px 20px',
          gap: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
  },
});
