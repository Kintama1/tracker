import { Chart } from 'chart.js/auto';
import { formatTime } from '../utils/timeFormatter';
import { drawFaviconsOnDonut } from '../utils/iconLoader';

export class ChartComponent {
    constructor(container, onOthersClick) {
        this.container = container;
        this.onOthersClick = onOthersClick;
        this.donutChart = null;
        this.faviconUpdateInterval = null;
        this.otherDomains = [];
        this.totalTime = 0;

        this.chartOptions = {
            cutout: '70%',
            responsive: true,
            animation: { duration: 300 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            const domain = context.label;
                            const time = context.raw;
                            return `${domain}: ${formatTime(time)}`;
                        }
                    }
                }
            },
            elements: {
                arc: { borderWidth: 0 }
            },
            maintainAspectRatio: false
        };
    }

    createTimerPlugin() {
        return {
            id: 'timerPlugin',
            beforeDraw: (chart) => {
                const { ctx, chartArea } = chart;
                const { top, bottom, left, right } = chartArea;
                
                const centerX = (right + left) / 2;
                const centerY = (top + bottom) / 2;

                ctx.save();
                ctx.font = '1rem Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#35918b';
                ctx.fillText('Total Time', centerX, centerY - 10);
                ctx.font = '1.5rem Arial';
                ctx.fillText(formatTime(this.totalTime), centerX, centerY + 15);
                ctx.restore();
            }
        };
    }

    update(timeData) {
        const maxSegments = 5;
        const colorPalette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

        const sortedDomains = Object.entries(timeData)
            .sort(([, a], [, b]) => b[1] - a[1]);

        this.totalTime = sortedDomains.reduce((acc, [, [, time]]) => acc + time, 0);
        const topDomains = sortedDomains.slice(0, maxSegments - 1);
        this.otherDomains = sortedDomains.slice(maxSegments - 1);
        const otherTime = this.otherDomains.reduce((acc, [, [, time]]) => acc + time, 0);

        const labels = [...topDomains.map(([domain]) => domain), 'Others'];
        const data = [...topDomains.map(([, [, time]]) => time), otherTime];
        const favicons = [...topDomains.map(([, [favicon]]) => favicon || 'assets/default-favicon.png')];
        if (favicons.length >= maxSegments - 1) {
            favicons.push('assets/others-favicon.png');
        }

        if (!this.donutChart) {
            this.createChart(labels, data, colorPalette, maxSegments, favicons);
        } else {
            this.updateChart(labels, data, favicons);
        }

        this.updateFavicons(favicons);
    }

    createChart(labels, data, colorPalette, maxSegments, favicons) {
        this.container.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvas.id = 'donut-chart';
        this.container.appendChild(canvas);

        this.donutChart = new Chart(canvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colorPalette.slice(0, maxSegments),
                }]
            },
            options: this.chartOptions,
            plugins: [this.createTimerPlugin()]
        });

        this.donutChart.faviconData = favicons;
        this.setupEventListeners(canvas);
    }

    setupEventListeners(canvas) {
        let isHoveringOthers = false;

        canvas.addEventListener('mousemove', (event) => {
            const points = this.donutChart.getElementsAtEventForMode(
                event, 'nearest', { intersect: true }, true
            );
            
            if (points.length) {
                const firstPoint = points[0];
                const label = this.donutChart.data.labels[firstPoint.index];
                if (label === 'Others') {
                    if (!isHoveringOthers) {
                        canvas.style.cursor = 'pointer';
                        isHoveringOthers = true;
                    }
                } else if (isHoveringOthers) {
                    canvas.style.cursor = 'default';
                    isHoveringOthers = false;
                }
            } else if (isHoveringOthers) {
                canvas.style.cursor = 'default';
                isHoveringOthers = false;
            }
        });

        canvas.addEventListener('click', (event) => {
            const points = this.donutChart.getElementsAtEventForMode(
                event, 'nearest', { intersect: true }, true
            );
            if (points.length) {
                const firstPoint = points[0];
                const label = this.donutChart.data.labels[firstPoint.index];
                if (label === 'Others' && this.onOthersClick) {
                    this.onOthersClick(this.otherDomains);
                }
            }
        });
    }

    updateChart(labels, data, favicons) {
        this.donutChart.data.labels = labels;
        this.donutChart.data.datasets[0].data = data;
        this.donutChart.faviconData = favicons;
        this.donutChart.update('none');
    }

    updateFavicons(favicons) {
        if (this.faviconUpdateInterval) {
            clearInterval(this.faviconUpdateInterval);
        }

        if (this.donutChart?.ctx) {
            drawFaviconsOnDonut(this.donutChart, favicons);
            this.faviconUpdateInterval = setInterval(() => {
                if (this.donutChart?.ctx) {
                    drawFaviconsOnDonut(this.donutChart, favicons);
                }
            }, 200);
        }
    }

    destroy() {
        if (this.faviconUpdateInterval) {
            clearInterval(this.faviconUpdateInterval);
        }
        if (this.donutChart) {
            this.donutChart.destroy();
            this.donutChart = null;
        }
    }
}