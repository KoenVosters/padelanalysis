// Padel Score Analyzer - Based on Padelscore v3 Logic
class PadelAnalyzer {
    constructor() {
        this.form = document.getElementById('scoreForm');
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const playerName = document.getElementById('playerName').value;
        
        const combinations = [
            {
                tournament: 'tournaments',
                category: 'regular',
                legend: 'Tournaments - Regular'
            },
            {
                tournament: 'tournaments',
                category: 'mixed',
                legend: 'Tournaments - Gemengd (Mixed)'
            },
            {
                tournament: 'interclub',
                category: 'regular',
                legend: 'Interclub - Regular'
            },
            {
                tournament: 'interclub',
                category: 'mixed',
                legend: 'Interclub - Gemengd (Mixed)'
            }
        ];

        const results = [];
        
        for (const combo of combinations) {
            const prefix = `${combo.tournament}-${combo.category}`;
            const pouleWins = parseInt(document.getElementById(`${prefix}-poolWins`).value) || 0;
            const pouleDefeats = parseInt(document.getElementById(`${prefix}-poolDefeats`).value) || 0;
            const finalsWins = parseInt(document.getElementById(`${prefix}-finalsWins`).value) || 0;
            const finalsDefeats = parseInt(document.getElementById(`${prefix}-finalsDefeats`).value) || 0;

            const analysis = this.calculatePadelPoints({
                name: playerName,
                tournamentType: combo.tournament,
                pouleWins,
                pouleDefeats,
                finalsWins,
                finalsDefeats,
                category: combo.category,
            });

            results.push({
                ...analysis,
                legend: combo.legend
            });
        }

        this.displayResults(playerName, results);
    }

    calculatePadelPoints(player) {
        // Based on Padelscore v3 Excel logic
        // WP (Winning Points) = (Poule_W * 1 + Finals_W * 1.5) * Category_Multiplier
        // VP (Losing Points) = (Poule_V * 1 + Finals_V * 0.5) * Category_Multiplier
        
        // Tournaments Multipliers:
        //   - Regular: 1.0
        //   - Mixed (Gemengd): 0.4
        // Interclub Multipliers:
        //   - Regular: 0.8
        //   - Mixed (Gemengd): 0.4

        let categoryMultiplier = 0.4; // Default for Mixed

        if (player.category === 'regular') {
            if (player.tournamentType === 'tournaments') {
                categoryMultiplier = 1.0;
            } else if (player.tournamentType === 'interclub') {
                categoryMultiplier = 0.8;
            }
        }
        
        let wp = 0;
        let vp = 0;


        // Calculate winning points
        wp = (player.pouleWins * 1 + player.finalsWins * 1.5) * categoryMultiplier;
        
        // Calculate losing points
        vp = (player.pouleDefeats * 1 + player.finalsDefeats * 0.5) * categoryMultiplier;


        const totalMatches = player.pouleWins + player.pouleDefeats + player.finalsWins + player.finalsDefeats;
        const winRate = totalMatches > 0 ? ((player.pouleWins + player.finalsWins) / totalMatches * 100).toFixed(1) : 0;

        return {
            name: player.name,
            tournamentType: player.tournamentType,
            category: player.category,
            categoryMultiplier: categoryMultiplier,
            pouleWins: player.pouleWins,
            pouleDefeats: player.pouleDefeats,
            finalsWins: player.finalsWins,
            finalsDefeats: player.finalsDefeats,
            wp: wp.toFixed(2),
            vp: vp.toFixed(2),
            totalPoints: (parseFloat(wp) + parseFloat(vp)).toFixed(2),
            totalMatches: totalMatches,
            winRate: winRate,
        };
    }

    displayResults(playerName, analyses) {
        let html = `<div class="player-header"><h3>${playerName}</h3></div>`;
        
        html += '<div class="results-grid">';
        
        for (const analysis of analyses) {
            html += `
            <div class="result-card">
                <h4>${analysis.legend}</h4>
                <p><strong>Multiplier:</strong> ${analysis.categoryMultiplier}</p>
                <hr>
                <h5>Match Performance</h5>
                <p>Pool Wins: ${analysis.pouleWins}</p>
                <p>Pool Defeats: ${analysis.pouleDefeats}</p>
                <p>Finals Wins: ${analysis.finalsWins}</p>
                <p>Finals Defeats: ${analysis.finalsDefeats}</p>
                <p>Total Matches: ${analysis.totalMatches}</p>
                <p>Win Rate: ${analysis.winRate}%</p>
                <hr>
                <h5>Points Calculation</h5>
                <p><strong>Winning Points (WP):</strong> ${analysis.wp}</p>
                <p><strong>Losing Points (VP):</strong> ${analysis.vp}</p>
                <p><strong>Total Points:</strong> ${analysis.totalPoints}</p>
            </div>
            `;
        }
        
        html += '</div>';

        // Calculate totals
        let totalWP = 0;
        let totalVP = 0;
        let totalMatches = 0;
        let removedLostPoints = 0;
        for (const analysis of analyses) {
            totalWP += parseFloat(analysis.wp);
            totalVP += parseFloat(analysis.vp);
            totalMatches += analysis.totalMatches;
        }
        const grandTotal = (totalWP + totalVP).toFixed(2);

        removedLostPoints = Math.floor(totalMatches / 12);
        let finalTotalVP = 0;
        finalTotalVP = parseFloat(totalVP) - removedLostPoints;
        var currentPercentage =0;
        currentPercentage =  (parseFloat(totalWP) / (parseFloat(totalWP) + parseFloat(finalTotalVP)));
        totalWP = totalWP.toFixed(2);
        totalVP = totalVP.toFixed(2);
        totalMatches = totalMatches.toFixed(2);
        // Add totals summary
        html += `
        <div class="totals-summary">
            <h4>Overall Summary</h4>
            <p><strong>Total Winning Points (WP):</strong> ${totalWP}</p>
            <p><strong>Total Losing Points (VP):</strong> ${totalVP}</p>
            <p><strong>Total Matches Played:</strong> ${totalMatches}</p>
            <p><strong>Deducted Points to reduce:</strong> ${removedLostPoints}</p>
            <p class="grand-total"><strong>Current Percentage:</strong> ${(currentPercentage * 100).toFixed(3)}%</p>    
        </div>
        `;

        this.resultsContainer.innerHTML = html;
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PadelAnalyzer();
});
