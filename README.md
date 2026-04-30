# Padel Analysis Web Application

This project converts the Padelscore v3.xlsx Excel file logic into an interactive web application for analyzing padel match scores and calculating ranking points.

## Features

- Input individual player performance (pool and finals results)
- Support for **two tournament types**: Tournaments and Interclub
- Automatic calculation of ranking points (WP - Winning Points, VP - Losing Points)
- Support for different categories (Regular and Gemengd/Mixed)
- Different multipliers based on tournament and category combination
- Detailed statistics and performance analysis
- Based on the exact formulas from Padelscore v3.xlsx

## Project Structure

```
.
├── index.html          # Main HTML interface
├── styles.css          # Application styling
├── script.js           # Scoring logic and calculations
├── server.py           # Python development server (alternative)
├── server.js           # Node.js development server
├── package.json        # Project metadata
├── README.md           # This file
├── Padelscore v3.xlsx  # Original Excel file (reference)
└── .github/
    └── copilot-instructions.md   # Project setup documentation
```

## Getting Started

### Quick Start (No Dependencies)

Simply open `index.html` in your web browser:
1. Right-click on `index.html`
2. Select "Open with" → Your preferred browser
3. The app will load and be fully functional

### With Node.js Server

If you have Node.js installed:

```bash
cd c:\Workspaces\padelanalysis
node server.js
```

Then open http://localhost:8000 in your browser.

### With Python Server

If you have Python installed:

```bash
cd c:\Workspaces\padelanalysis
python server.py
```

Then open http://localhost:8000 in your browser.

## How to Use

1. **Enter Player Name**: Input the player's name for identification
2. **Select Category**: Choose between "Regular" or "Gemengd (Mixed)"
3. **Enter Match Results**:
   - Pool Wins: Number of matches won in the pool round
   - Pool Defeats: Number of matches lost in the pool round
   - Finals Wins: Number of matches won in the finals round
   - Finals Defeats: Number of matches lost in the finals round
4. **Calculate**: Click "Calculate Points" to compute the ranking points
5. **View Results**: The application displays:
   - Winning Points (WP)
   - Losing Points (VP)
   - Total Points
   - Performance statistics
   - Win rate percentage

## Scoring Formula (Padelscore v3 Logic)

The formula is the same for both tournament types, but with different category multipliers:

```
WP (Winning Points) = (Pool_Wins × 1 + Finals_Wins × 1.5) × Category_Multiplier
VP (Losing Points) = (Pool_Defeats × 1 + Finals_Defeats × 0.5) × Category_Multiplier
```

### Tournament Type Multipliers

#### Tournaments Tournament
- **Regular**: 1.0 (Full points)
- **Gemengd (Mixed)**: 0.4 (40% of points)

#### Interclub Tournament
- **Regular**: 0.8 (80% of points)
- **Gemengd (Mixed)**: 0.4 (40% of points)

### Key Points:
- Finals wins/defeats are weighted differently (1.5x for wins, 0.5x for defeats)
- Tournaments give regular players full points
- Interclub tournaments reduce regular players' points by 20%
- Mixed category matches have a 40% multiplier in both tournament types
- Total Points = WP + VP

## Example Calculation

**Player: John Doe | Category: Regular**
- Pool Wins: 5, Pool Defeats: 2
- Finals Wins: 3, Finals Defeats: 1

### Tournaments (Multiplier: 1.0)
WP = (5 × 1 + 3 × 1.5) × 1.0 = (5 + 4.5) × 1.0 = **9.50**
VP = (2 × 1 + 1 × 0.5) × 1.0 = (2 + 0.5) × 1.0 = **2.50**
Total Points = 9.50 + 2.50 = **12.00**

### Interclub Tournament (Multiplier: 0.8)
WP = (5 × 1 + 3 × 1.5) × 0.8 = (5 + 4.5) × 0.8 = **7.60**
VP = (2 × 1 + 1 × 0.5) × 0.8 = (2 + 0.5) × 0.8 = **2.00**
Total Points = 7.60 + 2.00 = **9.60**

Note: The same player gets fewer ranking points in Interclub tournaments due to the 0.8 multiplier.

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients and responsive design
- **JavaScript (Vanilla)**: No dependencies, pure ES6+ JavaScript
- **Server**: Optional Node.js or Python (for development)

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Future Enhancements

- [ ] Import match data from Excel files
- [ ] Export results as CSV/PDF
- [ ] Player history tracking
- [ ] Multiple player comparison
- [ ] Tournament management
- [ ] Database integration for persistence
- [ ] Advanced analytics and charts

## Notes

- The application is completely client-side; no server-side processing is needed for calculations
- All calculations follow the exact logic from Padelscore v3.xlsx
- The scoring system is specific to padel tennis tournaments using the Padelscore v3 methodology

## Support

For issues or questions about the Padelscore v3 logic, refer to the original Excel file: `Padelscore v3.xlsx`

---

**Version**: 1.0
**Last Updated**: April 29, 2026
**Based on**: Padelscore v3.xlsx
