import * as React from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function CanteenMenu() {
  const menuData = [
    { day: 'Mon', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
    { day: 'Tues', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
    { day: 'Wed', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
    { day: 'Thurs', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
    { day: 'Fri', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
    { day: 'Sat', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
    { day: 'Sun', breakfast: 'Bara/Idli/Puri + Ghuguni', meal: 'Rice + Dal + Pampada + Chips', dinner: 'Roti/Rice + Dalfry', extra: '---' },
  ];

  const cellStyle = {
    maxWidth: '180px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    fontSize: '14px',
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 1, sm: 3, md: 10 }, mt: 10 }}>
      <Typography level="h3" sx={{ textAlign: 'center', mb: 4 }}>
        📜 Canteen Menu
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Table
          borderAxis="both"
          stripe="even"
          stickyHeader
          aria-label="canteen menu"
          size="sm"
          sx={{
            th: {
              fontSize: '14px',
              whiteSpace: 'nowrap',
            },
            td: cellStyle,
          }}
        >
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Meal</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((item, index) => (
              <tr key={index}>
                <td style={cellStyle}>{item.day}</td>
                <td style={cellStyle}>{item.breakfast}</td>
                <td style={cellStyle}>{item.meal}</td>
                <td style={cellStyle}>{item.dinner}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
}
