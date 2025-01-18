export function loadAndDrawIcon(faviconUrl, x, y, ctx) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
        const iconSize = 20;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, iconSize/2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, x - iconSize/2, y - iconSize/2, iconSize, iconSize);
        ctx.restore();
    };
    
    img.onerror = () => {
        const defaultImg = new Image();
        defaultImg.src = 'assets/default-favicon.png';
        defaultImg.onload = () => {
            const iconSize = 20;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, iconSize/2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(defaultImg, x - iconSize/2, y - iconSize/2, iconSize, iconSize);
            ctx.restore();
        };
    };
    
    img.src = faviconUrl;
}

export function drawFaviconsOnDonut(chart, favicons) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    
    const { top, bottom, left, right } = chartArea;
    const centerX = (right + left) / 2;
    const centerY = (top + bottom) / 2;
    const radius = Math.min(chartArea.width, chartArea.height) / 2;
    const iconRadius = radius * 0.85;
    
    favicons.forEach((favicon, index) => {
        if (!chart.getDatasetMeta(0).data[index]) return;
        
        const segment = chart.getDatasetMeta(0).data[index];
        const rotationOffset = Math.PI/1.95;
        const segmentAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2 + rotationOffset;
        
        const x = centerX + Math.cos(segmentAngle) * iconRadius;
        const y = centerY + Math.sin(segmentAngle) * iconRadius;
        
        loadAndDrawIcon(favicon, x, y, ctx);
    });
}